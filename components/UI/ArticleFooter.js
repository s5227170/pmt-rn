import React from "react";
import { View, StyleSheet } from "react-native";
import { SocialIcon } from "react-native-elements";
import { SearchBar } from "react-native-elements";

import Colors from "../../constants/Colors";

const ArticleViewFooter = (props) => {
  return (
    <View>
      <View style={styles.social}>
        <SocialIcon iconStyle={styles.icon} raised type="facebook" />
        <SocialIcon iconStyle={styles.icon} raised type="twitter" />
        <SocialIcon iconStyle={styles.icon} raised type="instagram" />
        <SocialIcon iconStyle={styles.icon} raised type="youtube" />
        <SocialIcon iconStyle={styles.icon} raised type="snapchat" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  social: {
    flex: 1,
    width: "100%",
    height: 80,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#8aa193",
    borderTopWidth: 2,
    marginTop: 20
  },
  search: {
      borderTopWidth: 2,
      borderBottomWidth: 2,
      borderColor: '#404040',
      paddingVertical: 15,
      backgroundColor: "#8aa193",
      marginVertical: 50,
  },
  icon: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,

    elevation: 3,
    color: "white",
  },
});

export default ArticleViewFooter;
