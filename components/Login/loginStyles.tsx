import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  signupContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  signupForm: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  heading: {
    marginBottom: 20,
    color: "#333",
    fontSize: 24,
  },
  input: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  button: {
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
  },
  link: {
    color: "blue",
  },
});
