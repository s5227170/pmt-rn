import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
} from "react-native";
import { Button, Card, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import { signup, signin, setSuccess } from "../../store/actions/authActions";
import Colors from "../../constants/Colors";

const AuthenticationForm = (props) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const { success } = useSelector((state) => state.auth);
  const { error } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);

  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forename, setForename] = useState("");
  const [surname, setSurname] = useState("");

  const signupSubmit = (e) => {
    e.preventDefault();
    //add more validation checks
    if (email == "") {
      Alert.alert("Empty field", "Please enter an email");
    }else
    if (password == "") {
      Alert.alert("Empty field", "Please enter a password");
    }else
    if (forename == "") {
      Alert.alert("Empty field", "Please enter a forename");
    }else
    if (surname == "") {
      Alert.alert("Empty field", "Please enter a surname");
    }else
    if (email && password && forename && surname) {
      dispatch(signup(email, password, forename, surname));
    }
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    if (email == "") {
      Alert.alert("Empty field", "Please enter an email");
    }
    if (password == "") {
      Alert.alert("Empty field", "Please enter a password");
    }
    if (email && password) {
      Alert.alert(
        "Authentication",
        "You have been logged in, click anywhere to continue!"
      );
      dispatch(signin(email, password));
    }
  };

  useEffect(() => {
    if (error) Alert.alert("Error", error);
  }, [error]);

  useEffect(() => {
    if (user) {
      Alert.alert(
        "Authentication",
        "You have been logged out, click anywhere to continue!"
      );
    }
    if(success == true){
    props.navigation.navigate("Homepage");
    }
    dispatch(setSuccess(false));
    //add a reset dispatch that will reset success/error/loading
  }, [success]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <Card style={styles.card} containerStyle={styles.shadow}>
        <Card.Title style={{ fontSize: 24 }}>Login</Card.Title>
        <Card.Divider />
        <Card.Image
          style={mode == "signup" ? { height: 450 } : { height: 300 }}
          source={require("../../assets/images/login.jpg")}
        >
          <ScrollView style={styles.inputContainer}>
            <Input
              //label="Enter your email"
              inputStyle={{ color: "#ffffff" }}
              labelStyle={{ color: "#e1e6e1" }}
              placeholderTextColor="#e1e6e1"
              placeholder="Email"
              style={styles.input}
              onChangeText={(text) => setEmail(text)}
              leftIcon={<Icon name="envelope" size={20} color="#e1e6e1" />}
            />
            <Input
              //label="Enter your password"
              inputStyle={{ color: "#ffffff" }}
              labelStyle={{ color: "#e1e6e1" }}
              placeholder="Password"
              placeholderTextColor="#e1e6e1"
              style={styles.input}
              value={password}
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
              leftIcon={<Icon name="lock" size={20} color="#e1e6e1" />}
            />
            {mode == "signup" ? (
              <Fragment>
                <Input
                  //label="Enter your forename"
                  inputStyle={{ color: "#ffffff" }}
                  labelStyle={{ color: "#e1e6e1" }}
                  placeholder="Forename"
                  placeholderTextColor="#e1e6e1"
                  style={styles.input}
                  value={forename}
                  onChangeText={(text) => setForename(text)}
                  leftIcon={<Icon name="user" size={20} color="#e1e6e1" />}
                />
                <Input
                  //label="Enter your surname"
                  inputStyle={{ color: "#ffffff" }}
                  labelStyle={{ color: "#e1e6e1" }}
                  placeholder="Surname"
                  placeholderTextColor="#e1e6e1"
                  style={styles.input}
                  value={surname}
                  onChangeText={(text) => setSurname(text)}
                  leftIcon={<Icon name="user" size={20} color="#e1e6e1" />}
                />
              </Fragment>
            ) : null}
          </ScrollView>
          <View style={styles.buttonContainer}>
            <Button
              type="clear"
              raised
              titleStyle={{
                color: "#ffffff",
                textDecorationLine: "underline",
                fontSize: 20,
              }}
              containerStyle={{ marginHorizontal: "5%" }}
              loading={loading}
              title={mode == "login" ? "SignUp" : "Log in"}
              onPress={() => {
                mode == "login" ? setMode("signup") : setMode("login");
              }}
            />
            <Button
              type="solid"
              loading={loading}
              title="Submit"
              titleStyle={{ color: Colors.primary, fontSize: 18 }}
              buttonStyle={styles.submit}
              containerStyle={{
                width: 100,
                alignSelf: "center",
              }}
              onPress={mode == "login" ? loginSubmit : signupSubmit}
            />
          </View>
        </Card.Image>
      </Card>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    alignContent: "center",
    justifyContent: "flex-start",
    marginTop: "10%",
    borderRadius: 10,
  },
  card: {
    color: "#ffffff",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 3.46,

    elevation: 9,
  },
  inputContainer: {
    marginTop: 30,
  },
  input: {
    fontStyle: "normal",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    opacity: 0.9,
  },
  submit: {
    color: Colors.primary,
    backgroundColor: "#ffffff",
    borderColor: Colors.primary,
    borderWidth: 2,
    height: 40,
    borderRadius: 6,
  },
});

export default AuthenticationForm;
