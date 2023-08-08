import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: (selectedJob, item) => ({
    width: 250,
    padding: SIZES.xLarge,
    backgroundColor: selectedJob === item.job_id ? COLORS.primary : "#FFF",
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  }),
  headerTitle: {
    fontSize: 20,
    fontFamily: FONT.bold,
    color: COLORS.primary,
    margin: 10,
  },
  logoContainer: (elem) => ({
    width: 90,
    height: 90,
    padding: 5,
    borderWidth: 3,
    borderColor: "white",
    backgroundColor:
      elem?.type === "fruits"
        ? "#F9F795"
        : elem?.type === "hort"
        ? "#CE915B"
        : elem?.type === "bread"
        ? "#C89F92"
        : elem?.type === "Guisos"
        ? "yellow"
        : elem?.in === false ? "white" : "green" ,
    borderRadius: SIZES.medium,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2
  }),
  logoImage: {
    width: "70%",
    height: "70%",
  },
  companyName: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
    marginTop: SIZES.small / 1.5,
  },
  infoContainer: {
    marginTop: SIZES.large,
  },
  jobName: (selectedJob, item) => ({
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: selectedJob === item.job_id ? COLORS.white : COLORS.primary,
  }),
  infoWrapper: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  publisher: (selectedJob, item) => ({
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: selectedJob === item.job_id ? COLORS.white : COLORS.primary,
  }),
  location: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
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

});

export default styles;
