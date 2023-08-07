import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";

import { icons, SIZES, COLORS, images } from "../../constants";

import styles from "./login.styles";
import useFetch from "../../hook/fetchData";

let userDefault = {
  email: "",
  pass: "",
};

const NewUser = ({newUser, setNewUser}) => {
  const [addNewUser, setAddNewUser] = useState(userDefault);
  const { addUser } = useFetch();
  console.log(addNewUser);
  return (
    <View
      style={{
        backgroundColor: "orange",
        height: "100%",
        // padding: SIZES.medium,

        overflow: "hidden",
      }}
    >
      <ImageBackground
        source={images.freezer}
        resizeMode="contain"
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          paddingHorizontal: 30,
        }}
        imageStyle={{
          height: 130,
          marginTop: 10,
        }}
      >
        <Text style={styles.headerTitleNew}>ShurryShop!</Text>
        <Text style={styles.userNameNew}>Nuevo usuario</Text>

        <TextInput
          style={styles.searchInput}
          value={addNewUser.email}
          placeholder="Introduce el correo electrónico"
          onChangeText={(text) => setAddNewUser({ ...addNewUser, email: text })}
        />
        <TextInput
          style={styles.searchInput}
          value={addNewUser.pass}
          placeholder="Introduce la contraseña"
          onChangeText={(text) => setAddNewUser({ ...addNewUser, pass: text })}
        />
        <TouchableOpacity
          style={styles.applyBtnNew2}
          onPress={() => addUser(newUser)}
        >
          <Text style={styles.applyBtnText}>¡Dar de alta!</Text>
        </TouchableOpacity>
        {/* <View style={{borderWidth: 1, borderTopColor: "black", width: "100%", marginTop: 20}} /> */}
        <Text style={styles.userNameNew}>¿Ya tienes cuenta?</Text>
        <TouchableOpacity
          style={styles.applyBtnNew2}
          onPress={()=>setNewUser(!newUser)}
        >
          <Text style={styles.applyBtnText}>Iniciar sesión</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default NewUser;
