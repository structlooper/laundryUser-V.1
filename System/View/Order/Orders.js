import React from 'react';
import {View,Text,StyleSheet,Image,ScrollView,TouchableOpacity} from 'react-native';
import { fetchAuthPostFunction, mainColor } from "../../Utility/MyLib";
import Loader from "../../Utility/Loader";
import NoDataFound from "../NoDataFound";
import orderStatusImage from "../../Controller/OrderImageController";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from 'moment';
import OrderCountDownController from "../../Controller/OrderCountDownController";
import { useIsFocused } from "@react-navigation/native";
const Orders = ({navigation}) => {
    const isFocused = useIsFocused();
    const [orders,setOrders] = React.useState(null)
    React.useEffect(() => {
        getUserOrders().then()
    },[isFocused])

    const getUserOrders = async () => {
        let UserDetails = await AsyncStorage.getItem('userDetails')
        let userId = JSON.parse(UserDetails).id
        await fetchAuthPostFunction('get_orders',{customer_id:userId,lang:'en'}).then(response => {
            setOrders(response.result);
        })
    }

    const orderCard = (order,i) => {
        return (
          <TouchableOpacity onPress={() => {navigation.navigate('HomeScreenStack',{screen:'orderDetails',params:{order_id:order.id}})}} key={i}>
              <View style={styles.orderCart}>
                  <View style={styles.statusImageContainer}>
                      <Image source={orderStatusImage(order)} style={styles.statusImage}/>
                  </View>
                  <View style={styles.orderLabelContainer}>
                      <Text style={styles.orderLabelHeader}>
                          Order : {order.order_id}
                      </Text>
                      <Text>
                          {moment(order.created_at).format('MMM Do YYYY, h:mm a')}
                      </Text>
                      <Text style={styles.orderStatusLabel}>
                          {order.label_name}
                      </Text>
                      {OrderCountDownController(order.label_name,order.drop_duration) }

                  </View>
                  <View style={styles.priceContainer}>
                      <Text style={styles.priceLabel}>
                          ₹{order.total}
                      </Text>
                  </View>
              </View>
          </TouchableOpacity>

        )
    }





    if (orders === null ){
        return <Loader />
    }else if(orders.length === 0 ||  orders === []){
        return <NoDataFound />
    }else{
        return (
          <View style={styles.mainContainer}>
              <ScrollView>
                  {
                      orders.map((order,i) => {
                          return orderCard(order,i)
                      })
                  }
              </ScrollView>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor:'#eee',
        height:'100%'
    },
    orderCart:{
        backgroundColor: '#fff',
        flexDirection:'row',
        margin:5,
        padding:10,
        borderBottomWidth:.5,

    },
    statusImageContainer:{
        // borderWidth:3,
        // borderRadius: 100/2,
        // padding:8,
        // borderColor:'grey'
    },
    statusImage:{
        width:70,
        height:70,
        // borderRadius: 70/ 2
    },
    orderLabelContainer : {
        flex:.9,
        marginLeft:25,
    },
    orderLabelHeader:{
        fontSize:15,
        fontWeight:'bold',
        marginVertical: 2,
    },
    orderStatusLabel:{
        marginVertical:2,
        fontSize: 18,
        color:mainColor,
    },
    priceContainer:{
        marginVertical:20
    },
    priceLabel:{
        fontSize:20,
        fontWeight: 'bold',
        color: 'black'
    }
})
export default Orders;
