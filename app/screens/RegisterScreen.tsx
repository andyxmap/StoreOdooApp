import { observer } from "mobx-react-lite"
import React, { ComponentType, FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle, Image, ImageStyle,View } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../store"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing,  } from "../theme"


const store = require("../../assets/images/logocontxt.png")
interface RegisterScreenProps extends AppStackScreenProps<"Register"> {}

export const RegisterScreen: FC<RegisterScreenProps> = observer(function RegisterScreen(_props) {
  
  const authPasswordInput = useRef<TextInput>(null)
  const authRepeetPasswordInput = useRef<TextInput>(null)

  const [authPassword, setAuthPassword] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [authRepeetPassword, setAuthRepeetPassword] = useState("")
  const [isAuthRepeetPasswordHidden, setIsAuthRepeetPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const {
    authenticationStore: { authEmail, setAuthEmail, setAuthToken, validationError },
  } = useStores()

  useEffect(() => {
   
    setAuthEmail("admin@codes.store")
    setAuthPassword("Odoo")

    return () => {
      setAuthPassword("")
      setAuthEmail("")
    }
  }, [])

  const error = isSubmitted ? validationError : ""

  function login() {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    if (validationError) return

    setIsSubmitted(false)
    setAuthPassword("")
    setAuthEmail("")

    setAuthToken(String(Date.now()))
  }

  const PasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden],
  )

  const PasswordRepeetRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthRepeetPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthRepeetPasswordHidden(!isAuthRepeetPasswordHidden)}
          />
        )
      },
    [isAuthRepeetPasswordHidden],
  )

  return (
    <Screen
      backgroundColor={colors.palette.bgImage}
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <Text testID="login-heading" tx="registerScreen.label" preset="heading" style={$register} />
      <View style={$viewImageStyle} >
             <Image style={$image} source={store}></Image>
       </View> 
      
       <TextField
        value={authEmail}
        onChangeText={setAuthEmail}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="default"
        labelTx="registerScreen.nameFieldLabel"
        LabelTextProps={{
          style:$register
        }}
        placeholderTx="registerScreen.nameFieldLabel"
        helper={error}
        status={error ? "error" : undefined}
        onSubmitEditing={() => authPasswordInput.current?.focus()}
      />

      <TextField
        value={authEmail}
        onChangeText={setAuthEmail}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        labelTx="loginScreen.emailFieldLabel"
        LabelTextProps={{
          style:$register
        }}
        placeholderTx="loginScreen.emailFieldPlaceholder"
        helper={error}
        status={error ? "error" : undefined}
        onSubmitEditing={() => authPasswordInput.current?.focus()}
      />

      <TextField
        ref={authPasswordInput}
        value={authPassword}
        onChangeText={setAuthPassword}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isAuthPasswordHidden}
        labelTx="loginScreen.passwordFieldLabel"
        LabelTextProps={{
          style:$register
        }}
        placeholderTx="loginScreen.passwordFieldPlaceholder"
        onSubmitEditing={login}
        RightAccessory={PasswordRightAccessory}
      />

<TextField
        ref={authRepeetPasswordInput}
        value={authRepeetPassword}
        onChangeText={setAuthRepeetPassword}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isAuthRepeetPasswordHidden}
        labelTx="loginScreen.passwordFieldLabel"
        LabelTextProps={{
          style:$register
        }}
        placeholderTx="registerScreen.passwordFieldLabel"
        onSubmitEditing={login}
        RightAccessory={PasswordRepeetRightAccessory}
      />

      <Button
        testID="login-button"
        tx="registerScreen.confirm"
        style={$tapButton}
        preset="reversed"
        onPress={login}
      />
      
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $register: TextStyle = {
  marginBottom: spacing.sm,
  color:"white"
}

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.xs,
  backgroundColor: colors.palette.button
}

const $image: ImageStyle = { flex: 1,
  width: '100%',
  height: '100%',
  resizeMode: 'stretch'}

const $viewImageStyle:ViewStyle = { marginTop: spacing.lg, width:150,height:150, alignSelf:"center"}
