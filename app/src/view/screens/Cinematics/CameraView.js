import {
  StyleSheet,
  FlatList,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TextInput,
  StatusBar,
  PermissionsAndroid,
  ImageBackground,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef, useMemo, useEffect} from 'react';
import Back from '../../../assets/svg/back.svg';
import {appImages} from '../../../assets/utilities/index';
import Slider from '@react-native-community/slider';
import VolumeUp from '../../../assets/svg/VolumeUp.svg';
import Like from '../../../assets/svg/Like.svg';
import UnLike from '../../../assets/svg/Unlike.svg';
import Comment from '../../../assets/svg/Comment.svg';
import Send from '../../../assets/svg/Send.svg';
import Download from '../../../assets/svg/Download.svg';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import ButtonSend from '../../../assets/svg/ButtonSend.svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import DownArrowComments from '../../../assets/svg/DownArrowComments.svg';
import UpArrowComments from '../../../assets/svg/UpArrowComments.svg';

import SmileEmoji from '../../../assets/svg/SmileEmoji.svg';

import Share from 'react-native-share';

import axios from 'axios';

import RNFetchBlob from 'rn-fetch-blob';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Fontiso from 'react-native-vector-icons/Fontisto';
import AsyncStorage from '@react-native-async-storage/async-storage';

import IonIcons from 'react-native-vector-icons/Ionicons';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { base_url } from '../../../../../baseUrl';
import Custom_Button from '../../../assets/Custom/Custom_Button';

