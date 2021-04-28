import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Platform, View, StyleSheet, Text, FlatList } from 'react-native';
import { togglePageName } from '../../store/actions/articlesActions';
import HeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from "@expo/vector-icons";
import firebase from '../../firebase/firebase';
import { SearchBar, Divider } from "react-native-elements";
import ArticleSection from "../../components/UI/ArticleSection";
import uuid from "react-native-uuid";

const FavoritesScreen = props => {
  const dispatch = useDispatch();
  const db = firebase.firestore().collection("articles");
  const [articles, setArticles] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {

    if (db) {
      for(const fav in user.favorites){
        console.log(fav)
        console.log(user.favorites)
      const unsubscribe = db
        .where("id", "==", fav)
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
          }));
          setArticles(articles => [...articles, data]);
        });
        
      return unsubscribe;
    }
    }
  }, []);

  return articles ? (
    <View style={styles.screen}>
      {/*  Add a flatlist with components = ArticleSectrion, 
            header and footer are in the component/UI folder */}
      <SearchBar
        placeholder="Search..."
        style={{ width: "100%", margin: -10 }}
      />

      <Text style={{ fontSize: 24, alignSelf: 'center', marginTop: 10, width: '90%', textAlign: 'center' }}>{"Favorite Articles"}</Text>
      <Divider style={{ alignSelf: 'center', width: '90%', height: 2}} />

      <FlatList
        style={styles.flatlist}
        data={articles}
        extraData={articles}
        renderItem={({ item }) => (
          <ArticleSection
            navProps={props}
            keys={uuid.v4()}
            title={item.title}
            avatar={item.avatar}
            briefDesc={item.briefDesc}
            article={item}
          />
        )}
        //ListHeaderComponent={}
        //ListFooterComponent={}
      />
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

export const screenOptions = navData => {
  const { user } = useSelector((state) => state.auth);

    return {
      headerTitle: 'Favorites',
      headerStyle: {
        backgroundColor: '#18363E',
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff',
      },
      headerTintColor: '#ffffff',
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
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
        color={user ? "#25d94f" : "#e61c1c" }
      />
      ),
    };
  };

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    }
});

export default FavoritesScreen;