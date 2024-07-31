import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Text,
  View,
  Alert,
  Dimensions
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Fontiso from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import Swiper from "react-native-swiper";
import Headers from '../../../assets/Custom/Headers';
import {appImages} from '../../../assets/utilities';
import Add from '../../../assets/svg/AddMainScreen.svg';
import Approved from '../../../assets/svg/Approved';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Carousel from 'react-native-snap-carousel';
import Toast from 'react-native-toast-message';

import NonVerified from '../../../assets/svg/NonVerified.svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';
import { base_url } from '../../../../../baseUrl';

export default function Disc({route}) {
  const [selectedItemId, setSelectedItemId] = useState(1);
const navigation = useNavigation()
  const [categoryIdNews, setCategoryIdNews] = useState(null);

  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();

  const [newsData, setNewsData] = useState([]);

  const [topNewsData, setTopNewsData] = useState([]);

  const [authToken, setAuthToken] = useState('');

  const [opensLettersPublicGeneralData, setOpensLettersPublicGeneralData] =
    useState([]);

  const [opensLettersPublicCelebrityData, setOpensLettersPublicCelebrityData] =
    useState([]);

  const [opensLettersPrivateFriendsData, setOpensLettersPrivateFriendsData] =
    useState([]);

  const [
    opensLettersPrivateCelebrityData,
    setOpensLettersPrivateCelebrityData,
  ] = useState([]);

  const [qafiData, setQAFIData] = useState([]);

  const [gebcData, setGEBCData] = useState([]);
  const [categoriesSelect, setCategorySelect] = useState([]);
  const {NewsCategory, Type} = route?.params || {};
  const [categoryData, setCategoryData] = useState([]);
  const [qaficategoryData, setQafiCategoryData] = useState([]);
  const [gebccategoryData, setGebcCategoryData] = useState([]);
  const [categoryDataone, setCategoryDataone] = useState([]);
  const [categoryDatatwo, setCategoryDatatwo] = useState([]);
  const [categoryDatathree, setCategoryDatathree] = useState([]);
  const [categoryDatafour, setCategoryDatafour] = useState([]);
const [value, setValue] = useState(null)
const [carouselIndex, setCarouselIndex] = useState(0);
  useEffect(() => {
    if (isFocused) {
      getUserID(); // Call the async function
    }
  }, [NewsCategory, isFocused]); // Include 'id' in the dependency array

  const getUserID = async () => {
    try {
      const result = await AsyncStorage.getItem('authToken ');
      if (result !== null) {
        setAuthToken(result);
        // fetchData();
        console.log('user id retrieved:', result);
      }
    } catch (error) {
      // Handle errors here
      console.error('Error retrieving user ID:', error);
    }
  };
  const [adsData, setAdsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (authToken){
      fetchTopNews()
      fetchBannerConfig();
    }
    }, [authToken]);
  
    const fetchBannerConfig = async () => {
      const token = authToken;
      setIsLoading(true);
      try {
        const response = await fetch(
          base_url + "banner/getAllActiveBanners?topBanner=true",
          // base_url + "banner/getAllBannersByUser/97",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        const result = await response.json();
        // console.log("AllBanners---", result.AllBanners);
        setAdsData(result.AllBanners);
      } catch (error) {
        console.error("Error AllBanners:", error);
      }
      setIsLoading(false); 
    };
  

  // const fetchData = async () => {
  //   // console.log('Received NewsCategory of:', NewsCategory);
  //   // console.log('Received Type of:', Type);
  //   // /*   Toast.show({
  //   //   type: 'success', // 'success', 'error', 'info', 'warning'
  //   //   position: 'bottom', // 'top', 'bottom', 'center'
  //   //   text1: NewsCategory.toString(),
  //   //   visibilityTime: 3000, // in milliseconds
  //   //   autoHide: true,
  //   // }); */

  //   // // Check if 'id' exists before using it
  //   // if (NewsCategory) {
  //   //   console.log('Received id:', NewsCategory);
  //   //   setCategoryIdNews(NewsCategory); // Uncomment this line if you want to use id to set selectedItemId

  //   //   if (Type === 'NEWS') {
  //   //     setLoading(true);
  //   //     setSelectedItemId(1);
  //   //     console.log('Category Id News is ', NewsCategory);
  //   //     // Fetch data one by one
  //   //     await fetchNews();

  //   //     // Once all data is fetched, set loading to false
  //   //     setLoading(false);
  //   //   } else if (Type === 'QAFI') {
  //   //     setLoading(true);
  //   //     setSelectedItemId(3);
  //   //     console.log('Category Id QAFI is ', NewsCategory);
  //   //     // Fetch data one by one
  //   //     await fetchQAFI();

  //   //     // Once all data is fetched, set loading to false
  //   //     setLoading(false);
  //   //   } else if (Type === 'GEBC') {
  //   //     setLoading(true);
  //   //     setSelectedItemId(4);
  //   //     console.log('Category Id QAFI is ', NewsCategory);
  //   //     // Fetch data one by one
  //   //     await fetchGEBC();

  //   //     // Once all data is fetched, set loading to false
  //   //     setLoading(false);
  //   //   }
  //   // } else {
  //   //   /*  setLoading(true);
  //   //   //setSelectedItemId(1)
  //   //   console.log('Category Id News is ', NewsCategory);
  //   //   // Fetch data one by one
  //   //   await fetchNews();

  //   //   // Once all data is fetched, set loading to false
  //   //   setLoading(false); */
  //   // }
  // };

  useEffect(() => {
    if (authToken && isFocused) {
      if(value == null)
        {
        fetchCate()
        fetchDataForValues()
        }
        setLoading(true)
       
     
    }
  }, [authToken]);

  const fetchCate = async () => {
    setLoading(true);
    const token = authToken;

    try {
      const response = await fetch(
        base_url + "discCategory/getAllDiscCategories?page=1&limit=1000",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
   
      if (response.ok) {
        const data = await response.json();

        // Use the data from the API to set the categories
        const categories = data.AllCategories.map(category => ({
          label: category.name, // Use the "name" property as the label
          value: category.id.toString(), // Convert "id" to a string for the value
        }));

        console.log('Categories', categories);

        setCategorySelect(categories); // Update the state with the formatted category data
        const valuesArray = categories.map(category => category.value);
        // fetchTopNews();
        console.log('valuesArray',valuesArray);
        // fetchDataForValues()
        console.log('Data Categories', categoriesSelect);
      } else {
        setLoading(false);
        console.error(
          'Failed to fetch categories:',
          response.status,
          response.statusText,
        );
      }
    } catch (error) {
      console.error('Errors:', error);
    }
  };

  const fetchDataForValues = async () => {
    setLoading(true);
    try {
      const dataByCategory = {};
  
      for (const category of categoriesSelect) {
        const { label, value } = category;
  
        const response = await fetch(
          base_url + `news/getAllNewsByCategory/${value}?page=1&limit=100`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
  
        if (response.ok) {
          const result = await response.json();
          dataByCategory[label] = result.AllQAFIs; // Assuming AllQAFIs contains the array of news items
          // console.log('Fetched data for category', label, ':', dataByCategory[label]);
        } else {
          console.error('Failed to fetch category data for category', label, ':', response.status, response.statusText);
        }
      }
  
      setCategoryData(dataByCategory);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching category data:', error);
    } finally {
      setLoading(false); // Set loading to false after API call (whether it succeeded or failed)
    }
  };

  const fetchQAFIDataForValues = async () => {
    setLoading(true);
    try {
      const dataByCategory = {};
  
      for (const category of categoriesSelect) {
        const { label, value } = category;
  
        const response = await fetch(
          base_url + `qafi/getAllQafisByCategory/${value}?page=1&limit=1000`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
  
        if (response.ok) {
          const result = await response.json();
          dataByCategory[label] = result.QAFIs; // Assuming AllQAFIs contains the array of news items
          console.log('Fetched data for  qafii category------', label, ':', dataByCategory[label]);
        } else {
          console.error('Failed to fetch category data for category', label, ':', response.status, response.statusText);
        }
      }
  
      setQafiCategoryData(dataByCategory);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching category data:', error);
    }  finally {
      setLoading(false); // Set loading to false after API call (whether it succeeded or failed)
    }
  };
  const fetchGEBCDataForValues = async () => {
    setLoading(true);
    try {
      const dataByCategory = {};
  
      for (const category of categoriesSelect) {
        const { label, value } = category;
  
        const response = await fetch(
      
          base_url + `gebc/getAllGEBCsByCategory/${value}?page=1&limit=1000`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
  
        if (response.ok) {
          const result = await response.json();
          dataByCategory[label] = result.GEBCs; // Assuming AllQAFIs contains the array of news items
          console.log('Fetched data for  qafii category------', label, ':', dataByCategory[label]);
        } else {
          console.error('Failed to fetch category data for category', label, ':', response.status, response.statusText);
        }
      }
  
      setGebcCategoryData(dataByCategory);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching category data:', error);
    } finally {
      setLoading(false); // Set loading to false after API call (whether it succeeded or failed)
    }
  };




  // const fetchCategoryData = async () => {
  //   // const value = '16'
  //   // console.log('value----', value)
  //   try {
  //     const response = await fetch(
  //       base_url + `news/getAllNewsByCategory/${value}?page=1&limit=100`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${authToken}`,
  //         },
  //       }
  //     );

  //     if (response.ok) {
  //       const result = await response.json();
  //       console.log('result-------------', result)
  //       setCategoryData(result.AllQAFIs);

  //     } else {
  //       console.error('Failed to fetch category data:', response.status, response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching category data:', error);
  //   }
  // };
  // const fetchNews = async () => {
  //   console.log('Categry in id', categoryIdNews);
  //   console.log('News Called');
  //   const token = authToken;
  //   // https://watch-gotcha-be.mtechub.com/news/getAllNewsByCategory/7?page=1&limit=5
  //   try {
  //     const response = await fetch(
  //       // base_url + `news/getAllNewsByCategory/${categoryIdNews}?page=1&limit=100`,
  //       base_url + 'news/getAllNewsByCategory/3?page=1&limit=100',
  //       {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     const result = await response.json();
  //     // console.log('Resultings of news', result);
  //     //Alert.alert(result)

  //     setNewsData(result.AllQAFIs); // Update the state with the fetched data

  //     fetchTopNews();
  //   } catch (error) {
  //     console.error('Error Trending:', error);
  //   }
  // };

  const fetchTopNews = async () => {
    // console.log('Categry in id', categoryIdNews);
    // console.log('News Called');
    setLoading(true);
    const token = authToken;

    try {
      const response = await fetch(
        // base_url + `top/getAllTopQAFIByCategory/${categoryIdNews}`,
        base_url + 'top/getAllTopQAFIByCategory/3',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      // console.log('Resultings of TopNews', result.AllQAFI[0]);
      //Alert.alert(result)

      setTopNewsData(result.AllQAFI[0]); // Update the state with the fetched data
    } catch (error) {
      setLoading(false);
      console.error('Error Trending:', error);
    }
  };

  // const fetchQAFI = async () => {
  //   console.log(' QAFI in id', categoryIdNews);
  //   const token = authToken;

  //   try {
  //     const response = await fetch(
  //       // base_url + `qafi/getAllQafisByCategory/${categoryIdNews}?page=1&limit=50`,
  //       base_url + 'qafi/getAllQafisByCategory/3?page=1&limit=50',
  //       {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     const result = await response.json();
  //     // console.log('Resultings of QAFI', result.QAFIs);
  //     //Alert.alert(result)

  //     setQAFIData(result.QAFIs); // Update the state with the fetched data

  //     fetchTopNews();
  //   } catch (error) {
  //     console.error('Error Trending:', error);
  //   }
  // };

  // const fetchGEBC = async () => {
  //   console.log('Categry in id', categoryIdNews);
  //   const token = authToken;

  //   try {
  //     const response = await fetch(
  //       // base_url + `gebc/getAllGEBCsByCategory/${categoryIdNews}?page=1&limit=50`,
  //       base_url + `gebc/getAllGEBCsByCategory/3?page=1&limit=50`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     const result = await response.json();
  //     console.log('Resultings of News', result.GEBCs);
  //     //Alert.alert(result)

  //     setGEBCData(result.GEBCs); // Update the state with the fetched data

  //     fetchTopNews();
  //   } catch (error) {
  //     console.error('Error Trending:', error);
  //   }
  // };

  const fetchLetterPublicGeneral = async () => {
    setLoading(true);
    // console.log('Categry in id', categoryIdNews);
    const token = authToken;

    try {
      const response = await fetch(
        base_url +`letter/public_general_by_category/3/?page=1&limit=100`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      // console.log('Resultings of News', result.AllLetter);
      //Alert.alert(result)

      setOpensLettersPublicGeneralData(result.AllLetter); // Update the state with the fetched data
      await fetchLetterPublicCelebrity();
    } catch (error) {
      setLoading(false);
      console.error('Error Trending:', error);
    }
  };

  const fetchLetterPublicCelebrity = async () => {
    const token = authToken;

    try {
      const response = await fetch(
        base_url + `letter/public_celebrity_by_category/3/?page=1&limit=10`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      // console.log('Resultings of News Celebrity Data', result.AllLetter);
      //Alert.alert(result)

      setOpensLettersPublicCelebrityData(result.AllLetter); // Update the state with the fetched data
      await fetchLetterPrivateFriends();
    } catch (error) {
      setLoading(false);

      console.error('Error Trending:', error);
    }
  };

  const fetchLetterPrivateFriends = async () => {
    const token = authToken;

    try {
      const response = await fetch(
        base_url + `letter/private_friends_by_category/3/?page=1&limit=5`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      // console.log('Resultings of News', result.AllLetter);
      //Alert.alert(result)

      setOpensLettersPrivateFriendsData(result.AllLetter); // Update the state with the fetched data
      await fetchLetterPrivateCelebrity();
    } catch (error) {
      console.error('Error Trending:', error);
    }
  };

  const fetchLetterPrivateCelebrity = async () => {
    const token = authToken;

    try {
      const response = await fetch(
        base_url + `letter/private_celebrity_by_category/3/?page=1&limit=2`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      // console.log('Resultings of News', result.AllLetter);
      //Alert.alert(result)

      setOpensLettersPrivateCelebrityData(result.AllLetter); // Update the state with the fetched data
      // fetchTopNews();

      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.error('Error Trending:', error);
    }
  };

  //DISC

  const renderPublicGeneral = item => {
    // console.log('Item of general public authorities', item);
    const imageUrl =
      item.images && item.images[0]
        ? item.images[0].startsWith('/fileUpload')
          ? base_url +`${item.images[0]}`
          : item.images[0]
        : null;

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('LetterDetails', {Letters: item})}
        style={{width: wp(25.5), margin: 5}}>
        <View>
          {item.images && item.images[0] ? (
            <Image
              style={{
                height: hp(12),
                width: wp(23),
              }}
              source={{uri: imageUrl}}
            />
          ) : (
            // Show dummy image if item.images is null or undefined
            <Image
              style={{
                height: hp(12),
                width: wp(23),
              }}
              source={appImages?.videoPlaceHolder}
            />
          )}
          {/* <Image
            style={{
              height: hp(12),
              width: wp(23),
            }}
            source={{uri: imageUrl}}
          />  */}
        </View>
      </TouchableOpacity>
    );
  };

  

  //-------------------\\

  const goToScreen = () => {
    if (selectedItemId === 2) {
      navigation.navigate('PostLetterInfo');
    } else if (selectedItemId === 1) {
      navigation.navigate('PostOnNews');
      console.log('PostOnNews')
    } else if (selectedItemId === 3) {
      navigation.navigate('QAFI');
    } else if (selectedItemId === 4) {
      navigation.navigate('GEBC');
    }
  };

  const searches = [
    {id: 1, title: 'On News'},
    {id: 2, title: 'Open Letters'},
    {id: 3, title: 'QAFI'},
    {id: 4, title: 'EBC'},
  ];

  const renderAvailableApps = item => {
    // console.log('Items of News', item);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ViewNews', {picData: item})}
        style={{width: wp(34), margin: 5, overflow:'hidden'}}>
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
              borderRadius: wp(1),
              resizeMode: 'cover',
            }}
            source={{uri: item.image}}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: hp(12),
            height: hp(7),
            width: wp(25),
          }}>
          {item?.userimage ? (
            <View
              style={{
                width: wp(7),
                marginLeft: wp(0.5),
                height: wp(7),
                overflow: 'hidden',
                borderRadius: wp(7) / 2,
              }}>
              <Image
                source={{uri: item?.userimage}}
                style={{width: '100%', height: '100%', resizeMode: 'cover'}}
              />
            </View>
          ) : (
            <View
              style={{
                width: wp(7),
                marginLeft: wp(0.5),
                height: wp(7),
                borderRadius: wp(7) / 2,
                alignItems:'center',
                justifyContent:'center'
              }}>
              <MaterialCommunityIcons
                // style={{marginTop: hp(0.5)}}
                name={'account-circle'}
                size={24}
                color={'#FACA4E'}
              />
              {/*  <Image
            source={appImages.profileImg}
            style={{width: '100%', height: '100%', resizeMode: 'cover'}}
          /> */}
            </View>
          )}

<View style={{width:70}}>
<Text ellipsizeMode="tail"
                numberOfLines={1}
            style={{
              fontSize: hp(1.5),
              marginLeft: wp(0.7),
              color: '#000000',
              fontWeight: 'bold',
              fontFamily: 'Inter',
            }}>
            {item.username}
          </Text>

</View>

          <View style={{marginLeft: wp(1)}}>
            <NonVerified />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderAvailableAppsQAFI = item => {
    // console.log('Items of QAFI', item);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ViewQAFI', {picData: item})}
        style={{width: wp(34), margin: 5}}>
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
              borderRadius: wp(1),
              resizeMode: 'cover',
            }}
            source={{uri: item.image}}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: hp(12),
            height: hp(7),
            width: wp(25),
          }}>
          {item?.userimage ? (
            <View
              style={{
                width: wp(7),
                marginLeft: wp(0.5),
                height: wp(7),
                overflow: 'hidden',
                borderRadius: wp(7) / 2,
              }}>
              <Image
                source={{uri: item?.userimage}}
                style={{width: '100%', height: '100%', resizeMode: 'cover'}}
              />
            </View>
          ) : (
            <View
              style={{
                width: wp(7),
                marginLeft: wp(0.5),
                height: wp(7),
                borderRadius: wp(7) / 2,
                alignItems:'center',
                justifyContent:'center'
              }}>
              <MaterialCommunityIcons
                // style={{marginTop: hp(0.5)}}
                name={'account-circle'}
                size={24}
                color={'#FACA4E'}
              />
              {/*  <Image
            source={appImages.profileImg}
            style={{width: '100%', height: '100%', resizeMode: 'cover'}}
          /> */}
            </View>
          )}

<View style={{width:70}}>
<Text ellipsizeMode="tail"
                numberOfLines={1}
            style={{
              fontSize: hp(1.5),
              marginLeft: wp(0.7),
              color: '#000000',
              fontWeight: 'bold',
              fontFamily: 'Inter',
            }}>
            {item.username}
          </Text>

</View>

          <View style={{marginLeft: wp(1)}}>
            <NonVerified />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderAvailableAppsGEBC = item => {
    // console.log('Items of GEBC', item);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ViewGEBC', {picData: item})}
        style={{width: wp(34), margin: 5}}>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            height: hp(10),
            borderRadius: wp(1),
            resizeMode: 'stretch',
            borderWidth: 1, // Border width
            borderColor: 'grey', // Border color
          }}>
          <Text style={{fontSize: hp(5)}}>{item.image}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: hp(1),
            height: hp(7),
            width: wp(25),
          }}>
          {item?.userimage ? (
            <View
              style={{
                width: wp(7),
                marginLeft: wp(0.5),
                height: wp(7),
                overflow: 'hidden',
                borderRadius: wp(7) / 2,
              }}>
              <Image
                source={{uri: item?.userimage}}
                style={{width: '100%', height: '100%', resizeMode: 'cover'}}
              />
            </View>
          ) : (
            <View
              style={{
                width: wp(7),
                marginLeft: wp(0.5),
                height: wp(7),
                borderRadius: wp(7) / 2,
                alignItems:'center',
                justifyContent:'center'
              }}>
              <MaterialCommunityIcons
                // style={{marginTop: hp(0.5)}}
                name={'account-circle'}
                size={24}
                color={'#FACA4E'}
              />
              {/*  <Image
            source={appImages.profileImg}
            style={{width: '100%', height: '100%', resizeMode: 'cover'}}
          /> */}
            </View>
          )}

