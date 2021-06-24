import React from "react";
import { View, Text, ScrollView } from "react-native";
import {
  fetchAuthPostFunction,
  isFloat,
  mainColor,
  MyButton,
  MyNumericInput,
  MyOutlineButton,
  MyToast,
} from "../../Utility/MyLib";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Loader from "../../Utility/Loader";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoDataFound from "../NoDataFound";
import moment from "moment/moment";
import Modal from "react-native-modal";
import PaymentMethodController from "../../Controller/PaymentMethodController";
import PaymentController from "../../Controller/PaymentController";

const wallet = () => {
  const isFocused = useIsFocused();
  const [loader, setLoader] = React.useState(true);
  const [wallet, setWallet] = React.useState(null);
  const [isModalVisible,setModalVisible] = React.useState(false)
  const [btnLoading,setBtnLoading] = React.useState(false)
  const [rechargeAmt,setRechargeAmt] = React.useState(null)

  React.useEffect(() => {
    getWalletDetails().then()
  },[isFocused]);

  const getWalletDetails = async () => {
    let userId = (JSON.parse(await AsyncStorage.getItem('userDetails'))).id;
    fetchAuthPostFunction('wallet/statement',{customer_id: userId}).then(response => {
      if (response.status === 1){
        setWallet(response.result)
        setLoader(false)
      }
    })
  }
  if(loader){
    return Loader();
  }
  const creditedCard = (data,i) => {
    return (
      <View style={{flexDirection:'row', marginVertical:hp('1') ,alignItems:'center',height:hp('9'),backgroundColor:'#fff',borderRadius:10/2,borderWidth:.5 }} key={i}>
        <View style={{ flex:.3,borderRightWidth:.3,height:hp('8.9'),justifyContent:'center',alignItems:'center',borderRadius:10/2,backgroundColor:'rgb(0,207,255)' }}>
          <Text style={{ color:'#fff',fontWeight:'bold',fontSize:wp('4') }}>₹ {data.amount}</Text>
          <Text style={{ color:'#fff' }}>Created</Text>
        </View>
        <View style={{ flex:1,marginLeft:wp(2),paddingHorizontal:wp(4), }}>
          <Text style={{ fontSize:wp('3.1') }}>{data.statement}</Text>
          <Text style={{ color:'grey' }}>{moment(data.created_at).fromNow()}</Text>
        </View>
      </View>
    );
  }
  const debitedCard = (data,i) => {
    return (
      <View style={{flexDirection:'row', marginVertical:hp('1') ,alignItems:'center',height:hp('9'),backgroundColor:'#fff',borderRadius:10/2 ,borderWidth:.5}} key={i}>
        <View style={{ flex:.3,borderRightWidth:.3,height:hp('8.9'),justifyContent:'center',alignItems:'center',borderRadius:10/2,backgroundColor:'rgb(221,122,124)' }}>
          <Text style={{ color:'#fff',fontWeight:'bold',fontSize:wp('4') }}>₹ {data.amount}</Text>
          <Text style={{ color:'#fff' }}>Debited</Text>
        </View>
        <View style={{ flex:1,marginLeft:wp(2),paddingHorizontal:wp(4), }}>
          {/*<Text style={{ fontSize:wp('3.1') }}>Rs 50 debited from your wallet for Order (ORD124876).</Text>*/}
          <Text style={{ fontSize:wp('3.1') }}>{data.statement}</Text>
          <Text style={{ color:'grey' }}>{moment(data.created_at).fromNow()}</Text>
        </View>
      </View>
    )
  }

  const functionModal = () => {
    return (
      <Modal isVisible={isModalVisible} >
        <View style={{flex: .6,borderWidth:.2,backgroundColor:'#eee',}}>
          <View style={{borderBottomWidth:.5,paddingBottom:10,padding:10}}>
            <View>
              {MyButton(() => {setModalVisible(!isModalVisible)},'Back','','arrow-left')}
            </View>
          </View>
          <View style={{ backgroundColor:'#fff',height:'88%',alignItems:'center'}}>
            <ScrollView style={{width:wp('90'),}} >

              <View style={{ alignItems:'center',marginTop:hp(5),paddingHorizontal:wp(10) }}>
                <Text style={{ fontWeight:'bold' }}>Amount</Text>
                <View style={{ flex:1,marginTop:hp(2) }}>
                  {
                    MyNumericInput(
                      rechargeAmt,
                      setRechargeAmt,
                      'Enter amount here..',
                      {
                        height:hp(5),
                        backgroundColor:'#fff',
                        textAlign:'center'
                      },


                    )
                  }
                </View>

                {MyButton(
                  ()=> {
                    if (rechargeAmt && rechargeAmt > 0) {
                      PaymentController((rechargeAmt * 100).toString(), 'Wallet recharge').then(async res => {
                        if (res == 'true') {
                          let user_id = (JSON.parse(await AsyncStorage.getItem('userDetails'))).id;
                          setLoader(true)
                          fetchAuthPostFunction('wallet/add_money', {
                            customer_id: user_id,
                            amount: rechargeAmt
                          }).then(response => {
                            if (response.status === 1) {
                              getWalletDetails()
                            } else {
                              MyToast(response.message)
                            }
                            setModalVisible(!isModalVisible)
                            setLoader(false)
                            setRechargeAmt(null)
                          })
                        } else {
                          MyToast('Payment fail')
                        }
                      })
                    }else{MyToast('Please enter amount to recharge!!')}
                  },
                  'Proceed',
                  {
                    borderWidth: 1,
                    borderRadius: 20/2,
                    backgroundColor:'rgb(60,141,188)',
                    marginVertical:hp(5),
                    width: wp(50)
                  },
                  'currency-inr',
                  btnLoading
                )}

              </View>

            </ScrollView>
          </View>
        </View>
      </Modal>
    )
  }

  return (
    <View style={{ flex:1,backgroundColor:'#fff',marginTop:'1%' }}>
      {functionModal()}
        <View style={{ flex:.3 }}>
          <View style={{ flexDirection:'row',width:wp('90'),height:hp('13'), borderRadius:20/2,margin:'5%',alignItems:'center' }}>
            <View style={{ }}>
              <Text style={{ color:'grey' }}>Balance</Text>
              <Text style={{ color:mainColor,fontWeight:'bold',fontSize:wp('10'),marginTop:hp('.3') }}>₹ {wallet.wallet +( isFloat(wallet.wallet)?null:'.00')}</Text>
            </View>
          </View>

        </View>
        <View style={{ justifyContent:'center',padding:wp(5) }}>
          {
            MyOutlineButton(
              ()=>{
                setModalVisible(!isModalVisible)
              },
              'Top up',
              {
                width:wp('30'),
                borderRadius:40/2,
                borderColor:mainColor,
                borderWidth:.5
              },
              'plus'
            )

          }
        </View>
        <View style={{  paddingHorizontal:wp('5'),flex:1 }}>
          <View style={{ }}>
            <Text style={{ fontSize:wp('5') }}>Statements</Text>
          </View>
          <ScrollView>
            {
              (wallet.statements.length > 0)?
                wallet.statements.map((data,i) => {
                  if (data.amt_status === 'credited'){
                    return creditedCard(data,i)
                  }else{
                    return debitedCard(data,i)
                  }
                })
                :NoDataFound()
            }
          </ScrollView>
        </View>

     </View>
  );
};

export default wallet ;
