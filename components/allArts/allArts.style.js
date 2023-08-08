import { StyleSheet } from "react-native";

import { FONT, SIZES, COLORS } from "../../constants";

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xLarge,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: FONT.bold,
    color: COLORS.primary,
  },
  headerBtn: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.gray,
  },
  cardsContainer: {
    marginTop: SIZES.medium,
  },
  searchInput: {
    fontFamily: FONT.regular,
    width: "90%",
    height: 40,
    paddingHorizontal: SIZES.medium,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 16,
    margin: 10,
  },
  logoContainer: (type) => ({
    width: 82,
    height: 82,
    padding: 5,
    borderWidth: 3,
    borderColor: "white",
    backgroundColor:
      type === "fruits"
        ? "#F9F795"
        : type === "hort"
        ? "#CE915B"
        : type === "bread"
        ? "#C89F92"
        : type === "Guisos"
        ? "yellow"
        : "white",
    borderRadius: SIZES.medium,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: 3,
    elevation: 2
  }),
  userName: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.secondary,
    margin: 20,
  },
  welcomeMessage: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginTop: 2,
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.large,
    marginBottom: SIZES.small,
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
  },
 
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtnImage: {
    width: "50%",
    height: "50%",
    tintColor: COLORS.white,
  },
  tabsContainer: {
    width: "100%",
    marginTop: SIZES.medium,
  },
  applyBtn: {
    width: 150,
    backgroundColor: "white",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: SIZES.medium,
    borderRadius: SIZES.medium,
    marginTop: 20,
  },
  applyBtnText: {
    fontSize: SIZES.medium,
    color: COLORS.secondary,
    fontFamily: FONT.bold,
  },
  

});

export default styles;