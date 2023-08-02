import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styles from "../cartDetails/cartDetails.style";
import { images, COLORS } from "../../constants";

const OneRecipe = ({ modalVisible2, setModalVisible2, recipe }) => {
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
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "85%",
                alignItems: "center",
                marginBottom: 10,
                gap: 10,
              }}
            >
              <Text style={styles.headerTitle}>{recipe.name}</Text>
              <Image
                style={{ height: "90%", width: 25 }}
                source={images.recipe}
              />
            </View>

            <Text style={styles.searchInputRecipe}>{recipe.elab}</Text>
            <View
              style={{
                width: "90%",
              }}
            >
              <Text style={styles.headerSubTitle}>Ingredientes</Text>
              <ScrollView horizontal={true}>
                {recipe.food ? (
                  recipe.food.map((elem, index) => {
                    return (
                      <TouchableOpacity key={index} style={{ marginLeft: 0 }}>
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
                          <Text style={{ fontSize: 10, textAlign: "center" }}>
                            {elem.name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })
                ) : (
                  <Text>No has introducido ingredientes para esta receta</Text>
                )}
              </ScrollView>
            </View>
            <Pressable
              style={[styles2.button, styles2.buttonClose]}
              onPress={() => setModalVisible2(!modalVisible2)}
            >
              <Text style={styles2.textStyle}>Volver a recetas</Text>
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
    height: "85%",
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

export default OneRecipe;
