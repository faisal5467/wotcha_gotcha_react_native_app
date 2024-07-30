import {
  StyleSheet,
  FlatList,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Text,
  View,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';

import Fontiso from 'react-native-vector-icons/Fontisto';
import Headers from '../../../assets/Custom/Headers';
import Approved from '../../../assets/svg/Approved';
import Chat from '../../../assets/svg/Chat.svg';

import Add from '../../../assets/svg/AddMainScreen.svg';

import {appImages} from '../../../assets/utilities';

import AsyncStorage from '@react-native-async-storage/async-storage';

import RBSheet from 'react-native-raw-bottom-sheet';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useIsFocused} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { base_url } from '../../../../../baseUrl';
import { useNavigation } from '@react-navigation/native';

export default function PicTours() {
  const navigation = useNavigation();
  const [selectedItemVideoId, setSelectedItemVideoId] = useState(null);

  const [selectedItemDiscId, setSelectedItemDiscId] = useState(null);

  const [selectedItemPicsId, setSelectedItemPicsId] = useState(null);

  const [imageInfo, setImageInfo] = useState(null);

  const [selectedItemMarketId, setSelectedItemMarketId] = useState(null);

  const isFocused = useIsFocused();
  //pic
  const [selectedItemId, setSelectedItemId] = useState(8);

  const [loading, setLoading] = useState(false);

  const [searchesData, setSearches] = useState('');

  const [selectedItem, setSelectedItem] = useState('');

  const [data, setData] = useState([]);

  const [dataLatestVideos, setDataLatestVideos] = useState([]);

  const [dataMostViewedVideos, setMostViewedVideos] = useState([]);

  const [dataMostCommentedVideos, setMostCommentedVideos] = useState([]);

  const [dataTopVideos, setDataTopVideos] = useState([]);

  const [authToken, setAuthToken] = useState('');

  const ref_RBSheetCamera = useRef(null);

  useEffect(() => {
    // Make the API request and update the 'data' state
    fetchVideos();
  }, [selectedItemPicsId, isFocused]);

  const fetchVideos = async () => {
    // Simulate loading
    setLoading(true);

    // Fetch data one by one
    await getUserID();
    await fetchTrendingVideos();
    await fetchTopVideos();
    await fetchLatestVideos();
    await fetchMostViewedVideos();
    await fetchMostCommentedVideos();

    // Once all data is fetched, set loading to false
    setLoading(false);
  };

  const getUserID = async () => {

    try {
      const result = await AsyncStorage.getItem('authToken ');
      if (result !== null) {
        setAuthToken(result);
        await fetchCategory(result);
        console.log('user id retrieved:', result);
      }
    } catch (error) {
      // Handle errors here
      console.error('Error retrieving user ID:', error);
    }
  };

  const fetchCategory = async result => {
    const token = result;

    try {
      const response = await fetch(
        base_url + 'picCategory/getAllPicCategories',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      // console.log('Search Results', result.AllCategories);
      setSearches(result.AllCategories); // Update the state with the fetched data
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchTrendingVideos = async () => {
    // console.log('selected id trending videos', authToken);
    const token = authToken;

    try {
      const response = await fetch(
        base_url + `picTour/getAllTrendingToursByCategory/${selectedItemPicsId}?page=1&limit=5`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      // console.log('Resultings Pics Tourzs', result.Tours);
      setData(result.Tours); // Update the state with the fetched data
    } catch (error) {
      console.error('Error Trending:', error);
    }
  };

  const fetchLatestVideos = async () => {
    // console.log('selected id latest videos', authToken);

    const token = authToken;

    try {
      const response = await fetch(
        base_url + `picTour/getAllRecentVideosByCategory/${selectedItemPicsId}?page=1&limit=5`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      // console.log('Resultings', result.Tours);
      setDataLatestVideos(result.Tours); // Update the state with the fetched data
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchMostViewedVideos = async () => {
    // console.log('selected id most viewed videos', authToken);

    const token = authToken;

    try {
      const response = await fetch(
        base_url + `picTour/getMostViewedToursByCategory/${selectedItemPicsId}?page=1&limit=5`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      // console.log('Resultings Most Viewed', result.Tours);
      setMostViewedVideos(result.Tours); // Update the state with the fetched data
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchTopVideos = async () => {
    // console.log('Category Top Videos', selectedItemPicsId);
    const token = authToken;

    try {
      const response = await fetch(
        base_url + `top/app/top_tour/${selectedItemPicsId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      // console.log('Resultings of Top Videossss', result);
      setDataTopVideos(result.topTour[0]); // Update the state with the fetched data
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchMostCommentedVideos = async () => {
    // console.log('selected most commented videos', authToken);

    const token = authToken;

    try {
      const response = await fetch(
        base_url + `picTour/getMostCommentedToursByCategory/${selectedItemPicsId}?page=1&limit=5`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      // console.log('Resultings', result.Tours);
      setMostCommentedVideos(result.Tours); // Update the state with the fetched data
    } catch (error) {
      console.error('Error:', error);
    }
  };

  //pics search

  const renderSearchesPic = item => {
    // console.log('First Id', searchesData[0].id);
    let isSelected;
    if (selectedItemPicsId === null) {
      isSelected = searchesData[0].id === item.id;
      setSelectedItemPicsId(searchesData[0].id);
    } else {
      // console.log('Items', item);
      isSelected = selectedItemPicsId === item.id;
    }

    return (
      <TouchableOpacity
        style={[
          styles.searchesDetails,
          {
            backgroundColor: isSelected ? '#FACA4E' : '#F2F2F2',
          },
        ]}
        onPress={() => {
          setSelectedItemPicsId(item.id);
          // console.log('Selected item:', item.title);
        }}>
        <Text
          style={[
            styles.textSearchDetails,
            {color: isSelected ? '#232323' : '#939393'},
          ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const searchesPics = [
    {id: 1, title: 'Funny'},
    {id: 2, title: 'Sports'},
    {id: 3, title: 'Historic'},
    {id: 4, title: 'Technology'},
    {id: 5, title: 'Celebrities'},
    {id: 6, title: 'Animals'},
    {id: 7, title: 'Beauty & Fashion'},
    {id: 8, title: 'People'},
    {id: 9, title: 'Food'},
    {id: 8, title: 'Science'},
    {id: 9, title: 'Nature'},
    {id: 10, title: 'Travel'},
    {id: 11, title: 'Art'},
  ];

  const renderAvailableAppsVideo = item => {
    // console.log('Items of Pics', item);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('PicDetails', {picData: item})}
        style={{
          width: wp(35),
          borderRadius: wp(5),
          height: hp(25),
          margin: 5,
        }}>
        <View>
          {!item.image ||
          item.image === 'undefined' ||
          item.image.startsWith('/') ? (
            <Image
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1,
                width: '100%',
                height: hp(12),
                borderRadius: wp(1),
                resizeMode: 'cover',
              }}
              source={appImages.galleryPlaceHolder}
            />
          ) : (
            <Image
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1,
                width: '100%',
                height: hp(12),
                borderRadius: wp(1),
                resizeMode: 'cover',
              }}
              source={{uri: item.image}}
            />
          )}

          {/* <Image
            style={{
              position: 'absolute',
              top: 0,
              left: 0,

              zIndex: 1, // Ensure it's on top of other elements
              //flex: 1,
              width: '100%',
              height: hp(12),
              borderRadius: wp(1),
              resizeMode: 'cover',
            }}
            source={appImages.topSearches1}
          /> */}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: wp(0.5),
            marginTop: hp(18),
          }}>
          <Text
            style={{
              fontSize: hp(1.5),
              fontFamily: 'Inter-Regular',
              color: '#000000',
              width: wp(23),
            }}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const takePhotoFromCamera = async value => {
    setSelectedItem(value);
    launchCamera(
      {
        mediaType: 'photo',
        //videoQuality: 'medium',
      },
      response => {
        console.log('image here', response);
        if (!response.didCancel) {
          if (response.assets && response.assets.length > 0) {
            setLoading(true);
            setImageInfo(response.assets[0]);
            ref_RBSheetCamera.current.close();
            setLoading(false);

            navigation.navigate('UploadUpdatePic', {Video: response.assets[0]});
          } else if (response.uri) {
            console.log('response', imageInfo);
            ref_RBSheetCamera.current.close();
            setLoading(false);

            navigation.navigate('UploadUpdatePic', {Video: response.assets[0]});
          }
        }
        //console.log('response', imageInfo);
        ref_RBSheetCamera.current.close();
        setLoading(false);

        // navigation.navigate('UploadUpdatePic', {Video: response.assets[0]});
      },
    );
  };

  const choosePhotoFromLibrary = value => {
    setSelectedItem(value);
    launchImageLibrary({mediaType: 'photo'}, response => {
      console.log('image here', response);
      if (!response.didCancel && response.assets.length > 0) {
        /*  console.log('Response', response.assets[0]);
        setImageUri(response.assets[0].uri);
        setImageInfo(response.assets[0]); */
        setLoading(true);
        setImageInfo(response.assets[0]);
        ref_RBSheetCamera.current.close();
        setLoading(false);

        navigation.navigate('UploadUpdatePic', {Video: response.assets[0]});
      }

      //console.log('response', imageInfo);
      ref_RBSheetCamera.current.close();
      setLoading(false);

      //navigation.navigate('UploadUpdatePic', {Video: response.assets[0]});
    });
  };

  const availableAppsVideo = [
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
  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content" // You can set the StatusBar text color to dark or light
      />

      <View style={{marginTop: hp(5)}}>
        <Headers
         OnpresshowHome={() => {
          navigation.navigate("MoreScreen");
        }}
          // onPress={() => navigation.goBack()}
          showSearch={true}
          onPressSearch={() => navigation.navigate('SearchScreenPicTours')}
          showText={true}
          onPressListings={() => navigation.openDrawer()}
          // showListings={true}
          showHome={true}
          text={'Pic Tour'}
        />
      </View>
      
      {/* <Headers
          onPress={() => navigation.goBack()}
          showSearch={true}
          onPressSearch={() => navigation.navigate('SearchScreenPicTours')}
          showText={true}
          onPressListings={() => navigation.openDrawer()}
          showListings={true}
          text={'Pic Tour'}
        /> */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          marginTop: hp(1),
          marginHorizontal: wp(5),
        }}>
    <View style={styles.bannerview}>
        <Image
          style={{
            width: "100%",
            borderRadius: wp(2),
            height: "100%",
            resizeMode: "contain",
          }}
          source={{
            uri: "https://neilpatel.com/wp-content/uploads/2021/02/ExamplesofSuccessfulBannerAdvertising.jpg",
          }}
        />
      </View>

        <Text
          style={{
            color: '#FACA4E',
            marginLeft: wp(3),
            fontFamily: 'Inter-Bold',
            fontSize: hp(2.3),
          }}>
          Pic Tours
        </Text>

        <View style={[styles.latestSearchList, {marginLeft: wp(3)}]}>
          <FlatList
            style={{flex: 1}}
            contentContainerStyle={{alignItems: 'center'}}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={searchesData}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => renderSearchesPic(item)}
          />
        </View>
        <View
          style={{marginTop: hp(1.5), flexDirection: 'row', height: hp(18)}}>
          <View
            onPress={() => console.log('TOP DETAILS', dataTopVideos)}
            style={{
              width: wp(35),
              marginLeft: wp(2.5),
              height: '100%',
              borderRadius: wp(5),
            }}>
            {!dataTopVideos?.image ||
            dataTopVideos?.image === 'undefined' ||
            dataTopVideos?.image.startsWith('/') ? (
              <Image
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 1, // Ensure it's on top of other elements
                  //flex: 1,
                  width: '100%',
                  height: '100%',
                  borderRadius: wp(3),
                  resizeMode: 'cover',
                }}
                source={appImages?.galleryPlaceHolder}
              />
            ) : (
              <Image
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 1, // Ensure it's on top of other elements
                  //flex: 1,
                  width: '100%',
                  height: '100%',
                  borderRadius: wp(3),
                  resizeMode: 'cover',
                }}
                source={{uri: dataTopVideos?.image}}
              />
            )}
            <View
              style={{
                position: 'absolute',
                top: hp(14),
                left: 7,
                //height: hp(3),
                //width: wp(21),
                //borderRadius: wp(3),
                //backgroundColor: '#FACA4E',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 2, // Ensure it's on top
              }}>
              <Text
                style={{
                  fontSize: hp(1.6),
                  fontFamily: 'Inter',
                  color: 'black',
                  fontWeight: '700',
                }}>
                {dataTopVideos?.pic_category_name}
              </Text>
            </View>
          </View>

          <View style={{marginTop: hp(0.8), marginLeft: wp(3), width: '35%'}}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={5}
              style={{
                fontSize: hp(1.6),
                marginLeft: wp(1),
                lineHeight: 15.5,
                marginTop: hp(5),
                fontFamily: 'Inter-Regular',
                color: '#000000',
                //fontWeight: '700',
              }}>
              {dataTopVideos === 0
                ? 'No Top Pic Shown'
                : dataTopVideos?.description}
            </Text>
          </View>
        </View>

        <View style={{marginTop: hp(1.5), height: hp(23)}}>
          <Text
            style={{
              fontSize: hp(2.3),
              marginLeft: wp(2.5),
              fontFamily: 'Inter',
              color: '#4A4A4A',
              fontWeight: 'bold',
            }}>
            Trending
          </Text>

          <View style={{marginTop: hp(1), height: '100%'}}>
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
            ) : (
              <FlatList
                style={{flex: 1}}
                showsHorizontalScrollIndicator={false}
                data={data}
                horizontal
                //keyExtractor={item => item.id.toString()}
                renderItem={({item}) => renderAvailableAppsVideo(item)}
              />
            )}
          </View>
        </View>

        <View style={{marginTop: hp(5), height: hp(23)}}>
          <Text
            style={{
              fontSize: hp(2.3),
              marginLeft: wp(3),
              fontFamily: 'Inter',
              color: '#4A4A4A',
              fontWeight: 'bold',
            }}>
            Latest Pic
          </Text>

          <View style={{marginTop: hp(1), height: '100%'}}>
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
            ) : (
              <FlatList
                style={{flex: 1}}
                showsHorizontalScrollIndicator={false}
                data={dataLatestVideos}
                horizontal
                // keyExtractor={item => item.id.toString()}
                renderItem={({item}) => renderAvailableAppsVideo(item)}
              />
            )}
          </View>
        </View>

        <View style={{marginTop: hp(5), height: hp(23)}}>
          <Text
            style={{
              fontSize: hp(2.3),
              marginLeft: wp(3),
              fontFamily: 'Inter',
              color: '#4A4A4A',
              fontWeight: 'bold',
            }}>
            Most Viewed
          </Text>

          <View style={{marginTop: hp(1), height: '100%'}}>
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
            ) : (
              <FlatList
                style={{flex: 1}}
                showsHorizontalScrollIndicator={false}
                data={dataMostViewedVideos}
                horizontal
                //keyExtractor={item => item.id.toString()}
                renderItem={({item}) => renderAvailableAppsVideo(item)}
              />
            )}
          </View>
        </View>

        <View style={{marginTop: hp(5), height: hp(23)}}>
          <Text
            style={{
              fontSize: hp(2.3),
              marginLeft: wp(3),
              fontFamily: 'Inter',
              color: '#4A4A4A',
              fontWeight: 'bold',
            }}>
            Most Commented
          </Text>

          <View style={{marginTop: hp(1), height: '100%'}}>
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
            ) : (
              <FlatList
                style={{flex: 1}}
                showsHorizontalScrollIndicator={false}
                data={dataMostCommentedVideos}
                horizontal
                //keyExtractor={item => item.id.toString()}
                renderItem={({item}) => renderAvailableAppsVideo(item)}
              />
            )}
          </View>
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

      <TouchableOpacity
        onPress={() => ref_RBSheetCamera.current.open()}
        style={{position: 'absolute', bottom: 1, right: 25}}>
        <Add />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bannerview: {
    height: hp(15),
    marginTop: hp(2),
    alignSelf: "center",
    resizeMode: "cover",
    width: "100%",
    borderRadius: wp(2),
    paddingHorizontal: wp(5),
  },
  latestSearchList: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2.1),
    height: hp(7),
    marginLeft: wp(5),
    //borderWidth: 3,
  },
  searchesDetails: {
    flexDirection: 'row',
    marginLeft: wp(3),
    alignItems: 'center',
    padding: wp(3.3),
    justifyContent: 'center',
    //width: wp(23),
    backgroundColor: '#F2F2F2',
    borderRadius: wp(5),
    //height: hp(5),
  },
  textSearchDetails: {
    fontFamily: 'Inter',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: hp(1.8),
  },

  maintext: {
    fontSize: hp(2.3),
    color: '#303030',
    fontWeight: 'bold',
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
