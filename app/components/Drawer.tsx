/* eslint-disable react-native/no-inline-styles */
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerContentComponentProps,
  } from '@react-navigation/drawer';

import React from "react"
import { TextStyle, TouchableOpacity, View } from 'react-native';
import {Text} from 'app/components'
import { useStores } from 'app/store';
  
export function CustomDrawerContent(props:DrawerContentComponentProps) {

    const {
        authenticationStore: { logout },
      } = useStores()
    
    return (
      <DrawerContentScrollView {...props}>
        <View>
        <DrawerItemList {...props}/>

        <TouchableOpacity
        onPress={() => logout()}
        >
        <Text tx='common.logOut' style={logOutStyle}></Text>
        </TouchableOpacity>

        </View>
        
      </DrawerContentScrollView>
    );
  }

const logOutStyle:TextStyle = {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom:10,
   
}