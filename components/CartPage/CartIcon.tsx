import { TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Icon from "react-native-vector-icons/FontAwesome";
import { Badge } from "react-native-elements";
import { useCartState } from "../recoilState/cartState";

const CartIcon = () => {
  const navigation: { navigate: any } = useNavigation();
  const { cartItems } = useCartState();
  const handleNavigate = () => {
    navigation.navigate("CartPage");
  };

  return (
    <TouchableOpacity onPress={handleNavigate} style={{ marginRight: 20 }}>
      <Badge
        value={cartItems.length}
        status="success"
        containerStyle={{ position: "relative", top: 13, right: -30 }}
      />
      <View>
        <Icon
          name="shopping-cart"
          style={{ marginLeft: 20 }}
          size={25}
          color="red"
        />
      </View>
    </TouchableOpacity>
  );
};

export default CartIcon;
