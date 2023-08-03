import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";

import styles from "./cart.style";
import { images } from "../../../../constants";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import useFetch from "../../../../hook/fetchData";

const Cart = ({ item, user }) => {
  const router = useRouter();
  const { cartDetail, oneCart } = useFetch();
  
  useEffect(() => {
    cartDetail(item.id);
  }, []);

  return (
    <>
      {oneCart && (
        <TouchableOpacity
          style={styles.container(oneCart[0])}
          onPress={() => router.push(`/cartDetails/${oneCart[1] + "+" + user}`)}
        >
          <View
            style={{
              width: "55%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity style={styles.logoContainer}>
              <Text style={{ color: "green", fontSize: 24 }}>
                {user[0].toUpperCase()}
              </Text>
            </TouchableOpacity>
            {oneCart[5] && (
              <View style={{display: "flex", flexDirection: "row", gap: 5}}>
                {oneCart[5].filter((elem)=>elem != user).map((elem, index) => { return (
                  <TouchableOpacity key={index} style={styles.logoContainerSh}>
                    <Text style={{ color: "green", fontSize: 12 }}>
                      {elem[0].toUpperCase()}
                    </Text>
                  </TouchableOpacity>);
                })}
              </View>
            )}
            <Text style={styles.companyName} numberOfLines={1}>
              {oneCart[3]} -{" "}
              {new Date(
                parseInt(oneCart[1].split("_")[1])
              ).toLocaleDateString()}
            </Text>
          </View>

          <Image
            style={{ marginTop: 15 }}
            source={oneCart[0] == true ? images.finished : images.carrito}
          />
        </TouchableOpacity>
      )}
    </>
  );
};

export default Cart;
