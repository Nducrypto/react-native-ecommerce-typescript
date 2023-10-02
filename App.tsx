import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AppRegistry } from "react-native";
import { RecoilRoot } from "recoil";
import {
  Home,
  ProductDetail,
  CartPage,
  Account,
  SignUp,
  LogIn,
  Order,
  CustomToast,
  AddProduct,
  ContactUs,
  CustomerCare,
  Navbar,
} from "./components/index";
import { useAuthentication } from "./components/actions/usersAction";

const Stack = createStackNavigator();
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};
export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            animationEnabled: true,

            headerRight: () => <Navbar item="cart" />,
          }}
        >
          <Stack.Screen
            name="Home"
            options={{
              title: "",
              headerShadowVisible: false,
              headerLeft: () => <Navbar item="profile" />,
            }}
            component={Home}
          />
          <Stack.Screen name="ProductDetail" component={ProductDetail} />
          <Stack.Screen name="CustomerCare" component={CustomerCare} />
          <Stack.Screen name="AddProduct" component={AddProduct} />
          <Stack.Screen name="CartPage" component={CartPage} />
          <Stack.Screen name="Order" component={Order} />
          <Stack.Screen name="Account" component={Account} />
          <Stack.Screen name="ContactUs" component={ContactUs} />
          <Stack.Screen name="Login" component={LogIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      </NavigationContainer>
      <CustomToast />
    </RecoilRoot>
  );
}

AppRegistry.registerComponent("ecomobtype", () => App);
