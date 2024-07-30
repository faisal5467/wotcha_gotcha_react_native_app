import {
  StyleSheet,
  FlatList,
  Text,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  ImageBackground,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Divider, TextInput} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PlusPost from '../../assets/svg/PlusPost.svg';
import Approved from '../../assets/svg/Approved.svg';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import Back from '../../assets/svg/back.svg';
import {appImages} from '../../assets/utilities/index';
import Slider from '@react-native-community/slider';
import VolumeUp from '../../assets/svg/VolumeUp.svg';
import Like from '../../assets/svg/Like.svg';
import UnLike from '../../assets/svg/Unlike.svg';
import Comment from '../../assets/svg/Comment.svg';
import Send from '../../assets/svg/Send.svg';
import Download from '../../assets/svg/Download.svg';
import CustomButton from '../../assets/Custom/Custom_Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Share from 'react-native-share';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Fontiso from 'react-native-vector-icons/Fontisto';

import IonIcons from 'react-native-vector-icons/Ionicons';

import {SelectCountry, Dropdown} from 'react-native-element-dropdown';
import CPaperInput from '../../assets/Custom/CPaperInput';
import Headers from '../../assets/Custom/Headers';
import { base_url } from '../../../../baseUrl';

const Category = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
];

export default function LetterDetails({navigation, route}) {
  const [loading, setLoading] = useState(false);

  const [authToken, setAuthToken] = useState('');

  const [convertedDate, setConvertedDate] = useState('');

  const [convertedTime, setConvertedTime] = useState('');

  const [signatureData, setSignatureData] = useState(null);

  const receivedData = route.params?.Letters;

  console.log('Recieved Letter Data', receivedData);

  useEffect(() => {
    // Make the API request and update the 'data' state
    console.log('Came to use effect');

    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    // Simulate loading
    setLoading(true);

    await getUserID();

    // Fetch data one by one
    // Once all data is fetched, set loading to false
    setLoading(false);
  };

  const getUserID = async () => {
    try {
      const result = await AsyncStorage.getItem('authToken ');
      if (result !== null) {
        setAuthToken(result);
        console.log('Token', result);

        await fetchSignature(result);

        // console.log('user id retrieved:', result);
      }
    } catch (error) {
      // Handle errors here
      console.error('Error retrieving user ID:', error);
    }
  };

  const fetchSignature = async tokenId => {
    const token = tokenId;

    try {
      const response = await fetch(
        base_url + `signature/getSpecificSignature/${receivedData?.signature_id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();

      const imageUrl = result.Signature.signature_image;
      /* ? setSignatureData(`https://watch-gotcha-be.mtechub.com${result.Signature.signature_image}`)
      : setSignatureData(`result.Signature.signature_image`); */

      if (imageUrl.startsWith('/fileUpload')) {
        setSignatureData(`https://watch-gotcha-be.mtechub.com/${imageUrl}`);
      } else {
        setSignatureData(`${imageUrl}`);
      }

      console.log('image', signatureData);
      //Alert.alert(result)

      await covertTimeAndDate(receivedData?.post_date);
    } catch (error) {
      console.error('Error Trending:', error);
    }
  };

  const covertTimeAndDate = async data => {
    const originalDateString = data;
    const originalDate = new Date(originalDateString);

    // Format the date in a readable way
    const formattedDateValue = originalDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Format the time in a readable way
    const formattedTimeValue = originalDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    console.log('Formatted Date', formattedDateValue);
    console.log('Formatted Time', formattedTimeValue);

    // Save formatted date and time in states
    setConvertedDate(formattedDateValue);
    setConvertedTime(formattedTimeValue);
  };

  const availableApps = [
    {
      id: 1,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches1,
    },
    {
      id: 2,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches2,
    },
    {
      id: 3,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches3,
    },
    {
      id: 4,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches4,
    },
    {
      id: 5,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches1,
    },
    {
      id: 6,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches2,
    },
    {
      id: 7,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches3,
    },
    {
      id: 8,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches4,
    },
    {
      id: 9,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches1,
    },
    {
      id: 10,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches2,
    },
  ];

  const renderAvailableApps = item => {
    console.log('Items', item);
    return (
      <View style={{width: wp(30), margin: 5}}>
        <View>
          <Image
            style={{
              position: 'absolute',
              top: 0,
              left: 0,

              zIndex: 1, // Ensure it's on top of other elements
              //flex: 1,
              width: '100%',
              height: hp(12),
              borderRadius: wp(3),
              resizeMode: 'cover',
            }}
            source={{uri: item}}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: wp(2),
            marginTop: hp(12.5),
          }}>
          <Text style={{fontSize: hp(1.1), fontWeight: 'bold', width: wp(23)}}>
            {item?.title}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content" // You can set the StatusBar text color to dark or light
      />
      <View style={{marginTop: hp(5)}}>
        <Headers
          onPress={() => navigation.goBack()}
          showBackIcon={true}
          showText={true}
          text={'Letter Details'}
        />
      </View>

      <ScrollView style={{flex: 1}}>
        <View
          style={{
            marginTop: hp(2.1),
            height: hp(2.6),
            backgroundColor: '#77BDF2',
          }}></View>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ViewElseProfile', {id: receivedData?.user_id})
          }
          style={{
            flexDirection: 'row',
            marginHorizontal: wp(8),
            marginTop: hp(1.8),
            alignItems: 'center',
            height: hp(10),
            //borderWidth: 3,
          }}>
          {receivedData?.userimage !== null ||
          receivedData?.userimage !== undefined ? (
            <View
              style={{
                //borderWidth: 3,
                height: hp(8),
                width: wp(18),
                borderRadius: wp(3),
              }}>
              <Image
                source={{uri: receivedData?.userimage}}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: wp(3),
                  resizeMode: 'cover',
                }}
              />
            </View>
          ) : (
            <MaterialCommunityIcons
              style={{marginTop: hp(0.5)}}
              name={'account-circle'}
              size={35}
              color={'#FACA4E'}
            />
          )}

          <View style={{marginLeft: wp(2.5)}}>
            <Approved width={20} height={20} />
          </View>
        </TouchableOpacity>

        <View
          style={{
            alignItems: 'flex-end',
            marginTop: hp(-2),
            marginRight: wp(3),
          }}>
          <Text
            style={{
              color: '#282828',
              marginLeft: wp(3),
              fontFamily: 'Inter',
              fontWeight: 'bold',
            }}>
            {convertedDate}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            height: hp(5),
            marginTop: hp(1),
            alignItems: 'center',
            marginHorizontal: wp(8),
          }}>
          <Text
            style={{
              color: '#282828',
              marginLeft: wp(1),
              textDecorationLine: 'underline',
              fontFamily: 'Inter',
              fontWeight: 'bold',
            }}>
            Object:
          </Text>

          <Text
            style={{
              color: '#595959',
              marginLeft: wp(1),
              //textDecorationLine:'underline',
              fontFamily: 'Inter-Regular',
              //fontWeight: 'bold',
            }}>
            {receivedData?.body}
          </Text>
        </View>

        <View
          style={{
            marginHorizontal: wp(8),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#595959',
              marginLeft: wp(1),
              //textDecorationLine:'underline',
              fontFamily: 'Inter-Regular',
              //fontWeight: 'bold',
            }}>
            {receivedData?.body}
            {/* Dear Ms. Davis, {'\n'}I hope this letter finds you well. I am
            writing to you on behalf of XYZ Solutions, and I am excited to
            present an important business proposal that I believe could be
            mutually beneficial for both our companies. {'\n'}
            {'\n'}
            Over the past few months, our team has been thoroughly researching
            potential partners in the industry, and Davis Enterprises
            consistently stood out as a company with a remarkable track record
            of innovation and success. {'\n'}
            {'\n'}
            We are impressed by your commitment to excellence and your
            dedication to delivering top-notch products and services to your
            clients.I look forward to the possibility of working together and
            creating a prosperous future.{'\n'}
            {'\n'}
            We are impressed by your commitment to excellence and your
            dedication to delivering top-notch products and services to your
            clients.I look forward to the possibility of working together and
            creating a prosperous future. */}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginHorizontal: wp(8),
            marginBottom: wp(8),
            height: hp(7),
          }}>
          <Image
            source={{uri: `${signatureData}`}}
            style={{
              resizeMode: 'contain',
              width: wp(30),
              height: wp(30),
            }}
          />
        </View>

        <View
          style={{marginTop: hp(1), marginHorizontal: wp(8), height: '100%'}}>
          <FlatList
            style={{flex: 1}}
            showsVerticalScrollIndicator={false}
            data={receivedData?.images}
            horizontal
            //keyExtractor={item => item.id.toString()}
            renderItem={({item}) => renderAvailableApps(item)}
          />
        </View>
      </ScrollView>

      {loading === true ? (
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
          <ActivityIndicator size="large" color="#FACA4E" />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
