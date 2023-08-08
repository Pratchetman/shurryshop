import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./oneCart.style";
import useFetch from "../../hook/fetchData";
import AddPrice from "./AddPrice";
import { images } from "../../constants";

const OneCart = ({ list, aux, setAux, modalVisible2, setModalVisible2 }) => {
  const { fetchAllArticles, cartDetail, articleIn, oneCart } = useFetch();

  const [elemPrice, setElemPrice] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    cartDetail(list[1]);
  }, [aux, modalVisible, modalVisible2]);

  const handleList = (e) => {
    if (oneCart[0] === false) {
      e.in = true;
      articleIn(list[1], e);
    }
  };

  const handleListOut = (e) => {
    if (oneCart[0] === false) {
      e.in = false;
      articleIn(list[1], e);
    }
  };

  const setPrice = (e) => {
    setElemPrice(e);
    setModalVisible(!modalVisible);
  };

  return (
    <ScrollView>
      {!list[0] && (
        <TouchableOpacity
          style={{ margin: 30, marginBottom: 24 }}
          onPress={() => setModalVisible2(!modalVisible2)}
        >
          <View
            style={{
              flex: 0.2,
              flexDirection: "column",
              height: 4,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                borderColor: "white",
                borderWidth: 1,
                width: 50,
                height: 50,
                borderRadius: 100 / 2,
                justifyContent: "center",
                alignItems: "center",
                
              }}
            >
              <Text style={{ fontSize: 30, color: "black" }}>+</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
      <Text style={styles.headerTitle}>Artículos pendientes</Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 5,
          justifyContent: "center",
        }}
      >
        {oneCart &&
        !oneCart[0] &&
        Object.values(oneCart[2])?.filter((elem, index) => elem.in === false)
          .length > 0 ? (
          Object.values(oneCart[2])
            ?.filter((elem, index) => elem.in === false)
            .map((elem, index) => (
              <TouchableOpacity
                key={index}
                style={styles.logoContainer(elem)}
                onPress={() => {
                  handleList(elem);
                }}
              >
                <Text style={{ textAlign: "center" }}> {elem.name}</Text>
              </TouchableOpacity>
            ))
        ) : (
          <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>
            Enhorabuena, compra completada!!
          </Text>
        )}
      </View>
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "green",
          marginTop: 10,
        }}
      />
      {oneCart && (
        <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
          <Text style={styles.headerTitle}>
            {oneCart[0] ? "Compra finalizada" : "Ya en carrito"}
          </Text>
          <Text style={styles.headerTitle}>
            {
              Object.values(oneCart[2])?.filter((elem) => elem.in === true)
                .length
            }{" "}
            de {oneCart && Object.values(oneCart[2]).length - 1}
          </Text>
        </View>
      )}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 5,
          justifyContent: "center",
          margin: "auto",
          
        }}
      >
        {oneCart &&
          Object.values(oneCart[2])
            ?.filter((elem) => elem.in === true)
            .map((elem, index) => (
              <TouchableOpacity
                key={index}
                style={styles.logoContainer()}
                onPress={() => {
                  handleListOut(elem);
                }}
                onLongPress={() => setPrice(elem)}
              >
                <Text style={{ color: "white", textAlign: "center", fontSize: 14 }}>
                  {" "}
                  {elem.name}
                </Text>
                {elem.price && (
                  <View style={{display: "flex", flexDirection: "row", alignItems: "center", marginTop: 10}}>
                    <Image source={images.goldCoins} style={{height: 20, width: 17}} resizeMode="contain" />
                    <Text style={{ color: "white", fontSize: 15 }}>{elem.price} €</Text>
                  </View>
                  
                )}
              </TouchableOpacity>
            ))}
      </View>
      {modalVisible && (
        <AddPrice
          elemPrice={elemPrice}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          list={list}
        />
      )}
    </ScrollView>
  );
};

export default OneCart;
