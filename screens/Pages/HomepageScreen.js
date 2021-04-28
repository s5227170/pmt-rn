import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Platform,
  View,
  StyleSheet,
  Text,
  Button,
  Image,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {
  togglePageName,
  listTopics,
  resetStates,
} from "../../store/actions/articlesActions";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { Ionicons } from "@expo/vector-icons";

import logo from "../../assets/images/logo.png";
import TopicSection from "../../components/UI/TopicSection";
import firebase from "../../firebase/firebase";
import {
  getUserById,
  setNeedVerification,
} from "../../store/actions/authActions";
import Footer from "../../components/UI/Footer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomepageScreen = (props) => {
  const dispatch = useDispatch();
  const { topics } = useSelector((state) => state.articles);
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(togglePageName("Home"));
    dispatch(listTopics());
    clearAll();
    dispatch(resetStates())
  }, []);

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {}

  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        await dispatch(getUserById(user.uid));
        if (!user.emailVerified) {
          dispatch(setNeedVerification());
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (data != topics && topics != []) setData(Object.values(topics));
  }, [topics]);

  return (
    <View style={styles.screen}>
      <View style={styles.contentWrapper}>
        {data == [] ? (
          <ActivityIndicator size="large" color="#000000" />
        ) : (
          <FlatList
            {...props}
            style={styles.flatlist}
            data={data}
            extraData={data}
            ListHeaderComponent={
              <View syle={{ flex: 1 }}>
                <View style={styles.logoContainer}>
                  <Image style={styles.logo} source={logo} />
                </View>
                <Text
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    fontSize: 18,
                    fontStyle: "italic",
                    color: "#18363E",
                  }}
                >
                  Each section will be the answer to a different goal.
                </Text>
              </View>
            }
            ListFooterComponent={<Footer />}
            renderItem={({ item }) => (
              <TopicSection
                title={item.title}
                avatar={item.avatar}
                description={item.description}
                {...props}
              />
              
            )}
          />
        )}
      </View>
    </View>
  );
};

export const screenOptions = (navData) => {
  const { user } = useSelector((state) => state.auth);

  return {
    headerTitle: "Homepage",
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
  scroll: {},
  contentWrapper: {
    flex: 1,
    width: "100%",
  },
  flatlist: {
    flex: 1,
    width: "100%",
  },
});

export default HomepageScreen;
