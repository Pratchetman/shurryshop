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
import styles from "./oneCart.style";
import useFetch from "../../hook/fetchData";

const AddCart = ({ modalVisible, setModalVisible, userId, user }) => {
  const { addNewCart, cartList } = useFetch();
  const [cartName, setCartName] = useState("")

  const handleNewCart = () => {
    addNewCart(userId, cartName, user);
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles2.centeredView}>
          <View style={styles2.modalView}>
            <Text style={styles.headerTitle}>Nueva lista</Text>
            <TextInput
              style={styles.searchInput}
              onChangeText={(text) => {
                setCartName(text);
              }}
              value={cartName}
              placeholder="Introducir nuevo nombre"
            />
            <View style={{flexDirection: "row", gap: 20}}>
            <Pressable
              style={[styles2.button, styles2.buttonClose]}
              onPress={handleNewCart}
            >
              <Text style={styles2.textStyle}>Guardar</Text>
            </Pressable>
            <Pressable
              style={[styles2.button, styles2.buttonClose]}
              onPress={()=>{
                setModalVisible(!modalVisible);
                setCartName("");
              }}
            >
              <Text style={styles2.textStyle}>Cancelar</Text>
            </Pressable>
            </View>
            
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
    // marginTop: 52,
    backgroundColor: "rgba(0,0,0,0.8)"
  },
  modalView: {
    margin: 20,
    backgroundColor: "orange",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 10,
      height: 2,
    },
    shadowOpacity: 0.95,
    shadowRadius: 4,
    elevation: 10,
    height: "auto",
    width: "90%",
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default AddCart;
