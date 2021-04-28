import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Divider } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { setArticle } from '../../store/actions/articlesActions';

import Colors from "../../constants/Colors";

const ArticleSection = (props) => {
    const dispatch = useDispatch();
    const [img, setImg] = useState()

  return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => dispatch(setArticle(props.article), props.navProps.navigation.navigate("Article"))}>
        <View style={styles.wrapper} >
      <View style={styles.avatarWrapper}>
          <Image
            style={styles.avatar}
            source={{ uri: props.avatar }}
          />
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.briefDesc}>{props.briefDesc}</Text>
        <Divider style={{ width: '90%', height: 2, alignSelf: 'center' }} />
      </View>
    </View>
    </TouchableOpacity>
  );
};

export default ArticleSection;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: "100%",
    height: 450,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: "1%",
    paddingTop: 5,
    color: Colors.primary,
    paddingHorizontal: 10,
  },
  briefDesc: {
    fontSize: 14,
    paddingHorizontal: 10,
    height: 150
  },
  author: {},
  avatarWrapper: {
    height: 250,
    borderWidth: 2,
    borderBottomColor: "#545454",
    width: "95%",
    alignSelf: 'center',
    borderRadius: 4,
  },
  avatar: {
    height: "100%",
    width: "100%",
    borderBottomWidth: 2,
  },
  desc: {
    fontSize: 15,
    color: Colors.primary,
    fontWeight: "400",
    marginLeft: "1%",
  },
});
