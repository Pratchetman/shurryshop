import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import ScreenHeaderBtn from "../../components/common/header/ScreenHeaderBtn";
import { COLORS, images } from "../../constants";
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
  const router = useRouter();
  const email = params.id.split("+")[1];


  useEffect(() => {
    cartDetail(params.id.split("+")[0]);
  
  }, [aux]);

  if (oneCart) {
    console.log(Object.keys(oneCart[4]));
  }

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
            <View>
              <TouchableOpacity
                onPress={() =>
                  router.push(
                    `/home2/${params.id.split("_")[0]}+${
                      params.id.split("+")[1]
                    }`
                  )
                }
              >
                <Image
                  source={images.back}
                  style={{ resizeMode: "contain", height: 25, width: 25}}
                />
              </TouchableOpacity>
            </View>
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
      <View
        style={{
          flex: 1,
          backgroundColor: "gray",
          borderWidth: 3,
          borderColor: "white",
          elevation: 2,
          borderRadius: 16,
          padding: 5,
        }}
      >
        {oneCart && (
          <OneCart
            aux={aux}
            setAux={setAux}
            list={oneCart}
            setModalVisible2={setModalVisible}
            modalVisible2={modalVisible}
          />
        )}
        {oneCart && Object.keys(oneCart[4]).length > 1 && (
          <View
            style={{
              borderTopColor: "white",
              borderTopWidth: 1,

              marginVertical: 5,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: COLORS.primary,
                marginLeft: 8,
                marginTop: 5,
              }}
            >
              Recetas a recordar
            </Text>
            <ScrollView horizontal={true}>
              {Object.keys(oneCart[4]).map((elem, index) => {
                if (elem != "0") {
                  return (
                    <TouchableOpacity key={index} style={styles.applyBtnRecipe}>
                      <Text style={styles.applyBtnTextRecipe}>{elem}</Text>
                    </TouchableOpacity>
                  );
                }
              })}
            </ScrollView>
          </View>
        )}
      </View>

      {oneCart && oneCart[0] === false && (
        <View
          style={{
            // borderTopColor: "green",
            // borderTopWidth: 1,
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
