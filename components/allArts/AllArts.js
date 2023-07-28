import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import useFetch from "../../hook/fetchData";
import styles from "./allArts.style";
export const AllArts = ({ list, aux, setAux, search, setSearch }) => {
  const { allArticles, fetchAllArticles, addArticlesToList } = useFetch();
  let lista = Object.values(list[2]);
  
  useEffect(() => {
    fetchAllArticles();
  }, [aux]);

  return (
    <>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 5 }}>
        {allArticles &&
          allArticles
            .filter((elem) => {
              let res = true;

              if (search !== "" && !elem.name.includes(search)) {
                res = false;
              }

              for (art of lista) {
                if (art.id === elem.id) {
                  res = false;
                }
              }

              return res;
            })
            .map((article, index) => {
              if (index < 12) {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.logoContainer(article.type)}
                    onPress={() => {
                      addArticlesToList(list, article);
                      setAux(!aux);
                    }}
                  >
                    <Text style={{ textAlign: "center" }}> {article.name}</Text>
                  </TouchableOpacity>
                );
              }
            })}
        {search !== "" && (
          <TouchableOpacity
            style={styles.logoContainer()}
            onPress={() => {
              addArticlesToList(list, {
                id: Date.now(),
                in: false,
                name: search,
                type: "random",
              });
              setAux(!aux);
              setSearch("");
            }}
          >
            <Text style={{ textAlign: "center" }}> {search}</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};
