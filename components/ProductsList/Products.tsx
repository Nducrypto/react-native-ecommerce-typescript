import { Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  ProductInterface,
  productState,
  updateCurrentId,
} from "../recoilState/productState";
import { useNavigation } from "@react-navigation/native";
import { useSetRecoilState } from "recoil";
import { removeProduct } from "../actions/productActions";
import { useSnackBarState } from "../recoilState/snacbarState";

const Products = ({ product }: { product: ProductInterface }) => {
  const setProduct = useSetRecoilState(productState);
  const { setSnackBar } = useSnackBarState();

  const { navigate }: { navigate: any } = useNavigation();
  const currentUser = { role: "Admin" };

  const proceedToProductDetail = () => {
    navigate("ProductDetail", {
      ...product,
    });
  };

  function handleUpdateCurrentId(productId: string) {
    updateCurrentId(setProduct, productId);
    navigate("AddProduct");
  }

  function handleDeleteProduct(productId: string) {
    removeProduct(productId, setProduct, setSnackBar);
  }

  return (
    <View style={styles.cardContainer}>
      {currentUser?.role === "Admin" && (
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <TouchableOpacity
            onPress={() => handleDeleteProduct(product.productId)}
          >
            <Icon name="trash" size={15} color="red" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleUpdateCurrentId(product.productId)}
          >
            <Icon name="edit" size={15} color="red" />
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity
        style={styles.cardContent}
        onPress={proceedToProductDetail}
      >
        <View>
          <Text style={styles.brandText} numberOfLines={1}>
            {product?.brand}
          </Text>
        </View>

        <Image
          source={{ uri: product?.image[0] }}
          style={styles.productImage}
        />

        <Text style={styles.modelText}>{product?.model?.slice(0, 17)}</Text>
        <Text style={styles.priceText}>${product?.price}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
  },
  cardContent: {
    margin: 7,
    alignItems: "center",
  },
  brandText: {
    fontSize: 14,
    alignItems: "center",
  },
  modelText: {
    fontSize: 14,
    color: "#555",
    overflow: "hidden",
  },
  productImage: {
    width: 100,
    height: 100,
  },
  priceText: {
    fontSize: 13,
    marginTop: 4,
  },
});

export default Products;
