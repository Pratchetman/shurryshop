import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import ScreenHeaderBtn from "../../components/common/header/ScreenHeaderBtn";
import { COLORS, icons, images, SIZES } from "../../constants";
import styles from "./home2.style";
import useFetch from "../../hook/fetchData";
import Cart from "../../components/common/cards/carts/Cart";
import AddCart from "../../components/carts/AddCart";
import Recipes from "./Recipes";
import Logout from "../../components/auth/Logout";

const Home2 = () => {
  const params = useSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleRecipes, setModalVisibleRecipes] = useState(false);
  const [modalLogout, setModalLogout] = useState(false);
  const [view, setView] = useState("listas");
  const { shoppingCarts, cartList } = useFetch();
  const [user, setUser] = useState(params.id.split("+")[1]);
  const [userId, setUserId] = useState(params.id.split("+")[0]);

  useEffect(() => {
    shoppingCarts(params.id.split("+")[0]);
  }, [modalVisible]);

  const handleModal = () => {
    if (view == "listas") {
      setModalVisible(!modalVisible);
    } else {
      setModalVisibleRecipes(!modalVisibleRecipes);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "orange", paddingHorizontal: 20, paddingBottom: 20 }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "orange" },
          headerShadowVisible: true,
          headerBackVisible: false,
          headerLeft: () => (
            <Text style={styles.headerTitle}>
              {view == "listas" ? "Mis listas" : "Mis recetas"}{" "}
            </Text>
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={images.freezer}
              dimension="100%"
              modalLogout={modalLogout}
              setModalLogout={setModalLogout}
            />
          ),
          headerTitle: "",
        }}
      />
      {view == "listas" && (
        <View style={{ height: "97%", paddingTop: 5, paddingBottom: 40 }}>
          {cartList ? (
            <View style={{ flex: 1 }}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={cartList}
                renderItem={({ item }) => <Cart item={item} user={user} />}
              />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {/* <Text style={{ alignSelf: "center", fontSize: 36 }}>
                ¿Aún no tienes listas?
              </Text> */}
              <Image
                source={images.noCarts}
                style={{
                  width: "100%",
                  height: "70%",
                  resizeMode: "contain",
                  alignSelf: "center",
                }}
              />
            </View>
          )}
        </View>
      )}
      {view == "recetas" && (
        <Recipes
          userId={userId}
          modalVisibleRecipes={modalVisibleRecipes}
          setModalVisibleRecipes={setModalVisibleRecipes}
        />
      )}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          backgroundColor: "orange",
          flex: 1,
          marginBottom: -10,
          position: "relative",
        }}
      >
        <TouchableOpacity
          style={styles.applyBtn("listas", view)}
          onPress={() => {
            setView("listas");
          }}
        >
          <Text style={styles.applyBtnText("listas", view)}>Listas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            position: "absolute",
            zIndex: 2,
            backgroundColor: COLORS.lightWhite,
            width: 66,
            height: 66,
            left: "50%",
            right: "50%",
            borderRadius: 100 / 2,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "gray",
            marginBottom: 25,
            transform: [{ translateX: -33 }],
          }}
          onPress={handleModal}
        >
          <Text style={{ fontSize: 30 }}>+</Text>
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
      {modalLogout && <Logout modalLogout={modalLogout} setModalLogout={setModalLogout}/>}
    </SafeAreaView>
  );
};

export default Home2;
