import React, { useState } from 'react';
import { View, Image, Button, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { URL } from '../../constants/userConstants';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { API } from '../../actions/userAction';
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type Props = NativeStackScreenProps<RootStackParamList, "Post">;

export default function Post({ navigation, route }: Props) {
  const [photo, setPhoto] = React.useState<any>(null);
  const storage = getStorage();


  const createFormData = (photo: any, body: any = {}) => {
    const data: any = new FormData();

    data.append('photo', {
      name: photo.fileName,
      type: photo.type,
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });

    return data;
  };

  const handleChoosePhoto = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response) {
        setPhoto(response);
      }
    });
  };

  const getBlobFroUri = async (uri: any) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    return blob;
  };

  const handleUploadPhoto = async () => {
    const imageBlob: any = await getBlobFroUri(photo?.assets[0]?.uri)
    const storageRef = ref(storage, photo?.assets[0]?.fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageBlob);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          API.post(`${URL}/post`, {
            title: 'abcdwxyz', imgUrl: downloadURL
          })
            .then((response) => {
              console.log('response', response);
              navigation.navigate('Home')
            })
            .catch((error) => {
              console.log('error', error);
            });
        });
      }
    );
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {photo && (
        <>
          <Image
            source={{ uri: photo.assets[0].uri }}
            style={{ width: 300, height: 300 }}
          />
          <Button title="Upload Photo" onPress={handleUploadPhoto} />
        </>
      )}
      <Button title="Choose Photo" onPress={handleChoosePhoto} />
    </View>
  );
};
