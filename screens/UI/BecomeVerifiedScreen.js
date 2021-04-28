import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Platform,
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { togglePageName } from "../../store/actions/articlesActions";
import HeaderButton from "../../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import ArticleSection from "../../components/UI/ArticleSection";
import { SearchBar, Divider } from "react-native-elements";
import firebase from "../../firebase/firebase";
import uuid from "react-native-uuid";
import { Ionicons } from "@expo/vector-icons";

const BecomeVerified = (props) => {
  const dispatch = useDispatch();

  return articles ? (
    <View style={styles.screen}>

    </View>
  ) : (
    <View style={styles.screen}>
      <ActivityIndicator
        style={{ flex: 1 }}
        animating
        size="large"
        color="black"
      />
    </View>
  );
};

export const screenOptions = (navData) => {
  const { user } = useSelector((state) => state.auth);

  return {
    headerTitle: "Become a verified user",
    headerStyle: {
      backgroundColor: "#18363E",
      borderBottomWidth: 1,
      borderBottomColor: "#ffffff",
    },
    headerTintColor: "#ffffff",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <Item
        title="User"
        iconName={"person-circle-outline"}
        iconSize={38}
        IconComponent={Ionicons}
        color={user ? "#25d94f" : "#e61c1c"}
      />
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default BecomeVerified;
