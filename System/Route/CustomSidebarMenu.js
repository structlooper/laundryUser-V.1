import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import {logo} from '../Utility/Images'
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { ImageUrl, mainColor, UserImagePlaceHolder } from "../Utility/MyLib";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../Utility/AuthContext";


const getUserDetails = async () => {
  return await AsyncStorage.getItem('userDetails')
}

const CustomSidebarMenu = (props) => {
  const [userDetails,SetUserDetails] = React.useState("{}")
  React.useEffect(()=>{
    getUserDetails().then(details => {
      SetUserDetails(details);
    })
  },)
  let dataConverted = JSON.parse(userDetails)
  const {logOut} = React.useContext(AuthContext)
  let dp = (dataConverted.profile_picture !== null) ? {uri:ImageUrl+dataConverted.profile_picture} : UserImagePlaceHolder
  // console.log(dataConverted.membership)
  return (
    <SafeAreaView style={{flex: 1, }}>
      {/*Top Large Image */}
      <View style={{ backgroundColor:mainColor,paddingVertical:15,paddingHorizontal:10,flexDirection:'row'}}>
        <Image
          source={dp}
          style={styles.sideMenuProfileIcon}
        />
        <View style={{ justifyContent:'center',marginHorizontal:5}}>
          <Text style={{color:'#fff'}}>
            {dataConverted.customer_name}
          </Text>

          {(dataConverted.membership === undefined) ? null : (dataConverted.membership === null) ? null : <View
            style={{
              borderRadius: 100 / 2,
              marginVertical: 5,
              paddingHorizontal:2,
              backgroundColor: '#d75757',
            }}>
            <Text style={{ color: '#fff',textAlign:'center' }}>
              {dataConverted.membership.title}
            </Text>
          </View>
          }
          <Text  style={{color:'#fff'}}>
            {dataConverted.phone_number}
          </Text>

        </View>
      </View>

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />

      </DrawerContentScrollView>

      <View style={{
        flexDirection:'row',
        borderTopColor: 'grey',
        borderTopWidth: .3
      }}>
        <TouchableOpacity
          {...props}
          onPress={ async () => {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('userDetails');
            const logout = () => {logOut()}
            logout()
          }}
        >

        <Text
              style={{
                fontSize: 15,
                // textAlign: 'center',
                color: 'black',
                margin:20,
              }}>
          <FontAwesome5 name={'sign-out-alt'} size={18} color={'grey'}   />  Logout
        </Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    // resizeMode: 'contain',
    width: 80,
    height: 80,
    borderRadius: 500 / 2,
    // alignSelf: 'center',

  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomSidebarMenu;
