import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { fetchGetFunction, ImageUrl, mainColor, MyButton, MyToast } from "../../Utility/MyLib";
import NoDataFound from "../NoDataFound";
import Loader from "../../Utility/Loader";
const whiteColor = '#fff';
const inputColor = mainColor;
const secondaryColor = '#eee';
const AllServices = ({navigation}) => {
  const [services,setServices] = React.useState(null);
  const [selectedServices,setSelectedServices] = React.useState([]);
  const [selectedServicesName,setSelectedServicesName] = React.useState([]);
  const [update,setUpdate] = React.useState(null);


  React.useEffect(() => {
    getAllServices().then()
    navigation.addListener('focus', _onFocus);
  },[update])

  const _onFocus = () => {
      setSelectedServices([])
      setSelectedServicesName([])
  }

  const getAllServices = async () => {
    fetchGetFunction('service').then(re=>{
      setServices(re)
    })
  }
  const handleServiceSelection = (serviceId,serviceName) =>{
    const sS = selectedServices;
    const selectedServicesNames = selectedServicesName;
    const index = sS.indexOf(serviceId);
    const indexNames = selectedServicesNames.indexOf(serviceId);
    if (index === -1){
      sS.push(serviceId)
      selectedServicesNames.push(serviceName)
      setUpdate(sS+'plus')
    }else{
      sS.splice(index, 1);
      selectedServicesNames.splice(indexNames, 1);
      setUpdate(sS+'minus')

    }
    setSelectedServices(sS)
    setSelectedServicesName(selectedServicesNames)
  }

  const renderServiceList = () => {
    let Final=[];
    let subFinal=[];
    services.map((service, i) =>
      {
        if (i%2!==0){
          subFinal.push(service)
        }else{
          subFinal.push(service)
          Final.push(subFinal)
          subFinal=[]
        }
      }
    )
    return (Final.reverse()).map((data,i) => {
      if (data.length > 1){
        return serviceRow(data,i)
      }
      return serviceRowTwo(data,i)
    })
  }
  const serviceRow =  (data,i) => {
    const colorDesc0 = (selectedServices.includes(data[0].id))?'#fff':'#000';
    const colorDesc1 = (selectedServices.includes(data[1].id))?'#fff':'#000';
    return (
      <View style={Styles.innerContainer} key={i}>
        <TouchableOpacity style={(selectedServices.includes(data[0].id))?Styles.innerContainerChildActive:Styles.innerContainerChild}
                          onPress={()=>{ handleServiceSelection(data[0].id,data[0].name) }}
        >
          <Image source={{uri:ImageUrl+ data[0].image}} style={{
            width:wp('15'), height:hp('8'),
            resizeMode:'contain'
          }} />
          <Text style={(selectedServices.includes(data[0].id))?Styles.ServiceTextActive:Styles.ServiceText} >
            {data[0].name}
          </Text>
          <Text style={{ fontSize:wp('2'),color:colorDesc0 }}>{data[0].description}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={(selectedServices.includes(data[1].id))?Styles.innerContainerChildActive:Styles.innerContainerChild}
                          onPress={()=>{ handleServiceSelection(data[1].id,data[1].name) }}
        >
          <Image source={{uri:ImageUrl+ data[1].image}} style={{
            width:wp('15'), height:hp('8'),
            resizeMode:'contain'
          }} />
          <Text style={(selectedServices.includes(data[1].id))?Styles.ServiceTextActive:Styles.ServiceText}>
            {data[1].name}
          </Text>
          <Text style={{ fontSize:wp('2'),color:colorDesc1 }}>{data[1].description}</Text>

        </TouchableOpacity>
      </View>
    )
  }
  const serviceRowTwo =  (data,i) => {
     data=data[0];
     const colorDesc = (selectedServices.includes(data.id))?'#fff':'#000';
    return (
      <View style={Styles.innerContainer} key={i}>
        <TouchableOpacity style={(selectedServices.includes(data.id))?Styles.innerContainerChildActive:Styles.innerContainerChild}
                          onPress={()=>{ handleServiceSelection(data.id,data.name) }}
        >
          <Image source={{uri:ImageUrl+data.image}} style={{
            width:wp('15'), height:hp('8'),
            resizeMode:'contain'
          }} />
          <Text style={(selectedServices.includes(data.id))?Styles.ServiceTextActive:Styles.ServiceText} >
            {data.name}
          </Text>
          <Text style={{ fontSize:wp('2'),color:colorDesc }}>{data.description}</Text>

        </TouchableOpacity>
      </View>
    )
  }
  if (!services){
    return Loader();
  }else if(services.length > 0){
    return (
      <View style={Styles.mainContainer}>
        <View style={Styles.childContainer}>
          <Text style={Styles.headerText}>Services</Text>
        </View>
        <ScrollView>
          <View style={Styles.childContainerTwo}>
            {renderServiceList()}
          </View>
        </ScrollView>
        <View style={Styles.bottomContainer}>
          {MyButton(
            ()=>{ ((selectedServices).length > 0) ?
              navigation.navigate('process',{
                selectedServices:selectedServices,
                selectedServicesNames:selectedServicesName})
              :MyToast('Please select at least one service')
            },
            'Schedule',
            {width: wp('80%')}
          )}
        </View>
      </View>
    );
  }
  return NoDataFound();
};

const Styles = StyleSheet.create({
  mainContainer:{
    height:'100%',
    backgroundColor:whiteColor,
  },
  childContainer:{
    marginVertical:'5%',
    justifyContent:'center',
    alignItems:'center'
  },
  headerText:{
    fontSize:wp('6'),
    fontWeight:'bold',
    color:inputColor
  },
  childContainerTwo:{
    flex:1,
    // height:'100%',
    alignItems: 'center'
  },
  innerContainer:{
    marginVertical: '1%',
    flexDirection:'row',
    paddingHorizontal:'15%',
  },
  innerContainerChild:{
    // flex:1.2,
    borderWidth:1,
    borderColor:secondaryColor,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10/2,
    backgroundColor:secondaryColor,
    height: hp('20%'),
    width:wp('35%'),
    padding:5,
    marginHorizontal:5,
    overflow:'hidden'

  },
  innerContainerChildActive:{
    // flex:1.2,
    borderWidth:1,
    borderColor:secondaryColor,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10/2,
    backgroundColor:mainColor,
    height: hp('20%'),
    width:wp('35%'),
    padding:5,
    marginHorizontal:5,
    overflow:'hidden'

  },
  ServiceText:{
    textAlign:'center',
    color: inputColor,
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  ServiceTextActive:{
    textAlign:'center',
    color: '#fff',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  bottomContainer:{
    marginHorizontal: '6%',
    marginBottom:'2%',
    alignItems:'center'
  }
})

export default AllServices;
