import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { SafeAreaView, Button, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { signout } from "../store/actions/authActions";

import HomepageScreen, {
  screenOptions as HPSO,
} from "../screens/Pages/HomepageScreen";
import ProfileScreen, {
  screenOptions as PSO,
} from "../screens/Pages/ProfileScreen";
import FavoritesScreen, {
  screenOptions as FSO,
} from "../screens/Pages/FavoritesScreen";
import AboutScreen, {
  screenOptions as ASO,
} from "../screens/Pages/AboutScreen";
import AuthenticationScreen, {
  screenOptions as AUSO,
} from "../screens/Pages/AuthenticationScreen";
import ArticleListScreen, {
  screenOptions as ALSO,
} from "../screens/UI/ArticleListScreen";
import ArticleViewScreen, {
  screenOptions as AVSO,
} from "../screens/UI/ArticleViewScreen";
import ArticleCreateScreen, {
  screenOptions as ACSO,
} from "../screens/UI/ArticleCreateScreen";
import BecomeVerifiedScreen, {
  screenOptions as BVSO,
} from "../screens/UI/BecomeVerifiedScreen";

import Colors from "../constants/Colors";

const ArticleDrawerNavigator = createDrawerNavigator();

export const ArticleDNavigator = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [auth, setAuth] = useState(" ");

  useEffect(() => {
    if (user) {
      setAuth("logout");
    } else {
      setAuth("login");
    }
  }, [user]);

  return (
    <ArticleDrawerNavigator.Navigator
      drawerContent={(props) => {
        const { state, ...rest } = props;
        const newState = { ...state }; //copy from state before applying any filter. do not change original state
        newState.routes = newState.routes.filter(
          (item) => item.name !== "Authentication"
        );
        newState.routes = newState.routes.filter(
          (item) => item.name !== "All Articles"
        );
        newState.routes = newState.routes.filter(
          (item) => item.name !== "Article"
        );
        if (user) {
          if (!user.verified) {
            newState.routes = newState.routes.filter(
              (item) => item.name !== "Create an Article"
            );
          }
        } else {
          newState.routes = newState.routes.filter(
            (item) => item.name !== "Create an Article"
          );
        }
        if (!user) {
            newState.routes = newState.routes.filter(
              (item) => item.name !== "Become a verified user"
            );
        }

        return (
          <View style={{ flex: 1, paddingTop: 20, backgroundColor: '#e8e6e6' }}  >
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <DrawerItemList state={newState} {...rest} />
              <Button
                title={auth == "logout" ? "Log out" : "Log In"}
                loading={auth == " "}
                color={Colors.primary}
                onPress={() => {
                  if (auth == "logout") {
                    dispatch(signout());
                    props.navigation.navigate("Homepage");
                  } else {
                    props.navigation.navigate("Authentication");
                  }
                }}
              />
            </SafeAreaView>
          </View>
        );
      }}
      drawerContentOptions={{
        activeTintColor: Colors.primary,
      }}
    >
      <ArticleDrawerNavigator.Screen
        name="Home"
        component={HomepageNavigator}
        options={HPSO}
      />
      <ArticleDrawerNavigator.Screen
        name="Profile"
        component={user ? ProfileNavigator : AuthenticationNavigator}
        options={PSO}
      />
      <ArticleDrawerNavigator.Screen
        name="Favorites"
        component={user ? FavoritesNavigator : AuthenticationNavigator}
        options={FSO}
      />
      <ArticleDrawerNavigator.Screen
        name="About"
        component={AboutNavigator}
        options={ASO}
      />
      <ArticleDrawerNavigator.Screen
        name="Authentication"
        component={AuthenticationNavigator}
        options={AUSO}
      />
      <ArticleDrawerNavigator.Screen
        name="Create an Article"
        component={ArticleCreateNavigator}
        options={ACSO}
      />
      <ArticleDrawerNavigator.Screen
        name="All Articles"
        component={ArticleListNavigator}
        options={ALSO}
      />
      <ArticleDrawerNavigator.Screen
        name="Article"
        component={ArticleViewNavigator}
        options={AVSO}
      />
      <ArticleDrawerNavigator.Screen
        name="Become a verified user"
        component={BecomeVerifiedNavigator}
        options={BVSO}
      />
    </ArticleDrawerNavigator.Navigator>
  );
};

