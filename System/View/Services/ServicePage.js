import React, { useState } from "react";
import {View,Text,StyleSheet,Image,ScrollView,TouchableOpacity } from "react-native";
import {MyButton,mainColor} from "../../Utility/MyLib";
import { IconButton } from 'react-native-paper';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Modal from "react-native-modal";
const productCard = (itemImage,Name,qty,price,toggleModal) => {
  return (
    <View style={styles.ItemMain}>
      <View style={styles.ItemChild}>
        <Image source={itemImage} style={styles.ItemImage}>
        </Image>
      </View>
      <View style={styles.ItemChild}>
        <Text style={styles.ItemName}>
          {Name}
        </Text>
        {/*<TouchableOpacity onPress={toggleModal} >*/}
        {/*  <View style={styles.ItemServiceContainer}>*/}
        {/*    <Text style={styles.ItemService}>*/}
        {/*      Laundry*/}
        {/*    </Text>*/}
        {/*     <FontAwesome5 name={'caret-down'} size={23} color={mainColor} style={styles.ItemServiceIcon} />*/}

        {/*  </View>*/}
        {/*</TouchableOpacity>*/}

      </View>
      <View style={styles.ItemChild}>
        <View style={styles.AddCartBtn}>
          <View>
            <IconButton
              icon="minus"
              color={mainColor}
              size={15}
              onPress={() => console.log('Pressed')}
              style={{borderColor:mainColor,borderWidth:1}}
            />
          </View>
          <View style={{paddingTop:6}}>
            <Text>
              {qty}
            </Text>
          </View>
          <View>
            <IconButton
              icon="plus"
              color={mainColor}
              size={15}
              onPress={() => console.log('Pressed')}
              style={{borderColor:mainColor,borderWidth:1}}
            />
          </View>
        </View>

      </View>
      <View style={styles.ItemChild}>
        <Text style={styles.PriceLabel}>
          ₹ {price} /
        </Text>
        <Text style={styles.PriceLabel}>
          Piece
        </Text>
      </View>
    </View>
  )
}

const ServicePage = ({navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{flex: 1,width: '100%',backgroundColor:'#eee'}}>
      <Modal isVisible={isModalVisible} >
        <View style={{flex: .7,borderWidth:.2,backgroundColor:'#eee',}}>
          <View style={{borderBottomWidth:.5,paddingBottom:10,padding:10}}>
            <View style={{}}>
              {MyButton(toggleModal,'Back','','arrow-left')}
            </View>
          </View>
          <View style={{ backgroundColor:'#fff',height:'88%',paddingVertical:20,alignItems:'center'}}>
            <ScrollView style={{width:'80%',}} >
              <Text style={{fontSize:20}}>
                How will I know that my laundry has been picked-up?
              </Text>
              <Text style={{marginTop:10}}>
                We most certainly can sort your items on your behalf for an extra charge of $20. Also, you would be agreeing that if we added any item to either service, its not our responsibility. For example, if you wanted your sweaters to be wash and folded, but we chose the Dry Clean service as we were worried about shrinkage of the item, then its the customer responsibility, as we tried to sort the order to the best of our ability
                We most certainly can sort your items on your behalf for an extra charge of $20. Also, you would be agreeing that if we added any item to either service, its not our responsibility. For example, if you wanted your sweaters to be wash and folded, but we chose the Dry Clean service as we were worried about shrinkage of the item, then its the customer responsibility, as we tried to sort the order to the best of our ability
                We most certainly can sort your items on your behalf for an extra charge of $20. Also, you would be agreeing that if we added any item to either service, its not our responsibility. For example, if you wanted your sweaters to be wash and folded, but we chose the Dry Clean service as we were worried about shrinkage of the item, then its the customer responsibility, as we tried to sort the order to the best of our ability
              </Text>
            </ScrollView>
          </View>



          {/*<Button title="Hide modal" onPress={toggleModal} />*/}

        </View>

      </Modal>

      <ScrollView style={{marginTop:5}}>

        {productCard(require('../../Public/Images/blazer.png'),'Blazer',2,3,toggleModal)}
        {productCard(require('../../Public/Images/jeans.png'),'Jeans',3,5,toggleModal)}
        {productCard(require('../../Public/Images/shirt.png'),"Shirt",1,2,toggleModal)}
        {productCard(require('../../Public/Images/kurta.png'),"Mens Kurta",0,8,toggleModal)}

      </ScrollView>

      <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
        {MyButton(() => {navigation.navigate('HomeScreenStack',{screen:'ViewCart'})},'View Cart',styles.bottomView,'cart')}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  bottomView:{
    // padding:5,
    margin:10
  },
  ItemMain :{
    width:'100%',
    backgroundColor:'#fff',
    flexDirection:'row',
    marginVertical:1,
    padding:5,

  },
  ItemChild:{
    flex:.3,
    alignItems:'center',
    justifyContent:"center",
  },
  ItemImage:{
    height: 70,
    width: 70,
    resizeMode: 'contain'
  },
  ItemName:{
    fontSize:15,
    fontWeight:'bold',
  },
  PriceLabel:{
    fontSize: 15,
    color:mainColor
  },
  AddCartBtn:{
    flexDirection: 'row',
    padding:5,
    marginLeft:10
  },
  ItemService:{
    fontSize:12,
    color: mainColor
  },
  ItemServiceContainer:{
    flexDirection:'row'
  },
  ItemServiceIcon:{
    marginLeft: 2,
    marginTop:-3
  }

})
export default ServicePage;
