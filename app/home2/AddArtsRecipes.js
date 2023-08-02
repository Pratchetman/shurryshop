import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from "react-native";
import styles from "../cartDetails/cartDetails.style";
import { AllArts } from "../../components/allArts/AllArts";
import { AllArtsRecipe } from "../../components/allArts/AllArtsRecipe";

const AddArtsRecipe = ({ modalVisible2, setModalVisible2, list, setList, aux, setAux, userId }) => {
  const [search, setSearch] = useState("");

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
            <TextInput
              style={styles.searchInput}
              placeholder="Introduce artículo"
              value={search}
              onChangeText={(text) => {
                setSearch(text);
              }}
            />
            <Pressable
              style={[styles2.button, styles2.buttonClose]}
              onPress={() => setModalVisible2(!modalVisible2)}
            >
              <Text style={styles2.textStyle}>Terminar</Text>
            </Pressable>
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
            <AllArtsRecipe
              aux={aux}
              setAux={setAux}
              list={list}
              setList={setList}
              search={search}
              setSearch={setSearch}
              userId={userId}
            />
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
    backgroundColor: "rgba(0,0,0,0.8)"
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
    marginBottom: 15,
    textAlign: "center",
  },
});

export default AddArtsRecipe;
