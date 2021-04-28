import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Platform,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Image,
  Animated,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { togglePageName } from "../../store/actions/articlesActions";
import HeaderButton from "../../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { Button, Divider } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { SocialIcon } from "react-native-elements";
import unknown from "../../assets/images/unknown.jpg";
import SectionView from "../../components/UI/sectionView";
import { FlatList } from "react-native";
import ArticleFooter from "../../components/UI/ArticleFooter";
import firebase from "../../firebase/firebase";
import { Alert } from "react-native";

const ArticleListScreen = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { article } = useSelector((state) => state.articles);
  const [drop, setDrop] = useState(true);
  const [imgs, setImgs] = useState([]);
  const [isFavorite, setIsFavorite] = useState();
  const [favs, setFavs] = useState();
  const anim = useRef(new Animated.Value(-220)).current;
  const db = firebase.firestore().collection("users");

  useEffect(() => {
    if (user)
      if (db) {
        const unsubscribe = db.onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
          }));
          data.map((user) => {
            if(user.favorites.length > 0){
            for (let i = 0; i < user.favorites.length; i++) {
              if (user.favorites[i] == article.id) {
                setIsFavorite(true);
                setFavs(user.favorites)
              }else {
                setIsFavorite(false);
                setFavs([])
              }
            }
          }else{
            setIsFavorite(false);
            setFavs([])
          }
          })
        });
        return unsubscribe;
      }
  }, []);

  useEffect(() => {
    article.imagesUploaded.map((item) => {
      setImgs((imgs) => [...imgs, item]);
    });
  }, [article]);

  const show = () => {
    Animated.timing(anim, {
      toValue: -220,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setDrop(!drop);
  };

  const hide = () => {
    Animated.timing(anim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
    setDrop(!drop);
  };

  const favoriteHandler = () => {
    if (user) {
      const newArr = [...favs];
      // console.log(newArr.includes(article.id));
      // console.log("----");
      // console.log(article.id);
      if (newArr.includes(article.id)) {
        const index = newArr.indexOf(article.id);
        newArr.splice(index, 1);
      } else {
        newArr.push(article.id);
      }
      //console.log(newArr)

      if (db) {
        db.doc(user.id).set({
          id: user.id,
          forename: user.forename,
          surname: user.surname,
          email: user.email,
          createdAt: user.createdAt,
          admin: user.admin,
          verified: user.verified,
          avatar: user.avatar,
          favorites: newArr,
        });
      }
    } else {
      Alert.alert("Authentication", "You need to be logged in!");
    }
  };

  return article ? (
    <View contentContainerStyle={styles.screen}>
      <View
        style={{
          borderColor: "black",
          borderBottomWidth: 1,
          height: "20%",
          width: "100%",
          position: "relative",
        }}
      >
        <Image style={styles.avatar} source={{ uri: article.avatar }} />
        {user ? (
          <Button
            containerStyle={{
              position: "absolute",
              top: 5,
              left: 5,
              zIndex: 2,
              transform: [{ scale: 0.7 }],
              backgroundColor: "black",
            }}
            type="clear"
            title=""
            onPress={favoriteHandler}
            icon={
              <Icon
                name="star"
                style={{ borderRadius: 6 }}
                light
                size={35}
                color={isFavorite ? "yellow" : "white"}
              />
            }
          />
        ) : null}
      </View>

      <Animated.View
        style={{
          transform: [
            //drop ? { scaleY: 1 } : { scale: 1 },
            { translateY: anim },
          ],
          height: 250,
          width: "100%",
          backgroundColor: "transparent",
          zIndex: -1,
        }}
      >
        <View
          style={{
            height: "90%",
            backgroundColor: "#fafafa",
            flexDirection: "row",
          }}
        >
          {/* enter the different author items here */}
          <View
            style={{ height: "100%", width: "30%", justifyContent: "center" }}
          >
            <View
              style={{
                height: "70%",
                width: "90%",
                alignSelf: "flex-end",
                borderWidth: 2,
              }}
            >
              {article.author.avatar != "" ? (
                <Image
                  source={{ uri: article.author.avatar }}
                  style={{ height: "100%", width: "100%" }}
                />
              ) : (
                <Image
                  source={require("../../assets/images/unknown.jpg")}
                  style={{ height: "100%", width: "100%" }}
                />
              )}
            </View>
          </View>
          <View
            style={{
              height: "100%",
              width: "70%",
              paddingHorizontal: "5%",
              paddingVertical: "5%",
            }}
          >
            <View style={{ flexDirection: "column" }}>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  height: "20%",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 18 }}>Author:</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  height: "20%",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 16, paddingLeft: 5 }}>
                  {article.author.forename + " " + article.author.surname}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  height: "20%",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 18 }}>Created at:</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  height: "20%",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 16, paddingLeft: 5 }}>
                  {article.createdAt}
                </Text>
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
                  <SocialIcon
                    iconSize={20}
                    style={styles.icon}
                    raised
                    type="twitter"
                  />
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
                  <SocialIcon
                    iconSize={20}
                    style={styles.icon}
                    raised
                    type="youtube"
                  />
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
          </View>
        </View>
        <View
          style={{
            height: "10%",
            justifyContent: "center",
            marginBottom: "-10%",
            backgroundColor: "#fafafa",
          }}
        >
          <Divider
            style={{
              height: 2,
              marginBottom: 2,
              backgroundColor: "black",
              width: "90%",
              alignSelf: "center",
            }}
          />
          {drop ? (
            <Button
              type="empty"
              raised
              onPress={hide}
              buttonStyle={{
                alignSelf: "center",
                width: "20%",
                backgroundColor: "black",
                marginTop: -30,
              }}
              icon={
                <Icon
                  name="sort-down"
                  size={50}
                  color="white"
                  style={styles.icon2}
                />
              }
            />
          ) : (
            <Button
              type="empty"
              raised
              buttonStyle={{
                alignSelf: "center",
                width: "20%",
                backgroundColor: "black",
                marginBottom: -30,
                marginTop: -5,
              }}
              onPress={show}
              icon={
                <Icon
                  name="sort-up"
                  size={50}
                  color="white"
                  style={styles.icon2}
                />
              }
            />
          )}
        </View>
      </Animated.View>
      <View
        style={{
          marginTop: -10,
          transform: [{ translateY: -200 }],
          height: "60%",
          paddingHorizontal: 10,
          zIndex: -2,
        }}
      >
        <FlatList
          style={styles.flatlist}
          data={article.sectionList}
          extraData={article.sectionList}
          keyExtractor={article.sectionList.number}
          ListFooterComponent={<ArticleFooter />}
          renderItem={({ item }) => (
            <SectionView
              title={item.title}
              img={imgs[item.number] ? imgs[item.number].url : ""}
              content={item.content}
            />
          )}
        />
      </View>
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
    headerTitle: "ArticleView",
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
        ListFooterComponent={<ArticleFooter />}
      />
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  flatlist: {
    flex: 1,
    zIndex: -2,
  },
  avatar: {
    height: "100%",
    width: "100%",
  },
  social: {
    flex: 1,
    width: "100%",
    height: "20%",
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    marginTop: 10,
  },
  icon: {
    marginHorizontal: 4,
    height: 50,
    width: 40,
  },
});

export default ArticleListScreen;
