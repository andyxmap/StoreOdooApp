import { ImageStyle, TextStyle, ViewStyle } from "react-native"
import { spacing } from "./spacing"
import { colors } from "./colors"

export const $screenContentContainer: ViewStyle = {
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
  }
  
export const $signIn: TextStyle = {
    marginBottom: spacing.sm,
    color: "white"
  }
  
export const $enterDetails: TextStyle = {
    marginTop: spacing.lg,
    color: "white"
  }
  
export const $hint: TextStyle = {
    color: colors.tint,
    marginBottom: spacing.md,
  }
  
export const $textField: ViewStyle = {
    marginBottom: spacing.lg
    
  }
  
export const $tapButton: ViewStyle = {
    marginTop: spacing.xs,
    backgroundColor: colors.palette.button,
    borderColor: colors.palette.button,
    borderRadius: 50
  }

  export const $tapButtonTxt: TextStyle = {
    color: "black",
    fontSize:20,
    alignSelf:"center"
  }

  export const $center = {
    alignSelf:"center",
    textAlign:"center",
  }

  export const $centerText = {
    alignSelf:"center",
    textAlign:"center",
    color:"white"
  }

  export const $topMargin:ViewStyle = {
      marginTop:5
  }
  
export const $image: ImageStyle = {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  }
  
export const $imageFull: ImageStyle = {
  
    width: '100%',
    height: '100%',
  }
  
export const $full: ViewStyle = {
    flex: 1
  }

export const $fullBg: ViewStyle = {
    flex: 1,
    backgroundColor:colors.palette.bgImage
  }

  export const $fullImage: ImageStyle = {
    
    width: '100%',
    height: '100%',
    
  }
  
export const contentCenter: ViewStyle = {
    padding: 40,
    flex: 1,
    justifyContent: "space-between",
  }
  
export const $viewImageStyle: ViewStyle = { marginTop: spacing.lg, width: 200, height: 200, alignSelf: "center" }
  