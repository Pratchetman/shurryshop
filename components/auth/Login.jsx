import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { icons, SIZES, COLORS, images } from "../../constants";
import { AsyncStorage } from '@react-native-async-storage/async-storage';

import styles from "./login.styles";

const Login = ({ login, setLogin, handleClick, setNewUser, newUser }) => {
  return (
    <View
      style={{
        
        backgroundColor: "orange",
        height: "100%",
        padding: SIZES.medium,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{height: 50}}>
        <Image source={images.freezer}  resizeMode="contain" />
      </View>

      <Text style={styles.headerTitle}>Bienvenido a ShurryShop!</Text>
      <Text style={styles.userName}>Inicia sesión</Text>
      <TextInput
        style={styles.searchInput}
        onChangeText={(text) => {
          setLogin({ ...login, mail: text });
        }}
        value={login.mail}
        placeholder="Introduce el correo electrónico"
      />
      <TextInput
        style={styles.searchInput}
        onChangeText={(text) => {
          setLogin({ ...login, password: text });
        }}
        value={login.password}
        placeholder="Introduce la contraseña"
      />
      <TouchableOpacity style={styles.applyBtn} onPress={handleClick}>
        <Text style={styles.applyBtnText} >
          Acceder
        </Text>
      </TouchableOpacity>
      <Text style={styles.userNameNewLogin}>¿No tienes cuenta?</Text>
      <TouchableOpacity style={styles.applyBtnNew} onPress={()=>setNewUser(!newUser)}>
        <Text style={styles.applyBtnTextNew}>Nuevo Usuario</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
