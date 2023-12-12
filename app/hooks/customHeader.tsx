import { goBack, navigate } from "app/navigators"
import { colors } from "app/theme"
import { useHeader } from "app/utils/useHeader"

// eslint-disable-next-line @typescript-eslint/ban-types
export const useCartHeader = (navigation: any)=>{
    useHeader(
        {
            rightIcon: 'cart',
            leftIcon: 'menu',
            leftIconColor: 'white',
            rightIconColor: 'white',
            onLeftPress: ()=>navigation.toggleDrawer(),
            onRightPress: ()=>navigation.navigate("Cart"),
            backgroundColor: colors.palette.primary
        }
    )
}

export const useBackHeader = ()=>{
    useHeader(
        {
            rightIcon: 'cart',
            leftIcon: 'back',
            leftIconColor: 'white',
            rightIconColor: 'white',
            onLeftPress: ()=>goBack(),
            backgroundColor: colors.palette.primary,
            onRightPress: ()=>navigate("Cart"),
        }
    )
}