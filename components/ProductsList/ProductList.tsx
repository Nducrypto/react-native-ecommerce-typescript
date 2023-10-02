import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";

import Products from "./Products";
import { useProductState } from "../recoilState/productState";
import { useState } from "react";
import UniqueBrand from "../ProductDetail/UniqueBrand";
const ProductList = () => {
  const [selectedBrand, setSelectedBrand] = useState<number | string>("All");
  const { allProducts, isProductLoading } = useProductState();

  function filterProductsByBrand() {
    if (allProducts.length === 0) {
      return [];
    }
    return selectedBrand === "All"
      ? allProducts
      : allProducts.filter(({ brand }) => brand === selectedBrand);
  }
  const filteredProducts = filterProductsByBrand();

  if (isProductLoading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const columns = 2;
  const screenWidth = Dimensions.get("window").width;
  const itemWidth = (screenWidth - 32) / columns;

  return (
    <SafeAreaView>
      <UniqueBrand
        setSelectedBrand={setSelectedBrand}
        selectedBrand={selectedBrand}
      />

      <FlatList
        data={filteredProducts}
        key={`FlatList-${columns}`}
        numColumns={columns}
        renderItem={({ item }) => {
          return (
            <View
              style={[
                styles.itemContainer,
                {
                  width: itemWidth,
                  margin: 7,
                },
              ]}
            >
              <Products product={item} />
            </View>
          );
        }}
        keyExtractor={(item) => item.productId}
      />
    </SafeAreaView>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F5F5F5",
    margin: 30,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },

  itemContainer: {
    marginBottom: 8,
  },
});
