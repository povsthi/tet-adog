import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'paw' : 'paw-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'AddPet') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'star' : 'star-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'menu';
            if (iconName === 'menu') {
              return <Feather name={iconName} size={size} color={color} />;
            } else {
              return <Ionicons name={iconName} size={size} color={color} />;
            }
          }
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      })}
    >
    </Tab.Navigator>
  );
};

export default BottomNavigation;


