import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Platform, View, StyleSheet, Text } from 'react-native';
import { togglePageName } from '../../store/actions/articlesActions';
import HeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from "@expo/vector-icons";

import AuthenticationForm from '../../components/UI/AuthenticationForm';

const AuthenticationScreen = props => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(togglePageName("Authentication"))
    }, [])

    return(
        <View style={styles.screen}>
            <AuthenticationForm {...props}/>
        </View>
    )
};

export const screenOptions = navData => {
  const { user } = useSelector((state) => state.auth);

    return {
      headerStyle: {
        backgroundColor: '#18363E',
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff',
      },
      headerTintColor: '#ffffff',
      headerTitle: 'Authentication',
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
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    }
});

export default AuthenticationScreen;