import React from 'react';
import {View,Text,StyleSheet,Image,ScrollView,TouchableOpacity} from 'react-native';
import {mainColor} from "../../Utility/MyLib";

const orderCard = (nav) => {
    return (
            <TouchableOpacity onPress={() => {nav.navigate('HomeScreenStack',{screen:'orderDetails'})}}>
                <View style={styles.orderCart}>
                    <View style={styles.statusImageContainer}>
                        <Image source={require('../../Public/Images/machine.jpg')} style={styles.statusImage}/>
                    </View>
                    <View style={styles.orderLabelContainer}>
                        <Text style={styles.orderLabelHeader}>
                            Order Id : 00007
                        </Text>
                        <Text>
                            31 Aug-2021 12:05
                        </Text>
                        <Text style={styles.orderStatusLabel}>
                            Order Placed
                        </Text>
                    </View>
                    <View style={styles.priceContainer}>
                        <Text style={styles.priceLabel}>
                            $ 8
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>

    )
}

const Orders = ({navigation}) => {
    return (
        <View style={styles.mainContainer}>
            <ScrollView>
                {orderCard(navigation)}
                {orderCard(navigation)}
                {orderCard(navigation)}
                {orderCard(navigation)}
                {orderCard(navigation)}
                {orderCard(navigation)}
                {orderCard(navigation)}
            </ScrollView>
        </View>
    )
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
        borderWidth:3,
        borderRadius: 100/2,
        padding:8,
        borderColor:'grey'
    },
    statusImage:{
        width:70,
        height:70,
        borderRadius: 70/ 2
    },
    orderLabelContainer : {
        flex:.9,
        marginLeft:25,
    },
    orderLabelHeader:{
        fontSize:18,
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
