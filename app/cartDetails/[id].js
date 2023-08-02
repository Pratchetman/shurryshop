import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Stack, useSearchParams } from "expo-router";
import ScreenHeaderBtn from "../../components/common/header/ScreenHeaderBtn";
import { images} from "../../constants";
import styles from "./cartDetails.style";
import useFetch from "../../hook/fetchData";
import OneCart from "../../components/carts/OneCart";
import AddArts from "./AddArts";
import ShareCart from "./ShareCart";

const CartDetails = () => {
  const params = useSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalShareVisible, setModalShareVisible] = useState(false);
  const { cartDetail, oneCart, completePurchase } = useFetch();
  const [aux, setAux] = useState(false);
  const email = params.id.split("+")[1];
  useEffect(() => {
    cartDetail(params.id.split("+")[0]);
  }, [aux]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "orange", padding: 10 }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "orange" },
          headerShadowVisible: true,
          headerBackVisible: false,
          headerLeft: () =>
            oneCart ? (
              <Text style={styles.headerTitle}>
                {oneCart[3] ? oneCart[3] : oneCart[2]}
              </Text>
            ) : null,
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.freezer} dimension="100%" />
          ),
          headerTitle: "",
        }}
      />

      {modalVisible && (
        <AddArts
          list={oneCart}
          aux={aux}
          setAux={setAux}
          setModalVisible2={setModalVisible}
          modalVisible2={modalVisible}
          userId={params.id.split("+")[0]}
        />
      )}
          {modalShareVisible && (
        <ShareCart
          list={oneCart}
          aux={aux}
          setAux={setAux}
          setModalShareVisible={setModalShareVisible}
          modalShareVisible={modalShareVisible}
          email={email}
        />
      )}
      {oneCart && (
        <OneCart
          aux={aux}
          setAux={setAux}
          list={oneCart}
          setModalVisible2={setModalVisible}
          modalVisible2={modalVisible}
        />
      )}
      {oneCart && oneCart[0] === false && (
        <View
          style={{
            borderTopColor: "green",
            borderTopWidth: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
           <TouchableOpacity
            style={styles.applyBtn}
            onPress={() => {
              setModalShareVisible(!modalShareVisible);
            }}
          >
            <Text style={styles.applyBtnText}>Compartir lista</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.applyBtn}
            onPress={() => {
              completePurchase(oneCart[1], params.id);
            }}
          >
            <Text style={styles.applyBtnText}>Finalizar compra</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CartDetails;
