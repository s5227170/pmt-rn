import React, { useState, useEffect } from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import uuid from "react-native-uuid";
import { View, Platform, Image } from "react-native";
import { Button, Divider } from "react-native-elements";
import { uploadImg, imageExists } from "../../store/actions/articlesActions";
import Icon from "react-native-vector-icons/FontAwesome";

import Colors from "../../constants/Colors";

const ImageApplier = (props) => {
  const dispatch = useDispatch();
  const { doImages } = useSelector((state) => state.articles);
  const { imgKeys } = useSelector((state) => state.articles);
  const { existingImages } = useSelector((state) => state.articles);
  const { imagesUploaded } = useSelector((state) => state.articles);
  const [file, setFile] = useState(null);
  const [img, setImg] = useState()

  useEffect(() => {
    if(existingImages[props.number]){
      setImg(<Image
        source={{ uri: existingImages[props.number].img.uri}}
        style={{
          width: '100%',
          height: '100%',
          alignSelf: "center",
        }}
      />)
    }
  }, [existingImages])

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
    }
  }, []);

  useEffect(() => {
    if (existingImages) dispatch(uploadImg(props.number, file, imagesUploaded));
  }, [doImages, file]);

  useEffect(() => {
    if(file)
    //add ref
    dispatch(imageExists(file, props.number, existingImages, imgKeys));
  }, [file])

  const pickImage = async (event) => {
    event.preventDefault();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.cancelled) {
      setFile(result);
    }
  };

  return (
    <View>
      <Divider style={{ backgroundColor: "#ffffff" }} />
      <Button
        type="solid"
        title="Choose image..."
        buttonStyle={{ width: 180, backgroundColor: "#18363E" }}
        containerStyle={{ width: 180, alignSelf: "flex-start", marginTop: 5, marginLeft: '5%' }}
        icon={
          <Icon
            name="upload"
            size={25}
            color="white"
            style={{ marginRight: 10 }}
          />
        }
        onPress={pickImage}
        disabled={existingImages[props.number]}
      />
      <View style={{ flex: 1, width: 340, height: 200, borderWidth: 2, marginVertical: 5, alignSelf: 'center'}}>
          {img}
      </View>
    </View>
  );
};

export default ImageApplier;
