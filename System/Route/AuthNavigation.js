import React from "react";
import { View, Text ,TouchableOpacity,Image} from "react-native";

import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomSidebarMenu from "./CustomSidebarMenu";

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {mainColor} from "../Utility/MyLib";

import Home from '../View/Home';
import Offers from "../View/Offers";
import Notification from "../View/Notifications";
import ProfileScreens from "../View/Profile/Profile";
import Notifications from "../View/Notifications";
import Orders from "../View/Order/Orders";
import OrderDetails from "../View/Order/OrderDetails";
import AddressList from "../View/Address/AddressList";
import CreateAddress from "../View/Address/Create";
import TestPage from "../View/TestPage";
import Faq from "../View/Faq/Faq";
import ServicesSlider from "../View/Services/ServicesSlider";
import Cart from "../View/Cart";
import TimeBar from "../View/TimeSlot/TimeBar";
import AboutUs from "../View/AboutUs";
import Contact from "../View/Contact";
import TermsAndConditions from "../View/TermsAndConditions";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const iconsSize = 20;

const NavigationDrawerStructure = (props) => {


  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={() => props.navigationProps.toggleDrawer()}>
        <Image
          source={require('../Public/Images/menu.png')}
          style={{width: 28, height: 28, marginLeft: 18}}
        />

      </TouchableOpacity>
    </View>
  );
};

const getHeaderTitle = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

  switch (routeName) {
    case 'HomeTab':
      return 'KRYCHE';
    case 'Profile':
      return 'Account';
    case 'Notification':
      return 'Notifications';
    case 'Offers':
      return 'Offers';
    case 'Service':
      return 'Home';
  }
};

const BottomStack = () => {

  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      tabBarOptions={{
        activeTintColor: mainColor,
        inactiveTintColor: 'gray',
        style: {
          backgroundColor: 'white',
          padding:4,
        },
        indicatorStyle: { backgroundColor: 'black'},
        showLabel: false,
      }}>
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={{
          tabBarLabel: 'Home',

          tabBarIcon:({color , size}) => (
            <FontAwesome5 name={'home'} size={iconsSize} color={color} />
          ),

        }}

      />
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{
          tabBarLabel: 'Orders',

          tabBarIcon:({color , size}) => (
            <FontAwesome5 name={'tshirt'} size={iconsSize} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Offers"
        component={Offers}
        options={{
          tabBarLabel: 'Offers',

          tabBarIcon:({color , size}) => (
            <FontAwesome5 name={'tag'} size={iconsSize} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreens}
        options={{
          tabBarLabel: 'Profile',

          tabBarIcon:({color , size}) => (
            <FontAwesome5 name={'user-tie'} size={iconsSize} color={color} />
          )
        }}
      />


    </Tab.Navigator>
  );
};

const HomeScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="Home"
     screenOptions={({route}) => ({
      headerTitle: getHeaderTitle(route),

      headerRight: () => (
        <TouchableOpacity onPress={() => {navigation.navigate('Notifications')}}>
          <FontAwesome5 name={'bell'} size={iconsSize} color={mainColor} style={{marginRight:15}} />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        // fontWeight: 'bold',
      },
    })}               
    >
      <Stack.Screen
        name="Home"
        component={BottomStack}
        options={{
          headerLeft: () => (
            <NavigationDrawerStructure
              navigationProps={navigation}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
      />
      <Stack.Screen
        name="orderDetails"
        component={OrderDetails}
        options={{
          title: 'Order Details',
        }}
      />
      <Stack.Screen
        name="ServicesSlider"
        component={ServicesSlider}

        options={({route}) => ({

          title: 'Service Details',

        })}


      />

      <Stack.Screen
        name="ViewCart"
        component={Cart}

        options={({route}) => ({
          title: 'Cart',
        })}


      />
      <Stack.Screen
        name="SelectAddress"
        component={AddressList}

        options={({route}) => ({
          title: 'Select Address',

        })}


      />
      <Stack.Screen
        name="CreateAddress"
        component={CreateAddress}

        options={({route}) => ({
          title: 'Add Address',
        })}


      />

      <Stack.Screen
        name="newOrderDetails"
        component={OrderDetails}

        options={({route}) => ({
          title: 'Order Detail',
          headerShown: false,
        })}


      />

      <Stack.Screen
        name="Offers"
        component={Offers}

        options={({route}) => ({
          title: 'Apply Coupons',

        })}


      />
      <Stack.Screen
        name="TimeBar"
        component={TimeBar}

        options={({route}) => ({
          title: 'Time Slot',
        })}


      />
    </Stack.Navigator>
  );
};

const AddressScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="AddressList"
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity onPress={() => {navigation.navigate('Notifications')}}>
            <FontAwesome5 name={'bell'} size={iconsSize} color={mainColor} style={{marginRight:15}} />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#000',
      }}>
      <Stack.Screen
        name="AddressList"
        component={AddressList}
        options={{
          headerLeft: () => (
            <NavigationDrawerStructure
              navigationProps={navigation}
            />
          ),
          title: 'Saved Address',
        }}
      />
      <Stack.Screen
        name="CreateAddress"
        component={CreateAddress}
        options={{
          title: 'Create Address',
        }}
      />

    </Stack.Navigator>
  );
};

const FaqScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="Faqs"
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity onPress={() => {navigation.navigate('Notifications')}}>
            <FontAwesome5 name={'bell'} size={iconsSize} color={mainColor} style={{marginRight:15}} />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#000',
        headerLeft: () => (
          <NavigationDrawerStructure
            navigationProps={navigation}
          />
        ),
      }}>
      <Stack.Screen
        name="Faqs"
        component={Faq}
        options={{
          title: 'Faqs',
        }}
      />


    </Stack.Navigator>
  );
};

const AboutScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="AboutUs"
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity onPress={() => {navigation.navigate('Notifications')}}>
            <FontAwesome5 name={'bell'} size={iconsSize} color={mainColor} style={{marginRight:15}} />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#000',
        headerLeft: () => (
          <NavigationDrawerStructure
            navigationProps={navigation}
          />
        ),
      }}>
      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{
          title: 'About us',
        }}
      />


    </Stack.Navigator>
  );
};
const ContactScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="Contact"
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity onPress={() => {navigation.navigate('Notifications')}}>
            <FontAwesome5 name={'bell'} size={iconsSize} color={mainColor} style={{marginRight:15}} />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#000',
        headerLeft: () => (
          <NavigationDrawerStructure
            navigationProps={navigation}
          />
        ),
      }}>
      <Stack.Screen
        name="Contact"
        component={Contact}
        options={{
          title: 'Contact us',
        }}
      />


    </Stack.Navigator>
  );
};
const TermsAndConditionsScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="TermsAndCondition"
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity onPress={() => {navigation.navigate('Notifications')}}>
            <FontAwesome5 name={'bell'} size={iconsSize} color={mainColor} style={{marginRight:15}} />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#000',
        headerLeft: () => (
          <NavigationDrawerStructure
            navigationProps={navigation}
          />
        ),
      }}>
      <Stack.Screen
        name="TermsAndCondition"
        component={TermsAndConditions}
        options={{
          title: 'Contact us',
        }}
      />


    </Stack.Navigator>
  );
};
const MainNavigator = () => {
  return (
    // <NavigationContainer>
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: mainColor,
        itemStyle: {marginVertical: 5},
      }}
      drawerStyle={{
        backgroundColor: '#eee',
        width: 240,
      }}
      drawerContent={(props) => <CustomSidebarMenu {...props} />}
    >

      <Drawer.Screen
        name="HomeScreenStack"
        options={{
          drawerLabel: 'Home',
          drawerIcon:({color , size}) => (
            <FontAwesome5 name={'home'} size={iconsSize} color={color} style={{marginRight:-20}} />
          ),
        }}

        component={HomeScreenStack}
      />
      <Drawer.Screen
        name="AddressScreenStack"
        options={{
          drawerLabel: 'Address',
          drawerIcon:({color , size}) => (
            <FontAwesome5 name={'map-marker'} size={size - 2} color={color} style={{marginRight:-20,marginLeft:4}} />
          )

        }}
        component={AddressScreenStack}
      />
      <Drawer.Screen
        name="aboutUs"
        options={{
          drawerLabel: 'About us',
          drawerIcon:({color , size}) => (
            <FontAwesome5 name={'scroll'} size={size - 8} color={color} style={{marginRight:-20,marginLeft:4}} />
          )

        }}
        component={AboutScreenStack}
      />
      <Drawer.Screen
        name="contactUs"
        options={{
          drawerLabel: 'Contact',
          drawerIcon:({color , size}) => (
            <FontAwesome5 name={'inbox'} size={size - 8} color={color} style={{marginRight:-20,marginLeft:4}} />
          )

        }}
        component={ContactScreenStack}
      />
      <Drawer.Screen
        name="TermsAndConditions"
        options={{
          drawerLabel: 'Terms & Conditions',
          drawerIcon:({color , size}) => (
            <FontAwesome5 name={'file-alt'} size={size - 6} color={color} style={{marginRight:-20,marginLeft:4}} />
          )

        }}
        component={TermsAndConditionsScreenStack}
      />
      <Drawer.Screen
        name="FaqScreenStack"
        options={{
          drawerLabel: 'Faqs',
          drawerIcon:({color , size}) => (
            <FontAwesome5 name={'question-circle'} size={size - 6} color={color} style={{marginRight:-20,marginLeft:4}} />
          )

        }}
        component={FaqScreenStack}
      />


    </Drawer.Navigator>
    // </NavigationContainer>
  );
};
const AuthNavigation = () => {
  return (
   <MainNavigator />
  );
};
export default AuthNavigation;
