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
  const [modalVisibleRecipes, setModalVisibleRecipes] = useState(false);
  const [view, setView] = useState("listas");
  const { isLoading, userLogin, shoppingCarts, cartList } = useFetch();
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "orange", padding: 20 }}>
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
            <ScreenHeaderBtn iconUrl={images.freezer} dimension="100%" />
          ),
          headerTitle: "",
        }}
      />
      {view == "listas" && (
        <View style={{ flex: 1, paddingTop: 5 }}>
          {cartList && (
            <View style={{ flex: 4 }}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={cartList}
                renderItem={({ item }) => <Cart item={item} user={user} />}
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
    </SafeAreaView>
  );
};

export default Home2;
