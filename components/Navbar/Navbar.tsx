import { View } from "react-native";
import { useEffect } from "react";
import CartIcon from "../CartPage/CartIcon";
import ProfileIcon from "../Account/ProfileIcon";
import { useNavigation } from "@react-navigation/native";
import { useUserState } from "../recoilState/userState";
import { useAuthentication } from "../actions/usersAction";

const Navbar = ({ item }: { item: string }) => {
  useAuthentication();
  const navigation = useNavigation();
  const { setUser, currentUser, isUserLoading } = useUserState();
  const validRouteNames = ["ProductDetail", "CartPage", "Home"];
  useEffect(() => {
    if (!currentUser?.email && !isUserLoading) {
      const unsubscribe = navigation.addListener("state", (event) => {
        const currentState = event.data.state;

        const getCurrentScreen = event.data.state.routes[currentState.index];

        if (getCurrentScreen) {
          const screenName = getCurrentScreen.name;

          if (validRouteNames.includes(screenName)) {
            setUser((prev) => ({
              ...prev,
              previousRoute: screenName,
            }));
          }
        }
      });

      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, [navigation, setUser, currentUser, isUserLoading]);

  type IconComponents = {
    [key: string]: JSX.Element;
  };

  const iconComponents: IconComponents = {
    cart: <CartIcon />,
    profile: <ProfileIcon />,
  };

  return <View>{iconComponents[item]}</View>;
};

export default Navbar;
