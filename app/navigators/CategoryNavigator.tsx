import React from "react"
import { DrawerNavigationOptions, createDrawerNavigator } from '@react-navigation/drawer';
import {
  HomeCategorieScreen,
  OrdersScreen,
  UserScreen
} from "app/screens"
import { NativeBaseProvider } from "native-base";
import { colors } from "app/theme";
import { CustomDrawerContent } from "app/components/Drawer";


interface Menu {
  options: DrawerNavigationOptions
  name: string,
  component: any,

}
const menu: Array<Menu> = [
  {
    name: "Home",
    component: HomeCategorieScreen,
    options: {
      drawerLabel: "Inicio",
    

    }
  },
  {
    name: "Orders",
    component: OrdersScreen,
    options: {
      drawerLabel: "Mis órdenes",

    }
  },
  {
    name: "User",
    component: UserScreen,
    options: {
      drawerLabel: "Perfil",
    }
  },
]



const Drawer = createDrawerNavigator()


export const CategoryNavigator = () => {

 
  return (
    <NativeBaseProvider>
      <Drawer.Navigator
      drawerContent={CustomDrawerContent} 
      initialRouteName="Home"
      screenOptions={{
        drawerLabelStyle: {
          fontSize: 20,
          color: "white",
        },
        drawerActiveBackgroundColor: colors.palette.primary,
        drawerItemStyle:{
           borderLeftColor: colors.palette.primary,
           borderLeftWidth: 2,
           
        },
        drawerStyle: { 
          backgroundColor: colors.palette.secondary,
          flexDirection:"column",
          justifyContent: "space-between"
      },
        overlayColor: 'transparent',
      
      }}
      >


        {

          menu.map((item, index) => {
            return (
              <Drawer.Screen key={index} name={item.name} component={item.component} options={item.options} />
            )
          })

        }

      </Drawer.Navigator>
    </NativeBaseProvider>
  )
}
