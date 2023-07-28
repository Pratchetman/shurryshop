import { View, Text, SafeAreaView, ActivityIndicator } from "react-native";
import { Stack, useRouter } from "expo-router";

import Login from "../components/auth/Login";
import useFetch from "../hook/fetchData";
import { useState } from "react";
import { COLORS } from "../constants";
const dataLogin = {
  mail: "",
  password: "",
};

const Home = () => {
  const router = useRouter();
  const { isLoading, error, userLogin, logged } = useFetch();
  const [login, setLogin] = useState(dataLogin);
  
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "orange" },
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />
      {isLoading ? (
        <ActivityIndicator style={{height: "100%", backgroundColor: "orange"}}  size="large" color={COLORS.primary} />
      ) : error ? (
        <Text>Hubo un error</Text>
      ) : (
        <Login 
          login={login}
          setLogin={setLogin}
          handleClick={() => {
            userLogin(login);
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default Home;
