import { View, Text, SafeAreaView, ActivityIndicator, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import Login from "../components/auth/Login";
import useFetch from "../hook/fetchData";
import { useEffect, useState } from "react";
import { COLORS } from "../constants";
import { getDatabase } from "firebase/database";
import NewUser from "../components/auth/NewUser";
const dataLogin = {
  mail: "",
  password: "",
};

const Home = () => {
  const router = useRouter();
  const { isLoading, error, userLogin, logged } = useFetch();
  const [login, setLogin] = useState(dataLogin);
  const [newUser, setNewUser] = useState(false);
  
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('shurry-data')
      if(value !== null) {
        console.log('shurry-data :', value)
        router.push(`/home2/${value}`);
      }
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getData()
  }, [])
  

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "orange" },
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />
      <View style={{
        height: "100%"
      }}>

     
      {isLoading ? (
        <ActivityIndicator style={{height: "100%", backgroundColor: "orange"}}  size="large" color={COLORS.primary} />
      ) : error ? (
        <Text>Hubo un error</Text>
      ) : !newUser ? (
        <Login 
          login={login}
          newUser={newUser}
          setNewUser={setNewUser}
          setLogin={setLogin}
          handleClick={() => {
            userLogin(login);
          }}
        />
      ) : <NewUser newUser={newUser} setNewUser={setNewUser} />}
        </View>
    </SafeAreaView>
  );
};

export default Home;
