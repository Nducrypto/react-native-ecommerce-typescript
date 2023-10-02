import { ScrollView, StatusBar } from "react-native";
import ProductList from "../ProductsList/ProductList";
import HeroSection from "../HeroSection/Herosection";
import Awards from "../Awards/Awards";
import Footer from "../Footer/Footer";
import Promotions from "../Promotion/Promotion";
import { fetchAllProducts } from "../actions/productActions";

const Home = () => {
  fetchAllProducts();
  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <StatusBar animated={true} backgroundColor="black" />
      <HeroSection />
      <ProductList />
      <Promotions />
      <Awards />
      <Footer />
    </ScrollView>
  );
};

export default Home;
