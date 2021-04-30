import React, { useEffect } from "react";
import {View,Text,ScrollView,StyleSheet,TouchableOpacity} from 'react-native';
import {useNavigationState} from '@react-navigation/native';
import { fetchAuthPostFunction, mainColor, MyToast } from "../Utility/MyLib";
import { useIsFocused } from "@react-navigation/native";
import NoDataFound from "./NoDataFound";
import Loader from "../Utility/Loader";
const Offers =  ({navigation,route}) => {
  const isFocused = useIsFocused();
  const [offers , setOffers] = React.useState(null);
  const state = useNavigationState(state => state);
  const routeName = (state.routeNames[state.index]);

  useEffect(() => {
    getOffers().then()
  },[isFocused])

  const getOffers = async () => {
    await fetchAuthPostFunction('promo',{lang:'en'}).then(response => {
      setOffers(response.result)
    })
  }
  const offerCard = (offer,i) => {
    const applyPromo = async () => {
      const {cartId} = route.params
      await fetchAuthPostFunction('promo/select',{promo_id:offer.id,cart_id:cartId}).then(response => {
        MyToast(response.message)
        if (response.status === 1){
          navigation.goBack()
        }
      })
    }
    const btn = () => {
        if (routeName === 'ServicesSlider') {
          return (
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() => {
                  applyPromo().then()
                }}
              >
                <Text style={{ textAlign: 'right', color: mainColor }}>
                  APPLY
                </Text>
              </TouchableOpacity>

            </View>
          )
        } else {
          return null
        }
      }
    return (
      <View style={{ flex: 1, marginTop: 5, padding: 20, backgroundColor: '#fff' }}  key={i}>
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <View style={{}}>
            <View style={styles.offerCode}>
              <Text style={{ color: 'green', fontSize: 16 }}>{offer.promo_code}</Text>

            </View>
          </View>
          {/*apply btn here*/}
          {btn()}

        </View>

        <View>
          <Text style={{ fontSize: 19, fontWeight: "bold" }}>
            {offer.promo_name}
          </Text>
          <Text style={{ textAlign: "justify"  }}>
            {offer.description}
          </Text>
        </View>

      </View>
    )
  }



if (offers === null){
  return <Loader/>
}else if (offers.length === 0 && offers !== []){
  return <NoDataFound />
}else {
  return (
    <View style={{ backgroundColor: '#eee' }}>
      <ScrollView>

        {
          offers.map((offer,i) => {
            return offerCard(offer,i)
          })
        }
      </ScrollView>

    </View>
  )
}
}
const styles = StyleSheet.create({
  offerCode:{
    padding:10,paddingHorizontal:15,
    borderWidth:1,borderColor:'green',
  }
})
export default Offers;
