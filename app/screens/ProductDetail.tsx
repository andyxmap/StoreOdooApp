/* eslint-disable react-native/sort-styles */
/* eslint-disable react-native/no-unused-styles */
/* eslint-disable react-native/no-color-literals */
import React, { FC } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
  StyleSheet
} from "react-native";

import { AppStackScreenProps } from "app/navigators";
import { observer } from "mobx-react-lite";
import { useBackHeader } from "app/hooks/customHeader";
import { Box, Button, HStack, Input, Spacer, VStack } from "native-base";
import { colors } from "app/theme";
import NumericInput from "react-native-numeric-input";
import { Icon } from "app/components";

const { width: viewportWidth } = Dimensions.get("window");
interface ProductDetailScreenProps extends AppStackScreenProps<"ProductDetail"> {}

export const ProductDetailScreen: FC<ProductDetailScreenProps> = observer(function ProductDetailScreen(_props) {
        
  const { navigation, route } = _props;

  const item = route.params?.product;
  const title = route.params?.categoryName;

  useBackHeader()

  const renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={item} />
      </View>
    </TouchableHighlight>
  );

  const onPress = () => { 
      console.log("OnPress")
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.carouselContainer}>
          {renderImage(item.image)}
      </View>
      <View style={styles.infoRecipeContainer}>
        <Text style={styles.infoRecipeName}>{item.title}</Text>
        <View style={styles.infoContainer}>
          <TouchableHighlight
            onPress={() =>
             console.log("Press info Container")
            }
          >
            <Text style={styles.category}>
              {title}
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
        </View>
        <View style={styles.infoContainer}>
          <VStack>
          <NumericInput 
            value={0} 
            onChange={value => console.log({value})} 
            onLimitReached={(isMax,msg) => console.log(isMax,msg)}
            totalWidth={240} 
            totalHeight={50} 
            iconSize={25}
            step={1.5}
            valueType='real'
            rounded 
            textColor='white' 
            iconStyle={{ color: 'white' }} 
            rightButtonBackgroundColor={colors.palette.primary}
            leftButtonBackgroundColor={colors.palette.lightBussines}/>
            <Box h="5"  />
          <Button
            backgroundColor={colors.palette.primary}
            variant="solid"
            onPress={onPress}
          >
            <HStack>
            <Icon icon="cart" size={20}></Icon>
            <Text>Agregar al carrito</Text>
            </HStack>
            </Button>
          </VStack>
        </View>
        
      </View>
    </ScrollView>
  );

})


const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  carousel: {},
  carouselContainer: {
    minHeight: 250,
    backgroundColor: colors.palette.secondary,
  },

  category: {
    fontSize: 20,
    fontWeight: '300',
    margin: 10,
    color: colors.palette.primary,
    
  },
  container: {
    backgroundColor: colors.palette.secondary,
    flex: 1
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: 250
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    width: viewportWidth,
    height: 250
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  infoDescriptionRecipe: {
    textAlign: 'left',
    fontSize: 16,
    marginTop: 30,
    marginBottom:10,
    margin: 15,
    color:"white",
    fontWeight:"200"
  },
  infoPhoto: {
    height: 20,
    width: 20,
    marginRight: 0
  },
  infoRecipe: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  infoRecipeContainer: {
    flex: 1,
    margin: 25,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoRecipeName: {
    fontSize: 28,
    margin: 10,
    fontWeight: '300',
    color: 'white',
    textAlign: 'center'
  },
  paginationContainer: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    paddingVertical: 8,
    marginTop: 200
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 0
  }
});

  
