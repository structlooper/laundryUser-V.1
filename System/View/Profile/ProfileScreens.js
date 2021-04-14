import React from "react";
import { View, Text,StyleSheet,Image,TouchableOpacity } from "react-native";
import { mainColor } from "../../Utility/MyLib";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const iconColor= mainColor;
const iconsSize= 20;

const navigationTab = (onPress,name,icon) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.CustomNavigation}>
        {/*<FontAwesome5 name={icon} size={iconsSize} color={iconColor} />*/}
        <MaterialIcons name={icon} size={iconsSize} color={iconColor} />
        <Text style={styles.NavigationLabel}>{name}</Text>
      </View>
    </TouchableOpacity>
  )
}

const page = () => {

  return (
    <View>
      <View style={styles.ProfileDetailsContainer}>
        <View style={styles.ProfileImageContainer}>
          <Image source={require('../../Public/Images/machine.jpg')} style={styles.ProfileImage}/>
        </View>
        <View style={styles.ProfileNameContainer}>
          <Text style={styles.ProfileName}>Ashwin Kumar</Text>
          <TouchableOpacity>
            <Text style={styles.Btn}>View profile</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.CustomNavigationContainer}>
        {navigationTab(() => {console.log('my order')},'My Orders','apps')}
        {navigationTab(() => {console.log('my Address')},'My Address','room')}
        {navigationTab(() => {console.log('my Address')},'About us','insert-drive-file')}
        {navigationTab(() => {console.log('my Address')},'Contact us','envelope')}
        {navigationTab(() => {console.log('my Address')},'Terms & Conditions','content-past')}
        {navigationTab(() => {console.log('my Address')},'Logout','logout')}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ProfileDetailsContainer:{
    flexDirection:'row',
    backgroundColor:'#fff',
    marginVertical:5,

  },
  ProfileImageContainer:{
    padding:25,
  },
  ProfileImage:{
    width:100,
    height:100,
    borderRadius:150/2,
    borderWidth:.2,
    borderColor:'grey'
  },
  ProfileNameContainer:{
    justifyContent:'center'
  },
  ProfileName:{
    fontSize:18,
  },
  Btn:{
    color:mainColor
  },
  CustomNavigationContainer:{
    padding:10,
    backgroundColor: '#fff'
  },
  CustomNavigation:{
    flexDirection: 'row',
    marginHorizontal:10,
    marginVertical: 15,
  },
  NavigationLabel:{
    marginLeft:10,
  }
})
export default page;
