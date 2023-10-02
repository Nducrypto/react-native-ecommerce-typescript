import {
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  View,
  ActivityIndicator,
} from "react-native";
import { clearCartInDatabase, removeCartItem } from "../actions/cartAction";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "./CustomButton";
import { styles } from "./cartStyle";
import { useUserState } from "../recoilState/userState";
import { useCartState, CartItem } from "../recoilState/cartState";
import { useSnackBarState } from "../recoilState/snacbarState";
import { createOrder } from "../actions/orderActions";
import { useOrderState } from "../recoilState/orderState";
import { Paystack } from "react-native-paystack-webview";
import { useRef } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { PAYSTACK_TEST_PUBLIC_KEY } from "@env";

export interface Data {
  email: string;
  userId: string;
  items: CartItem[];
  subTotal: number;
  status: string;
  date: string;
}
const CartPage = () => {
  const paystackWebViewRef = useRef<any>();
  const { navigate }: { navigate: any } = useNavigation();
  const { currentUser } = useUserState();
  const { cartItems, subTotal, setCart } = useCartState();
  const { setSnackBar } = useSnackBarState();
  const { setOrders, isOrderLoading } = useOrderState();
  const paystackKey = PAYSTACK_TEST_PUBLIC_KEY;

  async function handlePaymentSuccess(reference: any) {
    const data: Data = {
      email: currentUser?.email || "",
      userId: currentUser?.userId || "",
      items: cartItems,
      subTotal,
      status: "Pending",
      date: new Date().toString(),
    };
    createOrder(data, setOrders, setSnackBar, setCart, navigate);
  }

  function handlePaystackCloseAction() {
    console.log("Failed to pay");
  }

  function handleRemoveItem(product: CartItem) {
    removeCartItem(product, setCart, setSnackBar);
  }
  function checkoutButton() {
    if (isOrderLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View>
        <TouchableOpacity
          onPress={() => paystackWebViewRef?.current?.startTransaction()}
        >
          <Text style={styles.checkout}>{`Checkout (${Intl.NumberFormat(
            "en-NG",
            {
              style: "currency",
              currency: "NGN",
            }
          ).format(subTotal)})`}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.cartContainer}>
          {cartItems.length > 1 && (
            <TouchableOpacity
              style={{ backgroundColor: "white", alignSelf: "flex-end" }}
              onPress={() => clearCartInDatabase(setCart, setSnackBar)}
            >
              <Text style={styles.clearCartText}>Clear</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.subTotalText}>
            SubTotal: &#8358; {subTotal && Intl.NumberFormat().format(subTotal)}
          </Text>

          {!cartItems.length && <Text style={styles.emptyCartText}>Empty</Text>}
          {cartItems.map((item, index) => (
            <View key={item.productId} style={styles.productContainer}>
              <Image
                source={{ uri: item?.image[0] }}
                style={styles.productImage}
              />
              <View>
                <Text style={styles.productModel}>{item?.model}</Text>
                <Text style={styles.productBrand}>Brand: {item?.brand}</Text>
                <Text style={styles.productPrice}>
                  &#8358; {Intl.NumberFormat().format(item?.price)}
                </Text>
                <View style={styles.buttonContainer}>
                  <CustomButton item={item} />
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveItem(item)}
                  >
                    <Icon
                      name="trash"
                      style={styles.trashButton}
                      size={25}
                      color="red"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      {cartItems.length > 0 && (
        <View style={styles.bottomContainer}>
          <Text>Contact </Text>
          {!currentUser?.email ? (
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => navigate("Login")}
            >
              <Text style={styles.checkoutText}>Sign In to Continue</Text>
            </TouchableOpacity>
          ) : (
            <View>
              <Paystack
                paystackKey={paystackKey}
                billingEmail={currentUser?.email}
                amount={subTotal}
                currency="NGN"
                onCancel={handlePaystackCloseAction}
                onSuccess={(res) => handlePaymentSuccess(res)}
                ref={paystackWebViewRef}
              />
              {checkoutButton()}
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default CartPage;
