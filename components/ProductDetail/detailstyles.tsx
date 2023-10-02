import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  productdetail: {
    padding: 20,
  },

  productimage: {
    width: 300,
    height: 300,
  },

  bottomimagescontainer: {
    flexDirection: "row",
    gap: 10,
  },

  productinfo: {
    flex: 1,
  },

  productmodel: {
    fontSize: 17,
    marginBottom: 10,
  },

  productbrand: {
    fontSize: 17,
    color: "blue",
  },
  productPrice: {
    textAlign: "center",
    marginTop: 15,
    fontSize: 20,
  },
  priceaddtocartcontainer: {
    flexDirection: "row",
    gap: 9,
  },

  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 19,
    marginTop: 12,
  },

  quantity: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productdetailcontainer: {
    marginTop: 60,
  },

  relatedproducts: {
    marginTop: 30,
  },
  isInCartQuantity: {
    marginHorizontal: 30,
    marginTop: 13,
  },

  addtocartbtn: {
    // padding: "10 20",
    backgroundColor: "teal",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: 20,
    marginHorizontal: 50,
  },
  addtocartText: {
    fontSize: 10,
    padding: 10,
    color: "white",
    textAlign: "center",
    borderRadius: 10,
  },
});

export { styles };
