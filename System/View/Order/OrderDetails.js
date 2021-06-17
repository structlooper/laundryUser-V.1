import React, { useEffect } from "react";
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native'
import { AppName, fetchAuthPostFunction, mainColor, MyButton } from "../../Utility/MyLib";
import {useNavigationState} from '@react-navigation/native';
import NoDataFound from "../NoDataFound";
import Loader from "../../Utility/Loader";
import moment from "moment";
import orderStatusImage from "../../Controller/OrderImageController";


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
    const [order,setOrder] = React.useState(null);

    useEffect(() => {
        getOrderDetails().then()
    },[])
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
                          {order_products.product_name} ({order_products.item_count}) ({order_products.service_name})
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
    if (order === null){
        return <Loader />
    }
    else if(  Object.keys(order).length === 0 ){
        return <NoDataFound />
    }else {
        return (
          <ScrollView style={styles.mainContainer}>
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
                      <Text style={styles.addressHeader}>
                          Payment
                      </Text>
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
    }
})
export default OrderDetails;
