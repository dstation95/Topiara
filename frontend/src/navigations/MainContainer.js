import React, { useContext } from 'react'
import {View, Text} from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator,  } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';

//screens
import PostsScreen from './customerScreens/PostsScreen'
import ProfileScreen from './customerScreens/ProfileScreen'
import SettingsScreen from './customerScreens/SettingsScreen'
import LandscaperPostsScreen from './lanscaperScreens/PostsScreen';
import LandscaperSettingsScreen from './lanscaperScreens/SettingsScreen';
import LandscaperTasksScreen from './lanscaperScreens/TasksScreen';
import AuthForm from  './screens/AuthForm'
import { useLogin } from '../contexts/LoginProvider';
import LandscaperForm from './screens/LandscaperForm';

//screen name
const postsName = "Posts"
const profileName = "Profile"
const settingsName = "Settings"

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator()


const StackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen component={AuthForm} name='AuthForm' />
        <Stack.Screen component={LandscaperForm} name='LanscaperForm' />
      </Stack.Navigator>
    );
  };

const TabNavigator   = () => {

    return (
            <Tab.Navigator
            initialRouteName={postsName}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let rn = route.name
                }
            })}
            >
                <Tab.Screen name={postsName} component={PostsScreen} />
                {/* <Tab.Screen name={profileName} component={ProfileScreen} /> */}
                <Tab.Screen name={settingsName} component={SettingsScreen} />
                
            </Tab.Navigator>
    )
}

const TabNavigatorLandscaper = () => {
  return (
    <Tab.Navigator
    initialRouteName={postsName}
    screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
            let rn = route.name
        }
    })}
    >
        <Tab.Screen name={'LPosts'} component={LandscaperPostsScreen} />
        <Tab.Screen name={'LTasks'} component={LandscaperTasksScreen} />
        <Tab.Screen name={'LSettings'} component={LandscaperSettingsScreen} />
        
    </Tab.Navigator>
)
}
const MainContainer = () => {
    const { isLoggedIn, userData } = useLogin();
    console.log(isLoggedIn)
    return isLoggedIn ? (!userData.isLandscaper ? <TabNavigator /> : <TabNavigatorLandscaper />) : <StackNavigator />;
  };
export default MainContainer