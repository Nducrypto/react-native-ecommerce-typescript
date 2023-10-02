import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";

import { styles } from "./footerStyles";
import Icon from "react-native-vector-icons/FontAwesome";

const Footer = () => {
  const links = [
    {
      id: 1,
      color: "blue",
      icon: <Icon name="facebook" size={30} color="white" />,
      link: "https://facebook.com/AgboNduu",
    },
    {
      id: 2,
      color: "red",
      icon: <Icon name="instagram" size={30} color="white" />,
      link: "https://instagram.com/AgboNduu",
    },
    {
      id: 3,
      color: "blue",
      icon: <Icon name="twitter" size={30} color="white" />,
      link: "https://twitter.com/agbozion",
    },
    {
      id: 4,
      color: "green",
      icon: <Icon name="telegram" size={30} color="white" />,
      link: "https://telegram.me/Nducrypto",
    },
  ];

  const handleLinkPress = (link) => {
    Linking.openURL(link);
  };

  return (
    <View style={styles.footerContainer}>
      <View style={styles.center}>
        <Text style={styles.footerTitle}>Links</Text>
        <View style={styles.footerSocialContainer}>
          {links.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.footerSocialIcon, { backgroundColor: item.color }]}
              onPress={() => handleLinkPress(item.link)}
            >
              {item.icon}
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.mabench}>
        <Text>ShopAllx</Text>
        <Text style={styles.desc}>We deal in a variety of products</Text>
      </View>
      <View style={styles.contactCustomerCare}>
        <Text style={styles.contactTitle}>Contact</Text>
        <View style={styles.contactItem}>
          <Icon
            name="phone"
            style={{ marginRight: 10 }}
            size={20}
            color="white"
          />
          <Text style={styles.contactWritUp}>+234 8064534676</Text>
        </View>
        <View style={styles.contactItem}>
          <Icon
            name="envelope"
            style={{ marginRight: 10 }}
            size={20}
            color="white"
          />

          <Text style={styles.contactWritUp}>ndubinho9@gmail.com</Text>
        </View>
        <View style={styles.contactItem}>
          <Icon
            name="map-marker"
            style={{ marginRight: 10 }}
            size={20}
            color="white"
          />

          <Text style={styles.contactWritUp}>
            62 Dallas Street, Portharcourt 54654
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Footer;
