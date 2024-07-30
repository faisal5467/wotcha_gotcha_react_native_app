import {
  StyleSheet,
  FlatList,
  Text,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  ImageBackground,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';

import {Button, Divider, TextInput} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import Back from '../../../assets/svg/back.svg';
import {appImages} from '../../../assets/utilities/index';
import Slider from '@react-native-community/slider';
import VolumeUp from '../../../assets/svg/VolumeUp.svg';
import Like from '../../../assets/svg/Like.svg';
import UnLike from '../../../assets/svg/Unlike.svg';
import Comment from '../../../assets/svg/Comment.svg';
import Send from '../../../assets/svg/Send.svg';
import Download from '../../../assets/svg/Download.svg';
import CustomButton from '../../../assets/Custom/Custom_Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomSnackbar from '../../../assets/Custom/CustomSnackBar';
import axios from 'axios';
import cloudinary from 'cloudinary-core';
import Share from 'react-native-share';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Fontiso from 'react-native-vector-icons/Fontisto';

import IonIcons from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {SelectCountry, Dropdown} from 'react-native-element-dropdown';
import CPaperInput from '../../../assets/Custom/CPaperInput';

import CustomDialog from '../../../assets/Custom/CustomDialog';
import { base_url } from '../../../../../baseUrl';
const Category = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
];