export default function CameraView({navigation, route}) {
  const [showFullContent, setShowFullContent] = useState(false);

  const [pastedURL, setPastedURL] = useState(
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  );

  const [comments, setComments] = useState([]);

  const [likes, setLikes] = useState(null);

  const [commentsCount, setCommentsCount] = useState(null);

  const [showReply, setShowReply] = useState(false);

  const [loading, setLoading] = useState(false);

  const [userId, setUserId] = useState('');

  const [showMenu, setShowMenu] = useState(false);

  const [progress, setProgress] = useState(0);

  const [isBottomSheetExpanded, setIsBottomSheetExpanded] = useState(false);

  const ref_Comments = useRef(null);
 const [speed, setSpeed] = useState(1); // Initial speed value
  const [time, setTime] = useState(0); // Initial time value

  const [authToken, setAuthToken] = useState([]);

  const refSlide = useRef();

  const bottomSheetRef = useRef(null);
  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const [snackbarVisible, setsnackbarVisible] = useState(false);

  const [commentText, setCommentText] = useState(null); // State variable to hold the text

  const [showLikes, setShowLikes] = useState(false);

  useEffect(() => {
    // Make the API request and update the 'data' state
    fetchAll();
  }, []);

  const fetchAll = async () => {
    // Simulate loading
    setLoading(true);
    // Fetch data one by one

    await getUserID();

    //await fetchLikes()
    //await fetchCommentsCounts()

    // Once all data is fetched, set loading to false
    setLoading(false);
  };

   const handleSpeedChange = (value) => {
    // Update the speed value
    setSpeed(value);
  };
  const getUserID = async () => {
    console.log("Id's");
    try {
      const result = await AsyncStorage.getItem('userId ');
      if (result !== null) {
        setUserId(result);
        console.log('user id retrieved:', result);
      } else {
        console.log('user id null:', result);
      }

      const result1 = await AsyncStorage.getItem('authToken ');
      if (result1 !== null) {
        setAuthToken(result1);
        console.log('user token retrieved:', result1);
        await fetchComments(result1);
      } else {
        console.log('result is null', result);
      }
    } catch (error) {
      // Handle errors here
      console.error('Error retrieving user ID:', error);
    }
  };

  const dismissSnackbar = () => {
    setsnackbarVisible(false);
  };

  const handleUpdatePassword = async () => {
    // Perform the password update logic here
    // For example, you can make an API request to update the password

    // Assuming the update was successful
    setsnackbarVisible(true);

    // Automatically hide the Snackbar after 3 seconds
    setTimeout(() => {
      setsnackbarVisible(false);

      if (pastedURL !== '') {
        requestStoragePermission();
      } else {
        console.log('Please Add Video Url');
      }

      //navigation.goBack();
    }, 3000);
  };
  const sendComment = ()=>{
    <Text>hi</Text>
  }

  const clearTextInput = () => {
    console.log('came to logssssss', commentText);
    // Clear the text in the TextInput
    setCommentText(null);
    sendComment();
  };

  const chats = [
    {
      id: 1,
      name: 'John Doe',
      message: 'The laughter in this video is contagious!',
      reply: false,
    },
    {
      id: 2,
      name: 'Olivia Bennett',
      message: 'I wish I had a friend group like this. You all are incredible!',
      reply: false,
    },
    {
      id: 3,
      name: 'Ethan Rodriguez',
      message:
        'This video just made my day! Thanks for sharing your awesome moments.',
      reply: false,
    },
    {
      id: 4,
      name: 'Mia Bennett',
      message: 'Friendship goals right there! Love how close you all are',
      reply: false,
    },
    {
      id: 5,
      name: 'Liam Sullivan',
      message:
        'Looks like you guys are having an absolute blast! Wish I could join in on the fun',
      reply: false,
    },
  ];


  const renderComments = item => {
    //console.log('Items of comments', item);
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ViewElseProfile', {id: item?.userid})
          }
          style={{
            height: hp(10),
            //borderWidth:3,
            paddingHorizontal: wp(5),
            alignItems: 'center',
            flexDirection: 'row',
            width: '100%',
          }}>
          <View
            style={{
              height: wp(14),
              alignSelf: 'center',
              resizeMode: 'hidden',
              width: wp(14),
              borderRadius: wp(14),
            }}>
            <Image
              style={{width: '100%', borderRadius: wp(2.1), height: '100%'}}
              source={appImages.profileImg}
            />
          </View>

          <View
            style={{
              //flex: 1,
              marginLeft: wp(3),
              height: hp(5),
              //marginTop: hp(1),
              //borderWidth:3,
              justifyContent: 'space-around',
            }}>
            <Text
              style={{
                color: '#000000',
                fontFamily: 'Inter-Medium',
                fontSize: hp(2.1),
              }}>
              {item.username}
            </Text>

            <Text
              style={{
                color: '#4C4C4C',
                fontFamily: 'Inter-Regular',
                marginTop: hp(2.1),
                fontSize: hp(1.6),
              }}>
              {item.comment}
            </Text>

            {false && (
              <TouchableOpacity
                onPress={() => setShowReply(!showReply)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  //borderWidth:3,
                  height: hp(3),
                  width: wp(21),
                }}>
                {showReply === true ? (
                  <UpArrowComments />
                ) : (
                  <DownArrowComments />
                )}

                <Text
                  style={{
                    color: '#FACA4E',
                    fontFamily: 'Inter-Regular',
                    marginLeft: wp(1.8),
                    fontSize: hp(1.6),
                  }}>
                  2
                </Text>

                <Text
                  style={{
                    color: '#FACA4E',
                    fontFamily: 'Inter-Regular',
                    marginLeft: wp(1.3),
                    fontSize: hp(1.6),
                  }}>
                  replies
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>

        {showReply && (
          <View
            style={{
              justifyContent: 'space-evenly',
              height: hp(15),
              //borderWidth:3,
              marginLeft: wp(20),
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: hp(6),
                width: '100%',
              }}>
              <View
                style={{
                  height: wp(10),
                  alignSelf: 'center',
                  resizeMode: 'hidden',
                  width: wp(10),
                  borderRadius: wp(10),
                }}>
                <Image
                  style={{width: '100%', borderRadius: wp(2.1), height: '100%'}}
                  source={appImages.profileImg}
                />
              </View>

              <View style={{flex: 1, justifyContent: 'space-between'}}>
                <Text
                  style={{
                    color: '#000000',
                    fontFamily: 'Inter-Regular',
                    marginLeft: wp(1.8),
                    fontSize: hp(1.6),
                  }}>
                  Olivia Bennett
                </Text>

                <Text
                  style={{
                    color: '#4C4C4C',
                    fontFamily: 'Inter-Regular',
                    marginLeft: wp(2),
                    fontSize: hp(1.3),
                  }}>
                  I wish I had a friend group like this. You all are incredible!
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: hp(6),
                width: '100%',
              }}>
              <View
                style={{
                  height: wp(10),
                  alignSelf: 'center',
                  resizeMode: 'hidden',
                  width: wp(10),
                  borderRadius: wp(10),
                }}>
                <Image
                  style={{width: '100%', borderRadius: wp(2.1), height: '100%'}}
                  source={appImages.profileImg}
                />
              </View>

              <View style={{flex: 1, justifyContent: 'space-between'}}>
                <Text
                  style={{
                    color: '#000000',
                    fontFamily: 'Inter-Regular',
                    marginLeft: wp(1.8),
                    fontSize: hp(1.6),
                  }}>
                  Olivia Bennett
                </Text>

                <Text
                  style={{
                    color: '#4C4C4C',
                    fontFamily: 'Inter-Regular',
                    marginLeft: wp(2),
                    fontSize: hp(1.3),
                  }}>
                  I wish I had a friend group like this. You all are incredible!
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  };
const gotoPost=()=>{
    navigation.navigate('CameraUpload')
}
  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Downloader App Storage Permission',
          message:
            'Downloader App needs access to your storage ' +
            'so you can download files',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // downloadFile();
      } else {
        console.log('storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const toggleContentLike = () => {
    setShowLikes(!showLikes);
    // sendLikes();
  };

 
  const shareViaWhatsApp = async () => {
    const shareOptions = {
      title: 'Share via',
      message: 'Hey! Check out this cool app!',
      url: 'https://play.google.com/store/apps/details?id=your.app.package',
      //social: Share.Social,
    };

    try {
      await Share.open(shareOptions);
    } catch (error) {
      console.error('Error sharing via WhatsApp:', error.message);
    }
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ImageBackground source={require('../../../assets/images/bg.png')} style={{flex: 1}}>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="dark-content" // You can set the StatusBar text color to dark or light
        />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IonIcons name={'chevron-back'} color={'white'} size={25} />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomView}>
          <View style={{height: hp(25)}}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{flex: 1}}
              contentContainerStyle={{
                verticalLine: false,
                marginHorizontal: wp(8),
              }}>
               <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: hp(6.5),
              marginRight: hp(10),
            }}>
             </View>
             <TouchableOpacity onPress={gotoPost}>
              <Custom_Button title='Next' />
              </TouchableOpacity>
          
          <Text style={{color:"white", textAlign:"center"}}>Change Cinematic</Text>
            </ScrollView>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: hp(8),
                marginHorizontal: wp(8),
              }}>
            </View>
          </View>
        </View>
      </ImageBackground>

      <BottomSheet
        ref={ref_Comments}
        index={isBottomSheetExpanded ? 0 : -1} // Set to -1 to start with collapsed state
        snapPoints={['65%', '90%']} // Adjust snap points as needed
        onScroll={event => {
          console.log('Event', event);
          const offsetY = event.nativeEvent.contentOffset.y;
          if (isBottomSheetExpanded && offsetY === 0) {
            setIsBottomSheetExpanded(false);
          } else if (!isBottomSheetExpanded && offsetY > 0) {
            setIsBottomSheetExpanded(true);
          }
        }}
        //snapPoints={snapPoints}
        //onChange={handleSheetChange}
        height={210}
        openDuration={250}
        closeOnDragDown={true}
        draggableIcon={false}
        closeOnPressMask={true}
        customStyles={{
          container: {
            borderTopLeftRadius: 100,
            borderTopRightRadius: 100,
            paddingTop: 0,
            padding: 20,
            zIndex: 999,
            backgroundColor: 'white',
          },
          draggableIcon: {
            backgroundColor: 'white',
          },
        }}>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            height: hp(5),
          }}>
          <Text
            style={{
              color: '#000000',
              fontFamily: 'Inter-Bold',
              fontSize: hp(2.3),
            }}>
            Comments
          </Text>
        </View>

        <View style={{marginTop: hp(1), flex: 1}}>
          <BottomSheetFlatList
            data={comments}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => renderComments(item)}
            extraData={loading}
          />
        </View>

        {showReply === false ? (
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              height: hp(8),
            }}>
            <TouchableOpacity
              style={{
                height: hp(8),
                justifyContent: 'center',
                alignItems: 'center',
                width: wp(14),
              }}>
              <SmileEmoji />
            </TouchableOpacity>

            <TextInput
              value={commentText} // Bind the value to the state variable
              onChangeText={text => setCommentText(text)} // Update state on text change
              placeholderTextColor={'#848484'}
              placeholder="Write Comment Heressssss"
              style={{flex: 1, marginLeft: wp(1)}}
            />

            <TouchableOpacity onPress={() => clearTextInput}>
              <ButtonSend />
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              height: hp(8),
            }}>
            <TouchableOpacity
              style={{
                height: hp(8),
                justifyContent: 'center',
                alignItems: 'center',
                width: wp(14),
              }}>
              <SmileEmoji />
            </TouchableOpacity>

            <TextInput
              value={commentText} // Bind the value to the state variable
              onChangeText={text => setCommentText(text)} // Update state on text change
              placeholderTextColor={'#848484'}
              placeholder="Add a reply"
              style={{flex: 1, marginLeft: wp(1)}}
            />

            <TouchableOpacity onPress={() => clearTextInput()}>
              <ButtonSend />
            </TouchableOpacity>
          </View>
        )}
      </BottomSheet>

      {isBottomSheetExpanded && showReply === false ? (
        <View
          style={{
            width: '100%',
            position: 'absolute',
            bottom: 0,
            left: 0,
            backgroundColor: 'white',
            flexDirection: 'row',
            alignItems: 'center',
            height: hp(8),
          }}>
          <TouchableOpacity
            style={{
              height: hp(8),
              justifyContent: 'center',
              alignItems: 'center',
              width: wp(14),
            }}>
            <SmileEmoji />
          </TouchableOpacity>

          <TextInput
            value={commentText} // Bind the value to the state variable
            onChangeText={text => setCommentText(text)} // Update state on text change
            placeholderTextColor={'#848484'}
            placeholder="Write Comment Here"
            style={{flex: 1, marginLeft: wp(1)}}
          />

          <TouchableOpacity onPress={() => clearTextInput()}>
            <ButtonSend />
          </TouchableOpacity>
        </View>
      ) : (
        isBottomSheetExpanded && (
          <View
            style={{
              width: '100%',
              backgroundColor: 'white',
              flexDirection: 'row',
              alignItems: 'center',
              height: hp(8),
            }}>
            <TouchableOpacity
              style={{
                height: hp(8),
                justifyContent: 'center',
                alignItems: 'center',
                width: wp(14),
              }}>
              <SmileEmoji />
            </TouchableOpacity>

            <TextInput
              value={commentText} // Bind the value to the state variable
              onChangeText={text => setCommentText(text)} // Update state on text change
              placeholderTextColor={'#848484'}
              placeholder="Add a reply"
              style={{flex: 1, marginLeft: wp(1)}}
            />

            <TouchableOpacity onPress={() => clearTextInput()}>
              <ButtonSend />
            </TouchableOpacity>
          </View>
        )
      )}

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
    </GestureHandlerRootView>
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
    marginTop: hp(8),
    alignItems: 'center',
    marginHorizontal: wp(8),
  },
  bottomView: {
    flex: 1,
    justifyContent: 'flex-end',
    // You can add padding or content to this view as needed.
  },
  textProfileName: {
    color: '#FFFFFF',
    fontSize: hp(2),
    marginLeft: wp(3),
    fontFamily: 'Inter',
    fontWeight: 'bold',
  },
    containerMusic: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top:"15%"
  },
  musicBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  slider: {
    flex: 1,
    marginRight: 10,
  },
  time: {
    color: 'white',
    fontSize: 16,
  },
});
