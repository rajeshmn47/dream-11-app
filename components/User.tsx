// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import { StyleSheet, View, Modal, ActivityIndicator, Text, Image } from 'react-native';

const User = (props: any) => {
  // console.log(props,'props')
  const user = props?.user;

  return (
    <View style={styles.modalBackground}>
      <View style={styles.activityIndicatorWrapper}>
        <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/dreamelevenclone.appspot.com/o/images%2F13866.png?alt=media&token=4644f151-3dfd-4883-9398-4191bed34854' }} style={{ width: '10%', height: 40, borderRadius: 50, marginRight: 15 }} />
        <Text>{user?.username ? user?.username : ''}</Text>
      </View>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 40,
    width: '100%',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 40,
  },
});