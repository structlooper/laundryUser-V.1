import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ServicePage from "./ServicePage";
import { fetchGetFunction, mainColor } from "../../Utility/MyLib";
import NoDataFound from "../NoDataFound";
import Loader from "../../Utility/Loader";
import { useEffect, useState } from "react";


const Tab = createMaterialTopTabNavigator();

export default function ServicesSlider({route}) {
  const [activeIndex,setActiveIndex] = useState(0)
  const {serviceId} = route.params;
  const [categories , setCategories] = React.useState(null)
  useEffect(() => {
    if (activeIndex === 0) {
      getCategoriesByServiceId().then()
      setActiveIndex(activeIndex + 1)
    }
  },[])
  const Tabs = (category,categoryId,i) => {
    return <Tab.Screen name={category} component={ServicePage} initialParams={{ categoryId:categoryId,serviceId:serviceId }}  key={i} />
  }
  const getCategoriesByServiceId = async () => {
    await fetchGetFunction('category/'+serviceId).then(result => {
      setCategories(result)
    })
  }
  if (categories === null){
    return <Loader />
  }
  else if (categories.length === 0){
    return (
      <NoDataFound />
    )
  }else {

    return (
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#fff',
          inactiveTintColor: 'gray',
          style: {
            backgroundColor: mainColor,
          },
          labelStyle: { fontSize: 14, color: 'white' },
          scrollEnabled: true,
          indicatorStyle: { backgroundColor: '#fff' },
        }}
      >
        {categories.map((data,i) => {
         return Tabs(data.category_name, data.id, i)
        }) }
      </Tab.Navigator>
    );
  }
}
