import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child, remove } from "firebase/database";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "expo-router";
import axios from "axios"; 
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAsnsbXe5ndPLVnBKLxH5yPO-C77ag4LH4",
  authDomain: "shurryshop.firebaseapp.com",
  databaseURL:
    "https://shurryshop-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "shurryshop",
  storageBucket: "shurryshop.appspot.com",
  messagingSenderId: "657617291625",
  appId: "1:657617291625:web:d414aaae4d78fc763a55f8",
};

const app = initializeApp(firebaseConfig);

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [logged, setLogged] = useState(false);
  const [cartList, setCartList] = useState();
  const [oneCart, setOneCart] = useState();
  const [allArticles, setAllArticles] = useState();
  const [priceList, setPriceList] = useState();
  const [recipes, setRecipes] = useState([]);

  const router = useRouter();

  const storeData = async (dataSt) => {
    try {
      await AsyncStorage.setItem("shurry-data", dataSt);
    } catch (e) {
      console.log(e);
    }
  };

  const removeData = async (dataSt) => {
    try {
      await AsyncStorage.removeItem("shurry-data");
    } catch (e) {
      console.log(e);
    }
  };

  const userLogin = (dataUser) => {
    setLogged(false);
    setIsLoading(true);

    const auth = getAuth();

    signInWithEmailAndPassword(auth, dataUser.mail, dataUser.password)
      .then((userCredential) => {
        const uid = userCredential.user.uid;

        setLogged(true);
        setIsLoading(false);
        router.push(`/home2/${uid}+${userCredential.user.email}`);
        const dataSt = uid.concat("+").concat(userCredential.user.email);
        console.log(dataSt);
        storeData(dataSt);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        setIsLoading(false);
        setError("Error en los datos introducidos");
      });
  };

  const userLogOut = () => {
    setLogged(false);
    removeData();
    router.push("/");
 
  };

  const addUser = (dataNewUser) => {
    setIsLoading(true);
    setLogged(false);
    console.log("estoy añadiendo este usuario", dataNewUser);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, dataNewUser.email, dataNewUser.pass)
      .then((userCredential) => {
        let dbs = getDatabase();
        
        setIsLoading(false);

        const uid = userCredential.user.uid;
        const user = userCredential.user;

        set(ref(dbs, `users/${uid}`), { id: uid, mail: dataNewUser.email });
        setLogged(true);
        router.push(`/home2/${uid}+${userCredential.user.email}`);
        const dataSt = uid.concat("+").concat(userCredential.user.email);
        storeData(dataSt);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.message);
      });
  };

  const shoppingCarts = (id) => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${id}/carts`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setCartList(
            Object.values(snapshot.val()).sort(
              (a, b) => b.id.split("_")[1] - a.id.split("_")[1]
            )
          );
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const cartDetail = (cartId) => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `carts/${cartId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setOneCart(Object.values(snapshot.val()));
        } else {
          console.log("No data available en una lista");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchAllArticles = () => {
    const dbRef = ref(getDatabase());

    get(child(dbRef, `food/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setAllArticles(Object.values(snapshot.val()));
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchAllArticlesWithRandom = (recipe) => {
    const dbRef = ref(getDatabase());

    get(child(dbRef, `food/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let auxArticles = Object.values(snapshot.val()).concat(
            recipe.food.filter((elem) => elem.type == "random")
          );

          setAllArticles(auxArticles);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addArticlesToList = (list, food, recipe) => {
    let dbs = getDatabase();
    console.log("receta en el fetch", recipe.name);
    set(ref(dbs, `carts/${list[1]}/lista/${food.id}`), food);
    if (recipe.name) {
      set(ref(dbs, `carts/${list[1]}/recipes/${recipe.name}`), recipe.name);
    }
  };

  const articleIn = (listId, article) => {
    let dbs = getDatabase();
    set(ref(dbs, `carts/${listId}/lista/${article.id}`), article);
    cartDetail(listId);
  };

  const addNewCart = (userId, name, user) => {
    let cartId = userId + "_" + Date.now();
    let newCart = {
      finished: false,
      id: cartId,
      lista: [""],
      name: name,
      recipes: [""],
      shared: [user],
    };
    let dbs = getDatabase();
    set(ref(dbs, `carts/${cartId}`), newCart);
    set(ref(dbs, `users/${userId}/carts/${cartId}`), { id: newCart.id });
  };

  const addPriceToArticle = (cartId, art, price) => {
    let dbs = getDatabase();
    set(ref(dbs, `carts/${cartId}/lista/${art.id}`), { ...art, price: price });
  };

  const getPricesList = (userId, foodId) => {
    setIsLoading(true);
    const dbRef = ref(getDatabase());
    const historic = [];
    get(child(dbRef, `users/${userId}/carts`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let lista = Object.values(snapshot.val());
          console.log("lista para ver precios", lista);
          const promises = lista.map((item) =>
            get(child(dbRef, `carts/${item.id}`)).then((snapshot) => {
              const artList = Object.values(snapshot.val().lista);
              const price = artList.find(
                (art) => art.id === foodId && art.price
              );
              if (price) {
                const newPrice = {
                  price: price.price,
                  date: new Date(
                    parseInt(item.id.split("_")[1])
                  ).toLocaleDateString(),
                };
                historic.push(newPrice);
              }
            })
          );
          Promise.all(promises).then(() => {
            setIsLoading(false);
            setPriceList(
              historic.sort((a, b) => {
                const dateA = new Date(a.date.split("/").reverse().join("-"));
                const dateB = new Date(b.date.split("/").reverse().join("-"));
                return dateB - dateA;
              })
            );
          });
        } else {
          console.log("No data available");
          setPriceList([]);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  const completePurchase = (cartId, params) => {
    const dbs = getDatabase();

    let promise1 = new Promise((resolve, reject) => {
      set(ref(dbs, `carts/${cartId}/finished`), true)
        .then(() => resolve())
        .catch((error) => reject(error));
    });

    promise1
      .then(() => {
        router.push(`/home2/${params.split("_")[0]}+${params.split("+")[1]} `);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const checkUser = async (user) => {
    try {
      const dbRef = ref(getDatabase());
      const snapshot = await get(child(dbRef, `users/`));

      if (snapshot.exists()) {
        const usersList = Object.entries(snapshot.val());
        for (let i = 0; i < usersList.length; i++) {
          if (user == usersList[i][1].mail) {
            return true;
          }
        }
      } else {
        console.log("No data available");
      }
     
      return false;
    } catch (error) {
      console.error(error);
      
      return false;
      
    }
  };

  const toShareCart = (list, shareList) => {
    const newCart = {
      finished: false,
      id: list[1],
      lista: list[2],
      name: list[3],
      recipes: list[4],
      shared: list[5],
    };

    for (let newEmail of shareList) {
      newCart.shared.push(newEmail);
    }

    const dbs = getDatabase();
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const usersList = Object.entries(snapshot.val());

          for (let i = 0; i < shareList.length; i++) {
            let res = false;
            let userId;
            for (let j = 0; j < usersList.length; j++) {
              if (shareList[i] == usersList[j][1].mail) {
                res = true;
                userId = usersList[j][1].id;
              }
            }
            if (res) {
              set(ref(dbs, `carts/${list[1]}`), newCart);
              set(ref(dbs, `users/${userId}/carts/${list[1]}`), {
                id: list[1],
              });
              
            } else {
              console.log(shareList[i], "NO existe en db");
            }
          }
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getRecipes = (userId) => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}/recipes`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setRecipes(
            Object.values(snapshot.val()).sort(
              (a, b) => b.id.split("_")[1] - a.id.split("_")[1]
            )
          );
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addRecipe = (userId, recipe, foodList) => {
    let dbs = getDatabase();
    set(ref(dbs, `users/${userId}/recipes/${recipe.id}`), {
      ...recipe,
      food: foodList,
    });
  };

  const sendMail = (mails) => {
    const data = [mails];
    axios
    .post("https://shurryback-0b6g-dev.fl0.io/mailer", data)
    .then((res)=>console.log(res.data.message))
    .catch((error)=>console.log(error));

  }

  return {
    isLoading,
    error,
    userLogin,
    logged,
    shoppingCarts,
    cartList,
    cartDetail,
    oneCart,
    allArticles,
    fetchAllArticles,
    addArticlesToList,
    articleIn,
    addNewCart,
    addPriceToArticle,
    setAllArticles,
    getPricesList,
    priceList,
    completePurchase,
    toShareCart,
    checkUser,
    recipes,
    getRecipes,
    addRecipe,
    fetchAllArticlesWithRandom,
    addUser,
    sendMail,
    userLogOut
  };
};

export default useFetch;
