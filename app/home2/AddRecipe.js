import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import styles from "../cartDetails/cartDetails.style";
import useFetch from "../../hook/fetchData";
import { COLORS, icons, images, SIZES } from "../../constants";
import AddArts from "../cartDetails/AddArts";
import AddArtsRecipe from "./AddArtsRecipes";
import { ScrollView } from "react-native";
const initialRecipe = {
  name: "",
  elab: "",
  id: "",
  food: [],
};

const AddRecipe = ({ modalVisibleRecipes, setModalVisibleRecipes, userId, setAux, aux }) => {
  const [recipe, setRecipe] = useState(initialRecipe);
  const [secondModal, setSecondModal] = useState(false);
  const [recipeFood, setRecipeFood] = useState([]);
  const { addRecipe } = useFetch();
  console.log(recipe);

  const handleRecipe = (key, value) => {
    setRecipe({ ...recipe, [key]: value, id: "Rec_" + Date.now() });
  };

  const newRecipe = () => {
    addRecipe(userId, recipe, recipeFood);
    setAux(!aux);
    setModalVisibleRecipes(!modalVisibleRecipes);
  };

  return (
    <View style={styles2.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        propagateSwipe={true}
        visible={modalVisibleRecipes}
        onRequestClose={() => {
          setModalVisibleRecipes(!modalVisibleRecipes);
        }}
      >
        <View style={styles2.centeredView}>
          <View style={styles2.modalView}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "70%",
                height: 40,
                alignItems: "center",
                marginBottom: 5,
              }}
            >
              <Text style={styles.headerTitle}>Nueva receta</Text>
              <Image
                style={{ height: "90%", width: 30 }}
                source={images.recipe}
              />
            </View>

            <TextInput
              style={styles.searchInput}
              placeholder="Título de la receta"
              value={recipe.name}
              onChangeText={(text) => handleRecipe("name", text)}
            />
            <TextInput
              multiline={true}
              numberOfLines={22}
              placeholder="Introduce la elaboración"
              style={styles.searchInputArea}
              value={recipe.elab}
              onChangeText={(text) => handleRecipe("elab", text)}
            />
            <View
              style={{
                width: "90%",
              }}
            >
              <Text style={styles.headerSubTitle}>Ingredientes</Text>
              <ScrollView horizontal={true} >
                {recipeFood.map((elem, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={{ marginLeft: 0 }}
                      onPress={() => setSecondModal(!secondModal)}
                    >
                      <View
                        style={{
                          backgroundColor: COLORS.lightWhite,
                          width: 50,
                          height: 50,
                          borderRadius: 10,
                          justifyContent: "center",
                          alignItems: "center",
                          margin: 5,
                          marginTop: 10,
                        }}
                      >
                        <Text style={{ fontSize: 10, textAlign: "center" }}>{elem.name}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
                <TouchableOpacity
                  style={{ marginLeft: 0 }}
                  onPress={() => setSecondModal(!secondModal)}
                >
                  <View
                    style={{
                      backgroundColor: COLORS.lightWhite,
                      width: 50,
                      height: 50,
                      borderRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      margin: 5,
                      marginTop: 10,
                    }}
                  >
                    <Text style={{ fontSize: 30 }}>+</Text>
                  </View>
                </TouchableOpacity>
              </ScrollView>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                width: "80%",
              }}
            >
              <Pressable
                style={[styles2.button, styles2.buttonClose]}
                onPress={() => setModalVisibleRecipes(!modalVisibleRecipes)}
              >
                <Text style={styles2.textStyle}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={[styles2.button, styles2.buttonClose]}
                onPress={newRecipe}
              >
                <Text style={styles2.textStyle}>Guardar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      {secondModal && (
        <AddArtsRecipe
          list={recipeFood}
          setList={setRecipeFood}
          modalVisible2={secondModal}
          setModalVisible2={setSecondModal}
          userId={userId}
        />
      )}
    </View>
  );
};

const styles2 = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "orange",
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.95,
    shadowRadius: 4,
    elevation: 40,
    height: "90%",
    minHeight: 400,
    width: "95%",
    overflow: "scroll",
  },
  button: {
    borderRadius: 20,
    padding: 15,
    paddingHorizontal: 20,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    marginTop: 10,
    backgroundColor: "green",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AddRecipe;
