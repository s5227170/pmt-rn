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
          <View
            style={{
              margin: 10,
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Text>Email:</Text>
            <Text>FITLINK4YOU@FL.COM</Text>
          </View>
          <View
            style={{
              margin: 10,
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Text>Adress:</Text>
            <Text>14 Priory Road, Bournemouth, UK</Text>
          </View>
          <View
            style={{
              margin: 10,
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Text>Postcode:</Text>
            <Text>BH2 5DN</Text>
          </View>
          <View
            style={{
              margin: 10,
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Text>Mobile phone:</Text>
            <Text>07981 652017</Text>
          </View>
          <View
            style={{
              margin: 10,
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Text>Telephone:</Text>
            <Text>62884</Text>
          </View>
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
