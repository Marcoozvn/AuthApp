import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },

  header: {
    flexDirection: 'row-reverse',
    padding: 20
  },

  headerText: {
    fontWeight: '600',
    fontSize: 14,
    letterSpacing: -0.3,
    color: '#FE3C72'
  },

  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginText: {
    fontWeight: '600',
    fontSize: 21,
    letterSpacing: -0.5,
  },

  button: {
    marginTop: 10,
    height: 48,
    width: '80%',
    borderRadius: 12,
    backgroundColor: '#FE3C72',
    alignItems: 'center',
    justifyContent: 'center',
  },

  fingerprintContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default styles