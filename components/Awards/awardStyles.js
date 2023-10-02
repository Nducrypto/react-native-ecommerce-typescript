import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "midnightblue",
    padding: 15,
    height: 350,
  },

  headingText: {
    color: "greenyellow",
    fontSize: 24,
    textAlign: "center",
  },
  headingSubtitle: {
    color: "#fff",
    fontSize: 15,
    marginTop: 10,
    textAlign: "center",
  },
  awardContent: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  box: {
    alignItems: "center",
  },
  iconDiv: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  number: {
    color: "white",
    fontSize: 20,
    marginTop: 40,
  },
  awardName: {
    color: "white",
    fontSize: 13,
    marginTop: 25,
  },
});