export default function UploadUpdateVideoScreen({navigation}) {
  const [selectedItem, setSelectedItem] = useState('');

  const [profileName, setProfileName] = useState('');

  const [loading, setLoading] = useState(false);

  const [snackbarVisible, setsnackbarVisible] = useState(false);

  const [isTextInputActive, setIsTextInputActive] = useState(false);

  const [category, setCategory] = useState('');

  const [categoryId, setCategoryId] = useState('');

  const [userId, setUserId] = useState('');

  const [categoriesSelect, setCategorySelect] = useState([]);

  const [description, setDescription] = useState('');

  const [imageUri, setImageUri] = useState(null);

  const [videoUrl, setVideoUrl] = useState(null);

  const [imageInfo, setImageInfo] = useState(null);

  const [isFocus, setIsFocus] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const ref_RBSheetCamera = useRef(null);

  useEffect(() => {
    // Make the API request and update the 'data' state
    fetchVideos();
  }, []);

  const closeModal = () => {
    setModalVisible(false);
  };

  const performAction = () => {
    setModalVisible(false);
  };

  const fetchVideos = async () => {
    // Simulate loading
    setLoading(true);

    await getUserID();
    // Fetch data one by one
    await fetchCategory();

    // Once all data is fetched, set loading to false
    setLoading(false);
  };

  const getUserID = async () => {
    console.log("Id's");
    try {
      const result = await AsyncStorage.getItem('userId ');
      if (result !== null) {
        setUserId(result);
        console.log('user id retrieved:', result);
      }
    } catch (error) {
      // Handle errors here
      console.error('Error retrieving user ID:', error);
    }
  };

  const upload = async () => {
    if (
      imageInfo !== null &&
      profileName !== '' &&
      categoryId !== '' &&
      description !== ''
    ) {
      //uploadVideo()
      //uploadVideos()
      const uri = imageInfo.uri;
      const type = imageInfo.type;
      const name = imageInfo.fileName;
      const source = {uri, type, name};
      console.log(source);
      handleUploadVideo(source);

      //uploadVideoCloudinary(imageInfo.uri)
    } else {
      setModalVisible(true);
    }
  };

  /* const cloudinaryCore = new cloudinary.Cloudinary({ cloud_name: 'dzaawjnl1' });

  const uploadVideoCloudinary = (videoUri) => {
    cloudinaryCore.openUploadWidget(
      {
        cloud_name: 'dzaawjnl1',
        upload_preset: 'ml_default',
        sources: ['local', 'url', 'camera'],
        resource_type: 'video',
        files: [videoUri], // Pass the videoUri here
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          // The URL path of the uploaded video is in result.info.secure_url
          const videoURL = result.info.secure_url;
          console.log('Video URL:', videoURL);
        }
      }
    );
  };
 */

  const handleUploadVideo = video => {
    const data = new FormData();
    data.append('file', video);
    data.append('upload_preset', 'ml_default'); // Use your Cloudinary upload preset
    data.append('cloud_name', 'ml_default'); // Use your Cloudinary cloud name

    fetch('https://api.cloudinary.com/v1_1/dzaawjnl1/video/upload', {
      method: 'POST',
      body: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => res.json())
      .then(data => {
        setVideoUrl(data.url); // Store the Cloudinary video URL in your state
        uploadVideo(data.url);
        console.log(data);
      })
      .catch(err => {
        Alert.alert('Error While Uploading Video');
      });
  };

  const handleUpdata = photo => {
    const data = new FormData();
    data.append('file', photo);
    data.append('upload_preset', '_DemoEmployee');
    data.append('cloud_name', 'italyqb');
    fetch('https://api.cloudinary.com/v1_1/italyqb/image/upload', {
      method: 'POST',
      body: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => res.json())
      .then(data => {
        setPicture(data.url);
        setModal(false);
        console.log(data);
      })
      .catch(err => {
        Alert.alert('Error While Uploading');
      });
  };

  const uploadVideoData = async video => {
    setLoading(true);
    console.log('Image Uri', video);
    //console.log("Id", categoryId )
    try {
      // Construct the request data as FormData
      const formData = new FormData();
      formData.append('name');
      formData.append('disc_category', categoriesSelect);
      formData.append('user_id', userId);

      formData.append('image', imageUri);

      // Append the video file to the FormData
      /* formData.append('image', {
          uri: imageUri,
        }); */
      // Perform the upload using the Fetch API
      const response = await fetch('/news/createNews', {
        method: 'POST',
        headers: {
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJpYXQiOjE2OTgzMTI3NDUsImV4cCI6MTcwMDkwNDc0NX0.YsFwjW-luPHnhb4R3nAyuyHDV58PoehhrsMdMttJd08',
        },
        body: formData,
      });

      if (response.ok) {
        console.log('News uploaded successfully');
        setLoading(false);
        handleUpdatePassword();
      } else {
        setLoading(false);
        console.error(
          'Failed to upload news:',
          response.status,
          response.statusText,
        );
      }
    } catch (error) {
      setLoading(false);
      console.error('Error while picking a video:', error);
    }
  };

  const uploadVideo = async data => {
    //console.log("Uri",imageInfo.uri )
    try {
      // Construct the request data as FormData
      const formData = new FormData();
      formData.append('name', profileName);
      formData.append('description', description);
      formData.append('video_category', categoryId);
      formData.append('video', data);
      formData.append('user_id', userId);

      const response = await fetch(
        base_url + 'xpi/createXpiVideo',
        {
          method: 'POST',
          headers: {
            Authorization:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5ODEyMzUxNSwiZXhwIjoxNzAwNzE1NTE1fQ.0JrofPFHubokiOAwlQWsL1rSuKdnadl9ERLrUnLkd_U',
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        },
      );
      console.log('Response', response.data);
      handleUpdatePassword();

      if (response.ok) {
        console.log('Video uploaded successfully');
        handleUpdatePassword();
      } else {
        console.error(
          'Failed to upload video:',
          response.status,
          response.statusText,
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const uploadVideos = async () => {
    try {
      // Construct the request data as FormData
      const formData = new FormData();
      formData.append('name', 'ghsvgxv');
      formData.append('description', 'ajkbch');
      formData.append('video_category', '6');
      formData.append('user_id', '29');

      // Set up the Axios request
      const axiosConfig = {
        headers: {
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5ODEyMzUxNSwiZXhwIjoxNzAwNzE1NTE1fQ.0JrofPFHubokiOAwlQWsL1rSuKdnadl9ERLrUnLkd_U',
        },
      };

      // Perform the upload using Axios
      const response = await axios.post(
        base_url + 'xpi/createXpiVideo',
        formData,
        axiosConfig,
      );

      console.log('Response', response);

      if (response.status === 404) {
        console.error(
          'Failed to upload video:',
          response.status,
          response.data,
        );
      } else {
        console.error(
          'Failed to upload video:',
          response.status,
          response.statusText,
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFocus = () => {
    setIsTextInputActive(true);
  };

  const handleBlur = () => {
    setIsTextInputActive(false);
  };

  const TakeImageFromCamera = () => {
    ImageCropPicker.openCamera({
      width: 300,
      height: 500,
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error));
  };
  const TakeImageFromGallery = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 500,
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error));
  };

  const takePhotoFromCamera = async value => {
    setSelectedItem(value);
    launchCamera(
      {
        mediaType: 'video',
        videoQuality: 'medium',
      },
      response => {
        console.log('image here', response);
        if (!response.didCancel) {
          if (response.assets && response.assets.length > 0) {
            setImageUri(response.assets[0].uri);
            console.log('response', response.assets[0].uri);
            setImageInfo(response.assets[0]);
          } else if (response.uri) {
            // Handle the case when no assets are present (e.g., for videos)
            setImageUri(response.uri);
            console.log('response', response.uri);
          }
        }
        ref_RBSheetCamera.current.close();
      },
    );
  };

  const choosePhotoFromLibrary = value => {
    setSelectedItem(value);
    launchImageLibrary({mediaType: 'video'}, response => {
      console.log('image here', response);
      if (!response.didCancel && response.assets.length > 0) {
        console.log('Response', response.assets[0]);
        setImageUri(response.assets[0].uri);
        setImageInfo(response.assets[0]);
      }

      console.log('response', imageInfo);

      ref_RBSheetCamera.current.close();
    });
  };

  const handleUpdatePassword = async () => {
    // Perform the password update logic here
    // For example, you can make an API request to update the password

    // Assuming the update was successful
    setsnackbarVisible(true);

    // Automatically hide the Snackbar after 3 seconds
    setTimeout(() => {
      setsnackbarVisible(false);
      //handleUpload()
      //navigation.navigate('Home');
    }, 3000);
  };

  const handleUpload = () => {
    console.log('Id', categoryId);
  };

  const dismissSnackbar = () => {
    setsnackbarVisible(false);
  };

  const fetchCategory = async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5ODEyMzUxNSwiZXhwIjoxNzAwNzE1NTE1fQ.0JrofPFHubokiOAwlQWsL1rSuKdnadl9ERLrUnLkd_U';

    try {
      const response = await fetch(
        base_url + 'videoCategory/getAllVideoCategories?page=1&limit=5',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        const data = await response.json();

        console.log('Data ', data);

        // Use the data from the API to set the categories
        const categories = data.AllCategories.map(category => ({
          label: category.name, // Use the "name" property as the label
          value: category.id.toString(), // Convert "id" to a string for the value
        }));

        setCategorySelect(categories); // Update the state with the formatted category data

        console.log('Data Categories', categoriesSelect);
      } else {
        console.error(
          'Failed to fetch categories:',
          response.status,
          response.statusText,
        );
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: 'white'}}
      behavior="height" // You can use ‘height’ as well, depending on your preference
      enabled>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IonIcons name={'chevron-back'} color={'#282828'} size={25} />
        </TouchableOpacity>

        <Text style={styles.headerText}>Update Video</Text>
      </View>

      <ScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}>
        <View
          style={{
            marginTop: hp(5),
            height: hp(30),
            borderRadius: wp(8),
            marginHorizontal: wp(23),
          }}>
          {imageUri !== null && (
            <Image
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1, // Ensure it's on top of other elements
                flex: 1,
                width: '100%',
                height: '100%',
                borderRadius: wp(8),
                resizeMode: 'contain',
              }}
              source={{uri: imageUri}}
            />
          )}
          <TouchableOpacity
            onPress={() => ref_RBSheetCamera.current.open()}
            style={{
              position: 'absolute',
              top: 10,
              left: 8,
              height: hp(3),
              width: wp(21),
              borderRadius: wp(3),
              backgroundColor: '#FACA4E',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 2, // Ensure it's on top
            }}>
            <Text
              style={{
                fontSize: hp(1.3),
                fontFamily: 'Inter',
                color: '#232323',
                fontWeight: '700',
              }}>
              Change Video
            </Text>
          </TouchableOpacity>
          {imageUri == null && (
            <Image
              style={{
                flex: 1,
                width: '100%',
                height: '100%',
                borderRadius: wp(8),
                resizeMode: 'stretch',
                zIndex: 0, // Ensure it's below other elements when no image
              }}
              source={appImages.updatePics}
            />
          )}
        </View>

        <View style={{marginRight: wp(2)}}>
          <TextInput
            mode="outlined"
            label="Video Name"
            outlineStyle={{borderRadius: wp(3)}}
            onChangeText={text => setProfileName(text)}
            style={[styles.ti, {borderRadius: wp(10)}]}
            outlineColor="#0000001F"
            placeholderTextColor={'#646464'}
            activeOutlineColor="#FACA4E"
            autoCapitalize="none"
            onFocus={handleFocus}
            onBlur={handleBlur}
            // left={isTextInputActive ? <Oemail /> : <Gemail />}
          />
        </View>

        <View style={{marginHorizontal: wp(7)}}>
          <Dropdown
            style={
              isFocus
                ? styles.textInputSelectedCategory
                : styles.textInputCategoryNonSelected
            }
            containerStyle={{
              marginTop: 3,
              alignSelf: 'center',
              borderRadius: wp(3),
              width: '100%',
            }}
            // dropdownPosition="top"
            // mode="modal"
            placeholderStyle={{
              color: '#121420',
              //   fontWeight: '400',
              fontFamily: 'Inter',
              fontSize: hp(1.8),
            }}
            iconStyle={isFocus ? styles.iconStyle : styles.iconStyleInactive}
            itemTextStyle={{color: '#000000'}}
            selectedTextStyle={{fontSize: 16, color: '#000000'}}
            // inputSearchStyle={styles.inputSearchStyle}
            // iconStyle={styles.iconStyle}
            value={category}
            data={categoriesSelect}
            search={false}
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder={'Select Category'}
            searchPlaceholder="Search..."
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setCategory(item.label);
              setCategoryId(item.value);
              setIsFocus(false);
            }}
            renderRightIcon={() => (
              <AntDesign
                style={styles.icon}
                color={isFocus ? '#FACA4E' : '#C4C4C4'}
                name="down"
                size={15}
              />
            )}
          />
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: hp(-1),
          }}>
          <CPaperInput
            multiline={true}
            placeholder={'Description'}
            placeholderTextColor="#121420"
            value={description}
            onChangeText={text => setDescription(text)}
            height={hp(20)}
          />
        </View>
        <View
          style={{
            marginTop: hp(5),
            marginBottom: hp(5),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CustomButton
            title={'Update'}
            load={false}
            // checkdisable={inn == '' && cm == '' ? true : false}
            customClick={() => {
              upload();
              //handleUpdatePassword();
              //navigation.navigate('Profile_image');
            }}
          />
        </View>
      </ScrollView>

      <RBSheet
        ref={ref_RBSheetCamera}
        closeOnDragDown={true}
        closeOnPressMask={false}
        animationType="fade"
        minClosingHeight={0}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(52, 52, 52, 0.5)',
          },
          draggableIcon: {
            backgroundColor: 'white',
          },
          container: {
            borderTopLeftRadius: wp(10),
            borderTopRightRadius: wp(10),
            height: hp(25),
          },
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: wp(8),
            alignItems: 'center',
          }}>
          <Text style={styles.maintext}>Select an option</Text>
          <TouchableOpacity onPress={() => ref_RBSheetCamera.current.close()}>
            <Ionicons
              name="close"
              size={22}
              color={'#303030'}
              onPress={() => ref_RBSheetCamera.current.close()}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginTop: hp(3),
          }}>
          <TouchableOpacity
            onPress={() => takePhotoFromCamera('camera')}
            style={
              selectedItem === 'camera'
                ? styles.selectedItems
                : styles.nonselectedItems
            }>
            <Ionicons
              color={selectedItem === 'camera' ? '#FACA4E' : '#888888'}
              name="camera"
              size={25}
            />

            <Text style={{color: '#333333'}}>From camera</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => choosePhotoFromLibrary('gallery')}
            style={
              selectedItem === 'gallery'
                ? styles.selectedItems
                : styles.nonselectedItems
            }>
            <MaterialCommunityIcons
              color={selectedItem === 'gallery' ? '#FACA4E' : '#888888'}
              name="image"
              size={25}
            />

            <Text style={{color: '#333333'}}>From gallery</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>

      <CustomSnackbar
        message={'success'}
        messageDescription={'Upload Video successfully'}
        onDismiss={dismissSnackbar} // Make sure this function is defined
        visible={snackbarVisible}
      />

      <View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {loading && <ActivityIndicator size="large" color="#FACA4E" />}
      </View>

      <CustomDialog
        visible={modalVisible}
        onClose={closeModal}
        onAction={performAction}
        imageURL="URL_TO_YOUR_IMAGE"
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    height: hp(6.2),
    marginTop: hp(5),
    alignItems: 'center',
    marginHorizontal: wp(8),
  },
  headerText: {
    fontSize: hp(2.5),
    alignSelf: 'center',
    marginLeft: wp(23),
    color: '#333333',
    fontFamily: 'Inter',
    fontWeight: 'bold',
  },
  ti: {
    marginHorizontal: '7%',
    marginTop: '5%',
    //width: 300,
    backgroundColor: 'white',
    fontSize: wp(4),
    paddingLeft: '2%',
    borderRadius: 100,
  },
  textInputSelectedCategory: {
    borderWidth: 1,
    borderRadius: wp(3),
    width: '98%',
    borderColor: '#FACA4E',

    paddingHorizontal: 20,
    paddingVertical: 6.8,
    marginBottom: 20,
    marginTop: hp(3),
  },
  textInputCategoryNonSelected: {
    borderWidth: 1,
    borderRadius: wp(3),
    width: '98%',
    borderColor: '#E7EAF2',
    paddingHorizontal: 20,
    paddingVertical: 6.8,
    marginBottom: 20,
    marginTop: hp(3),
  },
  iconStyle: {
    color: '#C4C4C4',
    width: 20,
    height: 20,
  },
  iconStyleInactive: {
    color: '#FACA4E',
  },
  maintext: {
    fontSize: hp(2.3),
    color: '#303030',
    fontWeight: 'bold',
  },
  modaltextview: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: wp(90),
    borderRadius: 25,
    backgroundColor: 'white',
    paddingHorizontal: wp(15),
  },
  optiontext: {
    fontSize: hp(1.7),
    color: '#303030',
    marginLeft: wp(4),
  },
  nonselectedItems: {
    width: wp(35),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: hp(14),
    borderRadius: wp(1.8),
    borderWidth: 1,
    borderColor: '#E7EAF2',
  },
  selectedItems: {
    width: wp(35),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: hp(14),
    borderRadius: wp(1.8),
    borderWidth: 1,
    borderColor: '#FACA4E',
  },
});
