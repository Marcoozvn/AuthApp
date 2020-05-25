import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, TextInput, TextStyle, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { useAuth } from '../../contexts/auth'
import * as LocalAuthentication from 'expo-local-authentication'
import { MaterialIcons } from '@expo/vector-icons'
import Icon from '../../../assets/icon.svg'
import styles from './styles'

const defaultStyle = {
  marginTop: 10,
  borderColor: '#686868',
  borderRadius: 3,
  borderStyle: 'solid',
  borderWidth: 2,
  height: 48,
  width: '80%',
  fontWeight: '600',
  fontSize: 14,
  padding: 10,
  letterSpacing: -0.3,
  color: '#474747'
} as TextStyle

const SignIn: React.FC = () => {
  const { signIn, firstLogin } = useAuth()
  const [fingerprint, setFingerprint] = useState(false)
  const [usernameStyle, setUsernameStyle] = useState<TextStyle>(defaultStyle)
  const [passwordStyle, setPasswordStyle] = useState<TextStyle>(defaultStyle)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    checkDeviceForHardware()
  }, [])

  

  async function checkDeviceForHardware(): Promise<void> {
    const compatible = await LocalAuthentication.hasHardwareAsync()
    setFingerprint(compatible)
  }

  async function checkForBiometrics(): Promise<void> {
    const hasRecords = await LocalAuthentication.isEnrolledAsync()

    if (hasRecords) {
      scanBiometrics()
    }
  }

  function handleLogin() {
    signIn(username, password)
  }

  async function scanBiometrics() {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Toque no leitor de digital'
    })

    if (result.success) {
      signIn()
    }
  }
  //
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior="position">
          <View style={styles.header}>
            <TouchableOpacity>
              <Text style={styles.headerText}>Cadastro</Text>
            </TouchableOpacity>
          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Icon width={200} height={200} />
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.loginText}>Digite suas credenciais</Text>
            <TextInput
              style={usernameStyle}
              placeholder='Usuário'
              autoCapitalize="none"
              autoCorrect={false}
              autoCompleteType="password"
              defaultValue={username}
              onChangeText={text => setUsername(text)}
              onFocus={() => setUsernameStyle({ ...usernameStyle, borderColor: '#FE3C72' })}
              onBlur={() => setUsernameStyle({ ...usernameStyle, borderColor: '#686868' })}
            />
            <TextInput
              style={passwordStyle}
              placeholder='Senha'
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              defaultValue={password}
              onChangeText={text => setPassword(text)}
              onFocus={() => setPasswordStyle({ ...passwordStyle, borderColor: '#FE3C72' })}
              onBlur={() => setPasswordStyle({ ...passwordStyle, borderColor: '#686868' })}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={{ color: '#fff', fontWeight: '600', fontSize: 14 }}>Entrar</Text>
            </TouchableOpacity>
          </View>

        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      {!firstLogin && fingerprint &&
        <TouchableOpacity style={styles.fingerprintContainer} onPress={checkForBiometrics}>
          <Text style={{ ...styles.loginText, fontSize: 18, marginBottom: 5 }}>Ou entre com sua digital</Text>
          <MaterialIcons name="fingerprint" size={48} />
        </TouchableOpacity>}
    </View>
  )
}

export default SignIn