import * as React from 'react';
import {
  Linking,
  Text,
  View,
  SafeAreaView , Image ,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TouchableHighlight,
  ImageBackground

} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {
  mainColor,
  MyButton,
  fetchGetFunction,
  ImageUrl,
  fetchAuthPostFunction, MyToast, MyOutlineButton, MyTransButton,
} from "../Utility/MyLib";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import PaymentController from "../Controller/PaymentController";
const height=Dimensions.get('window').height;
const width=Dimensions.get('window').width;
const iconSize = 30;
import Loader from "../Utility/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";



const MemberShipCard = (navigation,data,index) => {

  return (
    <View style={styles.membershipCardContainer} key={index}>
      <View style={styles.imageWrapper}>
        <ImageBackground style={styles.theImage} source={{uri : ImageUrl+data.banner_image}}>
          <View style={{
            marginTop:'10%',
            marginLeft:'5%',
            flex:1,
          }}>
            <View style={{ flex:1 }} />
            <View style={{ alignItems:'center', }}>
              {MyTransButton(
                () => {navigation.navigate('MembershipDetails',{memberShipId:data.id})},
                'Get start',
                {
                  width:wp('28'),
                  backgroundColor: 'rgba(125,106,239,.7 )',
                  color:'#fff',
                  fontSize:12,
                  borderRadius:50/2,
                  paddingVertical:'1%',
                  marginBottom:'.5%'
                },
                {
                  color:'#fff',
                  textAlign:'center'
                }
              )}
            </View>

          </View>
        </ImageBackground>
      </View>
    </View>
  )
}



export default class Home extends React.Component {


  constructor(props){

    super(props);
    this.state = {
      didMount:false,
      activeIndex:0,
      loader:true,
      whatsAppNumber:null,
      callNumber:null,
      carouselItems: [],
      activeSlide:0,
      services : [],
      members : [],
      selectedServices:[],
      selectedServicesNames:[],
      serviceScrollViewWidth:10,
      serviceCurrentXOffset:0,
    }
  }

  componentDidMount =  () =>{
    this.setState({
      didMount:true
    })
    this.callFunctions()
    this.props.navigation.addListener('focus', this._onFocus);
    this.props.navigation.addListener('blur', this._onBlur);
  }


  componentWillUnmount() {
    this.props.navigation.removeListener('blur', this._onBlur);
    this.props.navigation.removeListener('focus', this._onFocus);
  }


  _onFocus = () => {
    this.setState({
      selectedServices: [],
      selectedServicesNames:[]
    }, () => { this.setState(this.state)});
  };

  _onBlur = () => {
    this.setState({isFocused: false});
  };
  callFunctions = () => {
      this.getHomeBanners().then()
      this.getServices().then()
      this.getAppSettings().then()
      this.getMembershipDetails().then()
  }

