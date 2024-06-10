import { Text, FlatList, TextInput, View, Image, ViewComponent, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import {
  useFonts,
  Manrope_200ExtraLight,
  Manrope_300Light,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
} from '@expo-google-fonts/manrope';

export default function Mega() {
  let [fontsLoaded] = useFonts({
    Manrope_400Regular, Manrope_600SemiBold, Manrope_800ExtraBold
  });
  return (
    <>
      {fontsLoaded ? <LinearGradient colors={['rgba(214, 127, 20, 1)', 'rgba(235, 187, 134, 1)', 'rgba(255, 246, 248, 1)']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.linearGradient}>
        <Text style={styles.text}>
          MEGA ₹ 1 Crore
        </Text>
      </LinearGradient> : null}
    </>
  )
}

const styles = StyleSheet.create({
  mega: {
    width: 240,
    padding: 5,
    paddingVertical: 2,

  },
  linearGradient: {
    paddingLeft: 0,
    paddingRight: 0,
    borderRadius: 3,
    width: 122,
    paddingVertical: 5
  },
  text: {
    fontSize: 12,
    fontFamily: 'Manrope_800ExtraBold',
    textAlign: 'center',
    color: '#474C52',
    backgroundColor: 'transparent'
  }
})