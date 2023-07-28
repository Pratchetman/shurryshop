import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  ActivityIndicator,
} from "react-native";
import styles from "./oneCart.style";
import useFetch from "../../hook/fetchData";
import { isLoading } from "expo-font";

const AddPrice = ({ modalVisible, setModalVisible, elemPrice, list }) => {
  const { addPriceToArticle, getPricesList, priceList, isLoading } = useFetch();
  const [price, setPrice] = useState("");
  
  useEffect(() => {
    getPricesList(list[1].split("_")[0], elemPrice.id);
  }, []);

  const handleNewPrice = () => {
    addPriceToArticle(list[1], elemPrice, price);
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
            <Text style={styles.headerTitle}>Introducir precio</Text>
            <Text style={styles.headerTitle}>{elemPrice.name.toUpperCase()}</Text>

            <TextInput
              style={styles.searchInput}
              keyboardType="numeric"
              onChangeText={(text) => {
                setPrice(text);
              }}
              value={price}
              placeholder="Introducir precio"
              maxLength={6}
            />
            <View style={{ flexDirection: "row", gap: 20 }}>
              <Pressable
                style={[styles2.button, styles2.buttonClose]}
                onPress={handleNewPrice}
              >
                <Text style={styles2.textStyle}>Guardar</Text>
              </Pressable>
              <Pressable
                style={[styles2.button, styles2.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setPrice("");
                }}
              >
                <Text style={styles2.textStyle}>Cancelar</Text>
              </Pressable>
            </View>

            {isLoading ? (
              <ActivityIndicator style={{ marginTop: 10 }} />
            ) : (
              <View>
                <Text style={styles2.textHistoryStyle}>
                  Historial de precios
                </Text>
                {priceList?.length > 0 ? (
                  priceList?.map((elem, index) => {
                    return (
                      <Text key={index} style={styles2.textHistoryStyle2}>
                        {elem.price} € - {elem.date}
                      </Text>
                    );
                  })
                ) : (
                  <Text style={styles2.textHistoryStyle}>
                    No hay histórico de precios
                  </Text>
                )}
              </View>
            )}
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
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "orange",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.95,
    shadowRadius: 4,
    elevation: 40,
    height: "auto",
    width: "90%",
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
  textHistoryStyle: {
    color: "black",
    fontWeight: 200,
    marginTop: 10,
    alignSelf: "center",
  },
  textHistoryStyle2: {
    color: "black",
    fontWeight: 200,
    marginTop: 10,
    alignSelf: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default AddPrice;
