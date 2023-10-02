import { CartState, CartItem } from "../recoilState/cartState";
import { snackBarFailure, snackBarSuccess } from "../recoilState/snacbarState";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const addProductToCart = async (
  newProduct: any,
  setCart: any,
  setSnackBar: any
) => {
  const { productId } = newProduct;

  try {
    setCart((prev: CartState) => {
      const newState = { ...prev };
      newState.itemsInCart = { ...newState.itemsInCart };
      newState.itemsInCart[productId] = { ...newProduct };
      newState.subTotal += newState.itemsInCart[productId].totalPrice;
      updateStateInStorage(newState);

      return newState;
    });
    snackBarSuccess("Product added successfully", "success", setSnackBar);
  } catch (error) {
    snackBarFailure("Failed to add product to cart", "error", setSnackBar);
  }
};

export const incrementQuantityInDatabase = async (
  product: CartItem,
  setCart: any,
  setSnackBar: any
) => {
  const { productId } = product;
  try {
    setCart((prev: CartState) => {
      const newState = { ...prev };
      newState.itemsInCart = {
        ...newState.itemsInCart,
        [productId]: {
          ...newState.itemsInCart[productId],
          totalPrice:
            newState.itemsInCart[productId].totalPrice + product.price,
          quantity: newState.itemsInCart[productId].quantity + 1,
        },
      };

      newState.subTotal += product.price;
      updateStateInStorage(newState);

      return newState;
    });
    snackBarSuccess("Product added successfully", "success", setSnackBar);
  } catch (error) {
    snackBarFailure("Failed to add product to cart", "error", setSnackBar);
  }
};

export const decrementQuantityInDatabase = async (
  product: CartItem,
  setCart: any,
  setSnackBar: any
) => {
  const { productId } = product;

  try {
    setCart((prev: CartState) => {
      const newState = { ...prev };
      newState.itemsInCart = {
        ...newState.itemsInCart,
        [productId]: {
          ...newState.itemsInCart[productId],
          totalPrice:
            newState.itemsInCart[productId].totalPrice - product.price,
          quantity: newState.itemsInCart[productId].quantity - 1,
        },
      };
      newState.subTotal -= product.price;
      updateStateInStorage(newState);

      return newState;
    });
    snackBarSuccess("Item quantity has been updated", "success", setSnackBar);
  } catch (error) {
    snackBarFailure("Failed to update Item quantity", "error", setSnackBar);
  }
};

export const removeCartItem = async (
  product: CartItem,
  setCart: any,
  setSnackBar: any
) => {
  try {
    const { productId } = product;

    setCart((prev: CartState) => {
      const newState = { ...prev };
      newState.itemsInCart = { ...newState.itemsInCart };
      newState.subTotal -= newState.itemsInCart[productId].totalPrice;
      delete newState.itemsInCart[productId];

      updateStateInStorage(newState);

      return newState;
    });
    snackBarSuccess("Product was removed from cart", "success", setSnackBar);
  } catch (error) {
    snackBarFailure("failed to removeProduct from cart", "error", setSnackBar);
  }
};

export async function clearCartInDatabase(setCart: any, setSnackBar: any) {
  try {
    setCart((prev: CartState) => ({
      ...prev,
      itemsInCart: {},
      subTotal: 0,
    }));
    clearCartFromStorage();
    snackBarSuccess("Cart cleared successfully", "success", setSnackBar);
  } catch (error) {
    snackBarFailure("Oops: failed to clear cart", "error", setSnackBar);
  }
}

async function updateStateInStorage(newState: CartState) {
  try {
    const newStateJSON = JSON.stringify(newState);
    AsyncStorage.setItem("cartKey", newStateJSON);
    console.log("updated in storage");
  } catch (error) {
    console.log("failed to update in storage");
  }
}

async function clearCartFromStorage() {
  try {
    await AsyncStorage.removeItem("cartKey");
    console.log("Cart data cleared from AsyncStorage");
  } catch (error) {
    console.error("Error clearing cart data from AsyncStorage:", error);
  }
}
