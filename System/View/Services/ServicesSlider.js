import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ServicePage from "./ServicePage";
import { mainColor } from "../../Utility/MyLib";


const Tab = createMaterialTopTabNavigator();

export default function ServicesSlider() {
  return (
    <Tab.Navigator
    tabBarOptions={{
      activeTintColor: '#fff',
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: mainColor,
        padding:4,
      },
      indicatorStyle: { backgroundColor: '#fff'},
    }}
    >
      <Tab.Screen name="Man" component={ServicePage}  />
      <Tab.Screen name="Women" component={ServicePage} />
      <Tab.Screen name="Kids" component={ServicePage} />
      <Tab.Screen name="other" component={ServicePage} />
    </Tab.Navigator>
  );
}
