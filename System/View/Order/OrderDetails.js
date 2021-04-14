import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native'
import {mainColor, MyButton} from "../../Utility/MyLib";
import {useNavigationState} from '@react-navigation/native';

const bill = (labelName,price,style) => {

    return (
        <View style={{flexDirection:'row',marginVertical:4,}}>
            <View style={{flex:1 , paddingLeft:4}}>
                <Text style={style}>
                    {labelName}
                </Text>
            </View>
            <View style={{flex:1}}></View>
            <View style={{flex:1,alignItems: 'center'}}>
                <Text style={style}>
                    {price}
                </Text>
            </View>
        </View>
    )
}

const product = (name,qty,price) => {
    return (
        <View style={{ paddingHorizontal:5}}>
            <View style={{flexDirection:'row' ,paddingVertical:5 }}>
                <View style={{flex:.5}}>
                    <Text style={{ fontSize:15,color: mainColor,fontWeight: 'bold'}}>
                        {qty}
                    </Text>
                </View>
                <View style={{flex:2}}>
                    <Text style={{ fontSize:15,color: 'black'}}>
                        {name}
                    </Text>
                </View>
                <View style={{flex:1}}>
                    <Text style={{ fontSize:15,color: 'black',marginLeft:40}}>
                        {price}
                    </Text>
                </View>
            </View>
        </View>
    )
}
const homeBtn = (navigation) => {
    const state = useNavigationState(state => state);
    const routeName = (state.routeNames[state.index]);
    if (routeName === 'TimeBar'){
        return MyButton(() => {navigation.navigate('HomeScreenStack',{screen:'Services'})},'Go Home',{marginTop:10},'home')
    }else{
        return (
            <View></View>
        )
    }
}

const OrderDetails = ({navigation}) => {

    return (
        <View style={styles.mainContainer}>
           <View style={styles.headerContainer}>
               <Text style={styles.orderHeaderLabel}>
                   Order Id - 00007
               </Text>
               <Text style={styles.orderDate}>
                   31 Aug-2019 19:05
               </Text>
               <View style={styles.headerImageContainer}>
                   <Image source={require('../../Public/Images/machine.jpg')} style={styles.headerImage}/>
               </View>
               <Text style={styles.orderStatusLabel}>
                   Order Placed
               </Text>
           </View>
            <View style={styles.middleContainer}>
                <View style={styles.middleContainerHeader}>
                    <Text style={styles.addressHeader}>
                        Delivery Address
                    </Text>
                    <Text style={styles.addressDesc}>
                        46 , Dadiseth, Agiary Lane, Kalbadev
                    </Text>

                </View>
                <View style={styles.middleContainerHeader}>
                    <Text style={styles.addressHeader}>
                        Delivery Date
                    </Text>
                    <Text style={styles.addressDesc}>
                        31 Aug- 2020
                    </Text>

                </View>

                <View style={styles.orderProductContainer}>
                    <ScrollView style={{maxHeight:100}}>

                        {product('Blazer (Dry Cleaning)','2x','$ 4')}
                        {product('Jens (Dry Cleaning)','3x','$ 3')}
                        {product('Shirt (Dry Cleaning)','5x','$ 8')}
                        {product('Mens Kurta (Dry Cleaning)','1x','$ 10')}


                    </ScrollView>

                </View>
            </View>
            <View style={styles.bottomContainer}>
                {bill('Subtotal','$ 10.0',styles.priceLabel)}
                {bill('Discount','$ 01.3',styles.priceLabel)}
                {bill('Total','$ 09.0',styles.priceLabelFinal)}
            </View>
            {homeBtn(navigation)}
        </View>

    )
}

const styles = StyleSheet.create({
    mainContainer:{
        height:'100%',
        backgroundColor:'#fff',
        paddingHorizontal:10
    },
    headerContainer:{
        alignItems:'center',
        justifyContent:'center',
        borderBottomColor: 'grey',
        borderBottomWidth:1,
        paddingVertical:20
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
        borderWidth:3,
        borderRadius: 150/2,
        padding:5,
        borderColor:'grey'
    },
    headerImage:{
        width:150,
        height: 150,
        borderRadius: 150/ 2
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
        paddingVertical: 10
    },
    addressHeader:{
        fontSize:20,
        fontWeight:'bold'
    },
    addressDesc:{
        fontSize:15
    },
    orderProductContainer:{
        padding:10,
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
