import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { COLORS, icons, images, SIZES } from "../../constants";
import useFetch from "../../hook/fetchData";
import AddRecipe from "./AddRecipe";
import OneRecipe from "./OneRecipe";
const Recipes = ({ userId, modalVisibleRecipes, setModalVisibleRecipes }) => {
  // const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [aux, setAux] = useState(false);
  const [oneRecipe, setOneRecipe] = useState({});
  const { recipes, getRecipes } = useFetch();
  console.log("recetas", recipes);
  useEffect(() => {
    getRecipes(userId);
  }, [aux]);

  const getOneRecipe = (item) => {
    setOneRecipe(item);
    setModalVisible2(!modalVisible2);
  };

  return (
    <View style={{ flex: 1, paddingTop: 5 }}>
      <View style={{ flex: 4 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={recipes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                backgroundColor: "green",
                padding: 7,
                paddingHorizontal: 10,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: 10,
                height: 50,
                marginBottom: 5,
                elevation: 2,
              }}
              onPress={() => {
                getOneRecipe(item);
              }}
            >
              <Text style={{ color: "white" }}>{item.name}</Text>
              <Image
                style={{ height: "100%", width: 20 }}
                source={images.recipe}
              />
            </TouchableOpacity>
          )}
        />
      </View>
      {modalVisibleRecipes && (
        <AddRecipe
          setModalVisibleRecipes={setModalVisibleRecipes}
          modalVisibleRecipes={modalVisibleRecipes}
          userId={userId}
          aux={aux}
          setAux={setAux}
        />
      )}
      {modalVisible2 && (
        <OneRecipe
          setModalVisible2={setModalVisible2}
          modalVisible2={modalVisible2}
          recipe={oneRecipe}
        />
      )}
    </View>
  );
};

export default Recipes;
