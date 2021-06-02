import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { MyButton, MyOutlineButton, MyTextInput } from "../../Utility/MyLib";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const Page = ({navigation}) => {
  const [ promocode, setPromocode ] = React.useState("");

  return (
    <View style={Styles.mainContainer}>
      <View style={Styles.topContainer}>
        <Text style={{
          fontWeight:'bold',
          fontSize:16,
          textAlign:'center',
          marginBottom:'3%'
        }}>Slot Details</Text>
        <View style={{
          marginVertical:'1%',
          marginHorizontal:'1%'
        }}>
          <Text>Pickup 27 May, | 09:00 am to 10:00 am</Text>
        </View>
        <View style={{
          marginVertical:'1%',
          marginHorizontal:'1%'
        }}>
          <Text>Drop 28 May | 11:00 am to 12:00 pm</Text>
        </View>
      </View>
      <View style={Styles.topContainerOne}>
        <Text style={{
          fontWeight:'bold',
          fontSize:16,
          textAlign:'center'
        }}>Service Details</Text>
        <ScrollView>
          <Text style={{
            paddingVertical:4,
          }}>Wash and fold</Text>
          <Text style={{
            paddingVertical:4,
          }}>Dry cleaning</Text>

        </ScrollView>
        <View>
          <Text style={{
            fontWeight:'bold',
            fontSize:16,
            textAlign:'center',
            marginVertical:'2%'
          }}>Estimated cloths</Text>
          <View style={{
            flexDirection:'row'
          }}>
            <View style={{
              flex:1,
              padding:5,
              backgroundColor:'rgba(83,203,154,0.87)',marginHorizontal:5
            }}>
              <Text style={{
                color:'#fff',
                textAlign:'center'
              }}> {"<"}20</Text>
            </View>
            <View style={{
              flex:1,
              padding:5,
              backgroundColor:'rgba(83,203,154,0.87)',marginHorizontal:5
            }}>
              <Text style={{
                color:'#fff',
                textAlign:'center'
              }}> 20-40</Text>
            </View>
            <View style={{
              flex:1,
              padding:5,
              backgroundColor:'rgba(83,203,154,0.87)',marginHorizontal:5
            }}>
              <Text style={{
                color:'#fff',
                textAlign:'center'
              }}> >40</Text>
            </View>
          </View>
          <View style={{
            flexDirection:'row',
            marginTop:10,
          }}>
            <View style={{
              flex:1,
              padding:5,
              borderRadius:100/2,
              backgroundColor:'rgba(107,248,189,0.87)',marginHorizontal:5
            }}>
              <Text style={{
                color:'#000',
                textAlign:'center',

              }}> Carpet+</Text>
            </View>
            <View style={{
              flex:1,
              padding:5,
              borderRadius:100/2,
              backgroundColor:'rgba(107,248,189,0.87)',marginHorizontal:5
            }}>
              <Text style={{
                color:'#000',
                textAlign:'center',

              }}>Blanket+</Text>
            </View>
            <View style={{
              flex:1,
              padding:5,
              borderRadius:100/2,
              backgroundColor:'rgba(107,248,189,0.87)',marginHorizontal:5
            }}>
              <Text style={{
                color:'#000',
                textAlign:'center',

              }}> Curtains+</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={Styles.middleContainer}>
        <Text style={{
          fontWeight:'bold',
          fontSize:16,
          // textAlign:'center'
        }}>Offers</Text>
        <View style={{
          marginTop:'5%'
        }}>
          <Text> <FontAwesome5 name={'percent'} color={'grey'} size={20} />   Select a promo code </Text>
          <View style={{
            flexDirection:'row',
            marginTop: '2%'
          }}>
            { MyTextInput(
              promocode,
              setPromocode,
              'enter promocode here',
              {
                width:'100%',
                height:50,
                backgroundColor: '#fff',
              }
            ) }
            {
              MyOutlineButton(
                ()=>{console.log('apply')},
                'Apply'
              )
            }
          </View>

        </View>
      </View>
      <View style={Styles.bottomContainer}>
        {MyButton(
          ()=>{navigation.navigate('OrderPlaced')},
          'Proceed',
          {width:'30%',
          }
        )}
      </View>
    </View>
  );
};
const Styles = StyleSheet.create({
  mainContainer:{
    height:'100%',
    marginTop:'1%',
    backgroundColor:'#fff'
  },
  topContainer:{
    height: '20%',
    padding:'3%',
    paddingHorizontal:'5%',
    borderBottomWidth:.5,

  },
  topContainerOne:{
    height: '40%',
    padding:'3%',
    paddingHorizontal:'5%',
    borderBottomWidth:.5,

  },
  middleContainer:{
    height: '30%',
    padding:'3%',
    paddingHorizontal:'5%'
  },
  bottomContainer:{
    height:'10%',
    alignItems:'center',
    justifyContent:'center',
    paddingBottom:10,
  }
})
export default Page;
