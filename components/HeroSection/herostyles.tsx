import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  heroSection: {
    marginTop: 4,
    height: 440,
    padding: 20,
    backgroundColor: "midnightblue",
  },

  heroHeaderOne: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 17,
    textAlign: "center",
    color: "white",
  },
  heroHeaderTwo: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  heroWriteUp: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: "center",
    color: "white",
  },
  heroImageContainer: {
    width: 270,
    height: 180,
    alignSelf: "center",
    marginTop: 30,
  },
  heroImage: {
    flex: 1,
    borderRadius: 20,
  },
});
