import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Input, Button, Divider } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  setSectionListQty,
  setSectionList,
  deleteImgKey
} from "../../store/actions/articlesActions";
import ImageApplier from "../../components/UI/ImageApplier";
import { Alert } from "react-native";

const Section = (props) => {
  const dispatch = useDispatch();
  const { sectionList } = useSelector((state) => state.articles);
  const { qty } = useSelector((state) => state.articles);
  const { imgKeys } = useSelector((state) => state.articles);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [currentNumber, setCurrentNumber] = useState(props.number);
  const [clickedConfirm, setClickedConfirm] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const dataClickedConfirm = await AsyncStorage.getItem(
        "@clickedConfirm" + currentNumber
      );
      const dataTitle = await AsyncStorage.getItem("@title" + currentNumber);
      const dataContent = await AsyncStorage.getItem(
        "@content" + currentNumber
      );
      if (dataTitle) setTitle(dataTitle);
      if (dataContent) setContent(dataContent);
      if (JSON.parse(dataClickedConfirm))
        setClickedConfirm(JSON.parse(dataClickedConfirm));
    } catch (e) {}
  };

  const removeDataTitle = async () => {
    try {
      await AsyncStorage.removeItem("@title" + currentNumber);
    } catch (e) {}
  };
  const removeDataContent = async () => {
    try {
      await AsyncStorage.removeItem("@content" + currentNumber);
    } catch (e) {}
  };
  const removeDataClickedConfirm = async () => {
    try {
      await AsyncStorage.removeItem("@clickedConfirm" + currentNumber);
    } catch (e) {}
  };

  const setDataTitle = async (titleText) => {
    try {
      await AsyncStorage.setItem("@title" + currentNumber, titleText);
    } catch (e) {}
  };

  const setDataContent = async (contentText) => {
    try {
      await AsyncStorage.setItem("@content" + currentNumber, contentText);
    } catch (e) {}
  };

  const setDataClickedConfirm = async (clickedConfirm) => {
    try {
      await AsyncStorage.setItem(
        "@clickedConfirm" + currentNumber,
        JSON.stringify(clickedConfirm)
      );
    } catch (e) {}
  };

  return (
    <View style={styles.wrapper}>
      <Text style={{ fontSize: 24 }}>Article Head</Text>
      <Input
        placeholder="Enter title..."
        value={title}
        onChangeText={(text) => {
          setTitle(text), setDataTitle(text);
        }}
        multiline
        numberOfLines={2}
        maxLength={30}
      />
      <Input
        placeholder="Enter content..."
        value={content}
        onChangeText={(text) => {
          setContent(text), setDataContent(text);
        }}
        multiline
        maxLength={350}
      />
      <View style={styles.imgManagementContainer}>
        <ImageApplier
          number={props.number}
          overallAmount={props.overallAmount}
        />
      </View>
      <View style={styles.buttons}>
        <Button
          onPress={() => {
            if(!imgKeys.includes(props.number)){
              Alert.alert("Missing article image", "Every article must have at least one image!")
            }else 
            if(!title){
              Alert.alert("Missing article title", "Please enter a title!")
            }
            else if(!content){
              Alert.alert("Missing article content", "Article requires content!")
            }
            else{
            setClickedConfirm(true),
              setDataClickedConfirm(true),
              dispatch(
                setSectionList(
                  { number: currentNumber, title: title, content: content },
                  0,
                  sectionList,
                  "add"
                )
              );
          }}}
          type=""
          icon={
            <Icon
              name="check"
              size={20}
              color="green"
              style={!clickedConfirm ? styles.icon1 : styles.icon1Disabled}
            />
          }
          title=""
          buttonStyle={styles.confirm}
          disabledStyle={styles.disabled}
          disabled={title == "" || content == "" || clickedConfirm == true }
        />
        <Button
          onPress={() => {
            removeDataTitle(),
              removeDataContent(),
              removeDataClickedConfirm(),
              dispatch(setSectionListQty(qty - 1)),
              dispatch(
                setSectionList({}, currentNumber, sectionList, "remove")
              ),
              dispatch(deleteImgKey(currentNumber, imgKeys))
          }}
          type="clear"
          icon={
            <Icon name="trash" size={20} color="red" style={styles.icon2} />
          }
          title=""
          buttonStyle={styles.delete}
          disabledStyle={styles.disabled}
        />
      </View>
      <Divider
        style={{ backgroundColor: "#525252", marginVertical: 5, height: 2 }}
      />
    </View>
  );
};

export default Section;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginBottom: 30,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  confirm: {},
  delete: {},
  disabled: {
    backgroundColor: "#c2c2c2",
  },
  icon1: {
    borderColor: "green",
    padding: 5,
    paddingLeft: 8,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  icon1Disabled: {
    borderColor: "#c2c2c2",
    padding: 5,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  icon2: {
    borderColor: "red",
    padding: 5,
    paddingLeft: 8,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
});
