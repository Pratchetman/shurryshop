import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import useFetch from "../../hook/fetchData";
import styles from "./allArts.style";
export const AllArts = ({ list, aux, setAux, search, setSearch, recipe }) => {
  const {
    allArticles,
    fetchAllArticles,
    addArticlesToList,
    fetchAllArticlesWithRandom,
  } = useFetch();
  let lista = Object.values(list[2]);

  useEffect(() => {
    let random = false;
    if (recipe?.food) {
      for (let food of recipe.food) {
        if (food.type == "random") {
          random = true;
          
        }
      }
    }
    random ? fetchAllArticlesWithRandom(recipe) : fetchAllArticles();
  }, [aux]);

  return (
    <>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 5, justifyContent: "center" }}>
        {allArticles &&
          recipe &&
          allArticles
            .filter((elem) => {
              let res = false;
              if (search !== "" && !elem.name.includes(search)) {
                res = false;
              } else if (recipe.food?.length > 0) {
                let auxlist = [];
                for (const art of recipe.food) {
                  if (elem.id === art.id) {
                    auxlist.push(elem);
                    res = true;
                  }
                }

                for (const arti of auxlist) {
                  for (const article of lista) {
                    if (article.id === arti.id) {
                      res = false;
                    }
                  }
                }
              } else {
                res = true;
                for (const art of lista) {
                  if (art.id === elem.id) {
                    res = false;
                  }
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
                      addArticlesToList(list, article, recipe);
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
