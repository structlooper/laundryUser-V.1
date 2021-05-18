import React, { useEffect } from "react";
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text, Image,ScrollView } from "react-native";
import {
  fetchAuthPostFunction,
  fetchImagePostFunction,
  ImageUrl,
  mainColor,
  MyButton,
  MyOutlineButton,
  MyTextInput, MyToast,
  UserImagePlaceHolder,
} from "../../Utility/MyLib";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Loader from "../../Utility/Loader";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const Profile =   ({ navigation }) => {
  const isFocused = useIsFocused();
  const [request, onRequest] = React.useState('1');
  const [username, onChangeUsername] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [email, onChangeEmail] = React.useState(null);
  const [profileImage, setProfileImage] = React.useState(null);
  const [userDetails,setUserDetails] = React.useState(null)

  useEffect(() => {
    getUserDetails().then()
  },[isFocused,request])


  const getUserDetails = async () => {
    let user = JSON.parse(await AsyncStorage.getItem('userDetails'))
    setUserDetails(user)
    onChangeUsername(user.customer_name)
    onChangeEmail(user.email)
    // onChangeNumber(user.phone_number)
  }
  if (userDetails === null){
    return <Loader />
  }

  const updateProfileFunction = async () => {
    setLoading(true);
    let dom ={
      user_id:(userDetails.id),
      customer_name:username,
      email:email,
    };
    const MyResponse = async (response) => {
      if (response.status === 1){
        await AsyncStorage.setItem('userDetails',JSON.stringify(response.data))
        let toggle = (request === "1") ? "0" : "1";
        onRequest(toggle)
        setProfileImage(null)
      }
      setLoading(false)
      MyToast(response.message)
    }
    if (profileImage !== null){
      fetchImagePostFunction('customer/update',dom,profileImage).then(async response => {
        MyResponse(response).then()
      })
    }else{
      fetchAuthPostFunction('customer/update',dom).then(async response => {
        MyResponse(response).then()
      })
    }


  }

  let dp = (userDetails.profile_picture !== null) ? {uri:ImageUrl+userDetails.profile_picture} : UserImagePlaceHolder
  return (
    <View style={{ flex:1 }}>
      <View style={styles.ProfileDetailsContainer}>
        <View style={styles.ProfileImageContainer}>
          <Image source={dp} style={styles.ProfileImage}/>
        </View>
        <View style={styles.ProfileNameContainer}>
          <Text style={styles.ProfileName}>{userDetails.customer_name}</Text>
          { (userDetails.membership === undefined) ?null:(userDetails.membership === null) ? null :
          <View style={{borderWidth:.1,padding:2,borderRadius:100/2,backgroundColor:'#d75757' }}>
              <Text  style={{color:'#fff',fontSize:17,marginLeft:5}}>
                {userDetails.membership.title}
              </Text>
            </View>
              }
          <TouchableOpacity>
            <Text style={styles.Btn}>{userDetails.phone_number}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={{ backgroundColor:'#fff',marginTop:5,height:'100%'}}>

      <View >
        <SafeAreaView style={styles.signupForm}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={() => {
              launchImageLibrary({},(response) => {
                if (response["didCancel"] === undefined){
                  setProfileImage(response)
                }else{
                  setProfileImage(null)
                }
              })
            }}
            >
              <View
                style={{
                  borderWidth: 1,
                  borderColor: 'grey',
                  width: 150, height: 150, borderRadius:150/2,
                  backgroundColor: 'grey',
                  alignItems:'center',
                  justifyContent:'center'
                }}>
                {(profileImage === null)
                  ?  <FontAwesome5 name={'camera'} size={35} color={'white'} />
                  :
                  <Image source={{ uri:profileImage.uri }} style={{  width: 150, height: 150, borderRadius:150/2, }} />

                }
              </View>
            </TouchableOpacity>
              <View style={{alignItems: 'center', marginTop: 5}}>
                <Text style={{fontSize: 15}}>
                  {(profileImage === null)? " Upload Image":"Uploaded Image"}
                </Text>
              </View>
             </View>

          {MyTextInput(username,onChangeUsername,'Full Name',styles.input,'account') }
          {MyTextInput(email,onChangeEmail,'Email',styles.input,'email') }
          {/*{MyOutlineButton(() => {console.log('upload')},'Select Image',styles.uploadImage,'camera')}*/}
        </SafeAreaView>
        <View style={styles.buttons}>
          {/*{ MyButton(signupController(navigation),'Register') }*/}
          { MyButton(() => {updateProfileFunction().then()} ,'Update','','account',loading) }
        </View>

      </View>
      </ScrollView>


    </View>
  )
}
const styles = StyleSheet.create({
  input: {
    margin: 5,
    backgroundColor:'#fff'
  },

  signupForm : {
    padding:6,
    marginVertical:20,
    margin:15,

  },
  buttons:{
    padding:6,
    marginHorizontal:20
  },
  uploadImage:{
    borderColor:mainColor,
    borderWidth:1,
    margin:5,
    backgroundColor: '#fff'
  },
  ProfileDetailsContainer:{
    flexDirection:'row',
    backgroundColor:'#fff',
    marginTop:5,

  },
  ProfileImageContainer:{
    paddingVertical:25,
    paddingLeft:30,
    paddingRight:10,
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
})
export default Profile;
