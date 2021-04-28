import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Divider } from "react-native-elements";

import { setType } from '../../store/actions/articlesActions';
import Colors from "../../constants/Colors";
import { useDispatch } from "react-redux";

const TopicSection = (props) => {
  const dispatch = useDispatch();
  const clickhandler = () => {
    //Add state taht will set the type and the page will filter all
    //articles which type is == to the type of the redux global state.
    //Use a FlatList to generate the articles( from the DB ) using a
    //query
  };

  return (
    <View style={styles.wrapper}>
      <Divider
        style={{ backgroundColor: "#525252", marginVertical: 5, height: 2, width: '90%', alignSelf: 'center'}}
      />
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.desc}>{props.description}</Text>
      <View
        style={styles.avatarWrapper}
        
      >
        <TouchableOpacity activeOpacity={0.7} onPress={() =>{
          /* Add a dispatch that will set a global type that will be used when opening a list of articles. The global type will be used in the snapshot for firebase to filter */
          //                ADD IT HERE                        //
          dispatch(setType(props.title)),
          props.navigation.navigate("All Articles")
         }}>
          <Image
            style={styles.avatar}
            source={{ uri: props.avatar }}
            onPress={clickhandler}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopicSection;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: "100%",
    height: 300,
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: "1%",
    paddingTop: 5,
    color: Colors.primary,
  },
  author: {},
  avatarWrapper: {
    height: 250,
    borderWidth: 1,
    borderBottomColor: "#545454",
    width: "100%",
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  avatar: {
    height: "100%",
    width: "100%",

  },
  desc: {
    fontSize: 15,
    color: Colors.primary,
    fontWeight: "400",
    marginLeft: "1%",
  },
});
