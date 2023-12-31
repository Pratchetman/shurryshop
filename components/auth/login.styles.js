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
    fontSize: 45,
    fontFamily: FONT.bold,
    color: COLORS.lightWhite,
  },
  headerTitleLogout: {
    fontSize: 25,
    fontFamily: FONT.bold,
    color: COLORS.secondary,
  },
  headerTitleNew: {
    marginTop: 70,
    fontSize: 45,
    fontFamily: FONT.bold,
    color: "black",
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
  userName: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.lightWhite,
    marginTop: 20,
  },
  userNameNew: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    color: "black",
    marginTop: 35,
  },
  userNameNewLogin: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.lightWhite,
    marginTop: 35,
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
    // marginLeft: SIZES.medium,
    borderRadius: SIZES.medium,
    marginTop: 20,
  },
  applyBtnText: {
    fontSize: SIZES.medium,
    color: COLORS.secondary,
    fontFamily: FONT.bold,
  },
  applyBtnNew: {
    width: 150,
    backgroundColor: "orange",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    // marginLeft: SIZES.medium,
    borderRadius: SIZES.medium,
    marginTop: 20,
  },
  applyBtnTextNew: {
    fontSize: SIZES.medium,
    color: COLORS.secondary,
    fontFamily: FONT.bold,
  },
  applyBtnNew2: {
    width: 150,
    backgroundColor: "rgb(88,192,216)",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    // marginLeft: SIZES.medium,
    borderRadius: SIZES.medium,
    marginTop: 20,
    borderWidth: 2
  },
  

});

export default styles;