  _handleServiceSelection = (serviceId,serviceName) => {
    const {selectedServices} = this.state;
    const {selectedServicesNames} = this.state;
    const index = selectedServices.indexOf(serviceId);
    const indexNames = selectedServicesNames.indexOf(serviceId);
    if (index === -1){
      selectedServices.push(serviceId)
      selectedServicesNames.push(serviceName)
    }else{
      selectedServices.splice(index, 1);
      selectedServicesNames.splice(indexNames, 1);
    }
    this.forceUpdate();
  }
  get pagination () {
    const { carouselItems, activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={carouselItems.length}
        activeDotIndex={activeSlide}
        containerStyle={{ backgroundColor: '#eee' , paddingVertical: 0 }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: '#000'
        }}
        inactiveDotStyle={{
          // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }
  getAppSettings = async () => {
    await fetchGetFunction('app_setting').then(response => {
      this.setState({
        whatsAppNumber:response.result.whatsapp_number,
        callNumber:response.result.contact_number
      })
    })
  }
  getHomeBanners = async  () => {
    await fetchGetFunction('servicesBanners').then(result => {
      let final = [];
      result.forEach(element => {
        element.banner_image =  ImageUrl + element.banner_image
        final.push(element)
      });
      this.setState({
        carouselItems: final
      })
    })
  }
  getServices = async  () => {
    await fetchGetFunction('service').then(result => {

      let final = [];
      result.forEach(element => {
        element.image =  ImageUrl + element.image
        element.navi = this.state.navigation
        final.push(element)
      });

      this.setState({
        services: final
      })
    })
    this.setState({
      loader:false,
    })
  }
  _renderItem({item,index}){
    return (
      <View style={{
        backgroundColor:'#fff',
        borderRadius: 5,
        padding:10,
        paddingTop:20,
        marginVertical:5,
        height:180,
      }} key={index}>
        <View style={{ flexDirection:'row'}}>
          <View style={{ flex:.9 }}>
            <Text style={{fontSize: 20}}>{item.title}</Text>
            <TouchableOpacity onPress={() => {
              // this.props.navigation.navigate('ServicesSlider',{serviceId:item.service_id,serviceName:item.service_name })
              console.log('where to redirect now')
            }}>
              <Text style={{ marginVertical:30,color:mainColor }}>{item.text}   <FontAwesome5 name={'arrow-right'} size={18} color={mainColor} /></Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems:'center' }}>
            <Image source={{ uri:item.banner_image }} style={{ width:150,height:150,resizeMode:'contain' }} />

          </View>

        </View>
      </View>

    )
  }
  openWhatsapp = () =>{
    let msg ="";
    let mobile = this.state.whatsAppNumber;
    let url =
      "whatsapp://send?text=" +
      msg +
      "&phone=91" +
      mobile;
    Linking.openURL(url)
      .then(data => {
        console.log("WhatsApp Opened successfully " + data);
      })
      .catch(() => {
        alert("Make sure WhatsApp installed on your device");
      });

  }
  openCallApp = () =>{
    let mobile = this.state.callNumber;
    Linking.openURL(`tel:${mobile}`)
      .then(data => {
        console.log("Call Opened successfully " + data);
      })
      .catch(() => {
        alert("Some error");
      });

  }
  getMembershipDetails = async () => {
    fetchGetFunction('membership/all').then(response => {
      this.setState({
        members:response
      })
    })
  }
  _handleScroll = (event) => {
    let newXOffset = event.nativeEvent.contentOffset.x
    this.setState({currentXOffset:newXOffset})
  }
  leftArrow = () => {
    let eachItemOffset = this.state.serviceScrollViewWidth / (this.state.services).length; // Divide by 10 because I have 10 <View> items
    let _serviceCurrentXOffset =  this.state.serviceCurrentXOffset - eachItemOffset;
    this.refs.scrollView.scrollTo({x: _serviceCurrentXOffset, y: 0, animated: true})
  }
  rightArrow = () => {
    let eachItemOffset = this.state.serviceScrollViewWidth /  (this.state.services).length; // Divide by 10 because I have 10 <View> items
    let _serviceCurrentXOffset =  this.state.serviceCurrentXOffset + eachItemOffset;
    this.refs.scrollView.scrollTo({x: _serviceCurrentXOffset, y: 0, animated: true})
  }

  ServiceCard = (data,navi,index) => {
    if (this.state.selectedServices.includes(data.id)){
      return (
        <View style={styles.ServiceCardActive} key={index}>
          <TouchableOpacity onPress={() => {this._handleServiceSelection(data.id,data.name)}}>
            <Image source={{uri:data.image}} style={styles.ServiceImage}/>
            <Text style={styles.ServiceHeadingActive}>{data.name}</Text>
            <Text style={styles.ServiceDescriptionActive}>{data.description}</Text>
          </TouchableOpacity>
        </View>
      )
    }
    return (
      <View style={styles.ServiceCard} key={index}>
        {/*<TouchableOpacity onPress={() => {navi.navigate('ServicesSlider',{serviceId:data.id,serviceName:data.name})}}>*/}
        <TouchableOpacity onPress={() => {this._handleServiceSelection(data.id,data.name)}}>
          <Image source={{uri:data.image}} style={styles.ServiceImage}/>
          <Text style={styles.ServiceHeading}>{data.name}</Text>
          <Text style={styles.ServiceDescription}>{data.description}</Text>
        </TouchableOpacity>
      </View>
    )
  }
  render() {
    if(!this.state.didMount) {
      return null;
    }
    const navigation = this.props.navigation;
    if (this.state.loader) {
      return <Loader />
    } else {
      return (
        <View style={{ height:'100%' }}>
          <View style={{ height:'100%', width: '100%', backgroundColor: '#eee' }}>
            <ScrollView >

              <SafeAreaView style={{ flex: 1, backgroundColor: '#eee' }}>

                <View style={{ justifyContent: 'center' }}>
                  <Carousel
                    layout={"default"}
                    ref={(carousel) => { this._carousel = carousel }}
                    data={this.state.carouselItems}
                    sliderWidth={width}
                    itemWidth={width}
                    renderItem={this._renderItem.bind(this)}
                    onSnapToItem={index => this.setState({
                      activeSlide:index
                    })}
                    // loop={true}
                    autoplay={true}
                    autoplayInterval={5000}
                  />
                  { this.pagination }
                  <View style={{
                    left:0,top:80,right:0,position:'absolute'
                  }}>
                    <TouchableOpacity onPress={() => {
                      this._carousel.snapToItem(this._carousel.currentIndex - 1)
                    }}>
                      <Text> <FontAwesome5 name={'chevron-left'} size={25} color={'rgba(23,29,46,0.3)'} /> </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ top:80,right:0,position:'absolute' }}>
                    <TouchableOpacity onPress={() => {
                      this._carousel.snapToItem(this._carousel.currentIndex + 1)
                    }}>
                      <Text> <FontAwesome5 name={'chevron-right'} size={25} color={'rgba(23,29,46,0.3)'} /> </Text>
                    </TouchableOpacity>
                  </View>

                </View>
                <View style={{ flexDirection:'row'}}>
                  <Text style={styles.Heading}>Select services</Text>
                  <TouchableOpacity style={{
                    marginRight:10,
                  }} onPress={() => {navigation.navigate('AllServices')}} >
                    <Text style={{

                      fontSize:14,
                      borderBottomWidth:1,
                      borderBottomColor:mainColor,
                      color:mainColor
                    }}>
                      See more
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={{ flexDirection:'row',width:'100%'}}>
                  <TouchableOpacity
                    style={{alignItems: 'flex-start',justifyContent:'center',backgroundColor:'#fff',borderRadius:100/2 }}
                    onPress={this.leftArrow}>
                    <Text> <FontAwesome5 name={'chevron-left'} size={25} color={'rgba(23,29,46,0.3)'} /> </Text>
                  </TouchableOpacity>
                  <ScrollView   horizontal={true}
                                pagingEnabled={true}
                                ref="scrollView"
                                onContentSizeChange={(w, h) => this.setState({serviceScrollViewWidth:w})}
                                onScroll={this._handleScroll}
                  >

                    <View style={styles.ServiceCardContainer}>
                      { ((this.state.services).length > 0) ? this.state.services.map((data, index) =>
                        {
                          return this.ServiceCard(data, navigation, index)
                        }
                      ) : null}

                    </View>

                  </ScrollView>
                  <TouchableOpacity
                    style={{alignItems: 'flex-end',justifyContent:'center',backgroundColor:'#fff',borderRadius:100/2}}
                    onPress={this.rightArrow}>
                    <Text>  <FontAwesome5 name={'chevron-right'} size={25} color={'rgba(23,29,46,0.3)'} /> </Text>
                  </TouchableOpacity>
                </View>
                <View style={{
                  alignItems:'center',
                  marginVertical:10
                }}>
                  {MyButton(() => {
                    ((this.state.selectedServices).length > 0) ?
                      navigation.navigate('process',{
                        selectedServices:this.state.selectedServices,
                        selectedServicesNames:this.state.selectedServicesNames})
                      :MyToast('Please select at least one service')
                    },'Schedule pickup'
                    ,{width:'60%'},'clock'
                  )}

                </View>
                <Text style={styles.Heading}>Membership Offers</Text>
                {/*{ ((this.state.members).length > 0) ? this.state.members.map((mem, index) =>*/}
                {/*  MemberShipCard(mem, index,'')*/}
                {/*) : null }*/}
                {                    (this.state.members).map((data,i) =>
                  MemberShipCard(navigation,data, i,)
                  )}

              </SafeAreaView>

            </ScrollView>
            <View style={{ height:'10%' ,paddingHorizontal:30, justifyContent:'center',backgroundColor:'#fff'  }}>
              <View style={styles.PrimeMemberBannerContainer}>
                <View style={[styles.CallButton,{flex:1,marginLeft:10}]}>
                  <TouchableOpacity  onPress={() => this.openCallApp()} >
                    <FontAwesome5 name={'phone-alt'} size={iconSize} color={'rgba(125,106,239,1 )'} />
                    <Text style={{ color:'black' }}>Call</Text>
                  </TouchableOpacity>
                </View>
                <View  style={[styles.CallButton]}>
                  <TouchableOpacity onPress={() => this.openWhatsapp()} style={{alignItems:'center'}}>
                    <FontAwesome5 name={'whatsapp'} size={iconSize} color={'rgba(67,186,150,1)'} />
                    <Text >Whatsapp</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </View>
          </View>

        </View>

      );
    }
  }
}
const styles = StyleSheet.create({
  ServiceCardContainer:{
    flexDirection:'row',
    // margin:5,
  },
  ServiceCard:{
    flex:1,
    height:hp('19'),
    width:wp('25.8'),
    alignContent:'center',
    marginHorizontal: wp('1'),
    backgroundColor:'#fff',
    alignItems: 'center',
    borderRadius:40/2,
    justifyContent:'center',
    overflow: 'hidden'
  },
  ServiceCardActive:{
    flex:1,
    height:hp('19'),
    width:wp('25.8'),
    alignContent:'center',
    marginHorizontal: wp('1'),
    backgroundColor:mainColor,
    alignItems: 'center',
    borderRadius:40/2,
    justifyContent:'center',
    overflow: 'hidden'
  },
  ServiceImage:{
    width:90,
    height:70,
    resizeMode:'contain'
  },
  Heading:{
    marginHorizontal:10,
    fontSize:18,
    flex:1,
    color:'#000'

  },
  ServiceHeading:{
    marginTop:5,
    fontSize: 15,
    fontWeight:'bold',
    textAlign: 'center',
    color:'#000'
  },
  ServiceHeadingActive:{
    marginTop:5,
    fontSize: 15,
    fontWeight:'bold',
    textAlign: 'center',
    color:'#fff'
  },
  ServiceDescription:{
    fontSize:12,
    textAlign:'center',
    color:'#000'
  },
  ServiceDescriptionActive:{
    fontSize:12,
    textAlign:'center',
    color:'#fff'
  },
  PrimeMemberBannerContainer:{
    // marginBottom:8,
    // padding:5,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
  },
  OrderCardContainer:{
    marginHorizontal:10,
    marginVertical:5,
  },

  orderCart:{
    padding:5,
    backgroundColor: '#fff',
    marginVertical: 5,
    flexDirection:'row',
    borderRadius:20/2
  },
  statusImageContainer:{
    borderWidth:3,
    borderRadius: 100/2,
    padding:5,
    borderColor:'grey'
  },
  statusImage:{
    width:50,
    height:50,
    borderRadius: 50/ 2
  },
  orderLabelContainer : {
    flex:.9,
    marginLeft:10,
    justifyContent:'center'
  },
  orderLabelHeader:{
    fontSize:18,
    fontWeight:'bold',
  },
  orderStatusLabel:{
    fontSize: 13,
    color:mainColor,
  },
  priceContainer:{
    justifyContent: 'center'
  },
  priceLabel:{
    textAlign:'right',
    fontSize:20,
    fontWeight: 'bold',
    color: 'black'
  },

  CallButton:{
    fontSize:15,
    color:'#fff',
    paddingHorizontal:18,
    borderRadius:100/2
  },
  pricingCardContainer:{
    marginVertical:5,
    marginLeft:5,
    // height:210,
    width:200,
    flex:.5,
    backgroundColor:'#fff',
    padding:5,
  },
  pricingCardHeader:{
    fontSize:20,
    color:'#4f9deb',
    fontWeight:'bold'
  },
  pricingCardPrice:{
    marginVertical:5,
    fontSize:25,
    fontWeight:'bold',

  },
  pricingCardDetails:{
    marginVertical:1,
    color:'gray',
    textAlign:'center',
    // height:28
  },
  PriceButton:{
    marginTop: 5,
    padding:6,
    backgroundColor:'#4f9deb',
    color:'#fff',
    borderRadius:10/2,
  },
  membershipCardContainer:{
    width:'100%',
    backgroundColor:'#fff',
    marginVertical:'1%',
    marginHorizontal:'.5%'
  },
  imageWrapper: {
    height: hp('15'),
    width: '100%',
    overflow : "hidden"
  },
  theImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  }
})

