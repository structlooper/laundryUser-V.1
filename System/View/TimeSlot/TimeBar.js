import * as React from 'react';
import { Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TimeSlot from "./TimeSlot";
import { mainColor } from "../../Utility/MyLib";

const Tab = createMaterialTopTabNavigator();

export default function TimeBar() {
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
      <Tab.Screen name="Pickup" component={TimeSlot}  />
      <Tab.Screen name="Drop" component={TimeSlot}  />
    </Tab.Navigator>
  );
}