/////////////////////////////////////////////////////////

const HomepageStackNavigator = createStackNavigator();

export const HomepageNavigator = () => {
  return (
    <HomepageStackNavigator.Navigator>
      <HomepageStackNavigator.Screen
        name="Homepage"
        component={HomepageScreen}
        options={HPSO}
      />
    </HomepageStackNavigator.Navigator>
  );
};

/////////////////////////////////////////////////////////

const ProfileStackNavigator = createStackNavigator();

export const ProfileNavigator = () => {
  return (
    <ProfileStackNavigator.Navigator>
      <ProfileStackNavigator.Screen
        name="Profile"
        component={ProfileScreen}
        options={PSO}
      />
    </ProfileStackNavigator.Navigator>
  );
};

/////////////////////////////////////////////////////////

const FavoritesStackNavigator = createStackNavigator();

export const FavoritesNavigator = () => {
  return (
    <FavoritesStackNavigator.Navigator>
      <FavoritesStackNavigator.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={FSO}
      />
    </FavoritesStackNavigator.Navigator>
  );
};

/////////////////////////////////////////////////////////

const AboutStackNavigator = createStackNavigator();

export const AboutNavigator = () => {
  return (
    <AboutStackNavigator.Navigator>
      <AboutStackNavigator.Screen
        name="About"
        component={AboutScreen}
        options={ASO}
      />
    </AboutStackNavigator.Navigator>
  );
};

/////////////////////////////////////////////////////////

const AuthenticationStackNavigator = createStackNavigator();

export const AuthenticationNavigator = () => {
  return (
    <AuthenticationStackNavigator.Navigator>
      <AuthenticationStackNavigator.Screen
        name="Authentication"
        component={AuthenticationScreen}
        options={AUSO}
      />
    </AuthenticationStackNavigator.Navigator>
  );
};

/////////////////////////////////////////////////////////

const ArticleListStackNavigator = createStackNavigator();

export const ArticleListNavigator = () => {
  return (
    <ArticleListStackNavigator.Navigator>
      <ArticleListStackNavigator.Screen
        name="All Articles"
        component={ArticleListScreen}
        options={ALSO}
      />
    </ArticleListStackNavigator.Navigator>
  );
};

/////////////////////////////////////////////////////////

const ArticleViewStackNavigator = createStackNavigator();

export const ArticleViewNavigator = () => {
  return (
    <ArticleViewStackNavigator.Navigator>
      <ArticleViewStackNavigator.Screen
        name="Article"
        component={ArticleViewScreen}
        options={AVSO}
      />
    </ArticleViewStackNavigator.Navigator>
  );
};

/////////////////////////////////////////////////////////

const ArticleCreateStackNavigator = createStackNavigator();

export const ArticleCreateNavigator = () => {
  return (
    <ArticleCreateStackNavigator.Navigator>
      <ArticleCreateStackNavigator.Screen
        name="Create an Articles"
        component={ArticleCreateScreen}
        options={ACSO}
      />
    </ArticleCreateStackNavigator.Navigator>
  );
};

/////////////////////////////////////////////////////////

const BecomeVerifiedStackNavigator = createStackNavigator();

export const BecomeVerifiedNavigator = () => {
  return (
    <BecomeVerifiedStackNavigator.Navigator>
      <BecomeVerifiedStackNavigator.Screen
        name="Become a verified user"
        component={BecomeVerifiedScreen}
        options={BVSO}
      />
    </BecomeVerifiedStackNavigator.Navigator>
  );
};
