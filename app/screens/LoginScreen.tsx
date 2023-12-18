import { observer } from "mobx-react-lite"
import React, { ComponentType, FC, useEffect, useMemo, useRef, useState } from "react"
import {
  TextInput,
  View,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  TextStyle,
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

const store = require("../../assets/images/login.png")
interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const authPasswordInput = useRef<TextInput>(null)
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
      authPassword,
      setAuthPassword,
      userLogin,
      setUserInfo,
    },
  } = useStores()

  const { showToastApiError } = useToastErrorApi()

  useEffect(() => {
    setAuthEmail("admin@codes.store")
    setAuthPassword("Odoo")

    return () => {
      setAuthPassword("")
      setAuthEmail("")
    }
  }, [])

  const error = isSubmitted ? validationError : ""

  async function login() {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    if (validationError) return

    const response: LoginResponse | GeneralApiProblem = await userLogin()

    if (isGeneralProblem(response)) {
      showToastApiError(response as GeneralApiProblem)
    } else {
      const result = (response as LoginResponse).result
      setAuthToken(result.access_token)
      setUserInfo(result)
    }
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
      <ImageBackground source={store} resizeMode="contain" style={$fullImage}>
        <View style={contentCenter}>
          <View>
            <Text testID="login-heading" tx="loginScreen.signIn" preset="heading" style={$signIn} />
            <Text tx="loginScreen.details" preset="heading" style={$enterDetails} />
          </View>
          <View style={$topMargin}>
            <TextField
              value={authEmail}
              onChangeText={setAuthEmail}
              containerStyle={$textField}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              LabelTextProps={{
                style: $signIn,
              }}
              keyboardType="email-address"
              labelTx="loginScreen.emailFieldLabel"
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
            />

            <Button
              testID="login-button"
              tx="loginScreen.tapToSignIn"
              style={$tapButton}
              onPress={login}
              textStyle={$tapButtonTxt}
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
    </SafeAreaView>
  )
})
