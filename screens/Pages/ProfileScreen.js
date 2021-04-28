import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Platform,
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { togglePageName } from "../../store/actions/articlesActions";
import HeaderButton from "../../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { Divider } from "react-native-elements";
import { SocialIcon } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const ProfileScreen = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(togglePageName("Profile"));
  }, []);

  return user ? (
    <View style={styles.screen}>
      <View style={{ height: '35%', width: '100%', alignItems: 'center'}}>
      <Text>{user.forename + " " + user.surname}</Text>
      <View style={styles.imgContainer}>
        <Image
          style={{ height: "100%", width: "100%", borderRadius: 100/2}}
          source={
            user.avatar
              ? { uri: user.avatar }
              : require("../../assets/images/unknown.jpg")
          }
          
        />
      </View>
      <View style={styles.social}>
        <TouchableOpacity>
          <SocialIcon
            iconSize={20}
            style={styles.icon}
            raised
            type="facebook"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <SocialIcon iconSize={20} style={styles.icon} raised type="twitter" />
        </TouchableOpacity>
        <TouchableOpacity>
          <SocialIcon
            iconSize={20}
            style={styles.icon}
            raised
            type="instagram"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <SocialIcon iconSize={20} style={styles.icon} raised type="youtube" />
        </TouchableOpacity>
        <TouchableOpacity>
          <SocialIcon
            iconSize={20}
            style={styles.icon}
            raised
            type="snapchat"
          />
        </TouchableOpacity>
        {/* insert social media icons */}
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.primary}>
          <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
            <Text>Name: </Text>
            <Text>{user.forename + " " + user.surname}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
            <Text>Role: </Text>
            <Text>
              {user.verified ? "Verified Professional" : "Regular User"}
            </Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
            <Text>Email:</Text>
            <Text>{user.email}</Text>
          </View>
        </View>
        <ScrollView style={styles.secondary}>
          <Text style={{ textAlign: "center", fontSize: 18 }}>Biography</Text>
          <Divider
            style={{
              height: 2,
              marginBottom: 2,
              width: "90%",
              alignSelf: "center",
            }}
          />
          <Text style={{ textAlign: "justify" }}>
            {user.biography
              ? user.biography
              : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
          </Text>
        </ScrollView>
      </View>
    </View>
  ) : (
    <ActivityIndicator style={{ flex: 1 }} color="black" size="large" />
  );
};

export const screenOptions = (navData) => {
  const { user } = useSelector((state) => state.auth);

  return {
    headerTitle: "Profile",
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
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  imgContainer: {
    borderRadius: 100/2,
    marginTop: 20,
    width: 100,
    height: 100,
    borderWidth: 1
  },
  social: {
    flex: 1,
    width: "100%",
    height: "10%",
    flexDirection: "row",

    justifyContent: "center",
    marginTop: 5,
  },
  icon: {
    marginHorizontal: 4,
    height: 40,
    width: 40,
  },
  content: {
    height: "66%",
    padding: 10,
    borderWidth: 2,
    borderColor: "black",
  },
  primary: {},
  secondary: {},
});

export default ProfileScreen;
