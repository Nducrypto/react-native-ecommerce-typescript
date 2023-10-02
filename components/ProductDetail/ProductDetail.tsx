import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { addProductToCart } from "../actions/cartAction";
import { styles } from "./detailstyles";

import CustomButton from "../CartPage/CustomButton";
import { ProductInterface } from "../recoilState/productState";
import { useCartState } from "../recoilState/cartState";
import { useSnackBarState } from "../recoilState/snacbarState";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { params } = useRoute();
  const { cartItems, setCart } = useCartState();
  const { setSnackBar } = useSnackBarState();
  const foundProduct = params as ProductInterface;

  function handleAddToCart() {
    let totalPrice = foundProduct?.price * quantity;
    const data = {
      ...foundProduct,
      quantity: quantity,
      totalPrice: totalPrice,
      discountedPrice: null,
      likes: null,
      date: new Date().toString(),
    };
    addProductToCart(data, setCart, setSnackBar);
  }

  function isItemInCart() {
    const foundItem = cartItems.find(
      (data) => data.productId === foundProduct?.productId
    );

    return foundItem;
  }
  function handleQuantity(type: string) {
    if (type === "inc") {
      setQuantity(quantity + 1);
    } else if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    }
  }
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;

    if (foundProduct) {
      const imageCount = foundProduct?.image?.length || 1;
      const intervalTime = 3500;

      function run() {
        setCurrentIndex((prev) => (prev + 1) % imageCount);
      }

      const startTimer = () => {
        timeoutId = setTimeout(() => {
          run();
          startTimer();
        }, intervalTime);
      };

      startTimer();
    }

    return () => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [foundProduct]);

  const itemInCart = isItemInCart();

  return (
    <ScrollView style={styles.productdetail}>
      <View>
        {/* <View style={styles.productimagecontainer}> */}
        <Image
          style={styles.productimage}
          source={{ uri: foundProduct?.image[currentIndex] }}
        />
        <View style={styles.bottomimagescontainer}>
          {foundProduct?.image.map((img, index) => (
            <Image
              key={index}
              source={{ uri: img }}
              style={{
                borderColor: currentIndex === index ? "red" : "transparent",
                borderWidth: currentIndex === index ? 2 : 0,
                height: 60,
                width: 60,
              }}
            />
          ))}
        </View>
      </View>

      <View style={styles.productinfo}>
        <Text style={styles.productmodel}>{foundProduct?.model}</Text>
        <Text style={styles.productbrand}>Brand: {foundProduct?.brand}</Text>
        <Text style={styles.productPrice}>
          &#8358; {Intl.NumberFormat().format(foundProduct?.price)}
        </Text>
        <View style={styles.priceaddtocartcontainer}>
          <View>
            {itemInCart ? (
              <View style={{ flexDirection: "row", marginTop: 19 }}>
                <CustomButton item={itemInCart} />
                <Text style={styles.isInCartQuantity}>
                  ({`${itemInCart?.quantity} item(s) added`})
                </Text>
              </View>
            ) : (
              <View>
                <View style={styles.quantityContainer}>
                  <Pressable onPress={() => handleQuantity("dec")}>
                    {({ pressed }) => (
                      <Text
                        style={{
                          fontSize: 10,
                          padding: 10,
                          backgroundColor: pressed ? "red" : "blue",
                          color: "white",
                          textAlign: "center",
                          borderRadius: 10,
                        }}
                      >
                        reduce
                      </Text>
                    )}
                  </Pressable>
                  <View>
                    <Text style={styles.quantity}>{quantity}</Text>
                  </View>

                  <Pressable onPress={() => handleQuantity("inc")}>
                    {({ pressed }) => (
                      <Text
                        style={{
                          fontSize: 10,
                          padding: 10,
                          backgroundColor: pressed ? "grey" : "orangered",
                          color: "white",
                          textAlign: "center",
                          borderRadius: 10,
                        }}
                      >
                        increase
                      </Text>
                    )}
                  </Pressable>

                  <TouchableOpacity
                    style={styles.addtocartbtn}
                    onPress={handleAddToCart}
                  >
                    <Text style={styles.addtocartText}>Add to cart</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
      <Text style={styles.productdetailcontainer}>Product Detail</Text>
      <View style={styles.relatedproducts}>
        <Text>{foundProduct?.productDetail}</Text>
      </View>
    </ScrollView>
  );
};

export default ProductDetail;
