import React from 'react'
import { View, Button, StyleSheet } from 'react-native'
import { useAuth } from '../../contexts/auth'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const Dashboard: React.FC = () => {
  const { signOut } = useAuth()

  return (
    <View style={styles.container}>
      <Button title="SignOut" onPress={signOut}/>
    </View>
  )
}

export default Dashboard