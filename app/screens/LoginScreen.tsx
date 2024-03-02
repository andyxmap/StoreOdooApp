import { observer } from "mobx-react-lite"
import React, { ComponentType, FC, useEffect, useMemo, useRef, useState } from "react"
import {
  TextInput,
  View,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  TextStyle,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator
} from "react-native"
import { Button, Icon, Text, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../store"
import { AppStackScreenProps } from "../navigators"
import { colors } from "../theme"
import {
  $signIn,
  $tapButton,
  $textField,
  contentCenter,
  $fullImage,
  $fullBg,
  $enterDetails,
  $tapButtonTxt,
  $topMargin,
  $centerText,
} from "../theme/styles"
import type { LoginResponse } from "app/services/api/account/types"
import { isGeneralProblem, type GeneralApiProblem } from "app/services/api/apiProblem"
import { useToastErrorApi } from "app/components/AlertToast"
import { setAuthTokenSession } from "app/services/api/account/service"
import { CircularProgress } from "native-base"


const store = require("../../assets/images/login.png")
interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const authPasswordInput = useRef<TextInput>(null)
  const emailInput = useRef<TextInput>(null)
  const { navigation } = _props

  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const {
    authenticationStore: {
      authEmail,
      setAuthEmail,
      setAuthToken,
      validationError,
      validationErrorPassword,
      authPassword,
      setAuthPassword,
      userLogin,
      setUserInfo,
      asValidationError
    },
  } = useStores()

  const { showToastApiError } = useToastErrorApi()

  useEffect(() => {
  
    return () => {
      setAuthPassword("")
      setAuthEmail("")
    }
  }, [])

  const [error, setError] = useState(isSubmitted ? validationError : null)
  const [errorPassword, setErrorPassword] = useState(isSubmitted ? validationErrorPassword : null)
  const [loading,setLoading] = useState(false)

  async function login() {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    if (validationError || validationErrorPassword) {
      setError("Revise los valores del campo")
      setErrorPassword("Revise los valores del campo")
      return
    }
   setLoading(true)
   userLogin().then(
      (response: LoginResponse | GeneralApiProblem) =>{
        if (isGeneralProblem(response)) {
          showToastApiError(response as GeneralApiProblem)
        } else{
          const result = (response as LoginResponse).result
          console.log("result:",result.access_token)
          
          setAuthTokenSession(result.access_token).then(()=>{
            setAuthToken(result.access_token)
          })
          setUserInfo(result)
        }
    }).finally(()=>{
      setLoading(false)
    })

    
  }

  function onRegister() {
    navigation.navigate("Register")
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

  return (
    <SafeAreaView style={$fullBg}>
      <KeyboardAvoidingView behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground source={store} resizeMode="contain" style={$fullImage}>
        <View style={contentCenter}>
          <View>
            <Text testID="login-heading" tx="loginScreen.signIn" preset="heading" style={$signIn} />
            <Text tx="loginScreen.details" preset="heading" style={$enterDetails} />
          </View>
          <View style={$topMargin}>
            <TextField
              ref={emailInput}
              value={authEmail}
              onChangeText={setAuthEmail}
              containerStyle={$textField}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              LabelTextProps={{
                style: $signIn,
              }}
              labelTx="loginScreen.emailFieldLabel"
              placeholderTx="loginScreen.emailFieldPlaceholder"
              helper={error}
              status={error ? "error" : undefined}
            />

            <TextField
              ref={authPasswordInput}
              value={authPassword}
              onChangeText={setAuthPassword}
              containerStyle={$textField}
              LabelTextProps={{
                style: $signIn,
              }}
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect={false}
              secureTextEntry={isAuthPasswordHidden}
              labelTx="loginScreen.passwordFieldLabel"
              placeholderTx="loginScreen.passwordFieldPlaceholder"
              onSubmitEditing={login}
              RightAccessory={PasswordRightAccessory}
              helper={errorPassword}
              status={errorPassword ? "error" : undefined}
            />

            <Button
              testID="login-button"
              tx="loginScreen.tapToSignIn"
              style={$tapButton}
              onPress={login}
              textStyle={$tapButtonTxt}
              disabled={asValidationError}
              LeftAccessory={()=>loading && <ActivityIndicator color="white"/>}
              
            />
            <TouchableOpacity activeOpacity={0.8} onPress={onRegister}>
              <Text
                tx="loginScreen.register"
                preset="formHelper"
                style={$centerText as TextStyle}
              ></Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
})