<View style={{width:70}}>
<Text ellipsizeMode="tail"
                numberOfLines={1}
            style={{
              fontSize: hp(1.5),
              marginLeft: wp(0.7),
              color: '#000000',
              fontWeight: 'bold',
              fontFamily: 'Inter',
            }}>
            {item.username}
          </Text>

</View>

          <View style={{marginLeft: wp(1)}}>
            <NonVerified />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
 const renderItemText = () => {
    if (selectedItemId === 1) {
      return<>
    <ScrollView>
        <View style={{margin:"10%"}}>
         <Text style={styles.renderItem}>Politics</Text>
       <View style={{flexDirection: "row"}}>
  <Image 
    style={{width: "30%", height: 100}} 
    resizeMode='contain' 
    source={require('../../../assets/images/galleryPlaceHolder.png')}
  />
  <Text style={{top:"10%"}}>Does not contain any top news</Text>
</View>

      <Text style={styles.renderItem}>Sports</Text>
       <View style={{flexDirection: "row"}}>
  <Image 
    style={{width: "30%", height: 100}} 
    resizeMode='contain' 
    source={require('../../../assets/images/galleryPlaceHolder.png')}
  />
  <Text style={{top:"10%"}}>Does not contain any top news</Text>
</View>
      <Text style={styles.renderItem}>Business</Text>
       <View style={{flexDirection: "row"}}>
  <Image 
    style={{width: "30%", height: 100}} 
    resizeMode='contain' 
    source={require('../../../assets/images/galleryPlaceHolder.png')}
  />
   <Image 
    style={{width: "30%", height: 100}} 
    resizeMode='contain' 
    source={require('../../../assets/images/galleryPlaceHolder.png')}
  />
   <Image 
    style={{width: "30%", height: 100}} 
    resizeMode='contain' 
    source={require('../../../assets/images/galleryPlaceHolder.png')}
  />
</View>
 <Text style={styles.renderItem}>Sports</Text>
       <View style={{flexDirection: "row"}}>
  <Image 
    style={{width: "30%", height: 100}} 
    resizeMode='contain' 
    source={require('../../../assets/images/galleryPlaceHolder.png')}
  />
  <Text style={{top:"10%"}}>Does not contain any top news</Text>
      </View>
      </View>
    </ScrollView>
     </> 
    } else if (selectedItemId === 2) {
      // return <Text>Hello from item ID 2</Text>;
    }
    // Add more conditions for other item IDs if needed
    return null;
  };
  const renderSearches = item => {
    // console.log('Items', item);
    const isSelected = selectedItemId === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.searchesDetails,
          {
            backgroundColor: isSelected ? '#FACA4E' : '#F2F2F2',
          },
        ]}
        onPress={() => {
          setSelectedItemId(item.id);
          // console.log('Selected item:', item.id);
          if (item.id === 1) {
            // navigation.navigate('ViewAllCategories');
            // fetchLetterPublicCelebrity();
            // fetchNews();
            // fetchTopNews();
            setSelectedItemId(1);
            fetchCate()
            fetchDataForValues()
            // fetchCategoryData()
            console.log('Log screen');
          } else if (item.id === 2) {
            // fetchTopNews();
            setSelectedItemId(2);
            fetchLetterPublicGeneral();
            console.log('On Letter id', item.id);
          } else if (item.id === 3) {
            // navigation.navigate('ViewAllCategoriesQAFI');
            setSelectedItemId(3);
            // fetchTopNews();
            // fetchQAFI();
            fetchQAFIDataForValues()
          } else if (item.id === 4) {
            // navigation.navigate('ViewAllCategoriesGEBC');
            setSelectedItemId(4);
            // fetchTopNews();
            // fetchGEBC();
            fetchGEBCDataForValues()
            // fetchLetterPublicGeneral();
          }
        }}>
        <Text
          style={[
            styles.textSearchDetails,
            {color: isSelected ? '#232323' : '#939393'},
          ]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const DiscScreen = () => {
    return (
      <View style={{flex: 1}}>
        <View
          style={{marginTop: hp(1.5),  marginBottom: hp(1),flexDirection: 'row', height: hp(18)}}>
            <TouchableOpacity onPress={() => navigation.navigate('ViewNews',{
                News: topNewsData
              })}>
          {topNewsData === undefined || topNewsData.length === 0 || topNewsData.image === undefined || topNewsData.image === null || topNewsData.image === '' || topNewsData.image === '0' ? (
         
              <View
              //onPress={() => navigation.navigate('News')}
              style={{width: wp(35), height: '100%', borderRadius: wp(5)}}>
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
                source={appImages.galleryPlaceHolder}
              />
            </View>
          ) : (
            <View style={{width: wp(35), height: '100%', borderRadius: wp(5)}}>
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
                source={{uri: topNewsData.image}}
              />
            </View>
       
          )}
     </TouchableOpacity>
          <View style={{justifyContent: 'center', flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: hp(7),
                width: wp(35),
              }}>
              <Text
                style={{
                  fontSize: hp(1.5),
                  marginLeft: wp(2.5),
                  fontFamily: 'Inter-Regular',
                  color: '#000000',
                }}>
                {topNewsData === undefined || topNewsData.length === 0
                  ? 'Does not contain any top news'
                  : topNewsData?.description}
              </Text>
            </View>
          </View>
        </View>


        {/* <View>
    {categoriesSelect.map(category => (
      <View key={category.label}>
        <Text style={styles.label}>{category.label}</Text>
        {categoryData[category.label] && categoryData[category.label].length > 0 ? (
          <View>
            {categoryData[category.label].map(item => (
              <TouchableOpacity
                key={item.news_id} // Assuming each item has a unique id
                onPress={() => navigation.navigate('ViewNews', { picData: item })}
                style={{ width: wp(34), margin: 5, overflow: 'hidden' }}>
                <Image
                  style={{ width: '100%', height: hp(12), borderRadius: wp(1), resizeMode: 'cover' }}
                  source={{ uri: item.image }}
                />
                <Text>{item.username}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <Text>No data available for {category.label}</Text>
        )}
      </View>
    ))}
  </View> */}







{categoriesSelect.map(category => (
  <View key={category.label}>
    <View style={{height: hp(24)}}>
      <Text style={styles.text}>{category.label}</Text>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#FACA4E" />
        </View>
      ) : (
        <View style={{flex: 1}}>
          {categoryData[category.label] && categoryData[category.label].length === 0 ? (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{textAlign: 'center'}}>No data available for {category.label}</Text>
            </View>
          ) : (
            <FlatList
              style={{flex: 1}}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={categoryData[category.label]}
              keyExtractor={item => item.news_id.toString()} // Ensure a unique key for each item
              renderItem={({item}) => renderAvailableApps(item)}
            />
          )}
        </View>
      )}
    </View>
  </View>
))}


 {/* {categoriesSelect.map(category => (
  <View key={category.label}>
    <View style={{height:hp(24)}}>
    <Text style={styles.text}>{category.label}</Text>
    {loading === true ? ( 
      <View style={{flex:1, justifyContent:'center'}}>
<ActivityIndicator size="large" color="#FACA4E" />
      </View>
      
    ) : ( 
    <View style={{flex:1}}>
    {categoryData[category.label] && categoryData[category.label].length > 0 ? (
      <FlatList
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={categoryData[category.label]}
        keyExtractor={item => item.news_id.toString()} // Ensure a unique key for each item
        renderItem={({item}) => renderAvailableApps(item)}

      />
    ) : (
      <View style={{flex:1, justifyContent:'center'}}>
      <Text style={{textAlign:'center', alignContent:'center'}}>No data available for {category.label}</Text>
      </View>
    )}
</View>
)}
        </View>
  </View>
))} */}














        {/* <View style={{marginTop: hp(2), height: hp(23)}}>
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
              <>
                {newsData?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: hp(2.1)}}>
                      No data available
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    style={{flex: 1}}
                    showsVerticalScrollIndicator={false}
                    data={newsData}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => renderAvailableApps(item)}
                  />
                )}
              </>
            )}
          </View>
        </View> */}
     {/* {categoriesSelect.length > 0 && (
    <View>
        <Text style={styles.text}>{categoriesSelect[0].label}</Text>   
                <FlatList
                    style={{flex: 1}}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={categoryData}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => renderAvailableApps(item)}
                  />    
    </View>
)}
     {categoriesSelect.length > 0 && (
    <View>
        <Text style={styles.text}>{categoriesSelect[1].label}</Text>   
                <FlatList
                    style={{flex: 1}}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={categoryDataone}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => renderAvailableApps(item)}
                  />    
    </View>
)}
     {categoriesSelect.length > 0 && (
    <View>
        <Text style={styles.text}>{categoriesSelect[2].label}</Text>   
                <FlatList
                    style={{flex: 1}}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={categoryDatatwo}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => renderAvailableApps(item)}
                  />    
    </View>
)}
     {categoriesSelect.length > 0 && (
    <View>
        <Text style={styles.text}>{categoriesSelect[3].label}</Text>   
                <FlatList
                    style={{flex: 1}}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={categoryDatathree}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => renderAvailableApps(item)}
                  />    
    </View>
)}
     {categoriesSelect.length > 0 && (
    <View>
        <Text style={styles.text}>{categoriesSelect[4].label}</Text>   
                <FlatList
                    style={{flex: 1}}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={categoryDatafour}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => renderAvailableApps(item)}
                  />    
    </View>
)} */}


  {/* <View style={{  flex: 1, marginHorizontal:wp(2), marginVertical:hp(10)}}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
   
      ) : (
        <FlatList
          data={categoriesSelect}
          keyExtractor={(item) => item.title}
          renderItem={({item}) => {
            return(
              <TouchableOpacity>
              <View>
                <Text style={styles.text}>{item.label}</Text>    
                <FlatList
                    style={{flex: 1}}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={categoryData}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => renderAvailableApps(item)}
                  />    
              </View>
            </TouchableOpacity>
            )
          }}
        />
      )}
    </View>
        */}

      </View>
    );
  };

  const QAFI = () => {
    console.log('Came to QAFI');
    return (
      <View style={{flex: 1}}>
        <View
          style={{marginTop: hp(1.5),  marginBottom: hp(1),flexDirection: 'row', height: hp(18)}}>
          <View
            style={{marginTop: hp(1.5), flexDirection: 'row', height: hp(18)}}>
            {topNewsData === undefined || topNewsData.length === 0 || topNewsData.image === undefined || topNewsData.image === null || topNewsData.image === '' || topNewsData.image === '0' ? (
              <View
                //onPress={() => navigation.navigate('News')}
                style={{width: wp(35), height: '100%', borderRadius: wp(5)}}>
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
                  source={appImages.galleryPlaceHolder}
                />
              </View>
            ) : (
              <View
                //onPress={() => navigation.navigate('News')}
                style={{width: wp(35), height: '100%', borderRadius: wp(5)}}>
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
                  source={{uri: topNewsData.image}}
                />
              </View>
            )}

            <View style={{justifyContent: 'center', flex: 1}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: hp(7),
                  width: wp(35),
                }}>
                <Text
                  style={{
                    fontSize: hp(1.5),
                    marginLeft: wp(2.5),
                    fontFamily: 'Inter-Regular',
                    color: '#000000',
                  }}>
                  {topNewsData === undefined || topNewsData.length === 0
                    ? 'Does not contain any top news'
                    : topNewsData?.description}
                </Text>
              </View>
            </View>
          </View>
        </View>




        {categoriesSelect.map(category => (
  <View key={category.label}>
    <View style={{height: hp(24)}}>
      <Text style={styles.text}>{category.label}</Text>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#FACA4E" />
        </View>
      ) : (
        <View style={{flex: 1}}>
          {qaficategoryData[category.label] && qaficategoryData[category.label].length  === 0 ? (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{textAlign: 'center'}}>No data available for {category.label}</Text>
            </View>
          ) : (
            <FlatList
              style={{flex: 1}}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={qaficategoryData[category.label]}
              keyExtractor={item => item.qafi_id.toString()} // Ensure a unique key for each item
              renderItem={({item}) => renderAvailableAppsQAFI(item)}
            />
          )}
        </View>
      )}
    </View>
  </View>
))}


        {/* {categoriesSelect.map(category => (
  <View key={category.label}>
    <View style={{height:hp(24)}}>
    <Text style={styles.text}>{category.label}</Text>
    {loading === true ? ( // If loading is true, render loader
            <View style={{flex:1, justifyContent:'center'}}>
            <ActivityIndicator size="large" color="#FACA4E" />
                  </View>// If loading is true, render loader
    ) : ( // If loading is false, render data or message
    <View style={{flex:1}}>
    {qaficategoryData[category.label] && qaficategoryData[category.label].length > 0 ? (
      <FlatList
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={qaficategoryData[category.label]}
        keyExtractor={item => item.qafi_id.toString()} // Ensure a unique key for each item
        renderItem={({item}) => renderAvailableAppsQAFI(item)}

      />
    ) : (
      <View style={{flex:1, justifyContent:'center'}}>
      <Text style={{textAlign:'center', alignContent:'center'}}>No data available for {category.label}</Text>
      </View>
    )}
 </View>
)}
        </View>
  </View>
))} */}




        {/* <View style={{height: hp(23)}}>
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
              <>
                {qafiData?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: hp(2.1)}}>
                      No data available
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    style={{flex: 1}}
                    showsVerticalScrollIndicator={false}
                    data={qafiData}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => renderAvailableAppsQAFI(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>

        <View style={{height: hp(23)}}>
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
              <>
                {qafiData?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: hp(2.1)}}>
                      No data available
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    style={{flex: 1}}
                    showsVerticalScrollIndicator={false}
                    data={qafiData}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => renderAvailableAppsQAFI(item)}
                  />
                )}
              </>
            )}
          </View>
        </View> */}
      </View>
    );
  };

  const GEBC = () => {
    
    return (
      <View style={{flex: 1}}>
        <View
          style={{marginTop: hp(1.5), marginBottom: hp(1),flexDirection: 'row', height: hp(18)}}>
          <View
            style={{marginTop: hp(1.5), flexDirection: 'row', height: hp(18)}}>
           {topNewsData === undefined || topNewsData.length === 0 || topNewsData.image === undefined || topNewsData.image === null || topNewsData.image === '' || topNewsData.image === '0' ? (
              <View
                //onPress={() => navigation.navigate('News')}
                style={{width: wp(35), height: '100%', borderRadius: wp(5)}}>
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
                  source={appImages.galleryPlaceHolder}
                />
              </View>
            ) : (
              <View
                //onPress={() => navigation.navigate('News')}
                style={{width: wp(35), height: '100%', borderRadius: wp(5)}}>
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
                  source={{uri: topNewsData.image}}
                />
              </View>
            )}

            <View style={{justifyContent: 'center', flex: 1}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: hp(7),
                  width: wp(35),
                }}>
                <Text
                  style={{
                    fontSize: hp(1.5),
                    marginLeft: wp(2.5),
                    fontFamily: 'Inter-Regular',
                    color: '#000000',
                  }}>
                  {topNewsData === undefined || topNewsData.length === 0
                    ? 'Does not contain any top news'
                    : topNewsData?.description}
                </Text>
              </View>
            </View>
          </View>
        </View>


        {categoriesSelect.map(category => (
  <View key={category.label}>
    <View style={{height: hp(24)}}>
      <Text style={styles.text}>{category.label}</Text>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#FACA4E" />
        </View>
      ) : (
        <View style={{flex: 1}}>
          {gebccategoryData[category.label] && gebccategoryData[category.label].length === 0 ? (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{textAlign: 'center'}}>No data available for {category.label}</Text>
            </View>
          ) : (
            <FlatList
              style={{flex: 1}}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={gebccategoryData[category.label]}
              keyExtractor={item => item.gebc_id.toString()} // Ensure a unique key for each item
              renderItem={({item}) => renderAvailableAppsGEBC(item)}
            />
          )}
        </View>
      )}
    </View>
  </View>
))}


        {/* {categoriesSelect.map(category => (
  <View key={category.label}>
    <View style={{height:hp(24)}}>
    <Text style={styles.text}>{category.label}</Text>
    {loading === true ? ( // If loading is true, render loader
           <View style={{flex:1, justifyContent:'center'}}>
           <ActivityIndicator size="large" color="#FACA4E" />
                 </View>// If loading is true, render loader
    ) : ( // If loading is false, render data or message
    <View style={{flex:1}}>
    {gebccategoryData[category.label] && gebccategoryData[category.label].length > 0 ? (
      <FlatList
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={gebccategoryData[category.label]}
        keyExtractor={item => item.gebc_id.toString()} // Ensure a unique key for each item
        renderItem={({item}) => renderAvailableAppsGEBC(item)}

      />
    ) : (
      <View style={{flex:1, justifyContent:'center'}}>
      <Text style={{textAlign:'center', alignContent:'center'}}>No data available for {category.label}</Text>
      </View>
    )}
 </View>
)}
        </View>
  </View>
))} */}







        {/* <View style={{height: hp(23)}}>
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
              <>
                {gebcData?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: hp(2.1)}}>
                      No data available
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    style={{flex: 1}}
                    showsVerticalScrollIndicator={false}
                    data={gebcData}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => renderAvailableAppsGEBC(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>

        <View style={{height: hp(23)}}>
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
              <>
                {gebcData?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: hp(2.1)}}>
                      No data available
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    style={{flex: 1}}
                    showsVerticalScrollIndicator={false}
                    data={gebcData}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => renderAvailableAppsGEBC(item)}
                  />
                )}
              </>
            )}
          </View>
        </View> */}
      </View>
    );
  };

  const OpenLetters = () => {
    return (
      <View style={{flex: 1}}>
        <View
          style={{marginTop: hp(1.5), flexDirection: 'row', height: hp(18)}}>
          {topNewsData === undefined || topNewsData.length === 0 ? (
            <View
              //onPress={() => navigation.navigate('News')}
              style={{width: wp(35), height: '100%', borderRadius: wp(5)}}>
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
                source={appImages.galleryPlaceHolder}
              />
            </View>
          ) : (
            <View
              //onPress={() => navigation.navigate('News')}
              style={{width: wp(35), height: '100%', borderRadius: wp(5)}}>
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
                source={appImages.galleryPlaceHolder}
              />
            </View>
          )}

          <View style={{justifyContent: 'center', flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: hp(7),
                width: wp(35),
              }}>
              <Text
                style={{
                  fontSize: hp(1.5),
                  marginLeft: wp(2.5),
                  fontFamily: 'Inter-Regular',
                  color: '#000000',
                }}>
                {topNewsData === undefined || topNewsData.length === 0
                  ? 'Does not contain any top news'
                  : topNewsData?.description}
              </Text>
            </View>
          </View>
        </View>

        <View style={{height: hp(21)}}>
          <Text style={{color: '#4A4A4A', fontWeight: 'bold', fontSize: hp(2)}}>
            Public (general)
          </Text>
          <FlatList
            style={{flex: 1}}
            contentContainerStyle={{alignItems: 'center'}}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={opensLettersPublicGeneralData}
            keyExtractor={item => item?.post_id.toString()}
            renderItem={({item}) => renderPublicGeneral(item)}
          />
        </View>

        <View style={{marginTop: hp(5), height: hp(21)}}>
          <Text style={{color: '#4A4A4A', fontWeight: 'bold', fontSize: hp(2)}}>
            Public (to authorities, celebrities, leaders)
          </Text>
          <FlatList
            style={{flex: 1}}
            contentContainerStyle={{alignItems: 'center'}}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={opensLettersPublicCelebrityData}
            keyExtractor={item => item?.post_id.toString()}
            renderItem={({item}) => renderPublicGeneral(item)}
          />
        </View>

        <View style={{marginTop: hp(5), height: hp(21)}}>
          <Text style={{color: '#4A4A4A', fontWeight: 'bold', fontSize: hp(2)}}>
            Private (to friends, peers, followers)
          </Text>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: hp(2.1)}}>
              No data available
            </Text>
          </View>
          {/* <FlatList
            style={{flex: 1}}
            contentContainerStyle={{alignItems: 'center'}}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={opensLettersPublicCelebrityData}
            keyExtractor={item => item?.post_id.toString()}
            renderItem={({item}) => renderPublicGeneral(item)}
          /> */}
        </View>

        <View style={{marginTop: hp(5), height: hp(21)}}>
          <Text style={{color: '#4A4A4A', fontWeight: 'bold', fontSize: hp(2)}}>
            Private (to authorities, celebrities, leaders){' '}
          </Text>

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: hp(2.1)}}>
              No data available
            </Text>
          </View>
          {/*  <FlatList
            style={{flex: 1}}
            contentContainerStyle={{alignItems: 'center'}}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={opensLettersPublicCelebrityData}
            keyExtractor={item => item?.post_id.toString()}
            renderItem={({item}) => renderPublicGeneral(item)}
          /> */}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <View style={{marginTop: hp(5)}}>
        <Headers
          OnpresshowHome={()=>{navigation.navigate('MoreScreen')}}
          showHome={true}
          onPressMenu={() => navigation.openDrawer()}
          onPressSearch={() => navigation.navigate('SearchAppsDisc')}
          showText={true}
          text={'Disc'}
          showSearch={true}
        />
      </View>

     
{/* {renderItemText()} */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          marginTop: hp(1),
          marginHorizontal: wp(4),
        }}>
           {/* // start of banner slider */}
           <View
      style={{
        alignItems: 'center',
        height: hp(16),
        // marginLeft: 8,
        marginVertical: hp(2),
      }}
    >
      {isLoading ? (
        <ActivityIndicator size="large" color="#FACA4E" />
      ) : adsData.length === 0 ? (
        <View style={styles.TopBannerView}>
          <Text style={{ fontWeight: 'bold', fontSize: hp(2.1) }}>No Top Banner</Text>
        </View>
      ) : (
        <Carousel
          data={adsData}
          renderItem={({ item }) => (
            <View
              key={item.id}
              style={{
                justifyContent: 'center',
              }}
            >
              <Image
                source={{ uri: item?.image }}
                style={{
                  height: hp(15),
                  width: '100%',
                  borderWidth: 1,
                  resizeMode: 'contain',
                  borderRadius: 10,
                }}
              />
            </View>
          )}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width * 0.9}
          onSnapToItem={(index) => setCarouselIndex(index)}
          loop={true}
          autoplay={true}
        />
      )}
    </View>
      <View style={{marginTop: hp(1), marginHorizontal: wp(8)}}>
        <Text style={{color: '#FACA4E', fontWeight: 'bold', fontSize: hp(2.3)}}>
          DISC
        </Text>
      </View>

      <View style={styles.latestSearchList}>
        <FlatList
          style={{flex: 1}}
          contentContainerStyle={{alignItems: 'center'}}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={searches}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => renderSearches(item)}
        />
      </View>
        {selectedItemId === 1 ? (
          <DiscScreen />
          
        ) : selectedItemId === 2 ? (
          <OpenLetters />
        ) : selectedItemId === 3 ? (
          <QAFI />
        ) : selectedItemId === 4 ? (
          <GEBC />
        ) : null}
      
      </ScrollView>
 {/* ///////////////////////////////////////// */}
 

 {/* //////////////////////////////////////// */}
      <TouchableOpacity
        onPress={() => goToScreen()}
        style={{position: 'absolute', bottom: 1, right: 25}}>
        <Add />
      </TouchableOpacity>

      <Toast ref={ref => Toast.setRef(ref)} />
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
    paddingHorizontal: wp(8),
  },
  searchBar: {
    height: hp(5.9),
    marginTop: hp(3),
    flex: 1,
    backgroundColor: '#F2F2F2',
    flexDirection: 'row',
    alignItems: 'center',
    //marginLeft: wp(3.8),
    borderRadius: wp(5),
    borderWidth: 0.5,
    borderColor: '#00000017',
  },
  latestSearchList: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2.1),
    height: hp(7),
    // marginHorizontal: wp(6),
    //marginLeft: wp(5),
    //borderWidth: 3,
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: hp(5),
    marginHorizontal: wp(8),
    height: hp(8),
    //borderWidth: 3,
  },
  latestSearch: {
    fontFamily: 'Inter',
    fontWeight: 'bold',
    fontSize: wp(4.3),
    marginTop: hp(2),
    marginLeft: wp(10),
    color: '#595959',
  },
  searchesDetails: {
    flexDirection: 'row',
    marginLeft: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(26),
    backgroundColor: '#F2F2F2',
    borderRadius: wp(5),
    height: hp(5),
  },
  textSearchDetails: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: hp(1.8),
  },
  textHeader: {
    fontSize: wp(5.7),
    color: '#333333',
    fontFamily: 'Inter',
    fontWeight: 'bold',
  },
  renderItem:{
    fontSize: wp(4.2),
    color:"black",
     fontFamily: 'Inter',
    fontWeight: 'bold',
  },
  text: {
    fontWeight: "700",
    color: "#4A4A4A",
    fontSize: hp(2),
    // textAlign: 'left',
    fontFamily: "Inter",
    marginTop: 5,
    fontSize: hp(1.9),
    // right: "20%",
  },
  TopBannerView:{
    height:'100%', width:'100%', borderWidth:1, borderColor:'gray',  borderRadius: 10, flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
