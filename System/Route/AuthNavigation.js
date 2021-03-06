import React from "react";
import { View, Text ,TouchableOpacity,Image,StyleSheet} from "react-native";

import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomSidebarMenu from "./CustomSidebarMenu";

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { mainColor, capitalizeFirstLetter, AppName, fetchAuthPostFunction } from "../Utility/MyLib";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Home from '../View/Home';
import Offers from "../View/Offers";
import Notification from "../View/Notifications";
import ProfileScreens from "../View/Profile/Profile";
import Notifications from "../View/Notifications";
import Orders from "../View/Order/Orders";
import OrderDetails from "../View/Order/OrderDetails";
import AddressList from "../View/Address/AddressList";
import CreateAddress from "../View/Address/Create";
import CreateAddressFlag from "../View/Address/CreateAddressFlag";
import TestPage from "../View/TestPage";
import PriceList from "../View/PriceList/priceList";
import Faq from "../View/Faq/Faq";
import ServicesSlider from "../View/Services/ServicesSlider";
import Cart from "../View/Cart";
import TimeBar from "../View/TimeSlot/TimeBar";
import AboutUs from "../View/AboutUs";
import Contact from "../View/Contact";
import TermsAndConditions from "../View/TermsAndConditions";
import Process from "../View/Process/Process";
import ProcessNext from "../View/Process/ProcessNext";
import OrderPlaced from "../View/Process/OrderPlaced";
import MembershipDetails from "../View/MembershipDetails";
import AllServices from "../View/AllServices/AllServices";
import Feedback from "../View/Feedback";
import ReferAndEarn from "../View/ReferEarn/Refer&earn";
import EnterCode from "../View/ReferEarn/EnterCode";
import Wallet from '../View/Wallet/Wallet';
import RequestPayment from "../View/Payment/RequestPayment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../Utility/AuthContext";
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
const Badge = ({count})=>(
  <View style ={styles.circle}>
    <Text style={styles.count}>{count}</Text>
  </View>
);
const getHeaderTopRight = (navigation) => {
  const {notiCount} = React.useContext(AuthContext)
  const notiCountHere = notiCount()
  return (
    <View style={{ flexDirection:'row',alignItems:'center' }}>
      <TouchableOpacity onPress={() => {navigation.navigate('PriceListScreenStack')}}>
        <FontAwesome5 name={'search'} size={iconsSize} color={mainColor} style={{marginRight:15}} />
      </TouchableOpacity>
      {/*<TouchableOpacity onPress={() => {navigation.navigate('Notifications')}}>*/}
      {/*  <FontAwesome5 name={'cart-arrow-down'} size={iconsSize} color={mainColor} style={{marginRight:15}} />*/}
      {/*</TouchableOpacity>*/}
      <TouchableOpacity onPress={() => {navigation.navigate('Notifications')}}>
        <View style={{ flexDirection:'row' }}>
          <FontAwesome5 name={'bell'} size={iconsSize} color={mainColor} style={[notiCountHere > 0 ? {} : {marginRight:20}]}  />
          {notiCountHere > 0 ?
            <Text style={{marginRight:15, fontSize:wp(2.5),fontWeight:'bold'}} >{notiCountHere}</Text>:null
          }
        </View>

      </TouchableOpacity>
    </View>
  )
}
const getHeaderTitle = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'feed';
  switch (routeName) {
    case 'HomeTab':
      return AppName;
    case 'Profile':
      return 'Account';
    case 'Notification':
      return 'Notifications';
    case 'Offers':
      return 'Offers';
    case 'Service':
      return 'Services';
    case 'Orders':
      return 'Orders';
    case 'TermsAndConditions':
      return 'Terms & Conditions';
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
        // showLabel: false,
      }}>
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={{
          tabBarLabel: AppName,
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
            <FontAwesome5 name={'user-edit'} size={iconsSize} color={color} />
          )
        }}
      />


    </Tab.Navigator>
  );
};

const HomeScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName={AppName}
     screenOptions={({route}) => ({
      headerTitle: getHeaderTitle(route),

      headerRight: () => getHeaderTopRight(navigation),
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
        name= {AppName}
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
        options={({route}) => ( {
          title:  capitalizeFirstLetter(route.params.serviceName) ?? 'Service Details',
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
          title:  (route.params !== undefined) ?'Update Address' : 'Add Address',
        })}


      />
      <Stack.Screen
        name="CreateAddressFlag"
        component={CreateAddressFlag}

        options={({route}) => ({
          title:  'Add Address',
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
      <Stack.Screen
        name="process"
        component={Process}

        options={({route}) => ({
          title: 'Schedule',
        })}


      />
      <Stack.Screen
        name="ProcessNext"
        component={ProcessNext}

        options={({route}) => ({
          title: 'Schedule' +
            ' +',
        })}


      />
      <Stack.Screen
        name="OrderPlaced"
        component={ OrderPlaced }

        options={({route}) => ({
          title: 'Order Placed',
          headerShown: false,
        })}


      />
      <Stack.Screen
        name="MembershipDetails"
        component={ MembershipDetails }

        options={({route}) => ({
          title: 'Member offer',
        })}


      />
      <Stack.Screen
        name="AllServices"
        component={ AllServices }

        options={({route}) => ({
          title: 'All Services',
        })}
      />
      <Stack.Screen
        name="requestPayment"
        component={ RequestPayment }

        options={({route}) => ({
          title: 'Payment',
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
        headerRight: () =>getHeaderTopRight(navigation),
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
        options={({route}) => ({
          title: (route.params !== undefined) ?'Update Address' : 'Add Address',
        })}
      />

    </Stack.Navigator>
  );
};

const FaqScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="Faqs"
      screenOptions={{
        headerRight: () => getHeaderTopRight(navigation),
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
        headerRight: () => getHeaderTopRight(navigation),
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
        headerRight: () => getHeaderTopRight(navigation),
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
        headerRight: () => getHeaderTopRight(navigation),
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
          title: 'Terms & Conditions',
        }}
      />


    </Stack.Navigator>
  );
};
const PriceListScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="PriceList"
      screenOptions={{
        headerRight: () => getHeaderTopRight(navigation),
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
        name="PriceList"
        component={PriceList}
        options={{
          title: AppName,
        }}
      />


    </Stack.Navigator>
  );
};
const FeedBackScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="Feedback"
      screenOptions={{
        headerRight: () => getHeaderTopRight(navigation),
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
        name="Feedback"
        component={ Feedback }
        options={{
          title: AppName,
        }}
      />


    </Stack.Navigator>
  );
};
const ReferAndEarnScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="ReferAndEarn"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#000',

      }}>
      <Stack.Screen
        name="ReferAndEarn"
        component={ ReferAndEarn }
        options={{
          title: 'Refer & Earn',
          headerRight: () => getHeaderTopRight(navigation),
          headerLeft: () => (
            <NavigationDrawerStructure
              navigationProps={navigation}
            />
          ),
        }}
      />
      <Stack.Screen
        name="EnterCode"
        component={ EnterCode }
        options={{
          title: 'Redeem referral code',
        }}
      />
    </Stack.Navigator>
  );
};
const WalletScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="Wallet"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#000',

      }}>
      <Stack.Screen
        name="Wallet"
        component={ Wallet }
        options={{
          title: 'Balance',
          headerRight: () => getHeaderTopRight(navigation),
          headerLeft: () => (
            <NavigationDrawerStructure
              navigationProps={navigation}
            />
          ),
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
        itemStyle: {marginVertical: hp('0.5')},
      }}
      drawerStyle={{
        backgroundColor: '#eee',
        width: "55%",
      }}
      drawerContent={(props) => <CustomSidebarMenu {...props} />}
    >

      <Drawer.Screen
        name="HomeScreenStack"
        options={{
          drawerLabel: AppName,
          drawerIcon:({color , size}) => (
            <FontAwesome5 name={'home'} size={iconsSize} color={color} style={{marginRight:-20}} />
          ),
        }}

        component={HomeScreenStack}
      />
      <Drawer.Screen
        name="walletStackScreen"
        options={{
          drawerLabel: 'Balance',
          drawerIcon:({color , size}) => (
            <FontAwesome5 name={'wallet'} size={size - 2} color={color} style={{marginRight:-20,marginLeft:4}} />
          )

        }}
        component={WalletScreenStack}
      />
      <Drawer.Screen
        name="PriceListScreenStack"
        options={{
          drawerLabel: 'Price list',
          drawerIcon:({color , size}) => (
            <FontAwesome5 name={'tag'} size={size - 2} color={color} style={{marginRight:-20,marginLeft:4}} />
          )

        }}
        component={PriceListScreenStack}
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
        name="ReferAndEarn"
        options={{
          drawerLabel: 'Refer & Earn',
          drawerIcon:({color , size}) => (
            <FontAwesome5 name={'share-alt'} size={size - 2} color={color} style={{marginRight:-20,marginLeft:4}} />
          )

        }}
        component={ReferAndEarnScreenStack}
      />
      <Drawer.Screen
        name="FeedBackScreenStack"
        options={{
          drawerLabel: 'Feedback',
          drawerIcon:({color , size}) => (
            <FontAwesome5 name={'telegram-plane'} size={size - 2} color={color} style={{marginRight:-20,marginLeft:4}} />
          )

        }}
        component={FeedBackScreenStack}
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

const styles = StyleSheet.create({
  circle:{
    width:36,
    height:36,
    borderRadius:18  , //half radius will make it cirlce,
    // backgroundColor:'red'
    flexDirection:'row'
  },
  count:{color:'#000'}
})
export default AuthNavigation;
