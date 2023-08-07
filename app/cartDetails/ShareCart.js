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
import styles from "./cartDetails.style";
import { COLORS, FONT, SHADOWS, SIZES } from "../../constants";
import useFetch from "../../hook/fetchData";

const ShareCart = ({
  modalShareVisible,
  setModalShareVisible,
  list,
  email,
}) => {
  const [shareMail, setShareMail] = useState("");
  const [shareList, setShareList] = useState([]);
  const [error, setError] = useState("");
  const { toShareCart, checkUser, sendMail } = useFetch();
  console.log(email);
  const handleShareList = async () => {
    if (shareMail != email){
      try {
        const res = await checkUser(shareMail);
        if (res) {
          setShareList([...shareList, shareMail]);
          setShareMail("");
        } else {
          setError("Usuario no existe");
          sendMail(shareMail)
        }
      } catch (error) {
        console.log(error);
      }
    } else{
      setError("No puedes invitarte a ti mismo")
    }
 
  };

  return (
    <View style={styles2.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        propagateSwipe={true}
        visible={modalShareVisible}
        onRequestClose={() => {
          setModalShareVisible(!modalShareVisible);
        }}
      >
        <View style={styles2.centeredView}>
          <View style={styles2.modalView}>
            <Text style={styles2.modalText}>
              ¿Con quién quieres compartir "{list[3]}"?
            </Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Introduce email de usuario"
              value={shareMail}
              onChangeText={(text) => {
                setShareMail(text);
              }}
            />
            {error != "" && <Text>{error}</Text>}
            <Pressable
              style={[styles2.button, styles2.buttonClose]}
              onPress={handleShareList}
            >
              <Text style={styles2.textStyle}>Añadir</Text>
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
            {shareList.length > 0 && (
              <View
                style={{
                  width: "100%",
                  marginTop: 10,
                  marginBottom: 10,
                  opacity: 0.7,
                }}
              >
                {shareList.map((elem, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        margin: 6,
                        backgroundColor: "green",
                        padding: 3,
                        borderRadius: 6,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={{ color: "white", marginLeft: 4 }}>
                        {elem}
                      </Text>
                      <Text style={{ color: "white", marginRight: 4 }}>X</Text>
                    </View>
                  );
                })}
              </View>
            )}
            {shareList.length > 0 && <Pressable
              style={[styles2.button, styles2.buttonClose]}
              onPress={() => {
                toShareCart(list, shareList, email);
                setModalShareVisible(!modalShareVisible);
              }}
            >
              <Text style={styles2.textStyle}>Compartir</Text>
            </Pressable>}
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
    // height: "85%",
    minHeight: 400,
    width: "90%",
    overflow: "scroll",
  },
  button: {
    borderRadius: 20,
    padding: 14,
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
    fontWeight: "bold",
    fontSize: 34,
    fontFamily: FONT.medium,
    textAlign: "center",
  },
});

export default ShareCart;
