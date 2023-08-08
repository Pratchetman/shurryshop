import React from "react";
import { TouchableOpacity, Image } from "react-native";

import styles from "./screenheader.style";
import useFetch from "../../../hook/fetchData";

const ScreenHeaderBtn = ({ iconUrl, dimension, modalLogout, setModalLogout}) => {

  return (
    <TouchableOpacity style={styles.btnContainer} onPress={()=>setModalLogout(!modalLogout)}>
      <Image
        source={iconUrl}
        resizeMode="contain"
        style={styles.btnImg(dimension)}
      />
    </TouchableOpacity>
  );
};

export default ScreenHeaderBtn;
