import { StyleSheet } from "react-native";

import { FONT, SIZES, COLORS } from "../constants";

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
    fontSize: SIZES.xxLarge,
    // fontFamily: FONT.medium,
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
    // fontFamily: FONT.regular,
    width: "90%",
    height: 40,
    paddingHorizontal: SIZES.medium,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 16,
    margin: 10,
  }
});

export default styles;