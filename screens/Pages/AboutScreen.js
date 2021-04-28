import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Platform,
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
} from "react-native";
import { togglePageName } from "../../store/actions/articlesActions";
import HeaderButton from "../../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import logo from "../../assets/images/logo.png";
import { Divider } from "react-native-elements";

const AboutScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(togglePageName("About"));
  }, []);

  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={logo} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.introduction}>
            PMT assignment application prototype
          </Text>
          <Divider style={{ height: 1 }} />
          <Text style={styles.content}>
            {"     "} This application prototype was planned, designed and
            developped by the PMT group of Bournemouth University for an
            assignment. The idea behind the application is to provide an
            environment where different professional fitness enthusiasts can
            provide knowledge about health and fitness to individuals trying to
            better their lifestyle.
            {"\n     "} The developers had in mind the different complications
            and difficulties when it comes to learning new things and keeping
            oneself motivated while continuing working towards their goals. To
            tackle this, the group designed data models accordingly by
            implementing attributes that help users orient themselves to the
            best possible solution for their goals. Properties like "Levels",
            "Types" and "Favorites" are just some examples, of course with time
            more and more filtration and SEO techniques will be implemented but
            since this is just a prototype it has restricted functionality.
            {"\n     "} {/* Continue with the context */}This page will
            eventually have contact deatails, FAQ section and other informative
            data.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export const screenOptions = (navData) => {
  const { user } = useSelector((state) => state.auth);

  return {
    headerTitle: "About",
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
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  logoContainer: {
    width: "100%",
    height: 160,
    borderBottomWidth: 2,
    borderBottomColor: "#737373",
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    width: "100%",
    borderWidth: 2,
    padding: 20,
  },
  introduction: {
    fontSize: 24,
    fontStyle: "italic",
    alignSelf: "center",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  content: {
    fontSize: 18,
    fontStyle: "italic",
    textAlign: "justify",
    paddingBottom: 40,
  },
});

export default AboutScreen;
