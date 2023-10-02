import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { awards } from "./awardData";
import { styles } from "./awardStyles";

// const awards = [
//   { icon: "Icon1", num: "1234", name: "Award 1" },
//   { icon: "Icon2", num: "5678", name: "Award 2" },
//   // Add more awards as needed
// ];

const Awards = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headingText}>Our Awards</Text>
        <Text style={styles.headingSubtitle}>
          Over 1,24,000+ Happy User Being With Us Still They Love Our Services
        </Text>
      </View>

      <View style={styles.awardContent}>
        {awards.map(({ icon, num, name }, i) => (
          <View style={styles.box} key={i}>
            <View style={styles.iconDiv}>
              <Text>{icon}</Text>
            </View>
            <Text style={styles.number}>{num}</Text>
            <Text style={styles.awardName}>{name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Awards;
