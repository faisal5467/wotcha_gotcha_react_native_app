import {
  StyleSheet,
  FlatList,
  Text,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  ImageBackground,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Shares from 'react-native-share';
import PenSettings from '../../../assets/svg/PenSettings.svg';
import LockSettings from '../../../assets/svg/LockSettings.svg';
import BookMarkSettings from '../../../assets/svg/BookmarkSettings.svg';
import Delete from '../../../assets/svg/Delete2.svg';
import Share from '../../../assets/svg/Share.svg';
import Star from '../../../assets/svg/Star.svg';
import Vector from '../../../assets/svg/Vector.svg';

import Headers from '../../../assets/Custom/Headers';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {appImages} from '../../../assets/utilities';
import RBSheet from 'react-native-raw-bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { base_url } from '../../../../../baseUrl';

export default function ProfileSettings({navigation}) {
  const ref_RBSheetLogout = useRef(null);

  const ref_RBSheetDelete = useRef(null);

  const [userId, setUserId] = useState('');

  const [authToken, setAuthToken] = useState('');

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    // Simulate loading
    setIsLoading(true);

    await getUserID();
    // Fetch data one by one
    // Once all data is fetched, set loading to false
    setIsLoading(false);
  };

  const getUserID = async () => {
    console.log("Id's");
    try {
      const result1 = await AsyncStorage.getItem('authToken ');
      if (result1 !== null) {
        setAuthToken(result1);
        console.log('user token retrieved:', result1);
      }

      const result3 = await AsyncStorage.getItem('userId ');
      if (result3 !== null) {
        setUserId(result3);

        console.log('user id retrieved:', result3);
      }
    } catch (error) {
      // Handle errors here
      console.error('Error retrieving user ID:', error);
    }
  };

  const goBack = () => {
    ref_RBSheetLogout.current.close();

    logOut();
  };

  const logOut = async () => {
    ref_RBSheetLogout.current.close();

    console.log('KEYS CALLED');
    try {
      // Keys to exclude from removal
      const keysToExclude = ['UserToken', 'favouriteData'];

      // Get all keys in AsyncStorage
      const keys = await AsyncStorage.getAllKeys();

      // Remove all items corresponding to the retrieved keys, except excluded keys
      const filteredKeys = keys.filter(key => !keysToExclude.includes(key));
      await AsyncStorage.multiRemove(filteredKeys);

      // Check if keys are deleted
      const remainingKeys = await AsyncStorage.getAllKeys();

      if (remainingKeys.length === keysToExclude.length) {
        // Optionally, you can perform additional actions after clearing AsyncStorage
        // For example, display a success message
        // Move to the next page (replace 'NextScreen' with your actual screen name)
        // navigation.replace('SignIn');
        navigation.reset({
          index: 0,
          routes: [{name: 'Signin_signup'}],
        });
      } else {
        // Handle the case where keys are not deleted successfully
        console.log('Failed To Delete Keys');
      }
    } catch (error) {
      // Handle errors, such as AsyncStorage access issues
      console.error('Error clearing AsyncStorage:', error);
    }
    navigation.navigate('Signin_signup');
  };
  const deleteAccount = () => {
    ref_RBSheetDelete.current.close();
    deleteUser();
  };

  const deleteUser = async () => {
    const token = authToken;
    try {
      const response = await fetch(
        base_url + `user/deleteUser/${userId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            // Include any additional headers as needed
          },
          // You may include a request body if required by the server
          // body: JSON.stringify({}),
        },
      );

      if (response.ok) {
        handleUpdateDeletePassword();
        // Optionally handle the response data here
      } else {
        // Optionally handle the error response here
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle other errors such as network issues
    }
  };

  const shareViaWhatsApp = async () => {
    const shareOptions = {
      title: 'Share via',
      message: 'Hey! Check out this cool app!',
      url: 'https://play.google.com/store/apps/details?id=your.app.package',
      //social: Share.Social,
    };

    try {
      await Shares.open(shareOptions);
    } catch (error) {
      console.error('Error sharing via WhatsApp:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{marginTop: hp(5)}}>
        <Headers
          onPress={() => navigation.goBack()}
          showBackIcon={true}
          showText={true}
          text={'Settings'}
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('UpdateProfile')}
        style={{
          height: hp(7),
          marginTop: hp(5),
          marginHorizontal: wp(8),
          borderWidth: 1,
          borderRadius: wp(3),
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: '#00000017',
        }}>
        <View style={{marginLeft: wp(5)}}>
          <PenSettings width={18} height={18} />
        </View>

        <Text
          style={{
            color: '#4C4C4C',
            marginLeft: wp(3),
            fontFamily: 'Inter-Regular',
            //fontWeight: 'bold',
          }}>
          Update Profile
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('UpdatePassword')}
        style={{
          height: hp(7),
          marginTop: hp(3),
          marginHorizontal: wp(8),
          borderWidth: 1,
          borderRadius: wp(3),
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: '#00000017',
        }}>
        <View style={{marginLeft: wp(5)}}>
          <LockSettings width={18} height={18} />
        </View>

        <Text
          style={{
            color: '#4C4C4C',
            marginLeft: wp(3),
            fontFamily: 'Inter-Regular',
            //fontWeight: 'bold',
          }}>
          Update Password
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('SavedItems')}
        style={{
          height: hp(7),
          marginTop: hp(3),
          marginHorizontal: wp(8),
          borderWidth: 1,
          borderRadius: wp(3),
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: '#00000017',
        }}>
        <View style={{marginLeft: wp(5)}}>
          <BookMarkSettings width={18} height={18} />
        </View>

        <Text
          style={{
            color: '#4C4C4C',
            marginLeft: wp(3),
            fontFamily: 'Inter-Regular',
            //fontWeight: 'bold',
          }}>
          Saved Items
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('RateApp')}
        style={{
          height: hp(7),
          marginTop: hp(3),
          marginHorizontal: wp(8),
          borderWidth: 1,
          borderRadius: wp(3),
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: '#00000017',
        }}>
        <View style={{marginLeft: wp(5)}}>
          <Star width={18} height={18} />
        </View>

        <Text
          style={{
            color: '#4C4C4C',
            marginLeft: wp(3),
            fontFamily: 'Inter-Regular',
            //fontWeight: 'bold',
          }}>
          Rate App
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => shareViaWhatsApp()}
        style={{
          height: hp(7),
          marginTop: hp(3),
          marginHorizontal: wp(8),
          borderWidth: 1,
          borderRadius: wp(3),
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: '#00000017',
        }}>
        <View style={{marginLeft: wp(5)}}>
          <Share width={18} height={18} />
        </View>

        <Text
          style={{
            color: '#4C4C4C',
            marginLeft: wp(3),
            fontFamily: 'Inter-Regular',
            //fontWeight: 'bold',
          }}>
          Share App
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('HelpScreen')}
        style={{
          height: hp(7),
          marginTop: hp(3),
          marginHorizontal: wp(8),
          borderWidth: 1,
          borderRadius: wp(3),
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: '#00000017',
        }}>
        <View style={{marginLeft: wp(5)}}>
          <Vector width={18} height={18} />
        </View>

        <Text
          style={{
            color: '#4C4C4C',
            marginLeft: wp(3),
            fontFamily: 'Inter-Regular',
            //fontWeight: 'bold',
          }}>
          Help
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => ref_RBSheetDelete.current.open()}
        style={{
          height: hp(7),
          marginTop: hp(3),
          marginHorizontal: wp(8),
          borderWidth: 1,
          borderRadius: wp(3),
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: '#00000017',
        }}>
        <View style={{marginLeft: wp(5)}}>
          <Delete width={18} height={18} />
        </View>

        <Text
          style={{
            color: '#4C4C4C',
            marginLeft: wp(3),
            fontFamily: 'Inter-Regular',
            //fontWeight: 'bold',
          }}>
          Delete Account
        </Text>
      </TouchableOpacity>

      <View
        style={{
          flex: 1,
          //borderWidth: 3,
          marginBottom: wp(12),
          justifyContent: 'flex-end',
        }}>
        <TouchableOpacity
          onPress={() => ref_RBSheetLogout.current.open()}
          style={{
            borderRadius: wp(5),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: wp(10),
            backgroundColor: '#FACA4E',
            height: hp(6.5),
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: '100%',
              width: wp(25),
            }}>
            <Image
              source={appImages.LogOut}
              style={{width: wp(5), height: hp(7), resizeMode: 'contain'}}
            />
            <Text
              style={{
                color: '#232323',
                marginLeft: wp(3),
                fontFamily: 'Inter-Medium',
                //fontWeight: 'bold',
              }}>
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <RBSheet
        ref={ref_RBSheetLogout}
        height={330}
        openDuration={250}
        enableOverDrag={false}
        enabledGestureInteraction={false}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          container: {
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingTop: 0,
            padding: 20,
            zIndex: 999,
          },
          draggableIcon: {
            backgroundColor: 'transparent',
          },
        }}>
        <Image source={appImages.alert} style={{resizeMode: 'contain'}} />
        <Text
          style={[
            styles.txtNotification,
            {marginTop: 1, fontSize: hp(2.5), fontWeight: '500'},
          ]}>
          Confirmation
        </Text>

        <Text style={{marginTop: hp(2)}}>Do You Really Want To Logout?</Text>

        <View style={styles.buttonDirections}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => ref_RBSheetLogout.current.close()}>
            <Text style={styles.textButton}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => goBack()}
            style={[styles.button, {backgroundColor: '#FACA4E'}]}>
            <Text style={[styles.textButton, {color: '#232323'}]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>

      <RBSheet
        ref={ref_RBSheetDelete}
        height={330}
        openDuration={250}
        enableOverDrag={false}
        enabledGestureInteraction={false}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          container: {
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingTop: 0,
            padding: 20,
            zIndex: 999,
          },
          draggableIcon: {
            backgroundColor: 'transparent',
          },
        }}>
        <Image source={appImages.alert} style={{resizeMode: 'contain'}} />
        <Text
          style={[
            styles.txtNotification,
            {marginTop: 1, fontSize: hp(2.5), fontWeight: '500'},
          ]}>
          Confirmation
        </Text>

        <Text style={{marginTop: hp(2)}}>
          Do You Really Want To Delete Your Account?
        </Text>

        <View style={styles.buttonDirections}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => ref_RBSheetDelete.current.close()}>
            <Text style={styles.textButton}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => deleteAccount()}
            style={[styles.button, {backgroundColor: '#FACA4E'}]}>
            <Text style={[styles.textButton, {color: '#232323'}]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttonDirections: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(4.3),
    width: '100%',
    marginLeft: wp(5),
    justifyContent: 'space-evenly',
  },
  button: {
    borderColor: '#FACA4E',
    borderWidth: 0.8,
    borderRadius: wp(5),
    width: wp(35),
    height: hp(5.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: '#FACA4E',
    fontWeight: 'bold',
  },
  txtNotification: {
    fontWeight: '500',
    marginTop: hp(10),
    marginLeft: wp(5),
    fontSize: hp(2.3),
    color: '#0B0B0B',
  },
});
