import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import ScreenHeaderBtn from "../../components/common/header/ScreenHeaderBtn";
import { COLORS, icons, images, SIZES } from "../../constants";
import styles from "./home2.style";
import useFetch from "../../hook/fetchData";
import Cart from "../../components/common/cards/carts/Cart";
import AddCart from "../../components/carts/AddCart";
import Recipes from "./Recipes";

const Home2 = () => {
  const params = useSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [view, setView] = useState("listas");
  const { isLoading, userLogin, shoppingCarts, cartList } = useFetch();
  const [user, setUser] = useState(params.id.split("+")[1]);
  const [userId, setUserId] = useState(params.id.split("+")[0]);
  
  useEffect(() => {
    shoppingCarts(params.id.split("+")[0]);
  }, [modalVisible]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "orange", padding: 20 }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "orange" },
          headerShadowVisible: true,
          headerBackVisible: false,
          headerLeft: () => <Text style={styles.headerTitle}>{view == "listas" ? "Mis listas" : "Mis recetas"} </Text>,
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.freezer} dimension="100%" />
          ),
          headerTitle: "",
        }}
      />
      {view == "listas" && <View style={{flex: 1, paddingTop: 25}}>
        <TouchableOpacity
          style={{ margin: 5, flex: 0.15 }}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <View
            style={{
              flex: 0.2,
              flexDirection: "column",
              // height: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: COLORS.lightWhite,
                width: 50,
                height: 50,
                borderRadius: 100 / 2,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 25,
              }}
            >
              <Text style={{ fontSize: 30 }}>+</Text>
            </View>
          </View>
        </TouchableOpacity>
        {cartList &&<View style={{flex: 4}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={cartList}
            renderItem={({ item }) => <Cart item={item} user={user} />}
          />
        </View>}
      </View>}
      {view == "recetas" && <Recipes userId={userId} />}
      <View
        style={{
          borderTopColor: "green",
          borderTopWidth: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          backgroundColor: "orange",
          flex: 0.1,
          marginBottom: -10
        }}
      >
        <TouchableOpacity style={styles.applyBtn("listas", view)} onPress={() => {setView("listas")}}>
          <Text style={styles.applyBtnText("listas", view)}>Listas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.applyBtn("recetas", view)}
          onPress={() => {
            setView("recetas");
          }}
        >
          <Text style={styles.applyBtnText("recetas", view)}>Recetas</Text>
        </TouchableOpacity>
      </View>
      {modalVisible && (
        <AddCart
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          userId={userId}
          user={user}
        />
      )}
    </SafeAreaView>
  );
};

export default Home2;
