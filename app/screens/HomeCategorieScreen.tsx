import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen } from "app/components"
import { CategoryBlock } from "app/components/CategoryBlock"
import { useCartHeader } from "app/hooks/customHeader"
import { colors, spacing } from "app/theme"

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface HomeCategorieScreenProps extends AppStackScreenProps<"HomeCategorie"> {}

const ahumados = require("../../assets/images/ahumado.jpg")
const congelados = require("../../assets/images/congelados.jpg")
const embutidos = require("../../assets/images/embutido.jpg")
const lacteos = require("../../assets/images/lacteo.jpg")





export const HomeCategorieScreen: FC<HomeCategorieScreenProps> = observer(function HomeCategorieScreen(_props) {
  
  const { navigation } = _props
  
  useCartHeader(navigation)

  const categories = [
    {
      id: 1,
      title: 'AHUMADOS',
      image: ahumados,
      click: ()=>{
        navigation.navigate('Products')
      }
    },
    {
      id: 2,
      title: 'CONGELADOS',
      image: congelados,
      click: ()=>{
        navigation.navigate('Products')
      }
    },
    {
      id: 3,
      title: 'EMBUTIDOS',
      image: embutidos,
      click: ()=>{
        navigation.navigate('Products')
      }
     },
    {
      id: 4,
      title: 'LÁCTEOS',
      image:  lacteos,
      click: ()=>{
        navigation.navigate('Products')
      }
    }
    ];
  
  function renderCategories() {
    const cat = [];
    for(let i=0; i<categories.length; i++) {
      cat.push(
        <CategoryBlock 
        key={categories[i].id} 
        id={categories[i].id} 
        image={categories[i].image}
        title={categories[i].title} 
        click={categories[i].click}
        />
      );
    }
    return cat;
  }
  
  return (
    
    <Screen style={$root} preset="auto">
       {renderCategories()}
    </Screen>
    
  )
})

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.sm,
  backgroundColor: colors.palette.secondary
}
