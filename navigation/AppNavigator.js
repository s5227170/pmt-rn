import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ArticleDNavigator } from "./ArticleNavigator";

const AppNavigator = (props) => {


  return (
    <NavigationContainer>
        <ArticleDNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
