import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import styles from "./cartDetails.style";
import { AllArts } from "../../components/allArts/AllArts";
import useFetch from "../../hook/fetchData";

const AddArts = ({
  userId,
  modalVisible2,
  setModalVisible2,
  list,
  aux,
  setAux,
}) => {
  const [search, setSearch] = useState("");
  const { getRecipes, recipes } = useFetch();
  useEffect(() => {
    getRecipes(userId.split("_")[0]);
  }, []);
  const [recipe, setRecipe] = useState([]);

  const handleSelectRecipe = (index) => {
    setRecipe(recipes[index]);
    setAux(!aux)
  };
  console.log("recipes para el menu", recipes);
  return (
    <View style={styles2.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        propagateSwipe={true}
        visible={modalVisible2}
        onRequestClose={() => {
          setModalVisible2(!modalVisible2);
        }}
      >
        <View style={styles2.centeredView}>
          <View style={styles2.modalView}>
            <Text style={styles2.modalText}>Buscador de artículos</Text>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "90%",
                justifyContent: "center",
                gap: 10,
                alignItems: "center",
                // overflow: "hidden"
              }}
            >
              <TextInput
                style={styles.searchInput}
                placeholder="Introduce artículo"
                value={search}
                onChangeText={(text) => {
                  setSearch(text);
                }}
              />
              <ModalDropdown
                defaultValue="Recetas"
                style={styles.searchInputModal}
                options={recipes.map((elem) => elem.name)}
                onSelect={handleSelectRecipe}
                showsVerticalScrollIndicator={true}
                dropdownStyle={{
                  elevation: 2,
                  borderWidth: 2,
                  borderRadius: 16,
                  overflow: "hidden",
                  marginHorizontal: -30,
                  marginVertical: 14,
                  height: "auto",
                  maxHeight: 300,
                  
                }}
                dropdownTextStyle={{
                  textAlign: "right",
                  color: "black",
                  fontWeight: "bold",
                }}
                dropdownTextHighlightStyle={{ color: "green" }}
              />
            </View>
            {recipe.name && (
              <Text
                style={{
                  fontSize: 17,
                  textAlign: "center",
                  marginVertical: 10,
                }}
              >
                Ingredientes necesarios para:{" "}
                <Text style={{ fontWeight: "bold" }}>{recipe.name}</Text>
              </Text>
            )}
            <AllArts
              aux={aux}
              setAux={setAux}
              list={list}
              search={search}
              setSearch={setSearch}
              recipe={recipe}
            />
            <View
              style={{
                backgroundColor: "green",
                height: 1,
                width: "100%",
                marginTop: 10,
                marginBottom: 10,
                opacity: 0.7,
              }}
            />
            <Pressable
              style={[styles2.button, styles2.buttonClose]}
              onPress={() => setModalVisible2(!modalVisible2)}
            >
              <Text style={styles2.textStyle}>Terminar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
    padding: 25,
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.95,
    shadowRadius: 4,
    elevation: 40,
    height: "85%",
    minHeight: 400,
    width: "90%",
    overflow: "scroll",
  },
  button: {
    borderRadius: 20,
    padding: 10,
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
  modalText: {
    marginBottom: 5,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default AddArts;
