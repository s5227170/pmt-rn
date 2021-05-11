import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Platform, View, StyleSheet, Text } from "react-native";
import { togglePageName } from "../../store/actions/articlesActions";
import HeaderButton from "../../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import ArticleSection from "../../components/UI/ArticleSection";
import {
  SearchBar,
  Divider,
  Input,
  CheckBox,
  Button,
} from "react-native-elements";
import firebase from "../../firebase/firebase";
import uuid from "react-native-uuid";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";

const BecomeVerified = (props) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.screen}>
      <Input placeholder="Forename" />
      <Input placeholder="Surname" />
      <Input placeholder="Mobile Phone" />
      <Input placeholder="Email" />
      <Input placeholder="Organisation" />
      <Input placeholder="Specialisation" />
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 15 }}>
        <Text>Upload documentation proof</Text>
        <Button
          type="outline"
          raised
          buttonStyle={{ width: 100, backgroundColor: "#18363E" }}
          containerStyle={{ width: 100, alignSelf: "center", marginTop: 5 }}
          icon={<Icon name="upload" size={25} color="white" />}
        />
      </View>
      <View>
        <CheckBox
          center
          title="I accept the rules and conditions"
          checked={consent}
          onPress={() => setConsent(!consent)}
        />
      </View>
      <Button
        loading={loading}
        title="Submit"
        buttonStyle={{ width: "80%", alignSelf: "center", marginVertical: 5, backgroundColor: "#18363E" }}
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
