import { useState } from "react";
import { View, Text, Image } from "react-native";
import { images } from "./heroData";
import { styles } from "./herostyles";

const HeroSection = () => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const currentReview = images[currentReviewIndex];

  return (
    <View style={styles.heroSection}>
      <View>
        <Text style={styles.heroHeaderOne}>Step into the Future:</Text>
        <Text style={styles.heroHeaderTwo}>
          Discover the Latest Tech Marvels ShopAllx! 📱🔥
        </Text>
        <Text style={styles.heroWriteUp}>
          Explore a Universe of Cutting-Edge Phones and Gadgets.
        </Text>
      </View>
      <View style={styles.heroImageContainer}>
        <Image
          style={styles.heroImage}
          source={{ uri: currentReview }}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

export default HeroSection;
