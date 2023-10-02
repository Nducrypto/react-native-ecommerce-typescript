import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  cartContainer: {
    padding: 5,
  },
  clearCartButton: {
    padding: 5,

    borderRadius: 5,
  },
  clearCartText: {
    fontSize: 13,
    padding: 5,
    backgroundColor: "red",
    color: "white",
  },
  subTotalText: {
    textAlign: "center",
    fontSize: 17,
  },
  emptyCartText: {
    textAlign: "center",
    fontSize: 24,
  },
  productContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  productImage: {
    width: 80,
    height: 80,
  },
  productModel: {
    fontSize: 13,
  },
  productBrand: {
    fontSize: 16,
  },
  productPrice: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  removeButton: {
    padding: 5,
  },
  trashButton: {
    marginHorizontal: 69,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 3,
    backgroundColor: "orangered",
  },
  checkoutButton: {
    backgroundColor: "orangered",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  checkoutText: {
    color: "white",
    fontSize: 18,
  },
  contactButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  contactText: {
    color: "white",
    fontSize: 24,
  },

  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 17,
    marginTop: 12,
  },
  checkout: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black",
    marginHorizontal: 8,
    backgroundColor: "yellow",
  },
  productQuantity: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export { styles };
