import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TextInput } from "react-native";
import { AppName, fetchAuthPostFunction, mainColor, MyButton, MyToast, MyTransButton } from "../../Utility/MyLib";
import {useNavigationState} from '@react-navigation/native';
import NoDataFound from "../NoDataFound";
import Loader from "../../Utility/Loader";
import moment from "moment";
import orderStatusImage from "../../Controller/OrderImageController";
import {
    heightPercentageToDP as hp,
    heightPercentageToDP,
    widthPercentageToDP as wp,
    widthPercentageToDP,
} from "react-native-responsive-screen";
import { useIsFocused } from "@react-navigation/native";
import { red } from "react-native-reanimated/src/reanimated2/Colors";
import Modal from "react-native-modal";
import PaymentMethodController from "../../Controller/PaymentMethodController";



const bill = (labelName,price,style) => {

    return (
      <View style={{flexDirection:'row',marginVertical:4,}}>
          <View style={{flex:3.5 , paddingLeft:4}}>
              <Text style={style}>
                  {labelName}
              </Text>
          </View>
          <View style={{flex:1}} />
          <View style={{flex:1}}>
              <Text style={style}>
                  {price}
              </Text>
          </View>
      </View>
    )
}

const homeBtn = (navigation,routeName) => {
    if (routeName === 'ViewCart'){
        return MyButton(() => {navigation.navigate('HomeScreenStack',{screen:AppName})},'Go Home',{marginTop:10},'home')
    }else{
        return null
    }
}

