import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
  container: (finished) => ({
    width: "98%",
    maxHeight: 150,
    margin: 4,
    borderWidth: finished === true ? 0 : 3,
    borderColor: finished === true ? "green" : "white",
    backgroundColor: "green",
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
    overflow: "hidden",
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 10,
    elevation: 2,
  }),
  logoContainer: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainerSh: {
    width: 20,
    height: 20,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginTop: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: "70%",
    height: "70%",
  },
  companyName: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: "white",
    marginTop: 3,
    marginLeft: 3,
  },
  infoContainer: {
    marginTop: SIZES.large,
  },
  jobName: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.primary,
  },
  infoWrapper: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  publisher: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: COLORS.primary,
  },
  location: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
  },
});

export default styles;
