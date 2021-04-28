import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Platform,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import { Button, Divider, Input } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import {
  togglePageName,
  setSectionListQty,
  setReferenceQty,
  uploadAvatar,
  setDoImages,
  postArticle,
  resetStates,
  imageExists,
} from "../../store/actions/articlesActions";
import HeaderButton from "../../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Section from "../../components/UI/section";
import Icon from "react-native-vector-icons/FontAwesome";
import uuid from "react-native-uuid";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

const ArticleCreateScreen = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { postSuccess } = useSelector((state) => state.articles);
  const { success } = useSelector((state) => state.articles);
  const { qty } = useSelector((state) => state.articles);
  const { sectionList } = useSelector((state) => state.articles);
  const { imagesUploaded } = useSelector((state) => state.articles);
  const { existingImages } = useSelector((state) => state.articles);
  const { avatar } = useSelector((state) => state.articles);
  const { doImages } = useSelector((state) => state.articles);
  const [articleAmount, setArticleAmount] = useState([]);
  const [avatarFile, setAvatarFile] = useState();
  const [uploadedAvatar, setUploadedAvatar] = useState();
  const [author, setAuthor] = useState(
    user ? user.forename + " " + user.surname : ""
  );
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("Training");
  const [level, setLevel] = useState("Beginner");
  const [send, setSend] = useState(false);
  const [references, setReferences] = useState([]);
  const [briefDesc, setBriefDesc] = useState("");

  useEffect(() => {
    async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    };
  }, []);

  useEffect(() => {
    if(postSuccess == true)
    return props.navigation.navigate("Homepage");
  }, [postSuccess]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setAvatarFile(result);
    }
  };

  useEffect(() => {
    if (qty < articleAmount.length) {
      setArticleAmount((articleAmount) =>
        articleAmount.filter((item, i) => i !== articleAmount.length - 1)
      );
    }
  }, [qty]);

  const submitHandler = (event) => {
    event.preventDefault();
    if (!title) {
      Alert.alert("Empty fields", "Please enter a title!");
    } else if (!briefDesc) {
      Alert.alert("Empty fields", "Please enter a brief description");
    } else if (!topic) {
      Alert.alert("Empty fields", "Please choose a topic!");
    } else if (!avatarFile) {
      Alert.alert(
        "Empty fields",
        "Please pick a main picture for the article!"
      );
    } else if (!level) {
      Alert.alert("Empty fields", "Please choose a value");
    } else if (sectionList.length < 1) {
      Alert.alert(
        "Sections required",
        "At least one section is required for an article!"
      );
    } else {
      dispatch(uploadAvatar(avatarFile));
      dispatch(setDoImages(true));
    }
  };

  useEffect(() => {
    if (doImages) {
      if (imagesUploaded.length == articleAmount || avatar) {
        setSend(true);
      }
    }
  }, [imagesUploaded, avatar]);

  useEffect(() => {
    if (send == true) {
      dispatch(
        postArticle(
          user,
          title,
          briefDesc,
          topic,
          level,
          avatar,
          sectionList,
          imagesUploaded,
          references
        )
      );
       setSend(false), dispatch(resetStates());
    }
  }, [send]);

  //useEffect(() => {}, [articleSuccess])

  return (
    <View style={styles.screen}>
      {/* Add a flatlist with components = ArticleSection, 
            header and footer are in the component/UI folder */}
      {!send && user? (
        <ScrollView>
          <Text style={{ fontSize: 24 }}>Article title:</Text>
          <Input
            placeholder="Enter a title"
            style={{}}
            onChangeText={(text) => setTitle(text)}
          />
          <Text style={{ fontSize: 24 }}>Brief description:</Text>
          <Input
            placeholder="Enter description"
            style={{}}
            onChangeText={(text) => setBriefDesc(text)}
          />
          <Text style={{ fontSize: 24, borderBottomWidth: 2, width: "85%" }}>
            Topic:
          </Text>
          <Picker
            selectedValue={topic}
            onValueChange={(choice) => setTopic(choice)}
          >
            <Picker.Item label="Training" value="Training" />
            <Picker.Item label="Workouts" value="Workouts" />
            <Picker.Item label="Nutrition" value="Nutrition" />
            <Picker.Item
              label="Mindset and motivation"
              value="Mindset and motivation"
            />
            <Picker.Item label="Endocrine state" value="Endocrine state" />
          </Picker>
          <Text style={{ fontSize: 24, borderBottomWidth: 2, width: "85%" }}>
            Level:
          </Text>
          <Picker
            selectedValue={level}
            onValueChange={(choice) => setLevel(choice)}
          >
            <Picker.Item label="Beginner" value="Beginner" />
            <Picker.Item label="Intermediate" value="Intermediate" />
            <Picker.Item label="Expert" value="Expert" />
            <Picker.Item label="Mixed" value="Mixed" />
          </Picker>
          <Text style={{ fontSize: 24 }}>Avatar:</Text>
          <Text>
            The main article image will be displayed as a wellcome image to your
            article and will be the article's "avatar"
          </Text>
          <Button
            type="outline"
            raised
            buttonStyle={{ width: 100, backgroundColor: "#18363E" }}
            containerStyle={{ width: 100, alignSelf: "center", marginTop: 5 }}
            icon={<Icon name="upload" size={25} color="white" />}
            onPress={pickImage}
          />
          <View style={{ height: 240 }}>
            {avatarFile && (
              <Image
                source={{ uri: avatarFile.uri }}
                style={{
                  width: 340,
                  height: 200,
                  alignSelf: "center",
                  marginTop: 20,
                }}
              />
            )}
          </View>
          <Text style={{ fontSize: 24 }}>Article sections:</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#c9c9c9",
                borderRadius: 10,
                width: "75%",
                paddingHorizontal: 10,
                marginHorizontal: 5,
              }}
            >
              <Text style={{ fontSize: 16 }}>
                Fill all fields and then confirm them. Once confirmed changes
                can't be undone. The way to redo sections is to delete and
                recreate them.
              </Text>
            </View>
            <Button
              icon={<Icon name="plus" size={35} color="black" />}
              title=""
              type="clear"
              onPress={() => {
                dispatch(setSectionListQty(qty + 1)),
                  setArticleAmount((articleAmount) => [
                    ...articleAmount,
                    { qty: qty },
                  ]);
              }}
              disabled={qty == 10}
            />
            <Button
              icon={<Icon name="minus" size={35} color="black" />}
              title=""
              type="clear"
              onPress={() => {
                dispatch(setSectionListQty(qty - 1)),
                  setArticleAmount((articleAmount) =>
                    articleAmount.filter(
                      (item, i) => i !== articleAmount.length - 1
                    )
                  );
              }}
              disabled={qty == 0}
            />
          </View>
          <Divider
            style={{ backgroundColor: "#525252", marginVertical: 5, height: 2 }}
          />

          {articleAmount.map((item, index) => {
            return (
              <Section
                key={uuid.v4()}
                number={index}
                overallAmount={articleAmount}
              />
            );
          })}
          <Text style={{ fontSize: 24, marginBottom: -15 }}>References:</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#c9c9c9",
                borderRadius: 10,
                width: "75%",
                paddingHorizontal: 10,
                marginHorizontal: 5,
              }}
            >
              <Text style={{ fontSize: 16 }}>Add any references bellow.</Text>
            </View>
            <Divider />
            <Button
              icon={<Icon name="plus" size={35} color="black" />}
              title=""
              type="clear"
              onPress={() => {
                setReferences((references) => [
                  ...references,
                  { ref: references.length },
                ]);
              }}
              //disabled={}
            />
            <Button
              icon={<Icon name="minus" size={35} color="black" />}
              title=""
              type="clear"
              onPress={() => {
                setReferences((references) =>
                  references.filter((item, i) => i !== references.length - 1)
                );
              }}
              disabled={references.length == 0}
            />
          </View>
          <View style={{ marginBottom: 100 }}>
            {references.map((item, index) => {
              return (
                //Use fontAwesome to set Icon names
                <Fragment key={uuid.v4()}>
                  <Text style={{ fontSize: 18 }}>Reference {index + 1}</Text>
                  <Input
                    placeholder="Enter reference"
                    leftIcon={<Icon name="" size={24} color="black" />}
                    onChangeText={(text) => {
                      const ref = references;
                      ref[index].ref = text;
                      setReferences(ref);
                    }}
                  />
                </Fragment>
              );
            })}
          </View>
        
          <Button
            style="solid"
            buttonStyle={{ backgroundColor: "#18363E" }}
            style={{ marginTop: 20 }}
            title="Post"
            loading={doImages}
            onPress={submitHandler}
            disabled={doImages}
          />
        </ScrollView>
      ) : (
        <ActivityIndicator
          style={{ flex: 1 }}
          animating
          size="large"
          color="black"
        />
      )}
    </View>
  );
};

export const screenOptions = (navData) => {
  const { user } = useSelector((state) => state.auth);
  return {
    headerTitle: "Create an Article",
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
  flatlist: {
    flex: 1,
    width: "100%",
  },
  screen: {
    flex: 1,
    padding: 10,
  },
});

export default ArticleCreateScreen;
