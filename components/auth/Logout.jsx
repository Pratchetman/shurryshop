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
} from "react-native";
import styles from "./login.styles";
import useFetch from "../../hook/fetchData";
import { images } from "../../constants";

const Logout = ({ modalLogout, setModalLogout }) => {
  
    const { userLogOut } = useFetch();
    const handlePress = () =>{
      userLogOut();
    }
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalLogout}
        onRequestClose={() => {
          setModalLogout(!modalLogout);
        }}
      >
        <View style={styles2.centeredView}>
          <View style={styles2.modalView}>
            <Image source={images.freezer} style={{height: 80}} resizeMode="contain" />
            <Text style={styles.headerTitleLogout}>¿Cerrar sesión?</Text>
         
            <View style={{flexDirection: "row", gap: 20}}>
            
            <Pressable
              style={[styles2.button, styles2.buttonClose]}
              onPress={()=>{
                setModalLogout(!modalLogout);
               
              }}
            >
              <Text style={styles2.textStyle}>Cancelar</Text>
            </Pressable>
            <Pressable
              style={[styles2.button, styles2.buttonClose]}
              onPress={handlePress}
            >
              <Text style={styles2.textStyle}>Salir</Text>
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
    justifyContent: "space-evenly",
    shadowOffset: {
      width: 10,
      height: 2,
    },
    shadowOpacity: 0.95,
    shadowRadius: 4,
    elevation: 10,
    height: "auto",
    height: 260,
    width: "80%",
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

export default Logout;