const OrderDetails = ({navigation,route}) => {
    const state = useNavigationState(state => state);
    const routeName = (state.routeNames[state.index]);
    const {order_id} = route.params;
    const isFocused = useIsFocused();
    const [order,setOrder] = React.useState(null);
    const [isModalVisible,setModalVisible] = React.useState(false);
    const [cancelReason,onChangeCancelReason] = React.useState('');
    const [btnLoading,setBtnLoading] = React.useState(false)

    useEffect(() => {
        getOrderDetails().then()
    },[isFocused])
    const getOrderDetails = async () => {
        await fetchAuthPostFunction('order',{order_id:order_id}).then(response => {
            setOrder(response)
        })
    }


    const product = (order_products,i) => {
        return (
          <View style={{ paddingHorizontal:5}} key={i}>
              <View style={{flexDirection:'row' ,paddingVertical:5 }}>
                  <View style={{flex:.5}}>
                      <Text style={{ fontSize:15,color: mainColor,fontWeight: 'bold'}}>
                          {order_products.qty} {order_products.unit}
                      </Text>
                  </View>
                  <View style={{flex:2}}>
                      <Text style={{ fontSize:15,color: 'black'}}>
                          {order_products.product_name} {order_products.item_count?'('+order_products.item_count+')':null } ({order_products.service_name})
                      </Text>
                  </View>
                  <View style={{flex:.9}}>
                      <Text style={{ fontSize:15,color: 'black',marginLeft:40}}>
                          ₹ {order_products.price}
                      </Text>
                  </View>
              </View>
          </View>
        )
    }

    const orderCancelModal = () => {
        return (
          <Modal isVisible={isModalVisible} >
              <View style={{flex: .7,borderWidth:.2,backgroundColor:'#eee',}}>
                  <View style={{borderBottomWidth:.5,paddingBottom:10,padding:10}}>
                      <View>
                          {MyButton(() => {setModalVisible(!isModalVisible)},'Back','','arrow-left')}
                      </View>
                  </View>
                  <View style={{ backgroundColor:'#fff',height:'88%',paddingVertical:20,alignItems:'center'}}>
                      <ScrollView style={{width:'80%',}} >
                          <View style={{ alignItems: 'center', marginTop: hp(5), paddingHorizontal: wp(10) }}>
                              <Text style={{ textAlign: 'center' }}>Please tell us why you want to cancel order?</Text>
                              <View style={{ padding:'1%' }}>
                                  <View style={styles.textAreaContainer} >
                                      <TextInput
                                        style={styles.textArea}
                                        underlineColorAndroid="transparent"
                                        placeholder="Order cancel reason . . . ."
                                        placeholderTextColor="grey"
                                        onChangeText={onChangeCancelReason}
                                        value={cancelReason}
                                        numberOfLines={6}
                                        multiline={true}
                                      />
                                  </View>
                              </View>
                              {MyButton(
                                () => {

                                    setBtnLoading(true)
                                    if (cancelReason){
                                        fetchAuthPostFunction('order/cancel' , {
                                            order_id:order.id,
                                            status:8,
                                            cance_reason:cancelReason
                                        }).then(response => {
                                            if (response.status === 1){

                                                getOrderDetails().then()
                                                onChangeCancelReason('')
                                                setModalVisible(!isModalVisible)
                                            }
                                            MyToast(response.message)
                                        })
                                    }else{
                                        MyToast('Please enter cancel reason.')
                                    }
                                    setBtnLoading(false)
                                    // PaymentMethodController({
                                    //     order_id: orderDetails.id,
                                    //     payment_status: '3',
                                    //     payment_methods: paymentMethod
                                    // }).then(response => {
                                    //     if (response.status === 1) {
                                    //         navigation.navigate('orderDetails', { order_id: orderDetails.id })
                                    //     } else {
                                    //         MyToast(response.message)
                                    //     }
                                    //     setBtnLoading(false)
                                    // })
                                },
                                'Yes, Cancel',
                                {
                                    borderWidth: 1,
                                    borderRadius: 20 / 2,
                                    backgroundColor: 'rgb(60,141,188)',
                                    marginVertical: hp(5),
                                    width: wp(50)
                                },
                                '',
                                btnLoading
                              )}
                          </View>
                      </ScrollView>
                  </View>
              </View>
          </Modal>
        )
    }

    if (order === null){
        return <Loader />
    }
    else if(  Object.keys(order).length === 0 ){
        return <NoDataFound />
    }else {
        return (
          <ScrollView style={styles.mainContainer}>
              {orderCancelModal()}
              <View style={styles.headerContainer}>
                  <Text style={styles.orderHeaderLabel}>
                      Order Id - {order.order_id}
                  </Text>
                  <Text style={styles.orderDate}>
                      {moment(order.created_at).format('MMM Do YYYY, h:mm a')}
                  </Text>
                  <View style={styles.headerImageContainer}>
                      <Image source={orderStatusImage(order)} style={styles.headerImage} />
                  </View>
                  <Text style={styles.orderStatusLabel}>
                      {order.label_name}
                  </Text>
              </View>
              <View style={styles.middleContainer}>
                  <View style={styles.middleContainerHeader}>
                      <Text style={styles.addressHeader}>
                          Address
                      </Text>
                      <Text style={styles.addressDesc}>
                          {order.address_details.door_no}
                      </Text>
                      <Text style={styles.addressDesc}>
                          {order.address_details.address}
                      </Text>

                  </View>
                  <View style={styles.middleContainerHeader}>
                      <View style={{ flexDirection:'row' }}>
                          <Text style={[styles.addressHeader,{flex:1}]}>
                              Payment
                          </Text>
                          {(order.status < 4)?MyTransButton(
                            ()=>{
                                setModalVisible(!isModalVisible)
                            },
                            'Cancel order',
                            {
                                borderWidth:1,
                                borderRadius:20/2,
                                paddingHorizontal:widthPercentageToDP('10'),
                                paddingVertical:heightPercentageToDP('.5'),
                                backgroundColor:'#aa1616'
                            },
                            {
                                color:'#fff'
                            }
                          ):null}
                          {(order.payment_status === 'Requested' && order.status > 3)?MyTransButton(
                            ()=>{
                                (order.total > 0)? navigation.navigate('requestPayment',{orderDetails:order}):
                                  MyToast('Invalid amount')
                            },
                            'Pay now',
                            {
                                borderWidth:1,
                                borderRadius:20/2,
                                paddingHorizontal:widthPercentageToDP('10'),
                                paddingVertical:heightPercentageToDP('.5'),
                                backgroundColor:mainColor
                            },
                            {
                                color:'#fff'
                            }
                          ):null}
                      </View>

                      <Text style={styles.addressDesc}>
                          {order.payment_mode} ( {order.payment_status} )
                      </Text>
                  </View>
                  <View style={styles.middleContainerHeader}>
                      <View style={{ flexDirection: 'row' }}>
                          <View style={{ flex: 1 }}>
                              <Text style={styles.addressHeader}>
                                  Pickup Date
                              </Text>
                              <Text style={styles.addressDesc}>
                                  {order.pickup_time}, {moment(order.expected_pickup_date).format('MMM D')}
                              </Text>
                          </View>
                          <View>
                              <Text style={styles.addressHeader}>
                                  Drop Date
                              </Text>
                              <Text style={styles.addressDesc}>
                                  {order.drop_time}, {moment(order.expected_delivery_date).format('MMM D')}
                              </Text>
                          </View>
                      </View>


                  </View>

                  <View style={styles.orderProductContainer}>
                      <ScrollView style={{ maxHeight: 80 , minHeight: 80 }}>
                          {
                              (order.order_products).map((order_product,i) =>{
                                  return product(order_product,i)
                              })
                          }
                      </ScrollView>

                  </View>
              </View>
              <View style={styles.bottomContainer}>
                  {bill('Subtotal', '₹ '+order.sub_total, styles.priceLabel)}
                  {(order.discount > 0) ?bill('Discount', '₹ '+order.discount, styles.priceLabel):null}
                  {(order.mem_total_discount > 0)?bill('Membership Discount', '₹ '+order.mem_total_discount, styles.priceLabel):null}
                  {bill('Delivery Charges', '₹ '+order.delivery_changes, styles.priceLabel)}
                  {(order.delivery_changes_discount > 0)?bill('Delivery free', '₹ -'+order.delivery_changes_discount, styles.priceLabel):null}
                  {bill('Total', '₹ '+order.total, styles.priceLabelFinal)}
              </View>
              {homeBtn(navigation,routeName)}
          </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer:{
        height:'100%',
        backgroundColor:'#fff',
        paddingHorizontal:10,
        borderTopColor:'#eee',
        borderTopWidth:5
    },
    headerContainer:{
        alignItems:'center',
        justifyContent:'center',
        borderBottomColor: 'grey',
        borderBottomWidth:1,
        paddingBottom:10,

    },
    orderHeaderLabel:{
        fontSize:18,
        fontWeight:'bold',
    },
    orderDate:{
        marginVertical:2
    },
    headerImageContainer:{
        marginVertical:10,
        // borderWidth:3,
        // borderRadius: 150/2,
        padding:5,
        // borderColor:'grey'
    },
    headerImage:{
        width:120,
        height: 120,
        // borderRadius: 150/ 2
    },
    orderStatusLabel:{
        fontSize: 18,
        fontWeight: 'bold',
        color:mainColor
    },
    middleContainer:{
        marginVertical:10,
        borderBottomColor: 'grey',
        borderBottomWidth:1,
    },
    middleContainerHeader:{
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    addressHeader:{
        fontSize:20,
        fontWeight:'bold'
    },
    addressDesc:{
        fontSize:15
    },
    orderProductContainer:{
        marginTop:5,
        padding:10,
        borderTopColor: '#000',
        borderTopWidth: .5
    },
    priceLabel:{
        fontSize: 14
    },
    priceLabelFinal:{
        fontSize: 16,fontWeight:"bold"
    },
    bottomContainer:{
        paddingHorizontal:10
    },
    textAreaContainer: {
        borderColor: 'grey',
        borderWidth: .5,
        borderRadius:20/2,
        padding: '1%'
    },
    textArea: {
        height: hp(12),
        width:wp(50),
        justifyContent: "flex-start",
        textAlignVertical: 'top',
        color:'#000',
        lineHeight:hp('2')
    }
})
export default OrderDetails;
