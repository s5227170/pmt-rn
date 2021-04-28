import React from "react";
import { View, ScrollView, Image, Text, StyleSheet } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";

const SectionView = (props) => {

  return (
    <View style={styles.screen}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <View style={styles.imgContainer}>
        <Image style={styles.img} source={{ uri: props.img }} />
      </View>
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.content}>{props.content}</Text>
      </ScrollView>
    </View>
  );
};

export default SectionView;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#aba9a9",
    borderWidth: 1,
    width: "100%",
    marginTop: 20,
    borderRadius: 4,
  },
  titleContainer: {
    height: 60,
    width: "100%",
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderWidth: 1
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    alignSelf: "center",
  },
  imgContainer: {
    width: "100%",
    height: "30%",
    borderWidth: 1,
  },
  img: {
      width: '100%',
      height: '100%',
  },
  contentContainer: {
      height: 500,
      width: '100%',
      paddingVertical: 10,
      paddingHorizontal: 15,
  },
  content: {
      height: '100%',
      width: '100%',
      textAlign: 'justify'
  },
});
