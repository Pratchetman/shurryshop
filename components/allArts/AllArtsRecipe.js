import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import useFetch from "../../hook/fetchData";
import styles from "./allArts.style";
export const AllArtsRecipe = ({
  list,
  setList,
  aux,
  setAux,
  search,
  setSearch,
  userId,
}) => {
  const { allArticles, fetchAllArticles } = useFetch();
  console.log(list);

  useEffect(() => {
    fetchAllArticles();
  }, []);

  const addArtsToRecipe = (food) => {
    setList([...list, food]);
  };

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

              for (art of list) {
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
                      addArtsToRecipe(article);
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
              addArtsToRecipe({
                id: Date.now(),
                in: false,
                name: search,
                type: "random",
              });

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
