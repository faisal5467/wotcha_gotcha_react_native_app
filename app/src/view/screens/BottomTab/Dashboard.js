import {
  StyleSheet,
  FlatList,
  Image,
  Modal,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Text,
  View,
  Dimensions,
  Linking 
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Entypo from "react-native-vector-icons/Entypo";
import Headers from "../../../assets/Custom/Headers";
import { appImages } from "../../../assets/utilities";
import Carousel from 'react-native-snap-carousel';
//---------------- IMPORTS OF DASHBOARD ----------------------\\

import { InstalledApps, RNLauncherKitHelper } from "react-native-launcher-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";

//----------------- IMPORT VIDE0 -------------------\\
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import RBSheet from "react-native-raw-bottom-sheet";
//----------------------------------------------------\\
import CategoryActive from "../../../assets/svg/CategoryActive.svg";
import CategoryInactive from "../../../assets/svg/CategoryInactive";
import Add from "../../../assets/svg/AddMainScreen.svg";
//------------------IMPORT OF DISC --------------------\\
import NonVerified from "../../../assets/svg/NonVerified.svg";
import CustomModal from "../../../assets/Custom/CustomModal";
import { base_url } from "../../../../../baseUrl";
import Swiper from "react-native-swiper";
const bannerAds = [
  {
    id: 1,
    image: require("../../../assets/images/BannerAds.png"),
  },
  {
    id: 2,
    image: require("../../../assets/images/BannerAds.png"),
  },
  {
    id: 3,
    image: require("../../../assets/images/BannerAds.png"),
  },
  {
    id: 4,
    image: require("../../../assets/images/BannerAds.png"),
  },
];
const screenHeight = Dimensions.get("window").height;
const itemHeight = 450;

const { width: viewportWidth } = Dimensions.get("window");

const sliderWidth = viewportWidth * 0.9;

export default function Dashboard({ route }) {
  const navigation = useNavigation();
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [dataApps, setDataApps] = useState([]);
  const [isLongPress, setIsLongPress] = useState(false);
  const [unUsedLocal, setUnUsedLocal] = useState([]);
  const [unusedApps, setUnusedApps] = useState([]);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [isCancelRemoveModalVisible, setIsCancelRemoveModalVisible] =
    useState(false);
  const [isLongPressRemove, setIsLongPressRemove] = useState(false);
  const [favouriteItem, setFavouriteItem] = useState(null);
  const [removeFavouriteItem, setRemoveFavouriteItem] = useState(null);
  const [favouriteData, setFavouriteData] = useState([]);
  const isFocused = useIsFocused();
  const [topData, setTopData] = useState([]);
  const [modalDeleteApps, setModalDeleteApps] = useState(false);
  const [modalDeleteFavouriteApps, setModalDeleteFavouriteApps] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [aLoader, setAloader] = useState(true);
  const scrollViewRef = useRef();

  const [isSelectedActive, setIsSelectedActive] = useState(true);
  const [categoryActive, setcategoryActive] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [ecommerance, setecommerance] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible_b, setModalVisible_b] = useState(false);
  const [modalVisible_sp, setModalVisible_sp] = useState(false);
  const [modalVisible_e, setModalVisible_e] = useState(false);
  const [modalVisible_d, setModalVisible_d] = useState(false);
  const [modalVisible_fd, setModalVisible_fd] = useState(false);
  const [modalVisible_sm, setModalVisible_sm] = useState(false);
  const [modalVisible_mw, setModalVisible_mw] = useState(false);
  const [modalVisible_g, setModalVisible_g] = useState(false);
  const [modalVisible_em, setModalVisible_em] = useState(false);
  const [selectedApps, setSelectedApps] = useState([]);
  const [selectedApps_b, setSelectedApps_b] = useState([]);
  const [selectedApps_sp, setSelectedApps_sp] = useState([]);
  const [selectedApps_e, setSelectedApps_e] = useState([]);
  const [selectedApps_d, setSelectedApps_d] = useState([]);
  const [selectedApps_fd, setSelectedApps_fd] = useState([]);
  const [selectedApps_sm, setSelectedApps_sm] = useState([]);
  const [selectedApps_mw, setSelectedApps_mw] = useState([]);
  const [selectedApps_g, setSelectedApps_g] = useState([]);
  const [selectedApps_em, setSelectedApps_em] = useState([]);
  const [savedApps, setSavedApps] = useState([]);
  const [savedApps_b, setSavedApps_b] = useState([]);
  const [savedApps_sp, setSavedApps_sp] = useState([]);
  const [savedApps_e, setSavedApps_e] = useState([]);
  const [savedApps_d, setSavedApps_d] = useState([]);
  const [savedApps_fd, setSavedApps_fd] = useState([]);
  const [savedApps_sm, setSavedApps_sm] = useState([]);
  const [savedApps_mw, setSavedApps_mw] = useState([]);
  const [savedApps_g, setSavedApps_g] = useState([]);
  const [savedApps_em, setSavedApps_em] = useState([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [Sports, setSport] = useState(false);
  const [Education, seteducation] = useState(false);
  const [adsData, setAdsData] = useState([]);
  const [adsinActiveData, setAdsInActiveData] = useState([]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  // useEffect(() => {
  // const loaderTimeout = setTimeout(() => {
  //     setAloader(false);
  //   }, 35000);

  //  return () => clearTimeout(loaderTimeout);
  // }, []);

  const [flatListKey, setFlatListKey] = useState(Date.now());

  useEffect(() => {
    const fetchInstalledAppData = async () => {
      const installedApps = InstalledApps.getSortedApps();
      const packageNames = installedApps.map((app) => app.label);
      const packageImages = installedApps.map((app) => app.icon);
      const packageBundle = installedApps.map((app) => app.packageName);
      const packageDataArray = packageNames.map((packageName, index) => ({
        label: packageName,
        bundle: packageBundle[index],
        image: packageImages[index],
      }));

      setDataApps(packageDataArray);
      setIsLoading(false);
    };

    fetchInstalledAppData();
  }, []);

  useEffect(() => {
    const topSixItems = dataApps.slice(0, 6);
    //   console.log('Top Six Item');
    const saveTopData = async () => {
      try {
        const updatedTopData = topSixItems.map((item) => ({
          ...item,
          count: 2,
        }));
        await AsyncStorage.setItem("topData", JSON.stringify(updatedTopData));
        setTopData(updatedTopData);
      } catch (error) {
        console.error("Error saving top data to AsyncStorage:", error);
      }
    };
    saveTopData();
  }, [dataApps]);
  useEffect(() => {
    //   if (isFocused) {
    const loadFavouriteData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("favouriteData");
        console.log(
          "IS FOCUSED OF FAVOURITE DATA IS CALLED",
          typeof storedData
        );
        console.log(
          "IS FOCUSED OF FAVOURITE DATA IS CALLED LENGTH",
          storedData.length
        );
        if (storedData.length === 2) {
          console.log("FAVOURITE IS NULLl");
          const initialFavouriteData = dataApps.slice(0, 4);
          await AsyncStorage.setItem(
            "favouriteData",
            JSON.stringify(initialFavouriteData)
          );
          setFavouriteData(initialFavouriteData);
        } else {
          const parsedData = JSON.parse(storedData);
          setFavouriteData(parsedData);
          console.log("FAVOURITE IS NOT NULL");
        }
      } catch (error) {
        console.error("Error loading favourite data from AsyncStorage:", error);
      }
    };

    loadFavouriteData();
    //   }
  }, []);

  useEffect(() => {
    //   if (isFocused) {
    const saveFavouriteData = async () => {
      try {
        await AsyncStorage.setItem(
          "favouriteData",
          JSON.stringify(favouriteData)
        );
      } catch (error) {
        console.error("Error saving favourite data to AsyncStorage:", error);
      }
    };
    saveFavouriteData();
    //   }
  }, [favouriteData]);

  useEffect(() => {
    //   if (isFocused) {
    const loadTopData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("topData");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setTopData(parsedData);
        }
      } catch (error) {
        console.error("Error loading top data from AsyncStorage:", error);
      }
    };

    loadTopData();
    //   }
  }, []);

  useEffect(() => {
    //   if (isFocused) {
    const saveTopData = async () => {
      try {
        await AsyncStorage.setItem("topData", JSON.stringify(topData));
      } catch (error) {
        console.error("Error saving top data to AsyncStorage:", error);
      }
    };

    saveTopData();
    //   }
  }, [topData]);

  useEffect(() => {
    const fetchUsedData = async () => {
      const lastUsageDate = new Date().toISOString();

      const installedApps = InstalledApps.getSortedApps();
      const packageNames = installedApps.map((app) => app.label);
      const packageImages = installedApps.map((app) => app.icon);
      const packageBundle = installedApps.map((app) => app.packageName);
      const packageDataArray = packageNames.map((packageName, index) => ({
        label: packageName,
        bundle: packageBundle[index],
        image: packageImages[index],
        date: lastUsageDate,
      }));

      setUnusedApps(packageDataArray);

      await AsyncStorage.setItem(
        "comparisonDate",
        JSON.stringify(packageDataArray)
      );
      setIsLoading(false);
    };

    fetchUsedData();
  }, []);
  //------------------------------------------------------------\\
  const itemsPerPage = 10; // Change this to set the number of items per screen
  const [favouriteApps, setFavouriteApps] = useState([
    { id: 1, title: "SnapChat", image: appImages.snapchat },
    { id: 2, title: "Gmail", image: appImages.gmail },
    { id: 3, title: "Pinterest", image: appImages.pinterest },
    { id: 4, title: "LinkedIn", image: appImages.linkedIn },
    { id: 5, title: "Calendar", image: appImages.calendar },
    { id: 6, title: "SnapChat", image: appImages.snapchat },
    { id: 7, title: "SnapChat", image: appImages.snapchat },
    { id: 8, title: "Gmail", image: appImages.gmail },
    { id: 9, title: "Pinterest", image: appImages.pinterest },
    { id: 10, title: "LinkedIn", image: appImages.linkedIn },
  ]);

  // const onDragEnd = (data, targetList, item) => {
  //   console.log('data list', data);
  //   console.log('target list item', item);
  //   // Handle the item drop here
  //   // Update the target list based on the dragged item data
  //   // You might want to implement your own logic here
  //   const updatedList = [...targetList, item];
  //   // Update the state and use the callback to log the updated state
  //   setFavouriteApps(updatedList, () => {
  //     console.log('On drag ends FavouriteList', favouriteApps);
  //   });

  //   setFlatListKey(Date.now()); // Update the key to force re-render
  // };

  const renderApps = (item) => {
    //console.log('item at first', item);
    const openApp = async (items) => {
      try {
        // Check if the app is already in the topData array
        const appIndex = topData.findIndex((app) => app.bundle === item.bundle);

        if (appIndex !== -1) {
          // If the app is already in the array, update the count
          const updatedTopData = [...topData];
          updatedTopData[appIndex] = {
            ...updatedTopData[appIndex],
            count: updatedTopData[appIndex].count + 1,
          };

          setTopData(updatedTopData);

          await RNLauncherKitHelper.launchApplication(item.bundle);

          //----------------------\\
          // Your additional logic here
          //----------------------\\
        } else {
          // If the app is not in the array, add it with count 1
          const randomIndex = Math.floor(Math.random() * 6); // Random index between 0 and 5
          const updatedTopData = [...topData];
          updatedTopData[randomIndex] = {
            label: item.label,
            bundle: item.bundle,
            image: item.image,
            count: 1,
          };

          setTopData(updatedTopData);

          await RNLauncherKitHelper.launchApplication(item.bundle);

          //----------------------\\
          // Your additional logic here
          //----------------------\\
        }
      } catch (error) {
        console.error("Error opening the app:", error);
        await RNLauncherKitHelper.launchApplication(item.bundle);
        // Your additional error handling logic here
      }
    };

    return (
      <TouchableOpacity
        onLongPress={() => {
          setIsLongPress(true);
          setIsCancelModalVisible(true);
          setFavouriteItem(item);
        }}
        onPress={() => openApp(item?.bundle)}
        style={styles.items}
      >
        <Image
          style={{ width: 43, height: 43 }}
          source={{ uri: `data:image/png;base64,${item?.image}` }}
        />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              color: "#000000",
              textAlign: "center",
              fontSize: hp(1.2),
              fontWeight: "bold",
            }}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {item?.label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  // const renderFavouritesApps = item => {
  //   //console.log('item at first', item);
  //   const openApp = async items => {
  //     try {
  //       // Launch the application
  //       await RNLauncherKitHelper.launchApplication(item.bundle);

  //       // Check if the app is already in the topData array
  //       const appIndex = topData.findIndex(app => app.bundle === item.bundle);

  //       if (appIndex !== -1) {
  //         // If the app is already in the array, update the count
  //         const updatedTopData = [...topData];
  //         updatedTopData[appIndex] = {
  //           ...updatedTopData[appIndex],
  //           count: updatedTopData[appIndex].count + 1,
  //         };

  //         setTopData(updatedTopData);
  //       } else {
  //         // If the app is not in the array, add it with count 1
  //         setTopData(prevData => [
  //           ...prevData,
  //           {
  //             label: item.label,
  //             bundle: item.bundle,
  //             image: item.image,
  //             count: 1,
  //           },
  //         ]);
  //       }

  //       await RNLauncherKitHelper.launchApplication(items); // Assuming 'item.label' is the package name
  //     } catch (error) {
  //       console.error('Error opening the app:', error);
  //       await RNLauncherKitHelper.launchApplication(items); // Assuming 'item.label' is the package name
  //     }
  //   };

  //   return (
  //     <TouchableOpacity
  //       onLongPress={() => {
  //         setIsLongPressRemove(true);
  //         setIsCancelRemoveModalVisible(true);
  //         setRemoveFavouriteItem(item);
  //       }}
  //       //onPress={() => openApp(item?.bundle)}
  //       style={styles.items}>
  //       <Image
  //         style={{width: 43, height: 43}}
  //         source={{uri: `data:image/png;base64,${item?.image}`}}
  //       />
  //       <Text
  //         style={{
  //           color: '#000000',
  //           textAlign: 'center',
  //           fontSize: hp(1.2),
  //           fontWeight: 'bold',
  //         }}
  //         ellipsizeMode="tail"
  //         numberOfLines={1}>
  //         {item?.label}
  //       </Text>
  //     </TouchableOpacity>
  //   );
  // };
  const renderAvailableApps = (item) => {
    // Render the item only if count is equal to 2
    if (item.count >= 2) {
      return (
        <View style={{ height: hp(8), padding: 5 }}>
          <Image
            style={{ width: wp(12), height: wp(12) }}
            resizeMode="contain"
            source={{ uri: `data:image/png;base64,${item?.image}` }}
          />
        </View>
      );
    } else {
      // Return null or an empty view if count is not equal to 2
      return (
        <View style={{ height: hp(8), padding: 5 }}>
          <Image
            style={{ width: wp(12), height: wp(12) }}
            resizeMode="contain"
            source={appImages.logoTransparent}
          />
        </View>
      );
    }
  };

  const closeRequestModal = () => {
    setIsLongPress(false);
    setIsCancelModalVisible(false);
  };

  const closeRequestRemoveModal = () => {
    setIsLongPressRemove(false);
    setIsCancelRemoveModalVisible(false);
  };

  //---------------------------------------------------\\

  //--------------------Video---------------------------\\

  const [loadingOne, setLoadingOne] = useState(false);

  const [imageInfo, setImageInfo] = useState(null);

  const [selectedItem, setSelectedItem] = useState("");

  // const [data, setVideoData] = useState([]);

  const ref_RBSheetCamera = useRef(null);

  const takePhotoFromCamera = async (value) => {
    setSelectedItem(value);
    launchCamera(
      {
        mediaType: "video",
        videoQuality: "medium",
      },
      (response) => {
        //   console.log('image here', response);
        if (!response.didCancel) {
          if (response.assets && response.assets.length > 0) {
            setLoadingOne(true);
            setImageInfo(response.assets[0]);
            ref_RBSheetCamera.current.close();
            setLoadingOne(false);

            navigation.navigate("UploadUpdateVideo", {
              Video: response.assets[0],
            });
          } else if (response.uri) {
            console.log("response", imageInfo);
            ref_RBSheetCamera.current.close();
            setLoading(false);

            navigation.navigate("UploadUpdateVideo", {
              Video: response.assets[0],
            });
          }
        }
        console.log("response", imageInfo);
        ref_RBSheetCamera.current.close();
        setLoading(false);

        navigation.navigate("UploadUpdateVideo", { Video: response.assets[0] });
      }
    );
  };

  const choosePhotoFromLibrary = (value) => {
    setSelectedItem(value);
    launchImageLibrary({ mediaType: "video" }, (response) => {
      // console.log('image here', response);
      if (!response.didCancel && response.assets.length > 0) {
        /*  console.log('Response', response.assets[0]);
        setImageUri(response.assets[0].uri);
        setImageInfo(response.assets[0]); */
        setLoading(true);
        setImageInfo(response.assets[0]);
        ref_RBSheetCamera.current.close();
        setLoading(false);

        navigation.navigate("UploadUpdateVideo", { Video: response.assets[0] });
      }

      console.log("response", imageInfo);
      ref_RBSheetCamera.current.close();
      setLoading(false);

      navigation.navigate("UploadUpdateVideo", { Video: response.assets[0] });
    });
  };

  const handleCancel = () => {
    setModalDeleteApps(false);
  };

  const handleConfirm = () => {
    if (removeFavouriteItem) {
      const updatedInstallData = dataApps.filter(
        (item) => item.bundle !== removeFavouriteItem.bundle
      );
      setModalDeleteApps(false);
      setDataApps(updatedInstallData);
    } else {
      setModalDeleteApps(false);
      console.log("CANCEL");
    }
  };

  const handleCancelFavourite = () => {
    setModalDeleteFavouriteApps(false);
  };

  const handleConfirmFavourite = () => {
    if (removeFavouriteItem) {
      // Check if the item already exists in favouriteData
      const isItemInFavourites = favouriteData.some(
        (item) => item.bundle === removeFavouriteItem.bundle
      );

      console.log("Favourite Item", isItemInFavourites);

      if (isItemInFavourites) {
        // Item already exists, remove it from favouriteData
        const updatedFavouriteData = favouriteData.filter(
          (item) => item.bundle !== removeFavouriteItem.bundle
        );
        setFavouriteData(updatedFavouriteData);

        //   console.log('Item removed from favourites');

        setModalDeleteFavouriteApps(false);
      } else {
        // Item doesn't exist, add it to favouriteData
        setFavouriteData((prevData) => [...prevData, favouriteItem]);
        //   console.log('Add to Favorites pressed for:');

        setModalDeleteFavouriteApps(false);
      }
    } else {
      console.log("NO APPS FOUND");
    }
  };

  // ////
  // const targetRef = useRef(null);
  // const [dataMarket, setDataMarket] = useState([]);
  // Function to check if an element is in the viewport
  //   const isElementInViewport = (el) => {
  //     if (!el) return false;

  //     const rect = el.getBoundingClientRect();
  //     return (
  //       rect.top >= 0 &&
  //       rect.left >= 0 &&
  //       rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
  //       rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  //     );
  //   };
  const fetchDataForVisibleComponent = async () => {
    await fetchDataIfVisible(fetchCategoryMarket);
    await fetchDataIfVisible(fetchAllMarket);
    await fetchDataIfVisible(fetchElectronicsMarket);
    await fetchDataIfVisible(fetchVehiclesMarket);
    await fetchDataIfVisible(fetchClothingMarket);
  };

  const fetchDataIfVisible = async (fetchFunction) => {
    if (isComponentVisible()) {
      try {
        await fetchFunction();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    fetchDataForVisibleComponent();
  }, []);

  const isComponentVisible = () => {
    if (!scrollViewRef || !scrollViewRef.current) return false;

    const scrollY = scrollViewRef.current.contentOffset?.y || 0;
    const screenHeight = scrollViewRef.current.clientHeight || 0;

    const marketComponentTop = 0; // Top of the market component
    const marketComponentBottom = marketComponentTop + screenHeight; // Bottom of the market component

    return (
      marketComponentTop >= scrollY &&
      marketComponentBottom <= scrollY + screenHeight
    );
  };
  /////////////////////////////////////////////////////////////////////////Main return start hai 28/5/2024

  //////////////////////////////2.6.2025

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [error, setError] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [selectedItemVideoId, setSelectedItemVideoId] = useState(17); // Set selectedItemVideoId to 17 initially
  const [selectedItemDiscId, setSelectedItemDiscId] = useState(1);
  const [selectedItemPicsId, setSelectedItemPicsId] = useState(34);
  const [selectedItemIdMarket, setSelectedItemIdMarket] = useState('Africa');
  const [categoriesSelectMarket, setCategorySelectMarket] = useState([]);
  const RegionArea = ["Africa", "Europe", "Americas", "Asia", "Middle East"];
  const MassApp = [
    "E-commerce",
    "Business",
    "Sports",
    "Education",
    "Dating",
    "Food Delivery",
    "Social Media",
    "Medical Wellness",
    "Grocery",
    "Employment",
  ];
  const containerHeight = Math.min(screenHeight * 0.8, itemHeight);
  const renderSearchesVideo = (item) => {
    const isSelected = selectedItemVideoId === item.id;
    return (
      <TouchableOpacity
        style={[
          styles.searchesDetails,
          {
            // backgroundColor: isSelected ? "#FACA4E" : "#F2F2F2",
            backgroundColor: isSelected ? "#FACA4E" : "#DDDDDD",
          },
        ]}
        onPress={() => {
          setSelectedItemVideoId(item.id); // Update selectedItemVideoId when item is selected
          console.log("Selected item:", item.id);
        }}
      >
        <Text
          style={[
            styles.textSearchDetails,
            { color: isSelected ? "#232323" : "#939393" },
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderSearchesPic = (item) => {
    // console.log('Items for search pics-------', item.id);
    const isSelected = selectedItemPicsId === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.searchesDetails,
          {
            // backgroundColor: isSelected ? "#FACA4E" : "#F2F2F2",
            backgroundColor: isSelected ? "#FACA4E" : "#DDDDDD",
          },
        ]}
        onPress={() => {
          setSelectedItemPicsId(item.id);
          console.log('Selected item:', item.id);
        }}
      >
        <Text
          style={[
            styles.textSearchDetails,
            { color: isSelected ? "#232323" : "#939393" },
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const getAuthToken = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken ");
        if (token) {
          setAuthToken(token);
        } else {
          throw new Error("No auth token found");
        }
      } catch (err) {
        console.error("Error retrieving auth token:", err);
        setError(err);
      }
    };

    getAuthToken();
  }, []);

  useEffect(() => {
    if (authToken) {
      const fetchSequentialData = async () => {
        const id = selectedItemVideoId || 17;
        const picId = selectedItemPicsId || 5;
        const marketId = selectedItemIdMarket || "Africa";
        const DiscId = selectedItemDiscId || 1;

        // const fetchFunctions = [
        //   fetchCategory,
        //   fetchTopVideos,
        //   fetchTrendingVideos,
        //   fetchLatestVideos,
        //   fetchMostViewedVideos,
        //   fetchMostCommentedVideos,
        //   fetchTopNews,
        //   fetchNews,
        //   fetchCategoryPics,
        //   fetchTopPics,
        //   fetchTrendingPics,
        //   fetchLatestPics,
        //   fetchMostViewedPics,
        //   fetchMostCommentedPics,
        //   fetchTopMarket,
        //   fetchCategoryMarket,
        //   fetchElectronicsMarket,
        //   fetchVehiclesMarket,
        //   fetchClothingMarket,
        //   fetchAllMarket,
        //   fetchLetterPublicGeneral,
        //   fetchLetterPrivateCelebrity,
        //   fetchLetterPrivateFriends,
        //   fetchLetterPublicCelebrity,
        //   fetchQAFI,
        //   fetchGEBC,
        // ];
        const fetchFunctions = [
          fetchCategory, // 0
          fetchTopVideos, // 1
          fetchTrendingVideos, // 2
          fetchLatestVideos, // 3
          fetchMostViewedVideos, // 4
          fetchMostCommentedVideos, // 5
          fetchTopNews, // 6
          fetchNews, // 7
          fetchCategoryPics, // 8
          fetchTopPics, // 9
          fetchTrendingPics, // 10
          fetchLatestPics, // 11
          fetchMostViewedPics, // 12
          fetchMostCommentedPics, // 13
          fetchTopMarket, // 14
          fetchCategoryMarket, // 15
          fetchElectronicsMarket, // 16
          fetchVehiclesMarket, // 17
          fetchClothingMarket, // 18
          fetchAllMarket, // 19
          fetchLetterPublicGeneral, // 20
          fetchLetterPrivateCelebrity, // 21
          fetchLetterPrivateFriends, // 22
          fetchLetterPublicCelebrity, // 23
          fetchQAFI, // 24
          fetchGEBC, // 25
        ];

        let newData = [];

        for (let i = 0; i < fetchFunctions.length; i++) {
          try {
            const result = await fetchFunctions[i](
              authToken,
              id,
              picId,
              marketId,
              DiscId
            );
            newData = [...newData, result];
            setData(newData);
            setLoading((prev) =>
              prev.map((item, index) =>
                index === i ? false : index === i + 1 ? true : item
              )
            );
          } catch (err) {
            setError(err);
            setLoading((prev) =>
              prev.map((item, index) => (index === i ? false : item))
            );
            break;
          }
        }
      };

      fetchSequentialData();
    }
  }, [
    authToken,
    selectedItemVideoId,
    selectedItemDiscId,
    selectedItemPicsId,
    selectedItemIdMarket,
  ]);

  useEffect(() => {
    if (authToken) {
      fetchBannerConfig();
      fetchBannerInActive();
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
      console.log("AllBanners---top ", result.AllBanners);
      setAdsData(result.AllBanners);
    } catch (error) {
      console.error("Error AllBanners:", error);
    }
    setIsLoading(false);
  };
  const fetchBannerInActive = async () => {
    const token = authToken;
    setIsLoading(true);
    try {
      const response = await fetch(
        base_url + "banner/getAllActiveBanners?topBanner=false",
        // base_url + "banner/getAllBannersByUser/97",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log("AllBanners AdsInActiveData---", result.AllBanners);
      setAdsInActiveData(result.AllBanners);
    } catch (error) {
      console.error("Error AllBanners AdsInActiveData---", error);
    }
    setIsLoading(false);
  };
  // console.log('adsData----------', adsData)

  // if (error) {
  //   return <Text>Error--: {error.message}</Text>;
  // }
  // ////////////////////////////api function
  const fetchCategory = async (token, id) => {
    try {
      const response = await fetch(
        base_url + "videoCategory/getAllVideoCategories",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log('Category------------', result.AllCategories)
      return result.AllCategories.reverse();
    } catch (error) {
      console.error("Error Trending:", error);
      throw error;
    }
  };

  const fetchTopVideos = async (token, id) => {
    try {
      const response = await fetch(base_url + `top/app/top_video/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      // console.log('Top', result.topVideo[0])
      return result.topVideo;
    } catch (error) {
      console.error("Error Trending:", error);
      throw error;
    }
  };
  const fetchTrendingVideos = async (token, id) => {
    try {
      const response = await fetch(
        base_url + `xpi/getTrendingVideosByCategory/${id}?page=1&limit=5`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log('trending', result.Videos)
      return result.Videos;
    } catch (error) {
      console.error("Error Trending:", error);
      throw error;
    }
  };

  const fetchLatestVideos = async (token, id) => {
    try {
      const response = await fetch(
        base_url + `xpi/getAllRecentVideosByCategory/${id}?page=1&limit=2`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log('Recent', result.Videos)
      return result.Videos;
    } catch (error) {
      console.error("Error Trending:", error);
      throw error;
    }
  };

  const fetchMostViewedVideos = async (token, id) => {
    try {
      const response = await fetch(
        base_url + `xpi/getMostViewedVideosByCategory/${id}?page=1&limit=5`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log('Viewed', result.Videos)
      return result.Videos;
    } catch (error) {
      console.error("Error Trending:", error);
      throw error;
    }
  };

  const fetchMostCommentedVideos = async (token, id) => {
    try {
      const response = await fetch(
        base_url + `xpi/getMostCommentedVideosByCategory/${id}?page=1&limit=5`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log('Commented', result.Videos)
      return result.Videos;
    } catch (error) {
      console.error("Error Trending:", error);
      throw error;
    }
  };

  // ////Fetch News
  const fetchNews = async () => {
    //   console.log('Categry in id', categoryIdNews);
    //   console.log('News Called');
    const token = authToken;

    try {
      const response = await fetch(
        // base_url + `news/getAllNewsByCategory/${categoryIdNews}?page=1&limit=100`,
        base_url + "news/getAllNewsByCategory/3?page=1&limit=100",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      return result.AllQAFIs;
      // fetchTopNews();
    } catch (error) {
      console.error("Error Trending:", error);
    }
  };

  const fetchTopNews = async (token) => {
    try {
      const response = await fetch(base_url + "top/getAllTopQAFIByCategory/3", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      // console.log('Resultings of Top News', result.AllQAFI[0]);
      //Alert.alert(result)
      return result.AllQAFI[0];
      // setTopNewsData(result.AllQAFI[0]); // Update the state with the fetched data
    } catch (error) {
      console.error("Error Trending:", error);
    }
  };

  const fetchQAFI = async (token) => {
    //   console.log(' QAFI in id', categoryIdNews);
    // const token = authToken;

    try {
      const response = await fetch(
        // base_url + `qafi/getAllQafisByCategory/${categoryIdNews}?page=1&limit=50`,
        base_url + "qafi/getAllQafisByCategory/3?page=1&limit=50000",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log("Resultings of QAFI", result.QAFIs);
      //Alert.alert(result)
      return result.QAFIs;
      // setQAFIData(result.QAFIs); // Update the state with the fetched data
    } catch (error) {
      console.error("Error Trending:", error);
    }
  };

  const fetchGEBC = async (token, id, picId, marketId) => {
    //   console.log('Categry in id', categoryIdNews);
    // const token = authToken;

    try {
      const response = await fetch(
        // base_url + `gebc/getAllGEBCsByCategory/${categoryIdNews}?page=1&limit=50`,
        base_url + `gebc/getAllGEBCsByCategory/3?page=1&limit=50`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log('Resultings of GEBC', result.GEBCs);
      //Alert.alert(result)
      return result.GEBCs;
      // setGEBCData(result.GEBCs); // Update the state with the fetched data
      // fetchTopNews();
    } catch (error) {
      console.error("Error Trending:", error);
    }
  };

  const fetchLetterPublicGeneral = async (token) => {
    // setLoading(true);
    //   console.log('Categry in id', categoryIdNews);
    // const token = authToken;

    try {
      const response = await fetch(
        base_url + `letter/public_general_by_category/3/?page=1&limit=100`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log(
      //   "Resultings of fetchLetterPublicGeneral letter--",
      //   result.AllLetter
      // );
      return result.AllLetter;

      // setOpensLettersPublicGeneralData(result.AllLetter); // Update the state with the fetched data
      // await fetchLetterPublicCelebrity();
    } catch (error) {
      setLoading(false);
      console.error("Error Trending:", error);
    }
  };

  const fetchLetterPublicCelebrity = async () => {
    const token = authToken;

    try {
      const response = await fetch(
        base_url + `letter/public_celebrity_by_category/3/?page=1&limit=10`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log('Resultings of fetchLetterPublicCelebrity-----', result.AllLetter);
      return result.AllLetter;

      // setOpensLettersPublicCelebrityData(result.AllLetter); // Update the state with the fetched data
      // await fetchLetterPrivateFriends();
    } catch (error) {
      setLoading(false);

      console.error("Error Trending:", error);
    }
  };

  const fetchLetterPrivateFriends = async () => {
    const token = authToken;

    try {
      const response = await fetch(
        base_url + `letter/private_friends_by_category/3/?page=1&limit=5`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log('Resultings of fetchLetterPrivateFriends', result.AllLetter);
      //Alert.alert(result)
      return result.AllLetter;
      // setOpensLettersPrivateFriendsData(result.AllLetter); // Update the state with the fetched data
      // await fetchLetterPrivateCelebrity();
    } catch (error) {
      console.error("Error Trending:", error);
    }
  };

  const fetchLetterPrivateCelebrity = async () => {
    const token = authToken;

    try {
      const response = await fetch(
        base_url + `letter/private_celebrity_by_category/3/?page=1&limit=2`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log('Resultings of fetchLetterPrivateCelebrity', result.AllLetter);
      return result.AllLetter;

      // setOpensLettersPrivateCelebrityData(result.AllLetter); // Update the state with the fetched data
      // fetchTopNews();
      // setLoading(false);
    } catch (error) {
      // setLoading(false);

      console.error("Error Trending:", error);
    }
  };

  //DISC

  // ////Fetch Pics
  const fetchCategoryPics = async (token) => {
    // const token = authToken;

    try {
      const response = await fetch(
        base_url + "picCategory/getAllPicCategories?page=1&limit=5",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log('Search fetchCategoryPics-----------', result.AllCategories);
      return result.AllCategories;
      // setSearchesPics(result.AllCategories); // Update the state with the fetched data
    } catch (error) {
      console.error("Error in fetchCategoryPics :", error);
    }
  };

  const fetchTopPics = async (token, id, picId) => {
    // console.log('picid ---------', picId)
    try {
      const response = await fetch(base_url + `top/app/top_tour/${picId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      // console.log("Top  topTour-----------", result.topTour[0]);
      return result.topTour;
      // setSearchesPics(result.AllCategories); // Update the state with the fetched data
    } catch (error) {
      console.error("Error in topTour :", error);
    }
  };

  const fetchTrendingPics = async (token, id, picId) => {
    // const token = authToken;

    try {
      const response = await fetch(
        base_url +
          `picTour/getAllTrendingToursByCategory/${picId}?page=1&limit=5`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log('Resultings Pics Tourzs', result.Tours);
      return result.Tours;
      // setDataPics(result.Tours); // Update the state with the fetched data
    } catch (error) {
      console.error("Error Trending:", error);
    }
  };

  const fetchLatestPics = async (token, id, picId) => {
    //   console.log('selected id latest videos', authToken);

    // const token = authToken;

    try {
      const response = await fetch(
        base_url +
          `picTour/getAllRecentVideosByCategory/${picId}?page=1&limit=5`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      return result.Tours;
      // console.log('Resultings', result.Tours);
      // setDataLatestPics(result.Tours); // Update the state with the fetched data
    } catch (error) {
      console.error("Error in fetchLatestPics:", error);
    }
  };

  const fetchMostViewedPics = async (token, id, picId) => {
    try {
      const response = await fetch(
        base_url +
          `picTour/getMostViewedToursByCategory/${picId}?page=1&limit=5`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log('Resultings Most Viewed', result.Tours);
      return result.Tours;
      // setMostViewedPics(result.Tours); // Update the state with the fetched data
    } catch (error) {
      console.error("Error in fetchMostViewedPics:", error);
    }
  };
  const fetchMostCommentedPics = async (token, id, picId) => {
    try {
      const response = await fetch(
        base_url +
          `picTour/getMostCommentedToursByCategory/${picId}?page=1&limit=5`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      return result.Tours;
    } catch (error) {
      console.error("Error in fetchMostCommentedPics:", error);
    }
  };
  // ///Fetch Pic end

  // fetch Market start
  // console.log('market ki id aaaii-----------', selectedItemIdMarket)
  const fetchTopMarket = async (token) => {
    try {
      const response = await fetch(base_url + "top/app/top_item", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      // console.log('top market hai--', result.topitem[0])
      return result.topitem;
      // setDataTopVideosMarket(result.topitem[0]);
    } catch (error) {
      console.error("Error in fetchTopMarket:", error);
    }
  };

  const fetchCategoryMarket = async () => {
    //   console.log(' Categories Result', result);
    const token = authToken;

    try {
      const response = await fetch(
        base_url + "itemCategory/getAllItemCategories?page=1&limit=5",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        // console.log('Data ', data);
        const categories = data.AllCategories.map((category) => ({
          label: category.name,
          value: category.id.toString(),
        }));

        setCategorySelectMarket(categories);

        //   console.log('Data Categories', categoriesSelectMarket);
      } else {
        console.error(
          // "Failed to fetch categories:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error in fetchCategoryMarket:", error);
    }
  };

  const fetchElectronicsMarket = async (token, id, picId, marketId) => {
    try {
      const response = await fetch(
        base_url +
          `item/getAllItemByCategory/5?page=1&limit=5&region=${marketId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log("electronins -------", result.AllItems);
      return result.AllItems;
      // setDataElectronicsMarket(result.AllItems);
    } catch (error) {
      console.error("Error Trending:", error);
    }
  };

  const fetchVehiclesMarket = async (token, id, picId, marketId) => {
    // console.log("market id vehile-------", marketId);
    try {
      const response = await fetch(
        base_url +
          `item/getAllItemByCategory/6?page=1&limit=5&region=${marketId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log("AllItems in vehicle", result.AllItems);
      return result.AllItems; // Update the state with the fetched data
    } catch (error) {
      console.error("Error Trending:", error);
    }
  };

  const fetchClothingMarket = async (token, id, picId, marketId) => {
    // const token = authToken;

    try {
      const response = await fetch(
        base_url +
          `item/getAllItemByCategory/7?page=1&limit=5&region=${marketId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      return result.AllItems;
      // console.log('AllItems', result.AllItems);
      // setDataClothingMarket(result.AllItems);
    } catch (error) {
      console.error("Error Trending:", error);
    }
  };
  const fetchAllMarket = async (token) => {
    // const token = authToken;
    // console.log('token aya ', token)

    try {
      const response = await fetch(
        base_url + "item/getAllItems?page=1&limit=2",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      // console.log("all data market", result.AllItems);
      return result.AllItems;
    } catch (error) {
      // console.error("Error in fetchAllMarket:", error);
    }
  };

  // fetch market end
  const renderPublicGeneral = (item) => {
    //   console.log('Item', item);
    const imageUrl =
      item.images && item.images[0]
        ? item.images[0].startsWith("/fileUpload")
          ? base_url + `${item.images[0]}`
          : item.images[0]
        : null;

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("LetterDetails", { Letters: item })}
        style={{ width: wp(25.5), margin: 5 }}
      >
        <View>
          {item.images && item.images[0] ? (
            <Image
              style={{
                height: hp(12),
                width: wp(23),
              }}
              source={{ uri: imageUrl }}
            />
          ) : (
            // Show dummy image if item.images is null or undefined
            <Image
              style={{
                height: hp(12),
                width: wp(23),
              }}
              source={appImages.galleryPlaceHolder}
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
  /////////Fetch news end
  // ///////////Trending
  const renderAvailableAppsVideo = (item) => {
    // console.log("Itemsss", item);
    //   console.log('Video Link', item.thumbnail);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("ViewVideo", { videoData: item })}
        style={{ width: wp(27), margin: 5 }}
      >
        <View>
          {item.thumbail === "" ||
          item.thumbnail === null ||
          // item.thumbnail.startsWith('/') ||
          item.thumbnail === undefined ? (
            <Image
              style={{
                position: "absolute",
                top: 0,
                left: 0,

                zIndex: 1, // Ensure it's on top of other elements
                //flex: 1,
                width: "100%",
                height: hp(12),
                borderRadius: wp(1),
                resizeMode: "cover",
              }}
              source={appImages.galleryPlaceHolder}
            />
          ) : (
            <Image
              style={{
                position: "absolute",
                top: 0,
                left: 0,

                zIndex: 1, // Ensure it's on top of other elements
                //flex: 1,
                width: "100%",
                height: hp(12),
                borderRadius: wp(1),
                resizeMode: "cover",
              }}
              source={{ uri: item.thumbnail }}
            />
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: wp(0.5),
            marginTop: hp(12.5),
          }}
        >
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: hp(1.5),
              fontFamily: "Inter-Regular",
              color: "#000000",
              width: wp(23),
            }}
          >
            {item.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  ///////////////////////////
  //   //////////////////////////////  DISC START

  const searchesDisc = [
    { id: 1, title: "On News" },
    { id: 2, title: "Open Letters" },
    { id: 3, title: "QAFI" },
    { id: 4, title: "EBC" },
  ];

  const renderAvailableDiscApps = (item) => {
    //   console.log('Items of News', item);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("ViewNews", { picData: item })}
        style={{width: wp(34), margin: 5, overflow:'hidden'}}
      >
        <View>
          <Image
            style={{
              position: "absolute",
              top: 0,
              left: 0,

              zIndex: 1, // Ensure it's on top of other elements
              //flex: 1,
              width: "100%",
              height: hp(12),
              borderRadius: wp(1),
              resizeMode: "cover",
            }}
            source={{ uri: item.image }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: hp(12),
            height: hp(7),
            width: wp(25),
          }}
        >
          {item?.userimage ? (
            <View
              style={{
                width: wp(7),
                marginLeft: wp(0.5),
                height: wp(7),
                overflow: "hidden",
                borderRadius: wp(7) / 2,
              }}
            >
              <Image
                source={{ uri: item?.userimage }}
                style={{ width: "100%", height: "100%", resizeMode: "cover" }}
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

          <View style={{ marginLeft: wp(1) }}>
            <NonVerified />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderAvailableAppsQAFI = (item) => {
    //   console.log('Items of QAFI', item);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("ViewQAFI", { picData: item })}
        style={{width: wp(34), margin: 5, overflow:'hidden'}}
      >
        <View>
          <Image
            style={{
              position: "absolute",
              top: 0,
              left: 0,

              zIndex: 1, // Ensure it's on top of other elements
              //flex: 1,
              width: "100%",
              height: hp(12),
              borderRadius: wp(1),
              resizeMode: "cover",
            }}
            source={{ uri: item.image }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: hp(12),
            height: hp(7),
            width: wp(25),
          }}
        >
          {item?.userimage ? (
            <View
              style={{
                width: wp(7),
                marginLeft: wp(0.5),
                height: wp(7),
                overflow: "hidden",
                borderRadius: wp(7) / 2,
              }}
            >
              <Image
                source={{ uri: item?.userimage }}
                style={{ width: "100%", height: "100%", resizeMode: "cover" }}
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
    
          <View style={{ marginLeft: wp(1) }}>
            <NonVerified />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderAvailableAppsDiscGEBC = (item) => {
    //   console.log('Items of GEBC', item);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("ViewGEBC", { picData: item })}
        style={{width: wp(34), margin: 5, overflow:'hidden'}}
      >
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            height: hp(10),
            borderRadius: wp(1),
            resizeMode: "stretch",
            borderWidth: 1, // Border width
            borderColor: "grey", // Border color
          }}
        >
          <Text style={{ fontSize: hp(5) }}>{item.image}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: hp(1),
            height: hp(7),
            width: wp(25),
          }}
        >
          {item?.userimage ? (
            <View
              style={{
                width: wp(7),
                marginLeft: wp(0.5),
                height: wp(7),
                overflow: "hidden",
                borderRadius: wp(7) / 2,
              }}
            >
              <Image
                source={{ uri: item?.userimage }}
                style={{ width: "100%", height: "100%", resizeMode: "cover" }}
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
          <View style={{ marginLeft: wp(1) }}>
            <NonVerified />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const renderDiscSearches = (item) => {
    // console.log('Items id', item.id);
    const isSelected = selectedItemDiscId === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.searchesDetailsDisc,
          {
            // backgroundColor: isSelected ? "#FACA4E" : "#F2F2F2",
            backgroundColor: isSelected ? "#FACA4E" : "#DDDDDD",
          },
        ]}
        onPress={() => {
          setSelectedItemDiscId(item.id);
          // console.log("Selected Disc item:", item.id);
        }}
        // onPress={() => {
        //   setSelectedItemDiscId(item.id);
        //   console.log("Selected item:", item.id);
        //   if (item.id === 1) {
        //     setSelectedItemDiscId(1);
        //     // fetchNews();
        //     // navigation.navigate('ViewAllCategoriesDashboard');
        //     console.log("Fetch News screen item");
        //   } else if (item.id === 2) {
        //     setSelectedItemDiscId(2);
        //     fetchLetterPublicGeneral();
        //     console.log("On Letter id", item.id);
        //   } else if (item.id === 3) {
        //     setSelectedItemDiscId(3);
        //     fetchQAFI();
        //     console.log("On QAFI", item.id);
        //     // navigation.navigate('ViewAllCategoriesQAFIDashboard');
        //   } else if (item.id === 4) {
        //     setSelectedItemDiscId(4);
        //     fetchGEBC();
        //     console.log("On GEBS", item.id);
        //     // navigation.navigate('ViewAllCategoriesGEBCDashboard');
        //   }
        // }}
      >
        <Text
          style={[
            styles.textSearchDetails,
            { color: isSelected ? "#232323" : "#939393" },
          ]}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const DiscScreen = () => {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{ marginTop: hp(1.5), flexDirection: "row", height: hp(18) }}
        >
          <View
            style={{ marginTop: hp(1.5), flexDirection: "row", height: hp(18) }}
         >
            <TouchableOpacity onPress={() => navigation.navigate('ViewNews',{
                News: data[6]
              })}>
            {data[6] === undefined || data[6]?.length === 0 || data[6]?.image === undefined || data[6]?.image === null || data[6]?.image === '' || data[6]?.image === '0'  ? (
              <View
                //onPress={() => navigation.navigate('News')}
                style={{ width: wp(35), height: "100%", borderRadius: wp(5) }}
              >
                <Image
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1, // Ensure it's on top of other elements
                    //flex: 1,
                    width: "100%",
                    height: "100%",
                    borderRadius: wp(3),
                    resizeMode: "cover",
                  }}
                  source={appImages.galleryPlaceHolder}
                />
              </View>
            ) : (
              <View
                //onPress={() => navigation.navigate('News')}
                style={{ width: wp(35), height: "100%", borderRadius: wp(5) }}
              >
                {loading[6] && (
                  <ActivityIndicator size="large" color="#FACA4E" />
                )}
                {!loading[6] && data[6] && (
                  <View>
                    <FlatList
                      data={data[6]}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      horizontal
                      keyExtractor={(item, idx) => idx.toString()}
                      renderItem={({ item }) => {
                        return (
                          <Image
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,

                              zIndex: 1, // Ensure it's on top of other elements
                              //flex: 1,
                              width: "100%",
                              height: "100%",
                              borderRadius: wp(3),
                              resizeMode: "cover",
                            }}
                            source={{ uri: item.image }}
                          />
                        );
                      }}
                    />
                  </View>
                )}
              </View>
            )}
            </TouchableOpacity>

            <View style={{ justifyContent: "center", flex: 1 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: hp(7),
                  width: wp(35),
                }}
              >
                <Text
                  style={{
                    fontSize: hp(1.5),
                    marginLeft: wp(2.5),
                    fontFamily: "Inter-Regular",
                    color: "#000000",
                  }}
                >
                  {data[6] === undefined || data[6].length === 0
                    ? "Does not contain any top news"
                    : data[6]?.description}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ marginTop: hp(2), height: hp(23) }}>
          <View style={{ marginTop: hp(1), height: "100%" }}>
            {loading[7] ? (
              <ActivityIndicator size="large" color="#FACA4E" />
            ) : (
              <>
                {data[7]?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                      No data available
                    </Text>
                  </View>
                ) : (
                  <View>
                    <FlatList
                      data={data[7]}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      horizontal
                      keyExtractor={(item, idx) => idx.toString()}
                      renderItem={({ item }) => renderAvailableDiscApps(item)}
                    />
                  </View>
                )}
              </>
            )}
          </View>
        </View>

        <View style={{ height: hp(23) }}>
          <View style={{ marginTop: hp(1), height: "100%" }}>
            {loading[7] ? (
              <ActivityIndicator size="large" color="#FACA4E" />
            ) : (
              <>
                {data[7]?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                      No data available
                    </Text>
                  </View>
                ) : (
                  <View>
                    <FlatList
                      data={data[7]}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      horizontal
                      keyExtractor={(item, idx) => idx.toString()}
                      renderItem={({ item }) => renderAvailableDiscApps(item)}
                    />
                  </View>
                )}
              </>
            )}
          </View>
        </View>

        <View style={{ height: hp(23) }}>
          <View style={{ marginTop: hp(1), height: "100%" }}>
            {loading[7] ? (
              <ActivityIndicator size="large" color="#FACA4E" />
            ) : (
              <>
                {data[7]?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                      No data available
                    </Text>
                  </View>
                ) : (
                  <View>
                    <FlatList
                      data={data[7]}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      horizontal
                      keyExtractor={(item, idx) => idx.toString()}
                      renderItem={({ item }) => renderAvailableDiscApps(item)}
                    />
                  </View>
                )}
              </>
            )}
          </View>
        </View>

        <View style={{ height: hp(23) }}>
          <View style={{ marginTop: hp(1), height: "100%" }}>
            {loading[7] ? (
              <ActivityIndicator size="large" color="#FACA4E" />
            ) : (
              <>
                {data[7]?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                      No data available
                    </Text>
                  </View>
                ) : (
                  <View>
                    <FlatList
                      data={data[7]}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      horizontal
                      keyExtractor={(item, idx) => idx.toString()}
                      renderItem={({ item }) => renderAvailableDiscApps(item)}
                    />
                  </View>
                )}
              </>
            )}
          </View>
        </View>
      </View>
    );
  };

  const OpenLetters = () => {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{ marginTop: hp(1.5), flexDirection: "row", height: hp(18) }}
        >
              <TouchableOpacity onPress={() => navigation.navigate('ViewNews',{
                News: data[6]
              })}>
          {data[6] === undefined || data[6]?.length === 0 ? (
            <View
              //onPress={() => navigation.navigate('News')}
              style={{ width: wp(35), height: "100%", borderRadius: wp(5) }}
            >
              <Image
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 1, // Ensure it's on top of other elements
                  //flex: 1,
                  width: "100%",
                  height: "100%",
                  borderRadius: wp(3),
                  resizeMode: "cover",
                }}
                source={appImages.galleryPlaceHolder}
              />
            </View>
          ) : (
            <View
              //onPress={() => navigation.navigate('News')}
              style={{ width: wp(35), height: "100%", borderRadius: wp(5) }}
            >
              <Image
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,

                  zIndex: 1, // Ensure it's on top of other elements
                  //flex: 1,
                  width: "100%",
                  height: "100%",
                  borderRadius: wp(3),
                  resizeMode: "cover",
                }}
                source={appImages.galleryPlaceHolder}
              />
            </View>
          )}
</TouchableOpacity>
          <View style={{ justifyContent: "center", flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: hp(7),
                width: wp(35),
              }}
            >
              <Text
                style={{
                  fontSize: hp(1.5),
                  marginLeft: wp(2.5),
                  fontFamily: "Inter-Regular",
                  color: "#000000",
                }}
              >
                {data[6] === undefined || data[6].length === 0
                  ? "Does not contain any top news"
                  : data[6]?.description}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ height: hp(21) }}>
          <Text
            style={{ color: "#4A4A4A", fontWeight: "bold", fontSize: hp(2) }}
          >
            Public (general)
          </Text>
          {loading[20] && <ActivityIndicator size="large" color="#FACA4E" />}
          {!loading[20] && data[20] && (
            <FlatList
              data={data[20]}
              style={{ flex: 1 }}
              contentContainerStyle={{ alignItems: "center" }}
              showsHorizontalScrollIndicator={false}
              horizontal
              keyExtractor={(item, idx) => idx.toString()}
              renderItem={({ item }) => renderPublicGeneral(item)}
            />
          )}
        </View>

        <View style={{ marginTop: hp(5), height: hp(21) }}>
          <Text
            style={{ color: "#4A4A4A", fontWeight: "bold", fontSize: hp(2) }}
          >
            Public (to authorities, celebrities, leaders)
          </Text>
          {loading[23] && <ActivityIndicator size="large" color="#FACA4E" />}
          {!loading[23] && data[23] && (
            <FlatList
              data={data[23]}
              style={{ flex: 1 }}
              contentContainerStyle={{ alignItems: "center" }}
              showsHorizontalScrollIndicator={false}
              horizontal
              keyExtractor={(item, idx) => idx.toString()}
              renderItem={({ item }) => renderPublicGeneral(item)}
            />
          )}
        </View>

        <View style={{ marginTop: hp(5), height: hp(21) }}>
          <Text
            style={{ color: "#4A4A4A", fontWeight: "bold", fontSize: hp(2) }}
          >
            Private (to friends, peers, followers)
          </Text>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
              No data available
            </Text>
          </View>
        </View>

        <View style={{ marginTop: hp(5), height: hp(21) }}>
          <Text
            style={{ color: "#4A4A4A", fontWeight: "bold", fontSize: hp(2) }}
          >
            Private (to authorities, celebrities, leaders){" "}
          </Text>

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
              No data available
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const QAFI = () => {
    //   console.log('Came to QAFI');
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{ marginTop: hp(1.5), flexDirection: "row", height: hp(18) }}
        >
           <TouchableOpacity onPress={() => navigation.navigate('ViewNews',{
                News: data[6]
              })}>
           {data[6] === undefined || data[6]?.length === 0 || data[6]?.image === undefined || data[6]?.image === null || data[6]?.image === '' || data[6]?.image === '0'  ? (
            <View
              //onPress={() => navigation.navigate('News')}
              style={{ width: wp(35), height: "100%", borderRadius: wp(5) }}
            >
              <Image
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 1, // Ensure it's on top of other elements
                  //flex: 1,
                  width: "100%",
                  height: "100%",
                  borderRadius: wp(3),
                  resizeMode: "cover",
                }}
                source={appImages.galleryPlaceHolder}
              />
            </View>
          ) : (
            <View
              //onPress={() => navigation.navigate('News')}
              style={{ width: wp(35), height: "100%", borderRadius: wp(5) }}
            >
              {loading[6] && <ActivityIndicator size="large" color="#FACA4E" />}
              {!loading[6] && data[6] && (
                <View>
                  <FlatList
                    data={data[6]}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    keyExtractor={(item, idx) => idx.toString()}
                    renderItem={({ item }) => {
                      return (
                        <Image
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,

                            zIndex: 1, // Ensure it's on top of other elements
                            //flex: 1,
                            width: "100%",
                            height: "100%",
                            borderRadius: wp(3),
                            resizeMode: "cover",
                          }}
                          source={{ uri: item.image }}
                        />
                      );
                    }}
                  />
                </View>
              )}
            </View>
          )}
</TouchableOpacity>
          <View style={{ justifyContent: "center", flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: hp(7),
                width: wp(35),
              }}
            >
              <Text
                style={{
                  fontSize: hp(1.5),
                  marginLeft: wp(2.5),
                  fontFamily: "Inter-Regular",
                  color: "#000000",
                }}
              >
                {data[6] === undefined || data[6].length === 0
                  ? "Does not contain any top news"
                  : data[6]?.description}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ marginTop: hp(2), height: hp(23) }}>
          <View style={{ marginTop: hp(1), height: "100%" }}>
            {loading[24] ? (
              <ActivityIndicator size="large" color="#FACA4E" />
            ) : (
              <>
                {data[24]?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                      No data available
                    </Text>
                  </View>
                ) : (
                  <View>
                    <FlatList
                      data={data[24]}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      horizontal
                      keyExtractor={(item, idx) => idx.toString()}
                      renderItem={({ item }) => renderAvailableAppsQAFI(item)}
                    />
                  </View>
                )}
              </>
            )}
          </View>
        </View>

        <View style={{ height: hp(23) }}>
          <View style={{ marginTop: hp(1), height: "100%" }}>
            {loading[24] ? (
              <ActivityIndicator size="large" color="#FACA4E" />
            ) : (
              <>
                {data[24]?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                      No data available
                    </Text>
                  </View>
                ) : (
                  <View>
                    <FlatList
                      data={data[24]}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      horizontal
                      keyExtractor={(item, idx) => idx.toString()}
                      renderItem={({ item }) => renderAvailableAppsQAFI(item)}
                    />
                  </View>
                )}
              </>
            )}
          </View>
        </View>

        <View style={{ height: hp(23) }}>
          <View style={{ marginTop: hp(1), height: "100%" }}>
            {loading[24] ? (
              <ActivityIndicator size="large" color="#FACA4E" />
            ) : (
              <>
                {data[24]?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                      No data available
                    </Text>
                  </View>
                ) : (
                  <View>
                    <FlatList
                      data={data[24]}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      horizontal
                      keyExtractor={(item, idx) => idx.toString()}
                      renderItem={({ item }) => renderAvailableAppsQAFI(item)}
                    />
                  </View>
                )}
              </>
            )}
          </View>
        </View>

        <View style={{ height: hp(23) }}>
          <View style={{ marginTop: hp(1), height: "100%" }}>
            {loading[24] ? (
              <ActivityIndicator size="large" color="#FACA4E" />
            ) : (
              <>
                {data[24]?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                      No data available
                    </Text>
                  </View>
                ) : (
                  <View>
                    <FlatList
                      data={data[24]}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      horizontal
                      keyExtractor={(item, idx) => idx.toString()}
                      renderItem={({ item }) => renderAvailableAppsQAFI(item)}
                    />
                  </View>
                )}
              </>
            )}
          </View>
        </View>
      </View>
    );
  };

  const GEBC = () => {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{ marginTop: hp(1.5), flexDirection: "row", height: hp(18) }}
        >
          <View
            style={{ marginTop: hp(1.5), flexDirection: "row", height: hp(18) }}
          >
               <TouchableOpacity onPress={() => navigation.navigate('ViewNews',{
                News: data[6]
              })}>
           {data[6] === undefined || data[6]?.length === 0 || data[6]?.image === undefined || data[6]?.image === null || data[6]?.image === '' || data[6]?.image === '0'  ? (
              <View
                //onPress={() => navigation.navigate('News')}
                style={{ width: wp(35), height: "100%", borderRadius: wp(5) }}
              >
                <Image
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1, // Ensure it's on top of other elements
                    //flex: 1,
                    width: "100%",
                    height: "100%",
                    borderRadius: wp(3),
                    resizeMode: "cover",
                  }}
                  source={appImages.galleryPlaceHolder}
                />
              </View>
            ) : (
              <View
                //onPress={() => navigation.navigate('News')}
                style={{ width: wp(35), height: "100%", borderRadius: wp(5) }}
              >
                {loading[6] && (
                  <ActivityIndicator size="large" color="#FACA4E" />
                )}
                {!loading[6] && data[6] && (
                  <View>
                    <FlatList
                      data={data[6]}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      horizontal
                      keyExtractor={(item, idx) => idx.toString()}
                      renderItem={({ item }) => {
                        return (
                          <Image
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,

                              zIndex: 1, // Ensure it's on top of other elements
                              //flex: 1,
                              width: "100%",
                              height: "100%",
                              borderRadius: wp(3),
                              resizeMode: "cover",
                            }}
                            source={{ uri: item.image }}
                          />
                        );
                      }}
                    />
                  </View>
                )}
              </View>
            )}
</TouchableOpacity>
            <View style={{ justifyContent: "center", flex: 1 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: hp(7),
                  width: wp(35),
                }}
              >
                <Text
                  style={{
                    fontSize: hp(1.5),
                    marginLeft: wp(2.5),
                    fontFamily: "Inter-Regular",
                    color: "#000000",
                  }}
                >
                  {data[6] === undefined || data[6].length === 0
                    ? "Does not contain any top news"
                    : data[6]?.description}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ marginTop: hp(2), height: hp(23) }}>
          <View style={{ marginTop: hp(1), height: "100%" }}>
            {loading[25] ? (
              <ActivityIndicator size="large" color="#FACA4E" />
            ) : (
              <>
                {data[25]?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                      No data available
                    </Text>
                  </View>
                ) : (
                  <View>
                    <FlatList
                      data={data[25]}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      horizontal
                      keyExtractor={(item, idx) => idx.toString()}
                      renderItem={({ item }) =>
                        renderAvailableAppsDiscGEBC(item)
                      }
                    />
                  </View>
                )}
              </>
            )}
          </View>
        </View>
        <View style={{ marginTop: hp(2), height: hp(23) }}>
          <View style={{ marginTop: hp(1), height: "100%" }}>
            {loading[25] ? (
              <ActivityIndicator size="large" color="#FACA4E" />
            ) : (
              <>
                {data[25]?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                      No data available
                    </Text>
                  </View>
                ) : (
                  <View>
                    <FlatList
                      data={data[25]}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      horizontal
                      keyExtractor={(item, idx) => idx.toString()}
                      renderItem={({ item }) =>
                        renderAvailableAppsDiscGEBC(item)
                      }
                    />
                  </View>
                )}
              </>
            )}
          </View>
        </View>

        <View style={{ marginTop: hp(2), height: hp(23) }}>
          <View style={{ marginTop: hp(1), height: "100%" }}>
            {loading[25] ? (
              <ActivityIndicator size="large" color="#FACA4E" />
            ) : (
              <>
                {data[25]?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                      No data available
                    </Text>
                  </View>
                ) : (
                  <View>
                    <FlatList
                      data={data[25]}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      horizontal
                      keyExtractor={(item, idx) => idx.toString()}
                      renderItem={({ item }) =>
                        renderAvailableAppsDiscGEBC(item)
                      }
                    />
                  </View>
                )}
              </>
            )}
          </View>
        </View>

        <View style={{ marginTop: hp(2), height: hp(23) }}>
          <View style={{ marginTop: hp(1), height: "100%" }}>
            {loading[25] ? (
              <ActivityIndicator size="large" color="#FACA4E" />
            ) : (
              <>
                {data[25]?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                      No data available
                    </Text>
                  </View>
                ) : (
                  <View>
                    <FlatList
                      data={data[25]}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      horizontal
                      keyExtractor={(item, idx) => idx.toString()}
                      renderItem={({ item }) =>
                        renderAvailableAppsDiscGEBC(item)
                      }
                    />
                  </View>
                )}
              </>
            )}
          </View>
        </View>
      </View>
    );
  };

  //////Pics Start
  const renderAvailableAppsPics = (item) => {
    //   console.log('Items of Pics', item);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("PicDetails", { picData: item })}
        style={{ width: wp(27), margin: 5 }}
      >
        <View>
          {!item.image ||
          item.image === "undefined" ||
          item.image.startsWith("/") ? (
            <Image
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 1,
                width: "100%",
                height: hp(12),
                borderRadius: wp(1),
                resizeMode: "cover",
              }}
              source={appImages.galleryPlaceHolder}
            />
          ) : (
            <Image
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 1,
                width: "100%",
                height: hp(12),
                borderRadius: wp(1),
                resizeMode: "cover",
              }}
              source={{ uri: item.image }}
            />
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: wp(0.5),
            marginTop: hp(12.5),
          }}
        >
          <Text
            style={{
              fontSize: hp(1.5),
              fontFamily: "Inter-Regular",
              color: "#000000",
              width: wp(23),
            }}
          >
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  ///// Pics End
  // /////Market Start

  const renderAvailableAppsMarket = (item) => {
    // console.log("Items of market zone", item);
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProductDetails", { ProductDetails: item })
        }
        style={{ width: wp(25.5), margin: 5 }}
      >
        <View>
          {!item?.images[0]?.image ||
          item?.images[0]?.image === "undefined" ||
          item?.images[0]?.image.startsWith("/") ? (
            <Image
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 1,
                width: "100%",
                height: hp(12),
                borderRadius: wp(1),
                resizeMode: "cover",
              }}
              source={appImages.galleryPlaceHolder}
            />
          ) : (
            <Image
              style={{
                position: "absolute",
                top: 0,
                left: 0,

                zIndex: 1,
                width: "100%",
                height: hp(16),
                borderRadius: wp(2.5),
                resizeMode: "cover",
              }}
              source={{ uri: item?.images[0]?.image }}
            />
          )}
        </View>

        <View
          style={{
            position: "absolute",
            top: hp(12),
            left: 7,
            //height: hp(3),
            //width: wp(21),
            //borderRadius: wp(3),
            //backgroundColor: '#FACA4E',
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2, // Ensure it's on top
          }}
        >
          <Text
            style={{
              fontSize: hp(1.7),
              fontFamily: "Inter",
              color: "black",
              fontWeight: "700",
            }}
          >
            {item?.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSearchesMarket = (item) => {
    // console.log('Regions item', item);
    const isSelected = selectedItemIdMarket === item;

    return (
      <TouchableOpacity
        style={[
          styles.searchesDetails,
          {
            // backgroundColor: isSelected ? "#FACA4E" : "#F2F2F2",
            backgroundColor: isSelected ? "#FACA4E" : "#DDDDDD",
          },
        ]}
        onPress={() => {
          setSelectedItemIdMarket(item);
          console.log("Selected item:", item);
        }}
      >
        <Text
          style={[
            styles.textSearchDetails,
            { color: isSelected ? "#232323" : "#939393" },
          ]}
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  };
  //Your FlatList rendering the search ite
  /////////////////////////////////////////////////////////////////////////////////////////////////
  const renderAppsFav = (item) => {
    const isSelected = selectedApps.includes(item);

    const handleAppPress = () => {
      setSelectedApps((selected) => {
        if (selected.includes(item)) {
          return selected.filter((app) => app !== item);
        } else {
          return [...selected, item];
        }
      });
    };

    return (
      <TouchableOpacity
        onPress={handleAppPress}
        style={[styles.items, isSelected && styles.selectedItem]}
      >
        {isSelected && (
          <Ionicons name="checkmark-circle" size={15} color="green" />
        )}
        <Image
          style={{ width: 43, height: 43 }}
          source={{ uri: `data:image/png;base64,${item?.image}` }}
        />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              color: "#000000",
              textAlign: "center",
              fontSize: hp(1.2),
              fontWeight: "bold",
            }}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {item?.label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const renderAppsFav_b = (item) => {
    const isSelected = selectedApps_b.includes(item);

    const handleAppPress = () => {
      setSelectedApps_b((selected) => {
        if (selected.includes(item)) {
          return selected.filter((app) => app !== item);
        } else {
          return [...selected, item];
        }
      });
    };

    return (
      <TouchableOpacity
        onPress={handleAppPress}
        style={[styles.items, isSelected && styles.selectedItem]}
      >
        {isSelected && (
          <Ionicons name="checkmark-circle" size={15} color="green" />
        )}
        <Image
          style={{ width: 43, height: 43 }}
          source={{ uri: `data:image/png;base64,${item?.image}` }}
        />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              color: "#000000",
              textAlign: "center",
              fontSize: hp(1.2),
              fontWeight: "bold",
            }}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {item?.label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const renderAppsFav_sp = (item) => {
    const isSelected = selectedApps_sp.includes(item);

    const handleAppPress = () => {
      setSelectedApps_sp((selected) => {
        if (selected.includes(item)) {
          return selected.filter((app) => app !== item);
        } else {
          return [...selected, item];
        }
      });
    };

    return (
      <TouchableOpacity
        onPress={handleAppPress}
        style={[styles.items, isSelected && styles.selectedItem]}
      >
        {isSelected && (
          <Ionicons name="checkmark-circle" size={15} color="green" />
        )}
        <Image
          style={{ width: 43, height: 43 }}
          source={{ uri: `data:image/png;base64,${item?.image}` }}
        />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              color: "#000000",
              textAlign: "center",
              fontSize: hp(1.2),
              fontWeight: "bold",
            }}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {item?.label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const renderAppsFav_e = (item) => {
    const isSelected = selectedApps_e.includes(item);

    const handleAppPress = () => {
      setSelectedApps_e((selected) => {
        if (selected.includes(item)) {
          return selected.filter((app) => app !== item);
        } else {
          return [...selected, item];
        }
      });
    };

    return (
      <TouchableOpacity
        onPress={handleAppPress}
        style={[styles.items, isSelected && styles.selectedItem]}
      >
        {isSelected && (
          <Ionicons name="checkmark-circle" size={15} color="green" />
        )}
        <Image
          style={{ width: 43, height: 43 }}
          source={{ uri: `data:image/png;base64,${item?.image}` }}
        />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              color: "#000000",
              textAlign: "center",
              fontSize: hp(1.2),
              fontWeight: "bold",
            }}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {item?.label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const renderAppsFav_d = (item) => {
    const isSelected = selectedApps_d.includes(item);

    const handleAppPress = () => {
      setSelectedApps_d((selected) => {
        if (selected.includes(item)) {
          return selected.filter((app) => app !== item);
        } else {
          return [...selected, item];
        }
      });
    };

    return (
      <TouchableOpacity
        onPress={handleAppPress}
        style={[styles.items, isSelected && styles.selectedItem]}
      >
        {isSelected && (
          <Ionicons name="checkmark-circle" size={15} color="green" />
        )}
        <Image
          style={{ width: 43, height: 43 }}
          source={{ uri: `data:image/png;base64,${item?.image}` }}
        />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              color: "#000000",
              textAlign: "center",
              fontSize: hp(1.2),
              fontWeight: "bold",
            }}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {item?.label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const renderAppsFav_fd = (item) => {
    const isSelected = selectedApps_fd.includes(item);

    const handleAppPress = () => {
      setSelectedApps_fd((selected) => {
        if (selected.includes(item)) {
          return selected.filter((app) => app !== item);
        } else {
          return [...selected, item];
        }
      });
    };

    return (
      <TouchableOpacity
        onPress={handleAppPress}
        style={[styles.items, isSelected && styles.selectedItem]}
      >
        {isSelected && (
          <Ionicons name="checkmark-circle" size={15} color="green" />
        )}
        <Image
          style={{ width: 43, height: 43 }}
          source={{ uri: `data:image/png;base64,${item?.image}` }}
        />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              color: "#000000",
              textAlign: "center",
              fontSize: hp(1.2),
              fontWeight: "bold",
            }}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {item?.label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const renderAppsFav_sm = (item) => {
    const isSelected = selectedApps_sm.includes(item);

    const handleAppPress = () => {
      setSelectedApps_sm((selected) => {
        if (selected.includes(item)) {
          return selected.filter((app) => app !== item);
        } else {
          return [...selected, item];
        }
      });
    };

    return (
      <TouchableOpacity
        onPress={handleAppPress}
        style={[styles.items, isSelected && styles.selectedItem]}
      >
        {isSelected && (
          <Ionicons name="checkmark-circle" size={15} color="green" />
        )}
        <Image
          style={{ width: 43, height: 43 }}
          source={{ uri: `data:image/png;base64,${item?.image}` }}
        />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              color: "#000000",
              textAlign: "center",
              fontSize: hp(1.2),
              fontWeight: "bold",
            }}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {item?.label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const renderAppsFav_mw = (item) => {
    const isSelected = selectedApps_mw.includes(item);

    const handleAppPress = () => {
      setSelectedApps_mw((selected) => {
        if (selected.includes(item)) {
          return selected.filter((app) => app !== item);
        } else {
          return [...selected, item];
        }
      });
    };

    return (
      <TouchableOpacity
        onPress={handleAppPress}
        style={[styles.items, isSelected && styles.selectedItem]}
      >
        {isSelected && (
          <Ionicons name="checkmark-circle" size={15} color="green" />
        )}
        <Image
          style={{ width: 43, height: 43 }}
          source={{ uri: `data:image/png;base64,${item?.image}` }}
        />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              color: "#000000",
              textAlign: "center",
              fontSize: hp(1.2),
              fontWeight: "bold",
            }}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {item?.label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const renderAppsFav_g = (item) => {
    const isSelected = selectedApps_g.includes(item);

    const handleAppPress = () => {
      setSelectedApps_g((selected) => {
        if (selected.includes(item)) {
          return selected.filter((app) => app !== item);
        } else {
          return [...selected, item];
        }
      });
    };

    return (
      <TouchableOpacity
        onPress={handleAppPress}
        style={[styles.items, isSelected && styles.selectedItem]}
      >
        {isSelected && (
          <Ionicons name="checkmark-circle" size={15} color="green" />
        )}
        <Image
          style={{ width: 43, height: 43 }}
          source={{ uri: `data:image/png;base64,${item?.image}` }}
        />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              color: "#000000",
              textAlign: "center",
              fontSize: hp(1.2),
              fontWeight: "bold",
            }}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {item?.label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const renderAppsFav_em = (item) => {
    const isSelected = selectedApps_em.includes(item);

    const handleAppPress = () => {
      setSelectedApps_em((selected) => {
        if (selected.includes(item)) {
          return selected.filter((app) => app !== item);
        } else {
          return [...selected, item];
        }
      });
    };

    return (
      <TouchableOpacity
        onPress={handleAppPress}
        style={[styles.items, isSelected && styles.selectedItem]}
      >
        {isSelected && (
          <Ionicons name="checkmark-circle" size={15} color="green" />
        )}
        <Image
          style={{ width: 43, height: 43 }}
          source={{ uri: `data:image/png;base64,${item?.image}` }}
        />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              color: "#000000",
              textAlign: "center",
              fontSize: hp(1.2),
              fontWeight: "bold",
            }}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {item?.label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const renderFavouritesApps = (item) => {
    //console.log('item at first', item);
    const openApp = async (items) => {
      try {
        // Launch the application
        await RNLauncherKitHelper.launchApplication(item.bundle);

        // Check if the app is already in the topData array
        const appIndex = topData.findIndex((app) => app.bundle === item.bundle);

        if (appIndex !== -1) {
          // If the app is already in the array, update the count
          const updatedTopData = [...topData];
          updatedTopData[appIndex] = {
            ...updatedTopData[appIndex],
            count: updatedTopData[appIndex].count + 1,
          };

          setTopData(updatedTopData);
        } else {
          // If the app is not in the array, add it with count 1
          setTopData((prevData) => [
            ...prevData,
            {
              label: item.label,
              bundle: item.bundle,
              image: item.image,
              count: 1,
            },
          ]);
        }

        await RNLauncherKitHelper.launchApplication(items); // Assuming 'item.label' is the package name
      } catch (error) {
        console.error("Error opening the app:", error);
        await RNLauncherKitHelper.launchApplication(items); // Assuming 'item.label' is the package name
      }
    };

    return (
      <TouchableOpacity
        onLongPress={() => {
          setIsLongPressRemove(true);
          setIsCancelRemoveModalVisible(true);
          setRemoveFavouriteItem(item);
        }}
        //onPress={() => openApp(item?.bundle)}
        style={styles.items}
      >
        <Image
          style={{ width: 43, height: 43 }}
          source={{ uri: `data:image/png;base64,${item?.image}` }}
        />
        <Text
          style={{
            color: "#000000",
            textAlign: "center",
            fontSize: hp(1.2),
            fontWeight: "bold",
          }}
          ellipsizeMode="tail"
          numberOfLines={1}
        >
          {item?.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const loadSavedApps = async () => {
    try {
      const savedApps = await AsyncStorage.getItem("savedApps");
      if (savedApps) {
        console.log("saved apps in useeffect --------->", savedApps);
        setSavedApps(JSON.parse(savedApps));
      }
    } catch (error) {
      console.error("Error loading saved apps from AsyncStorage:", error);
    }
  };

  // Function to save selected apps to AsyncStorage
  const handleSave = async () => {
    try {
      // Retrieve the current array of saved apps from AsyncStorage
      const currentSavedApps = await AsyncStorage.getItem("savedApps");
      let updatedSavedApps = [];

      if (currentSavedApps) {
        updatedSavedApps = JSON.parse(currentSavedApps);
      }
      // Add the selected apps to the saved apps array
      updatedSavedApps.push(...selectedApps);
      // Save the updated array back to AsyncStorage
      await AsyncStorage.setItem("savedApps", JSON.stringify(updatedSavedApps));
      setSnackbarVisible(true);
      setModalVisible(false);
      // Update the state
      setSavedApps(updatedSavedApps);
      console.log("saved apps in handleSave --------->", updatedSavedApps);
    } catch (error) {
      console.error("Error saving selected apps to AsyncStorage:", error);
    }
  };

  const BusinessSavedApps = async () => {
    try {
      const savedApps = await AsyncStorage.getItem("savedApps_b");
      if (savedApps) {
        // console.log('saved apps in useeffect --------->', savedApps)
        setSavedApps_b(JSON.parse(savedApps));
      }
    } catch (error) {
      console.error("Error loading saved apps from AsyncStorage:", error);
    }
  };

  // Function to save selected apps to AsyncStorage
  const handleSave_b = async () => {
    try {
      // Retrieve the current array of saved apps from AsyncStorage
      const currentBusinessSavedApps = await AsyncStorage.getItem(
        "savedApps_b"
      );
      let updatedSavedApps = [];

      if (currentBusinessSavedApps) {
        updatedSavedApps = JSON.parse(currentBusinessSavedApps);
      }

      // Add the selected apps to the saved apps array
      updatedSavedApps.push(...selectedApps_b);

      // Save the updated array back to AsyncStorage
      await AsyncStorage.setItem(
        "savedApps_b",
        JSON.stringify(updatedSavedApps)
      );
      setSnackbarVisible(true);
      setModalVisible_b(false);
      // Update the state
      setSavedApps_b(updatedSavedApps);

      // console.log('saved apps in handleSave_b --------->', updatedSavedApps);
    } catch (error) {
      console.error("Error saving selected apps to AsyncStorage:", error);
    }
  };
  // console.log('total saved --------->', savedApps)
  // const handleSave = () => {
  //   setSavedApps(selectedApps);
  //   setSnackbarVisible(true);
  //   setModalVisible(false);
  // };
  // const handleSave_b = () => {
  //   setSavedApps_b(selectedApps_b);
  //   setSnackbarVisible(true);
  //   setModalVisible_b(false);
  // };
  const handleSave_sp = () => {
    setSavedApps_sp(selectedApps_sp);
    setSnackbarVisible(true);
    setModalVisible_sp(false);
  };
  const handleSave_e = () => {
    setSavedApps_e(selectedApps_e);
    setSnackbarVisible(true);
    setModalVisible_e(false);
  };
  const handleSave_d = () => {
    setSavedApps_d(selectedApps_d);
    setSnackbarVisible(true);
    setModalVisible_d(false);
  };
  const handleSave_fd = () => {
    setSavedApps_fd(selectedApps_fd);
    setSnackbarVisible(true);
    setModalVisible_fd(false);
  };
  const handleSave_sm = () => {
    setSavedApps_sm(selectedApps_sm);
    setSnackbarVisible(true);
    setModalVisible_sm(false);
  };
  const handleSave_mw = () => {
    setSavedApps_mw(selectedApps_mw);
    setSnackbarVisible(true);
    setModalVisible_mw(false);
  };
  const handleSave_g = () => {
    setSavedApps_g(selectedApps_g);
    setSnackbarVisible(true);
    setModalVisible_g(false);
  };
  const handleSave_em = () => {
    setSavedApps_em(selectedApps_em);
    setSnackbarVisible(true);
    setModalVisible_em(false);
  };

  const handleItemPress = (category) => {
    setSelectedItemId(category);
    setIsSelectedActive(false); ///
    setcategoryActive(false); ////ye old hai jis ko comment kiya tha
    setSelectedCategory(category);
    setecommerance(category === "E-commerce");
    setSport(category === "Sports");
  };

  const renderSearches = (item) => {
    const isSelected = selectedItemId === item;

    return (
      <TouchableOpacity
        style={[
          styles.searchesDetailsCategory,
          {
            backgroundColor: isSelected ? "#FACA4E" : "#DDDDDD",
          },
        ]}
        onPress={() => {
          // Pass the item data when pressed
          handleItemPress(item);
          if (item === "E-commerce") {
            // console.log("E----AYA:");
            loadSavedApps(); // Assuming handleItemPress is a function to handle item press
          } else if (item === "Business") {
            // console.log("Business----AYA:");
            BusinessSavedApps();
          } // Assuming handleItemPress is a function to handle item press
          // console.log("Selected item:", item);
        }}
      >
        <Text
          style={[
            styles.textSearchDetails,
            { color: isSelected ? "#232323" : "#939393" },
          ]}
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const press_category = () => {
    setIsSelectedActive(!isSelectedActive);
    setSelectedItemId(null); // Deactivate all items when category is pressed
    setSelectedCategory("");
    setecommerance(false);
    setSport(false);
    setcategoryActive(true); //ye old hai jis ko comment kiya tha
  };
  return (
    <View
      pointerEvents="auto"
      style={aLoader ? styles.containerBlur : styles.container}
    >
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <View style={{ marginTop: hp(5), width: "100%" }}>
        {/* {console.log("Navigation object:", navigation)} */}
        <Headers
          showListings={true}
          navigation={navigation}
          showLogo={true}
          onPressListings={() => navigation.openDrawer()}
          onPressProfile={() => navigation.navigate("ViewProfile")}
          showProfileImage={true}
        />
      </View>
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, marginHorizontal: wp(5) }}
      >
        <Modal
          transparent={true}
          animationType="fade"
          visible={isLongPress}
          onRequestClose={() => setIsLongPress(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                onPress={() => {
                  if (favouriteItem) {
                    const isItemInFavourites = favouriteData.some(
                      (item) => item.bundle === favouriteItem.bundle
                    );

                    if (isItemInFavourites) {
                      console.log("Item is already in favourites");
                    } else {
                      setFavouriteData((prevData) => [
                        ...prevData,
                        favouriteItem,
                      ]);
                      console.log(
                        "Add to Favorites pressed for:",
                        favouriteItem.label
                      );
                    }

                    setIsLongPress(false);
                  }
                }}
                style={styles.overlayButton}
              >
                <Text style={{ color: "white" }}>Add to Favorites</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (favouriteItem) {
                    const updatedInstallData = dataApps.filter(
                      (item) => item.bundle !== favouriteItem.bundle
                    );
                    setDataApps(updatedInstallData);
                    setIsCancelModalVisible(false);
                    setIsLongPress(false);
                  }
                }}
                style={styles.overlayButton}
              >
                <Text style={{ color: "white" }}>
                  Remove From Wotcha Gotcha App
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {isCancelModalVisible && (
            <TouchableOpacity
              onPress={() => closeRequestModal()}
              style={styles.modalContentCross}
            >
              <Entypo name={"cross"} size={18} color={"black"} />
            </TouchableOpacity>
          )}
        </Modal>
        <Modal
          transparent={true}
          animationType="fade"
          visible={isLongPressRemove}
          onRequestClose={() => setIsLongPressRemove(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                onPress={() => {
                  if (removeFavouriteItem) {
                    // Check if the item already exists in favouriteData
                    const isItemInFavourites = favouriteData.some(
                      (item) => item.bundle === removeFavouriteItem.bundle
                    );

                    console.log("Favourite Item", isItemInFavourites);

                    if (isItemInFavourites) {
                      // Item already exists, remove it from favouriteData
                      const updatedFavouriteData = favouriteData.filter(
                        (item) => item.bundle !== removeFavouriteItem.bundle
                      );
                      setFavouriteData(updatedFavouriteData);

                      console.log("Item removed from favourites");
                    } else {
                      // Item doesn't exist, add it to favouriteData
                      setFavouriteData((prevData) => [
                        ...prevData,
                        favouriteItem,
                      ]);
                      console.log("Add to Favorites pressed for:");
                    }

                    setIsLongPressRemove(false);
                  }
                }}
                style={styles.overlayButton}
              >
                <Text style={{ color: "white" }}>Remove Favorites</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  if (removeFavouriteItem) {
                    const updatedInstallData = dataApps.filter(
                      (item) => item.bundle !== removeFavouriteItem.bundle
                    );
                    setDataApps(updatedInstallData);
                    setIsCancelModalVisible(false);
                    setIsLongPressRemove(false);
                  } else {
                    setIsCancelModalVisible(false);
                    setIsLongPressRemove(false);
                  }
                }}
                style={styles.overlayButton}
              >
                <Text style={{ color: "white" }}>
                  Remove From Wotcha Gotcha App
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {isCancelRemoveModalVisible && (
            <TouchableOpacity
              onPress={() => closeRequestRemoveModal()}
              style={styles.modalContentCross}
            >
              <Entypo name={"cross"} size={18} color={"black"} />
            </TouchableOpacity>
          )}
        </Modal>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="dark-content"
        />

        <View style={{ marginTop: hp(1) }}></View>

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
            <TouchableOpacity
              key={item.id}
              onPress={() => Linking.openURL(item.banner_link)}
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
            </TouchableOpacity>
          )}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width * 0.9}
          loop={true}
          autoplay={true}
        />
      )}
    </View>
        {/* <View
          style={{
            alignItems: "center",
            height: hp(16),
            marginLeft: 8,
            marginVertical: hp(2),
          }}
        >
          {isLoading ? (
            <ActivityIndicator size="large" color="#FACA4E" />
          ) : adsData.length === 0 ? (
           <View style={styles.TopBannerView}>
            <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                        No Top Banner
                      </Text>
            </View>
          ) : (
            <Swiper autoplay={true} loop={true}>
              {adsData.map((banner) => (
                <View
                  key={banner.id}
                  style={{
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={{ uri: banner?.image }}
                    style={{
                      height: hp(15),
                      width: "100%",
                      borderWidth: 1,
                      resizeMode: "contain",
                      borderRadius: 10,
                    }}
                  />
                </View>
              ))}
            </Swiper>
          )}
        </View> */}
        {/* ////slider end */}

        {/* //////category ///////////////////////////////////////////////////////////////////////////*/}

        <View style={styles.latestSearchList}>
          <TouchableOpacity onPress={press_category}>
            {isSelectedActive ? (
              <CategoryActive width={23} height={23} />
            ) : (
              <CategoryInactive width={23} height={23} />
            )}
          </TouchableOpacity>

          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ alignItems: "center" }}
            showsHorizontalScrollIndicator={false}
            horizontal
            //data={regions}
            data={MassApp}
            // keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => renderSearches(item)}
          />
        </View>
        {categoryActive ? (
          <>
            <View
              style={{
                marginTop: hp(2),
                marginLeft: wp(-1),
                height: hp(23),
                width: wp(60),
              }}
            >
              {isLoading === true ? (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ActivityIndicator size="large" color="#FACA4E" />
                </View>
              ) : (
                <>
                  {topData?.length === 0 ? (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                        No Top Apps
                      </Text>
                    </View>
                  ) : (
                    <FlatList
                      style={{ margin: 8, flex: 1 }}
                      //contentContainerStyle={{marginBottom:hp(5)}}
                      showsVerticalScrollIndicator={false}
                      data={topData}
                      //keyExtractor={item => item.id.toString()}
                      numColumns={3} // Set the number of columns to 3
                      renderItem={({ item }) => renderAvailableApps(item)}
                    />
                  )}
                </>
              )}
            </View>

            <View style={{ marginTop: hp(-3), height: hp(25) }}>
              <Text
                style={{
                  fontSize: hp(2.3),
                  marginLeft: wp(3),
                  fontFamily: "Inter-Bold",
                  color: "#4A4A4A",
                  fontWeight: "bold",
                }}
              >
                Phone Based Apps
              </Text>

              {isLoading ? (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ActivityIndicator size="large" color="#FACA4E" />
                </View>
              ) : (
                <View style={{ flex: 1 }}>
                  <FlatList
                    data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, itemIndex) => `${itemIndex}`}
                    renderItem={({ item }) => renderApps(item)}
                    contentContainerStyle={{
                      borderWidth: 1,
                      marginRight: wp(2.3),
                      marginTop: hp(3),
                      borderColor: "#00000017",
                      borderRadius: wp(3),
                    }}
                  />

                  <FlatList
                    data={dataApps.slice(Math.ceil(dataApps.length / 2))}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, itemIndex) => `${itemIndex}`}
                    renderItem={({ item }) => renderApps(item)}
                    contentContainerStyle={{
                      borderWidth: 1,
                      marginRight: wp(2.3),
                      marginTop: hp(3),
                      borderColor: "#00000017",
                      borderRadius: wp(3),
                    }}
                  />
                </View>
              )}
            </View>

            <View style={{ height: hp(8), justifyContent: "center" }}>
              <View
                style={{
                  height: hp(7),
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  //borderWidth: 1,
                  marginHorizontal: wp(12),
                }}
              ></View>
            </View>

            <View style={{ marginTop: hp(-5), height: hp(28) }}>
              <Text
                style={{
                  fontSize: hp(2.3),
                  marginLeft: wp(3),
                  fontFamily: "Inter-Bold",
                  color: "#4A4A4A",
                  fontWeight: "bold",
                }}
              >
                Favourite Apps
              </Text>
              {isLoading ? (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ActivityIndicator size="large" color="#FACA4E" />
                </View>
              ) : (
                <>
                  {favouriteData?.length === 0 ? (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: hp(2.1),
                          justifyContent: "center",
                        }}
                      >
                        No Favourite Apps
                      </Text>
                    </View>
                  ) : (
                    <FlatList
                      data={favouriteData.slice(
                        0,
                        Math.ceil(favouriteData.length / 2)
                      )}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={(item, itemIndex) => `${itemIndex}`}
                      renderItem={({ item }) => renderFavouritesApps(item)}
                      contentContainerStyle={{
                        borderWidth: 1,
                        marginRight: wp(2.3),
                        marginTop: hp(3),
                        borderColor: "#00000017",
                        borderRadius: wp(3),
                      }}
                    />
                  )}
                  <FlatList
                    data={favouriteData.slice(
                      Math.ceil(favouriteData.length / 2)
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, itemIndex) => `${itemIndex}`}
                    renderItem={({ item }) => renderFavouritesApps(item)}
                    contentContainerStyle={{
                      borderWidth: 1,
                      marginRight: wp(2.3),
                      marginTop: hp(3),
                      borderColor: "#00000017",
                      borderRadius: wp(3),
                    }}
                  />
                </>
              )}
            </View>

            <View
              style={{ marginTop: hp(1), marginBottom: hp(5), height: hp(25) }}
            >
              <Text
                style={{
                  fontSize: hp(2.3),
                  marginLeft: wp(3),
                  fontFamily: "Inter-Bold",
                  color: "#4A4A4A",
                  fontWeight: "bold",
                }}
              >
                Unused Apps
              </Text>

              {isLoading ? (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ActivityIndicator size="large" color="#FACA4E" />
                </View>
              ) : (
                <View style={{ flex: 1 }}>
                  <FlatList
                    data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, itemIndex) => `${itemIndex}`}
                    renderItem={({ item }) => renderApps(item)}
                    contentContainerStyle={{
                      borderWidth: 1,
                      marginRight: wp(2.3),
                      marginTop: hp(3),
                      borderColor: "#00000017",
                      borderRadius: wp(3),
                    }}
                  />

                  <FlatList
                    data={dataApps.slice(Math.ceil(dataApps.length / 2))}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, itemIndex) => `${itemIndex}`}
                    renderItem={({ item }) => renderApps(item)}
                    contentContainerStyle={{
                      borderWidth: 1,
                      marginRight: wp(2.3),
                      marginTop: hp(3),
                      borderColor: "#00000017",
                      borderRadius: wp(3),
                    }}
                  />
                </View>
              )}
            </View>
          </>
        ) : (
          <>
            {ecommerance && selectedCategory === "E-commerce" && (
              <>
                <View
                  style={{ flex: 1, height: containerHeight, width: "100%" }}
                >
                  {savedApps.length > 0 ? (
                    <>
                      <View style={{ flex: 1 }}>
                        <ScrollView>
                          {Array.from({
                            length: Math.ceil(savedApps.length / 5),
                          }).map((_, rowIndex) => (
                            <ScrollView showsHorizontalScrollIndicator={true}>
                              <View
                                key={rowIndex}
                                style={{
                                  flexDirection: "row",
                                  marginBottom: 10,
                                  margin: "2%",
                                }}
                              >
                                {savedApps
                                  .slice(rowIndex * 5, (rowIndex + 1) * 5)
                                  .map((app, index) => (
                                    <View
                                      key={index}
                                      style={{
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginTop: 10,
                                        marginRight: 6,
                                      }}
                                    >
                                      <Image
                                        style={{
                                          width: 40,
                                          height: 40,
                                          marginBottom: 5,
                                          margin: "3%",
                                        }}
                                        source={{
                                          uri: `data:image/png;base64,${app.image}`,
                                        }}
                                      />
                                      <Text
                                        style={{
                                          color: "black",
                                          fontSize: wp(2.5),
                                        }}
                                      >
                                        {app.label.substring(0, 10)}
                                      </Text>
                                    </View>
                                  ))}
                                {[
                                  ...Array(
                                    Math.max(0, 5 - (savedApps.length % 5))
                                  ),
                                ].map((_, index) => (
                                  <View
                                    key={index}
                                    style={{
                                      width: 30,
                                      height: 30,
                                      marginRight: 10,
                                    }}
                                  />
                                ))}
                              </View>
                            </ScrollView>
                          ))}
                        </ScrollView>
                      </View>
                    </>
                  ) : (
                    <>
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            color: "grey",
                            fontSize: wp(3.5),
                            textAlign: "center",
                            top: "40%",
                          }}
                        >
                          Your can add E-commernce apps here
                        </Text>
                      </View>
                    </>
                  )}
                  <View style={{ position: "absolute", top: "80%", right: 10 }}>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                      <Add />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}

            {selectedCategory === "Business" && (
              <>
                <View
                  style={{ flex: 1, height: containerHeight, width: "100%" }}
                >
                  {savedApps_b.length > 0 ? (
                    <View style={{ flex: 1 }}>
                      <ScrollView>
                        {Array.from({
                          length: Math.ceil(savedApps_b.length / 5),
                        }).map((_, rowIndex) => (
                          <View
                            key={rowIndex}
                            style={{
                              flexDirection: "row",
                              marginBottom: 10,
                              margin: "2%",
                            }}
                          >
                            {savedApps_b
                              .slice(rowIndex * 5, (rowIndex + 1) * 5)
                              .map((app, index) => (
                                <View
                                  key={index}
                                  style={{
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: 10,
                                    marginRight: 6,
                                  }}
                                >
                                  <Image
                                    style={{
                                      width: 40,
                                      height: 40,
                                      marginBottom: 5,
                                      margin: "3%",
                                    }}
                                    source={{
                                      uri: `data:image/png;base64,${app.image}`,
                                    }}
                                  />
                                  <Text
                                    style={{
                                      color: "black",
                                      fontSize: wp(2.5),
                                    }}
                                  >
                                    {app.label}
                                  </Text>
                                </View>
                              ))}
                            {[
                              ...Array(
                                Math.max(0, 5 - (savedApps_b.length % 5))
                              ),
                            ].map((_, index) => (
                              <View
                                key={index}
                                style={{
                                  width: 30,
                                  height: 30,
                                  marginRight: 10,
                                }}
                              />
                            ))}
                          </View>
                        ))}
                      </ScrollView>
                    </View>
                  ) : (
                    <>
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            color: "grey",
                            fontSize: wp(3.5),
                            textAlign: "center",
                            top: "40%",
                          }}
                        >
                          Your can add Bussiness apps here
                        </Text>
                      </View>
                    </>
                  )}
                  <View style={{ position: "absolute", top: "80%", right: 10 }}>
                    <TouchableOpacity onPress={() => setModalVisible_b(true)}>
                      <Add />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
            {selectedCategory === "Sports" && (
              <>
                <View
                  style={{ flex: 1, height: containerHeight, width: "100%" }}
                >
                  {savedApps_sp.length > 0 ? (
                    <View style={{ flex: 1 }}>
                      <ScrollView>
                        {Array.from({
                          length: Math.ceil(savedApps_sp.length / 5),
                        }).map((_, rowIndex) => (
                          <View
                            key={rowIndex}
                            style={{
                              flexDirection: "row",
                              marginBottom: 10,
                              margin: "2%",
                            }}
                          >
                            {savedApps_sp
                              .slice(rowIndex * 5, (rowIndex + 1) * 5)
                              .map((app, index) => (
                                <View
                                  key={index}
                                  style={{
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: 10,
                                    marginRight: 6,
                                  }}
                                >
                                  <Image
                                    style={{
                                      width: 40,
                                      height: 40,
                                      marginBottom: 5,
                                      margin: "3%",
                                    }}
                                    source={{
                                      uri: `data:image/png;base64,${app.image}`,
                                    }}
                                  />
                                  <Text
                                    style={{
                                      color: "black",
                                      fontSize: wp(2.5),
                                    }}
                                  >
                                    {app.label}
                                  </Text>
                                </View>
                              ))}
                            {[
                              ...Array(
                                Math.max(0, 5 - (savedApps_sp.length % 5))
                              ),
                            ].map((_, index) => (
                              <View
                                key={index}
                                style={{
                                  width: 30,
                                  height: 30,
                                  marginRight: 10,
                                }}
                              />
                            ))}
                          </View>
                        ))}
                      </ScrollView>
                    </View>
                  ) : (
                    <>
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            color: "grey",
                            fontSize: wp(3.5),
                            textAlign: "center",
                            top: "40%",
                          }}
                        >
                          Your can add Sports apps here
                        </Text>
                      </View>
                    </>
                  )}
                  <View style={{ position: "absolute", top: "80%", right: 10 }}>
                    <TouchableOpacity onPress={() => setModalVisible_sp(true)}>
                      <Add />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
            {selectedCategory === "Education" && (
              <>
                <View
                  style={{ flex: 1, height: containerHeight, width: "100%" }}
                >
                  {savedApps_e.length > 0 ? (
                    <View style={{ flex: 1 }}>
                      <ScrollView>
                        {Array.from({
                          length: Math.ceil(savedApps_e.length / 5),
                        }).map((_, rowIndex) => (
                          <View
                            key={rowIndex}
                            style={{
                              flexDirection: "row",
                              marginBottom: 10,
                              margin: "2%",
                            }}
                          >
                            {savedApps_e
                              .slice(rowIndex * 5, (rowIndex + 1) * 5)
                              .map((app, index) => (
                                <View
                                  key={index}
                                  style={{
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: 10,
                                    marginRight: 6,
                                  }}
                                >
                                  <Image
                                    style={{
                                      width: 40,
                                      height: 40,
                                      marginBottom: 5,
                                      margin: "3%",
                                    }}
                                    source={{
                                      uri: `data:image/png;base64,${app.image}`,
                                    }}
                                  />
                                  <Text
                                    style={{
                                      color: "black",
                                      fontSize: wp(2.5),
                                    }}
                                  >
                                    {app.label}
                                  </Text>
                                </View>
                              ))}
                            {[
                              ...Array(
                                Math.max(0, 5 - (savedApps_e.length % 5))
                              ),
                            ].map((_, index) => (
                              <View
                                key={index}
                                style={{
                                  width: 30,
                                  height: 30,
                                  marginRight: 10,
                                }}
                              />
                            ))}
                          </View>
                        ))}
                      </ScrollView>
                    </View>
                  ) : (
                    <>
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            color: "grey",
                            fontSize: wp(3.5),
                            textAlign: "center",
                            top: "40%",
                          }}
                        >
                          Your can add Education apps here
                        </Text>
                      </View>
                    </>
                  )}
                  <View style={{ position: "absolute", top: "80%", right: 10 }}>
                    <TouchableOpacity onPress={() => setModalVisible_e(true)}>
                      <Add />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
            {selectedCategory === "Dating" && (
              <>
                <View
                  style={{ flex: 1, height: containerHeight, width: "100%" }}
                >
                  {savedApps_d.length > 0 ? (
                    <View style={{ flex: 1 }}>
                      <ScrollView>
                        {Array.from({
                          length: Math.ceil(savedApps_d.length / 5),
                        }).map((_, rowIndex) => (
                          <View
                            key={rowIndex}
                            style={{
                              flexDirection: "row",
                              marginBottom: 10,
                              margin: "2%",
                            }}
                          >
                            {savedApps_d
                              .slice(rowIndex * 5, (rowIndex + 1) * 5)
                              .map((app, index) => (
                                <View
                                  key={index}
                                  style={{
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: 10,
                                    marginRight: 6,
                                  }}
                                >
                                  <Image
                                    style={{
                                      width: 40,
                                      height: 40,
                                      marginBottom: 5,
                                      margin: "3%",
                                    }}
                                    source={{
                                      uri: `data:image/png;base64,${app.image}`,
                                    }}
                                  />
                                  <Text
                                    style={{
                                      color: "black",
                                      fontSize: wp(2.5),
                                    }}
                                  >
                                    {app.label}
                                  </Text>
                                </View>
                              ))}
                            {[
                              ...Array(
                                Math.max(0, 5 - (savedApps_d.length % 5))
                              ),
                            ].map((_, index) => (
                              <View
                                key={index}
                                style={{
                                  width: 30,
                                  height: 30,
                                  marginRight: 10,
                                }}
                              />
                            ))}
                          </View>
                        ))}
                      </ScrollView>
                    </View>
                  ) : (
                    <>
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            color: "grey",
                            fontSize: wp(3.5),
                            textAlign: "center",
                            top: "40%",
                          }}
                        >
                          Your can add Dating apps here
                        </Text>
                      </View>
                    </>
                  )}
                  <View style={{ position: "absolute", top: "80%", right: 10 }}>
                    <TouchableOpacity onPress={() => setModalVisible_d(true)}>
                      <Add />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
            {selectedCategory === "Food Delivery" && (
              <>
                <View
                  style={{ flex: 1, height: containerHeight, width: "100%" }}
                >
                  {savedApps_fd.length > 0 ? (
                    <View style={{ flex: 1 }}>
                      <ScrollView>
                        {Array.from({
                          length: Math.ceil(savedApps_fd.length / 5),
                        }).map((_, rowIndex) => (
                          <View
                            key={rowIndex}
                            style={{
                              flexDirection: "row",
                              marginBottom: 10,
                              margin: "2%",
                            }}
                          >
                            {savedApps_fd
                              .slice(rowIndex * 5, (rowIndex + 1) * 5)
                              .map((app, index) => (
                                <View
                                  key={index}
                                  style={{
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: 10,
                                    marginRight: 6,
                                  }}
                                >
                                  <Image
                                    style={{
                                      width: 40,
                                      height: 40,
                                      marginBottom: 5,
                                      margin: "3%",
                                    }}
                                    source={{
                                      uri: `data:image/png;base64,${app.image}`,
                                    }}
                                  />
                                  <Text
                                    style={{
                                      color: "black",
                                      fontSize: wp(2.5),
                                    }}
                                  >
                                    {app.label}
                                  </Text>
                                </View>
                              ))}
                            {[
                              ...Array(
                                Math.max(0, 5 - (savedApps_fd.length % 5))
                              ),
                            ].map((_, index) => (
                              <View
                                key={index}
                                style={{
                                  width: 30,
                                  height: 30,
                                  marginRight: 10,
                                }}
                              />
                            ))}
                          </View>
                        ))}
                      </ScrollView>
                    </View>
                  ) : (
                    <>
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            color: "grey",
                            fontSize: wp(3.5),
                            textAlign: "center",
                            top: "40%",
                          }}
                        >
                          Your can add Food Delivery apps here
                        </Text>
                      </View>
                    </>
                  )}
                  <View style={{ position: "absolute", top: "80%", right: 10 }}>
                    <TouchableOpacity onPress={() => setModalVisible_fd(true)}>
                      <Add />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
            {selectedCategory === "Social Media" && (
              <>
                <View
                  style={{ flex: 1, height: containerHeight, width: "100%" }}
                >
                  {savedApps_sm.length > 0 ? (
                    <View style={{ flex: 1 }}>
                      <ScrollView>
                        {Array.from({
                          length: Math.ceil(savedApps_sm.length / 5),
                        }).map((_, rowIndex) => (
                          <View
                            key={rowIndex}
                            style={{
                              flexDirection: "row",
                              marginBottom: 10,
                              margin: "2%",
                            }}
                          >
                            {savedApps_sm
                              .slice(rowIndex * 5, (rowIndex + 1) * 5)
                              .map((app, index) => (
                                <View
                                  key={index}
                                  style={{
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: 10,
                                    marginRight: 6,
                                  }}
                                >
                                  <Image
                                    style={{
                                      width: 40,
                                      height: 40,
                                      marginBottom: 5,
                                      margin: "3%",
                                    }}
                                    source={{
                                      uri: `data:image/png;base64,${app.image}`,
                                    }}
                                  />
                                  <Text
                                    style={{
                                      color: "black",
                                      fontSize: wp(2.5),
                                    }}
                                  >
                                    {app.label}
                                  </Text>
                                </View>
                              ))}
                            {[
                              ...Array(
                                Math.max(0, 5 - (savedApps_sm.length % 5))
                              ),
                            ].map((_, index) => (
                              <View
                                key={index}
                                style={{
                                  width: 30,
                                  height: 30,
                                  marginRight: 10,
                                }}
                              />
                            ))}
                          </View>
                        ))}
                      </ScrollView>
                    </View>
                  ) : (
                    <>
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            color: "grey",
                            fontSize: wp(3.5),
                            textAlign: "center",
                            top: "40%",
                          }}
                        >
                          you can add Social Media app here
                        </Text>
                      </View>
                    </>
                  )}
                  <View style={{ position: "absolute", top: "80%", right: 10 }}>
                    <TouchableOpacity onPress={() => setModalVisible_sm(true)}>
                      <Add />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
            {selectedCategory === "Medical Wellness" && (
              <>
                <View
                  style={{ flex: 1, height: containerHeight, width: "100%" }}
                >
                  {savedApps_mw.length > 0 ? (
                    <View style={{ flex: 1 }}>
                      <ScrollView>
                        {Array.from({
                          length: Math.ceil(savedApps_mw.length / 5),
                        }).map((_, rowIndex) => (
                          <View
                            key={rowIndex}
                            style={{
                              flexDirection: "row",
                              marginBottom: 10,
                              margin: "2%",
                            }}
                          >
                            {savedApps_mw
                              .slice(rowIndex * 5, (rowIndex + 1) * 5)
                              .map((app, index) => (
                                <View
                                  key={index}
                                  style={{
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: 10,
                                    marginRight: 6,
                                  }}
                                >
                                  <Image
                                    style={{
                                      width: 40,
                                      height: 40,
                                      marginBottom: 5,
                                      margin: "3%",
                                    }}
                                    source={{
                                      uri: `data:image/png;base64,${app.image}`,
                                    }}
                                  />
                                  <Text
                                    style={{
                                      color: "black",
                                      fontSize: wp(2.5),
                                    }}
                                  >
                                    {app.label}
                                  </Text>
                                </View>
                              ))}
                            {[
                              ...Array(
                                Math.max(0, 5 - (savedApps_mw.length % 5))
                              ),
                            ].map((_, index) => (
                              <View
                                key={index}
                                style={{
                                  width: 30,
                                  height: 30,
                                  marginRight: 10,
                                }}
                              />
                            ))}
                          </View>
                        ))}
                      </ScrollView>
                    </View>
                  ) : (
                    <>
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            color: "grey",
                            fontSize: wp(3.5),
                            textAlign: "center",
                            top: "40%",
                          }}
                        >
                          You can Medical wallness app here
                        </Text>
                      </View>
                    </>
                  )}
                  <View style={{ position: "absolute", top: "80%", right: 10 }}>
                    <TouchableOpacity onPress={() => setModalVisible_mw(true)}>
                      <Add />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
            {selectedCategory === "Grocery" && (
              <>
                <View
                  style={{ flex: 1, height: containerHeight, width: "100%" }}
                >
                  {savedApps_g.length > 0 ? (
                    <View style={{ flex: 1 }}>
                      <ScrollView>
                        {Array.from({
                          length: Math.ceil(savedApps_g.length / 5),
                        }).map((_, rowIndex) => (
                          <View
                            key={rowIndex}
                            style={{
                              flexDirection: "row",
                              marginBottom: 10,
                              margin: "2%",
                            }}
                          >
                            {savedApps_g
                              .slice(rowIndex * 5, (rowIndex + 1) * 5)
                              .map((app, index) => (
                                <View
                                  key={index}
                                  style={{
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: 10,
                                    marginRight: 6,
                                  }}
                                >
                                  <Image
                                    style={{
                                      width: 40,
                                      height: 40,
                                      marginBottom: 5,
                                      margin: "3%",
                                    }}
                                    source={{
                                      uri: `data:image/png;base64,${app.image}`,
                                    }}
                                  />
                                  <Text
                                    style={{
                                      color: "black",
                                      fontSize: wp(2.5),
                                    }}
                                  >
                                    {app.label}
                                  </Text>
                                </View>
                              ))}
                            {[
                              ...Array(
                                Math.max(0, 5 - (savedApps_g.length % 5))
                              ),
                            ].map((_, index) => (
                              <View
                                key={index}
                                style={{
                                  width: 30,
                                  height: 30,
                                  marginRight: 10,
                                }}
                              />
                            ))}
                          </View>
                        ))}
                      </ScrollView>
                    </View>
                  ) : (
                    <>
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            color: "grey",
                            fontSize: wp(3.5),
                            textAlign: "center",
                            top: "40%",
                          }}
                        >
                          You can add Grocery apps here
                        </Text>
                      </View>
                    </>
                  )}
                  <View style={{ position: "absolute", top: "80%", right: 10 }}>
                    <TouchableOpacity onPress={() => setModalVisible_g(true)}>
                      <Add />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
            {selectedCategory === "Employment" && (
              <>
                <View
                  style={{ flex: 1, height: containerHeight, width: "100%" }}
                >
                  {savedApps_em.length > 0 ? (
                    <View style={{ flex: 1 }}>
                      <ScrollView>
                        {Array.from({
                          length: Math.ceil(savedApps_em.length / 5),
                        }).map((_, rowIndex) => (
                          <View
                            key={rowIndex}
                            style={{
                              flexDirection: "row",
                              marginBottom: 10,
                              margin: "2%",
                            }}
                          >
                            {savedApps_em
                              .slice(rowIndex * 5, (rowIndex + 1) * 5)
                              .map((app, index) => (
                                <View
                                  key={index}
                                  style={{
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: 10,
                                    marginRight: 6,
                                  }}
                                >
                                  <Image
                                    style={{
                                      width: 40,
                                      height: 40,
                                      marginBottom: 5,
                                      margin: "3%",
                                    }}
                                    source={{
                                      uri: `data:image/png;base64,${app.image}`,
                                    }}
                                  />
                                  <Text
                                    style={{
                                      color: "black",
                                      fontSize: wp(2.5),
                                    }}
                                  >
                                    {app.label}
                                  </Text>
                                </View>
                              ))}
                            {[
                              ...Array(
                                Math.max(0, 5 - (savedApps_em.length % 5))
                              ),
                            ].map((_, index) => (
                              <View
                                key={index}
                                style={{
                                  width: 30,
                                  height: 30,
                                  marginRight: 10,
                                }}
                              />
                            ))}
                          </View>
                        ))}
                      </ScrollView>
                    </View>
                  ) : (
                    <>
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            color: "grey",
                            fontSize: wp(3.5),
                            textAlign: "center",
                            top: "40%",
                          }}
                        >
                          Your can add Employment apps here
                        </Text>
                      </View>
                    </>
                  )}
                  <View style={{ position: "absolute", top: "80%", right: 10 }}>
                    <TouchableOpacity onPress={() => setModalVisible_em(true)}>
                      <Add />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </>
        )}

        {/*   category ///////////////////////////////////////////////////////////////////////////////////////////////////////*/}

        {/* <View
          style={{
            marginTop: hp(2),
            marginLeft: wp(-1),
            height: hp(23),
            width: wp(60),
          }}>
          <FlatList
            style={{margin: 8, flex: 1}}
            showsVerticalScrollIndicator={false}
            data={topData}
            numColumns={3} // Set the number of columns to 3
            renderItem={({item}) => renderAvailableApps(item)}
          />
        </View>

        <View style={{marginTop: hp(-3), height: hp(25)}}>
          <Text
            style={{
              fontSize: hp(2.3),
              marginLeft: wp(3),
              fontFamily: 'Inter-Bold',
              color: '#4A4A4A',
              fontWeight: 'bold',
            }}>
            Phone Based Apps
          </Text>

          {isLoading ? (
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
            <View style={{flex: 1}}>
              <FlatList
                data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, itemIndex) => `${itemIndex}`}
                renderItem={({item}) => renderApps(item)}
                contentContainerStyle={{
                  borderWidth: 1,
                  marginRight: wp(2.3),
                  marginTop: hp(3),
                  borderColor: '#00000017',
                  borderRadius: wp(3),
                }}
              />

              <FlatList
                data={dataApps.slice(Math.ceil(dataApps.length / 2))}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, itemIndex) => `${itemIndex}`}
                renderItem={({item}) => renderApps(item)}
                contentContainerStyle={{
                  borderWidth: 1,
                  marginRight: wp(2.3),
                  marginTop: hp(3),
                  borderColor: '#00000017',
                  borderRadius: wp(3),
                }}
              />
            </View>
          )}
        </View>

        <View style={{height: hp(8), justifyContent: 'center'}}>
          <View
            style={{
              height: hp(7),
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              //borderWidth: 1,
              marginHorizontal: wp(12),
            }}>
          </View>
        </View>
        <View style={{marginTop: hp(-5), height: hp(28)}}>
          <Text
            style={{
              fontSize: hp(2.3),
              marginLeft: wp(3),
              fontFamily: 'Inter-Bold',
              color: '#4A4A4A',
              fontWeight: 'bold',
            }}>
            Favourite Apps
          </Text>
          {isLoading ? (
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
              {favouriteData?.length === 0 ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                           <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: hp(2.1),
                        justifyContent: "center",
                      }}
                    >
                      No Favourite Apps
                    </Text>
                  </View>
              ) : (
                <FlatList
                  data={favouriteData.slice(
                    0,
                    Math.ceil(favouriteData.length / 2),
                  )}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, itemIndex) => `${itemIndex}`}
                  renderItem={({item}) => renderFavouritesApps(item)}
                  contentContainerStyle={{
                    borderWidth: 1,
                    marginRight: wp(2.3),
                    marginTop: hp(3),
                    borderColor: '#00000017',
                    borderRadius: wp(3),
                  }}
                />
              )}
              <FlatList
                data={favouriteData.slice(Math.ceil(favouriteData.length / 2))}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, itemIndex) => `${itemIndex}`}
                renderItem={({item}) => renderFavouritesApps(item)}
                contentContainerStyle={{
                  borderWidth: 1,
                  marginRight: wp(2.3),
                  marginTop: hp(3),
                  borderColor: '#00000017',
                  borderRadius: wp(3),
                }}
              />
            </>
          )}
        </View>

        <View style={{marginTop: hp(1.8), marginBottom: hp(5), height: hp(25)}}>
          <Text
            style={{
              fontSize: hp(2.3),
              marginLeft: wp(3),
              fontFamily: 'Inter-Bold',
              color: '#4A4A4A',
              fontWeight: 'bold',
            }}>
            Unused Apps
          </Text>

          {isLoading ? (
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
            <View style={{flex: 1}}>
              <FlatList
                data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, itemIndex) => `${itemIndex}`}
                renderItem={({item}) => renderApps(item)}
                contentContainerStyle={{
                  borderWidth: 1,
                  marginRight: wp(2.3),
                  marginTop: hp(3),
                  borderColor: '#00000017',
                  borderRadius: wp(3),
                }}
              />

              <FlatList
                data={dataApps.slice(Math.ceil(dataApps.length / 2))}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, itemIndex) => `${itemIndex}`}
                renderItem={({item}) => renderApps(item)}
                contentContainerStyle={{
                  borderWidth: 1,
                  marginRight: wp(2.3),
                  marginTop: hp(3),
                  borderColor: '#00000017',
                  borderRadius: wp(3),
                }}
              />
            </View>
          )}
        </View> */}
        {/* //////////////// ///////////////////////////////////////////////////////////////////////abouve for comments */}
        {/* // start of banner slider */}
      
        {/* ////slider end */}
        {/* <View style={styles.bannerview}>
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
        </View> */}

        <View
          style={{
            marginTop: hp(1),
            marginHorizontal: wp(8),
            marginVertical: hp(2),
          }}
        >
          <Text
            style={{ color: "#FACA4E", fontWeight: "bold", fontSize: hp(2.3) }}
          >
            Video Mania
          </Text>
        </View>

        {/* Top Video */}

        {/*   Top Video End */}
        {/* //// */}
        {loading[0] && <ActivityIndicator size="large" color="#FACA4E" />}
        {!loading[0] && data[0] && (
          <View>
            <FlatList
              data={data[0]}
              style={{ flex: 1 }}
              contentContainerStyle={{ alignItems: "center" }}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              horizontal
              keyExtractor={(item, idx) => idx.toString()}
              renderItem={({ item }) => renderSearchesVideo(item)}
            />
          </View>
        )}

        {/*  */}

        <View>
      {loading[1] && <ActivityIndicator size="large" color="#FACA4E" />}
      {!loading[1] && (
        <View style={{ marginVertical: hp(2), marginBottom: 10 }}>
          {data[1] && data[1].length > 0 ? (
            <FlatList
              data={data[1]}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, idx) => idx.toString()}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      marginTop: hp(1.5),
                      flexDirection: 'row',
                      height: hp(18),
                      marginBottom: 30,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => navigation.navigate('ViewVideo', { videoData: item, identifier: false })}
                      style={{ width: wp(40), borderRadius: wp(5) }}
                    >
                      {item.image ? (
                        <Image
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            zIndex: 1, // Ensure it's on top of other elements
                            width: '100%',
                            height: '100%',
                            borderRadius: wp(3),
                            resizeMode: 'cover',
                          }}
                          source={{ uri: item.image }}
                        />
                      ) : (
                        <Image
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            zIndex: 1, // Ensure it's on top of other elements
                            width: '100%',
                            height: '100%',
                            borderRadius: wp(3),
                            resizeMode: 'cover',
                          }}
                          source={appImages.videoPlaceHolder}
                        />
                      )}
                      <View
                        style={{
                          position: 'absolute',
                          top: hp(18),
                          left: 0,
                          justifyContent: 'center',
                          alignItems: 'center',
                          zIndex: 2, // Ensure it's on top
                          width: '100%',
                        }}
                      >
                        <Text
                          ellipsizeMode="tail"
                          numberOfLines={1}
                          style={{
                            fontSize: hp(2.5),
                            fontFamily: 'Inter-Medium',
                            color: 'black',
                            fontWeight: '700',
                          }}
                        >
                          {item.name}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <View style={{ justifyContent: 'flex-start', width: '50%', paddingTop: 2 }}>
                      <Text
                        ellipsizeMode="tail"
                        numberOfLines={7}
                        style={{
                          fontSize: hp(1.5),
                          marginLeft: wp(1),
                          lineHeight: hp(2),
                          fontFamily: 'Inter-Regular',
                          color: '#000000',
                        }}
                      >
                        {item.description}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          ) : (
            <View
              style={{
                marginTop: hp(1.5),
                flexDirection: 'row',
                height: hp(18),
                marginBottom: 30,
              }}
            >
              <TouchableOpacity
                style={{ width: wp(40), borderRadius: wp(5)}}
              >
                <Image
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 1, // Ensure it's on top of other elements
                    width: '100%',
                    height: '100%',
                    borderRadius: wp(3),
                    resizeMode: 'cover',
                  }}
                  source={appImages.videoPlaceHolder}
                />
              </TouchableOpacity>

              <View style={{ justifyContent: 'flex-start', width: '50%', paddingTop: 2 }}>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={7}
                  style={{
                    fontSize: hp(1.5),
                    marginLeft: wp(1),
                    lineHeight: hp(2),
                    fontFamily: 'Inter-Regular',
                    color: '#000000',
                  }}
                >
                  No Top Description
                </Text>
              </View>
            </View>
          )}
        </View>
      )}
    </View>
        {/* {loading[1] && <ActivityIndicator size="large" color="#FACA4E" />}
        {!loading[1] && data[1] && (
          <View style={{ marginVertical: hp(2) , marginBottom:10, backgroundColor:'red' }}>
            <FlatList
              data={data[1]}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, idx) => idx.toString()}
              renderItem={({ item }) => {
                // console.log("top Item:-----------", item); // Corrected console.log syntax
                return (
                  <View
                    style={{
                      marginTop: hp(1.5),
                      marginLeft: wp(2.5),
                      flexDirection: "row",
                      height: hp(17),
                    }}
                  >
                    <View
                      onPress={() => navigation.navigate("ViewVideo")}
                      style={{
                        width: wp(39),
                        height: "100%",
                        borderRadius: wp(5),
                      }}
                    >
                      <Image
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          zIndex: 1, // Ensure it's on top of other elements
                          //flex: 1,
                          width: "100%",
                          height: "100%",
                          borderRadius: wp(3),
                          resizeMode: "cover",
                        }}
                        source={appImages.videoPlaceHolder}
                      />
                      <View
                        style={{
                          position: "absolute",
                          top: hp(10),
                          left: 10,
                          //height: hp(3),
                          //width: wp(21),
                          //borderRadius: wp(3),
                          //backgroundColor: '#FACA4E',
                          justifyContent: "center",
                          alignItems: "center",
                          zIndex: 2, // Ensure it's on top
                        }}
                      >
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={{
                            fontSize: hp(2.1),
                            fontFamily: "Inter",
                            color: "black",
                            fontWeight: "700",
                          }}
                        >
                          {item?.name}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        marginTop: hp(3),
                        height: hp(12.8),
                        width: "45%",
                        marginHorizontal: wp(1.5),
                      }}
                    >
                      <Text
                        numberOfLines={5}
                        ellipsizeMode="tail"
                        style={{
                          fontSize: hp(1.5),
                          //marginLeft: wp(1),
                          lineHeight: hp(2),
                          fontFamily: "Inter-Regular",
                          color: "#000000",
                          //fontWeight: '700',
                        }}
                      >
                        {item?.description}
                      </Text>
                    </View>
                  </View>
                );
              }}
              //   renderItem={({ item }) => <Text>{item.name}</Text>}
            />
          </View>
        )} */}
        {/* Top end */}

        {/* Treding Start */}

        {/* treding End */}
        {loading[2] && <ActivityIndicator size="large" color="#FACA4E" />}
        {!loading[2] && data[2] && (
          <View style={{marginBottom:10}}>
            <Text
              style={{
                fontSize: hp(2.3),
                marginLeft: wp(1),
                fontFamily: "Inter",
                color: "#4A4A4A",
                fontWeight: "bold",
              }}
            >
              Trending
            </Text>
            <FlatList
              data={data[2]}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              horizontal
              keyExtractor={(item, idx) => idx.toString()}
              renderItem={({ item }) => renderAvailableAppsVideo(item)}
            />
          </View>
        )}
        {loading[3] && <ActivityIndicator size="large" color="#FACA4E" />}
        {!loading[3] && data[3] && (
          <View style={{marginBottom:10}}>
            <Text
              style={{
                fontSize: hp(2.3),
                marginLeft: wp(1),
                fontFamily: "Inter",
                color: "#4A4A4A",
                fontWeight: "bold",
              }}
            >
              Latest Video
            </Text>
            <FlatList
              data={data[3]}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              horizontal
              keyExtractor={(item, idx) => idx.toString()}
              renderItem={({ item }) => renderAvailableAppsVideo(item)}
            />
          </View>
        )}

        {loading[4] && <ActivityIndicator size="large" color="#FACA4E" />}
        {!loading[4] && data[4] && (
          <View style={{marginBottom:10}}>
            <Text
              style={{
                fontSize: hp(2.3),
                marginLeft: wp(1),
                fontFamily: "Inter",
                color: "#4A4A4A",
                fontWeight: "bold",
              }}
            >
              Most Viewed
            </Text>
            <FlatList
              data={data[4]}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              horizontal
              keyExtractor={(item, idx) => idx.toString()}
              renderItem={({ item }) => renderAvailableAppsVideo(item)}
            />
          </View>
        )}

        {loading[5] && <ActivityIndicator size="large" color="#FACA4E" />}
        {!loading[5] && data[5] && (
      <View style={{marginBottom:10}}>
            <Text
              style={{
                fontSize: hp(2.3),
                marginLeft: wp(1),
                fontFamily: "Inter",
                color: "#4A4A4A",
                fontWeight: "bold",
              }}
            >
              Most Commented
            </Text>
            <FlatList
              data={data[5]}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              horizontal
              keyExtractor={(item, idx) => idx.toString()}
              renderItem={({ item }) => renderAvailableAppsVideo(item)}
            />
          </View>
        )}

        {/* //-------------------------------------------------------------\\ */}

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
      ) : adsinActiveData.length === 0 ? (
        <View style={styles.TopBannerView}>
          <Text style={{ fontWeight: 'bold', fontSize: hp(2.1) }}>No Top Banner</Text>
        </View>
      ) : (
        <Carousel
          data={adsinActiveData}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => Linking.openURL(item.banner_link)}
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
            </TouchableOpacity>
          )}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width * 0.9}
          loop={true}
          autoplay={true}
        />
      )}
    </View>
        {/* <View
          style={{
            alignItems: "center",
            height: hp(16),
            marginLeft: 8,
            marginVertical: hp(2),
          }}
        >
          {isLoading ? (
            <ActivityIndicator size="large" color="#FACA4E" />
          ) : adsinActiveData.length === 0 ? (
           <View style={styles.TopBannerView}>
            <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                        No Banner
                      </Text>
            </View>
          ) : (
            <Swiper autoplay={true} loop={true}>
              {adsinActiveData.map((banner) => (
                <View
                  key={banner.id}
                  style={{
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={{ uri: banner?.image }}
                    style={{
                      height: hp(15),
                      width: "100%",
                      borderWidth: 1,
                      resizeMode: "contain",
                      borderRadius: 10,
                    }}
                  />
                </View>
              ))}
            </Swiper>
          )}
        </View> */}
        {/* ////slider end */}
        {/* Disc */}

        {/* DISC start */}
        <View style={{ marginTop: hp(1), marginHorizontal: wp(8) }}>
          <Text
            style={{ color: "#FACA4E", fontWeight: "bold", fontSize: hp(2.3) }}
          >
            DISC
          </Text>
        </View>

        <View style={styles.latestSearchListDisc}>
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ alignItems: "center" }}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={searchesDisc}
            renderItem={({ item }) => renderDiscSearches(item)}
            // renderItem={({ item }) => {
            //   console.log("DISC ITEM:", item);}}
            // renderItem={({item}) => renderDiscSearches(item)}
          />
        </View>
        <View></View>
        {selectedItemDiscId === 1 ? (
          <DiscScreen />
        ) : selectedItemDiscId === 2 ? (
          <OpenLetters />
        ) : selectedItemDiscId === 3 ? (
          <QAFI />
        ) : selectedItemDiscId === 4 ? (
          <GEBC />
        ) : null}
        {/* ////////DISC End */}

        {/* Pic Tours */}

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
      ) : adsinActiveData.length === 0 ? (
        <View style={styles.TopBannerView}>
          <Text style={{ fontWeight: 'bold', fontSize: hp(2.1) }}>No Top Banner</Text>
        </View>
      ) : (
        <Carousel
          data={adsinActiveData}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => Linking.openURL(item.banner_link)}
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
            </TouchableOpacity>
          )}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width * 0.9}
          loop={true}
          autoplay={true}
        />
      )}
    </View>
        {/* ////slider end */}

        <Text
          style={{
            color: "#FACA4E",
            marginLeft: wp(3),
            fontFamily: "Inter-Bold",
            fontSize: hp(2.3),
          }}
        >
          Pic Tours
        </Text>

        <View style={[styles.latestSearchListPicss, { marginLeft: wp(3) }]}>
          {loading[8] && <ActivityIndicator size="large" color="#FACA4E" />}
          {!loading[8] && data[8] && (
            <View>
              <FlatList
                data={data[8]}
                // style={{flex: 1}}
                contentContainerStyle={{ alignItems: "center" }}
                showsHorizontalScrollIndicator={false}
                horizontal
                renderItem={({ item }) => renderSearchesPic(item)}
              />
            </View>
          )}
        </View>

        {loading[9] && <ActivityIndicator size="large" color="#FACA4E" />}
        {!loading[9] && data[9] && (
          <FlatList
            data={data[9]}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, idx) => idx.toString()}
            renderItem={({ item }) => {
              // console.log("top Item in ui:-----------", item); // Corrected console.log syntax
              return (
                <View
                  style={{
                    marginTop: hp(1.5),
                    flexDirection: "row",
                    height: hp(18),
                  }}
                >
                  <View
                    style={{
                      width: wp(35),
                      marginLeft: wp(2.5),
                      height: "100%",
                      borderRadius: wp(5),
                    }}
                  >
                    {!item?.image ||
                    item?.image === "undefined" ||
                    item?.image.startsWith("/") ? (
                      <Image
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          zIndex: 1, // Ensure it's on top of other elements
                          //flex: 1,
                          width: "100%",
                          height: "100%",
                          borderRadius: wp(3),
                          resizeMode: "cover",
                        }}
                        source={appImages?.galleryPlaceHolder}
                      />
                    ) : (
                      <Image
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          zIndex: 1, // Ensure it's on top of other elements
                          //flex: 1,
                          width: "100%",
                          height: "100%",
                          borderRadius: wp(3),
                          resizeMode: "cover",
                        }}
                        source={{ uri: item.image }}
                      />
                    )}
                    <View
                      style={{
                        position: "absolute",
                        top: hp(14),
                        left: 7,
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 2, // Ensure it's on top
                      }}
                    >
                      <Text
                        style={{
                          fontSize: hp(1.6),
                          fontFamily: "Inter",
                          // color: 'red',
                          fontWeight: "700",
                        }}
                      >
                        {item?.username}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      marginTop: hp(0.8),
                      marginLeft: wp(3),
                      width: "35%",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: hp(1.6),
                        marginLeft: wp(1),
                        lineHeight: 15.5,
                        marginTop: hp(5),
                        fontFamily: "Inter-Regular",
                        color: "#000000",
                        //fontWeight: '700',
                      }}
                    >
                      {item.length === 0
                        ? "No Top Pic Shown"
                        : item?.description}
                    </Text>
                  </View>
                </View>
              );
            }}
            //   renderItem={({ item }) => <Text>{item.name}</Text>}
          />
        )}

        {/* treding End */}
        <View style={{ marginTop: hp(2), height: hp(23) }}>
          <Text
            style={{
              fontSize: hp(2.3),
              fontFamily: "Inter",
              color: "#4A4A4A",
              marginLeft: wp(1),
              fontWeight: "bold",
            }}
          >
             Trending
          </Text>

          <View style={{ marginTop: hp(1), height: "100%" }}>
            {loading[10] ? (
              <ActivityIndicator size="large" color="#FACA4E" />
            ) : data[10]?.length === 0 ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                  No data available
                </Text>
              </View>
            ) : (
              <FlatList
                data={data[10]}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal
                keyExtractor={(item, idx) => idx.toString()}
                renderItem={({ item }) => renderAvailableAppsPics(item)}
              />
            )}
          </View>
        </View>
        {/* {loading[10] && <ActivityIndicator size="large" color="#FACA4E" />}
        {!loading[10] && data[10] && (
         <View style={{marginBottom:10, marginTop:10}}>
            <Text
              style={{
                fontSize: hp(2.3),
                marginLeft: wp(3),
                fontFamily: "Inter",
                color: "#4A4A4A",
                fontWeight: "bold",
              }}
            >
              Trending
            </Text>
            <FlatList
              data={data[10]}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              horizontal
              keyExtractor={(item, idx) => idx.toString()}
              renderItem={({ item }) => renderAvailableAppsPics(item)}
            />
          </View>
        )} */}

        {/* ////////// Latest */}
        <View style={{ marginTop: hp(2), height: hp(23) }}>
          <Text
            style={{
              fontSize: hp(2.3),
              fontFamily: "Inter",
              color: "#4A4A4A",
              marginLeft: wp(1),
              fontWeight: "bold",
            }}
          >
             Latest Video
          </Text>

          <View style={{ marginTop: hp(1), height: "100%" }}>
            {loading[11] ? (
              <ActivityIndicator size="large" color="#FACA4E" />
            ) : data[11]?.length === 0 ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                  No data available
                </Text>
              </View>
            ) : (
              <FlatList
                data={data[11]}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal
                keyExtractor={(item, idx) => idx.toString()}
                renderItem={({ item }) => renderAvailableAppsPics(item)}
              />
            )}
          </View>
        </View>

  {/* ////////// Most Viewed */}
  <View style={{ marginTop: hp(2), height: hp(23) }}>
          <Text
            style={{
              fontSize: hp(2.3),
              fontFamily: "Inter",
              color: "#4A4A4A",
              marginLeft: wp(1),
              fontWeight: "bold",
            }}
          >
             Most Viewed
          </Text>

          <View style={{ marginTop: hp(1), height: "100%" }}>
            {loading[12] ? (
              <ActivityIndicator size="large" color="#FACA4E" />
            ) : data[12]?.length === 0 ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                  No data available
                </Text>
              </View>
            ) : (
              <FlatList
                data={data[12]}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal
                keyExtractor={(item, idx) => idx.toString()}
                renderItem={({ item }) => renderAvailableAppsPics(item)}
              />
            )}
          </View>
        </View>

        {/* ///  Most Commented */}
  
  {/* ////////// Most Viewed */}
  <View style={{ marginTop: hp(2), height: hp(23) }}>
          <Text
            style={{
              fontSize: hp(2.3),
              fontFamily: "Inter",
              color: "#4A4A4A",
              marginLeft: wp(1),
              fontWeight: "bold",
            }}
          >
             Most Commented
          </Text>

          <View style={{ marginTop: hp(1), height: "100%" }}>
            {loading[13] ? (
              <ActivityIndicator size="large" color="#FACA4E" />
            ) : data[13]?.length === 0 ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                  No data available
                </Text>
              </View>
            ) : (
              <FlatList
                data={data[13]}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal
                keyExtractor={(item, idx) => idx.toString()}
                renderItem={({ item }) => renderAvailableAppsPics(item)}
              />
            )}
          </View>
        </View>
        {/* {loading[13] && <ActivityIndicator size="large" color="#FACA4E" />}
        {!loading[13] && data[13] && (
     <View style={{marginBottom:10}}>
            <Text
              style={{
                fontSize: hp(2.3),
                marginLeft: wp(3),
                fontFamily: "Inter",
                color: "#4A4A4A",
                fontWeight: "bold",
              }}
            >
              Most Commented
            </Text>
            <FlatList
              data={data[13]}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              horizontal
              keyExtractor={(item, idx) => idx.toString()}
              renderItem={({ item }) => renderAvailableAppsPics(item)}
            />
          </View>
        )} */}

        {/* //-------------------------------------------------------------\\ */}

        {/* //-------------\\ */}

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
      ) : adsinActiveData.length === 0 ? (
        <View style={styles.TopBannerView}>
          <Text style={{ fontWeight: 'bold', fontSize: hp(2.1) }}>No Top Banner</Text>
        </View>
      ) : (
        <Carousel
          data={adsinActiveData}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => Linking.openURL(item.banner_link)}
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
            </TouchableOpacity>
          )}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width * 0.9}
          loop={true}
          autoplay={true}
        />
      )}
    </View>
        {/* ////slider end */}

        {/* Market Zone */}

        <View style={{ marginTop: hp(1), marginLeft: wp(5) }}>
          <Text
            style={{ color: "#FACA4E", fontWeight: "bold", fontSize: hp(2.3) }}
          >
            Market Zone
          </Text>
        </View>

        <View style={styles.latestSearchListMarket}>
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ alignItems: "center" }}
            showsHorizontalScrollIndicator={false}
            horizontal
            //data={regions}
            data={RegionArea}
            //keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => renderSearchesMarket(item)}
          />
        </View>
        {/* top marcket start */}
        {loading[14] && <ActivityIndicator size="large" color="#FACA4E" />}
        {!loading[14] && data[14] && (
          <View>
            <FlatList
              data={data[14]}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, idx) => idx.toString()}
              renderItem={({ item }) => {
                // console.log("top Item:-----------", item); // Corrected console.log syntax
                return (
                  <View
                    style={{
                      marginTop: hp(1.5),
                      flexDirection: "row",
                      height: hp(18),
                    }}
                  >
                    <View
                      style={{
                        width: wp(35),
                        marginLeft: wp(2.5),
                        height: "100%",
                        borderRadius: wp(5),
                      }}
                    >
                      {!item?.image ||
                      item?.image === "undefined" ||
                      item?.image.startsWith("/") ? (
                        <Image
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            zIndex: 1, // Ensure it's on top of other elements
                            //flex: 1,
                            width: "100%",
                            height: "100%",
                            borderRadius: wp(3),
                            resizeMode: "cover",
                          }}
                          source={appImages?.galleryPlaceHolder}
                        />
                      ) : (
                        <Image
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            zIndex: 1, // Ensure it's on top of other elements
                            //flex: 1,
                            width: "100%",
                            height: "100%",
                            borderRadius: wp(3),
                            resizeMode: "cover",
                          }}
                          source={{ uri: item?.image }}
                        />
                      )}
                      <View
                        style={{
                          position: "absolute",
                          top: hp(14),
                          left: 7,
                          justifyContent: "center",
                          alignItems: "center",
                          zIndex: 2, // Ensure it's on top
                        }}
                      >
                        <Text
                          style={{
                            fontSize: hp(1.6),
                            fontFamily: "Inter",
                            // color: 'red',
                            fontWeight: "700",
                          }}
                        >
                          {item?.username}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        marginTop: hp(0.8),
                        marginLeft: wp(3),
                        width: "35%",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: hp(1.6),
                          marginLeft: wp(1),
                          lineHeight: 15.5,
                          marginTop: hp(5),
                          fontFamily: "Inter-Regular",
                          color: "#000000",
                          //fontWeight: '700',
                        }}
                      >
                        {item.length === 0
                          ? "No Top Pic Shown"
                          : item?.description}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        )}

        {/* Market Lable start */}
        <View style={{ marginTop: hp(2), height: hp(23) }}>
          <Text
            style={{
              fontSize: hp(2.3),
              fontFamily: "Inter",
              color: "#4A4A4A",
              fontWeight: "bold",
            }}
          >
            {categoriesSelectMarket[0]?.label}
          </Text>

          <View style={{ marginTop: hp(1), height: "100%" }}>
            {loading[16] ? (
              <ActivityIndicator size="large" color="#FACA4E" />
            ) : data[16]?.length === 0 ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                  No data available
                </Text>
              </View>
            ) : (
              <FlatList
                data={data[16]}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal
                keyExtractor={(item, idx) => idx.toString()}
                renderItem={({ item }) => renderAvailableAppsMarket(item)}
              />
            )}
          </View>
        </View>
        {/* market lable two */}
        <View style={{ marginTop: hp(2), height: hp(23) }}>
          <Text
            style={{
              fontSize: hp(2.3),
              fontFamily: "Inter",
              color: "#4A4A4A",
              fontWeight: "bold",
            }}
          >
            {categoriesSelectMarket[1]?.label}
          </Text>

          <View style={{ marginTop: hp(1), height: "100%" }}>
            {loading[17] ? (
              <ActivityIndicator size="large" color="#FACA4E" />
            ) : data[17]?.length === 0 ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                  No data available
                </Text>
              </View>
            ) : (
              <FlatList
                data={data[17]}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal
                keyExtractor={(item, idx) => idx.toString()}
                renderItem={({ item }) => renderAvailableAppsMarket(item)}
              />
            )}
          </View>
        </View>
        {/*  Market lable three */}
        <View style={{ marginTop: hp(2), height: hp(23) }}>
          <Text
            style={{
              fontSize: hp(2.3),
              fontFamily: "Inter",
              color: "#4A4A4A",
              fontWeight: "bold",
            }}
          >
            {categoriesSelectMarket[2]?.label}
          </Text>

          <View style={{ marginTop: hp(1), height: "100%" }}>
            {loading[18] ? (
              <ActivityIndicator size="large" color="#FACA4E" />
            ) : data[18]?.length === 0 ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                  No data available
                </Text>
              </View>
            ) : (
              <FlatList
                data={data[18]}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal
                keyExtractor={(item, idx) => idx.toString()}
                renderItem={({ item }) => renderAvailableAppsMarket(item)}
              />
            )}
          </View>
        </View>
        {/*  market lable four start */}
        <View style={{ marginTop: hp(2), height: hp(23) }}>
          <Text
            style={{
              fontSize: hp(2.3),
              fontFamily: "Inter",
              color: "#4A4A4A",
              fontWeight: "bold",
            }}
          >
            {categoriesSelectMarket[3]?.label}
          </Text>

          <View style={{ marginTop: hp(1), height: "100%" }}>
            {loading[19] ? (
              <ActivityIndicator size="large" color="#FACA4E" />
            ) : data[19]?.length === 0 ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                  No data available
                </Text>
              </View>
            ) : (
              <FlatList
                data={data[19]}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal
                keyExtractor={(item, idx) => idx.toString()}
                renderItem={({ item }) => renderAvailableAppsMarket(item)}
              />
            )}
          </View>
        </View>

        {/* top market end */}

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
      ) : adsinActiveData.length === 0 ? (
        <View style={styles.TopBannerView}>
          <Text style={{ fontWeight: 'bold', fontSize: hp(2.1) }}>No Top Banner</Text>
        </View>
      ) : (
        <Carousel
          data={adsinActiveData}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => Linking.openURL(item.banner_link)}
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
            </TouchableOpacity>
          )}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width * 0.9}
          loop={true}
          autoplay={true}
        />
      )}
    </View>
        {/* ////slider end */}
      </ScrollView>

      <RBSheet
        ref={ref_RBSheetCamera}
        closeOnDragDown={true}
        closeOnPressMask={false}
        animationType="fade"
        minClosingHeight={0}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(52, 52, 52, 0.5)",
          },
          draggableIcon: {
            backgroundColor: "white",
          },
          container: {
            borderTopLeftRadius: wp(10),
            borderTopRightRadius: wp(10),
            height: hp(25),
          },
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: wp(8),
            alignItems: "center",
          }}
        >
          <Text style={styles.maintext}>Select an option</Text>
          <TouchableOpacity onPress={() => ref_RBSheetCamera.current.close()}>
            <Ionicons
              name="close"
              size={22}
              color={"#303030"}
              onPress={() => ref_RBSheetCamera.current.close()}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            marginTop: hp(3),
          }}
        >
          <TouchableOpacity
            onPress={() => takePhotoFromCamera("camera")}
            style={
              selectedItem === "camera"
                ? styles.selectedItems
                : styles.nonselectedItems
            }
          >
            <Ionicons
              color={selectedItem === "camera" ? "#FACA4E" : "#888888"}
              name="camera"
              size={25}
            />

            <Text style={{ color: "#333333" }}>From camera</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => choosePhotoFromLibrary("gallery")}
            style={
              selectedItem === "gallery"
                ? styles.selectedItems
                : styles.nonselectedItems
            }
          >
            <MaterialCommunityIcons
              color={selectedItem === "gallery" ? "#FACA4E" : "#888888"}
              name="image"
              size={25}
            />

            <Text style={{ color: "#333333" }}>From gallery</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>

      {/* <View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {aLoader && <ActivityIndicator size="large" color="#FACA4E" />}
      </View> */}

      <CustomModal
        visible={modalDeleteApps}
        onClose={() => setModalDeleteApps(false)}
        headerText="Alert?"
        bodyText="Are You Sure You Want To Remove The App"
        cancelText={"Cancel"}
        doneText={"Yes, Delete"}
        onCancel={() => handleCancel()}
        onConfirm={() => handleConfirm()}
      />

      <CustomModal
        visible={modalDeleteFavouriteApps}
        onClose={() => setModalDeleteFavouriteApps(false)}
        headerText="Logout?"
        bodyText="Are You Sure You Want To Remove From Favourites?"
        cancelText={"Cancel"}
        doneText={"Yes, Remove"}
        onCancel={() => handleCancelFavourite()}
        onConfirm={() => handleConfirmFavourite()}
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer1}>
          <View style={styles.modalContent1}>
            <View style={{ marginTop: hp(-3), height: hp(30) }}>
              {isLoading ? (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ActivityIndicator size="large" color="#FACA4E" />
                </View>
              ) : (
                <>
                  <View style={styles.leftContent1}>
                    <Text style={styles.leftText1}>Favorite Apps</Text>
                    <View style={{ left: "100%" }}>
                      <TouchableOpacity
                        onPress={handleSave}
                        style={{ height: 30, width: 30, paddingLeft: 4 }}
                      >
                        <Ionicons
                          name="checkmark-sharp"
                          size={24}
                          color="#FACA4E"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ flex: 1, bottom: "15%" }}>
                    <View style={{ top: "5%" }}>
                      <FlatList
                        data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, itemIndex) => `${itemIndex}`}
                        renderItem={({ item }) => renderAppsFav(item)}
                        contentContainerStyle={{
                          borderWidth: 1,
                          marginRight: wp(2.3),
                          // marginTop: hp(3),
                          borderColor: "#00000017",
                          borderRadius: wp(3),
                        }}
                      />
                    </View>
                    <View style={{ top: "5%" }}>
                      <FlatList
                        data={dataApps.slice(Math.ceil(dataApps.length / 2))}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, itemIndex) => `${itemIndex}`}
                        renderItem={({ item }) => renderAppsFav(item)}
                        contentContainerStyle={{
                          borderWidth: 1,
                          marginRight: wp(2.3),
                          // marginBottom: hp(3),
                          borderColor: "#00000017",
                          borderRadius: wp(3),
                        }}
                      />
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={modalVisible_b}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible_b(false)}
      >
        <View style={styles.modalContainer1}>
          <View style={styles.modalContent1}>
            <View style={{ marginTop: hp(-3), height: hp(30) }}>
              {isLoading ? (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ActivityIndicator size="large" color="#FACA4E" />
                </View>
              ) : (
                <>
                  <View style={styles.leftContent1}>
                    <Text style={styles.leftText1}>Favorite Apps</Text>
                    <View style={{ left: "100%" }}>
                      <TouchableOpacity
                        onPress={handleSave_b}
                        style={{ height: 30, width: 30, paddingLeft: 4 }}
                      >
                        <Ionicons
                          name="checkmark-sharp"
                          size={24}
                          color="#FACA4E"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ flex: 1, bottom: "15%" }}>
                    <View style={{ top: "5%" }}>
                      <FlatList
                        data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, itemIndex) => `${itemIndex}`}
                        renderItem={({ item }) => renderAppsFav_b(item)}
                        contentContainerStyle={{
                          borderWidth: 1,
                          marginRight: wp(2.3),
                          // marginTop: hp(3),
                          borderColor: "#00000017",
                          borderRadius: wp(3),
                        }}
                      />
                    </View>
                    <View style={{ top: "5%" }}>
                      <FlatList
                        data={dataApps.slice(Math.ceil(dataApps.length / 2))}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, itemIndex) => `${itemIndex}`}
                        renderItem={({ item }) => renderAppsFav_b(item)}
                        contentContainerStyle={{
                          borderWidth: 1,
                          marginRight: wp(2.3),
                          // marginBottom: hp(3),
                          borderColor: "#00000017",
                          borderRadius: wp(3),
                        }}
                      />
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={modalVisible_sp}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible_sp(false)}
      >
        <View style={styles.modalContainer1}>
          <View style={styles.modalContent1}>
            <View style={{ marginTop: hp(-3), height: hp(30) }}>
              {isLoading ? (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ActivityIndicator size="large" color="#FACA4E" />
                </View>
              ) : (
                <>
                  <View style={styles.leftContent1}>
                    <Text style={styles.leftText1}>Favorite Apps</Text>
                    <View style={{ left: "100%" }}>
                      <TouchableOpacity
                        onPress={handleSave_sp}
                        style={{ height: 30, width: 30, paddingLeft: 4 }}
                      >
                        <Ionicons
                          name="checkmark-sharp"
                          size={24}
                          color="#FACA4E"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ flex: 1, bottom: "15%" }}>
                    <View style={{ top: "5%" }}>
                      <FlatList
                        data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, itemIndex) => `${itemIndex}`}
                        renderItem={({ item }) => renderAppsFav_sp(item)}
                        contentContainerStyle={{
                          borderWidth: 1,
                          marginRight: wp(2.3),
                          // marginTop: hp(3),
                          borderColor: "#00000017",
                          borderRadius: wp(3),
                        }}
                      />
                    </View>
                    <View style={{ top: "5%" }}>
                      <FlatList
                        data={dataApps.slice(Math.ceil(dataApps.length / 2))}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, itemIndex) => `${itemIndex}`}
                        renderItem={({ item }) => renderAppsFav_sp(item)}
                        contentContainerStyle={{
                          borderWidth: 1,
                          marginRight: wp(2.3),
                          // marginBottom: hp(3),
                          borderColor: "#00000017",
                          borderRadius: wp(3),
                        }}
                      />
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={modalVisible_e}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible_e(false)}
      >
        <View style={styles.modalContainer1}>
          <View style={styles.modalContent1}>
            <View style={{ marginTop: hp(-3), height: hp(30) }}>
              {isLoading ? (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ActivityIndicator size="large" color="#FACA4E" />
                </View>
              ) : (
                <>
                  <View style={styles.leftContent1}>
                    <Text style={styles.leftText1}>Favorite Apps</Text>
                    <View style={{ left: "100%" }}>
                      <TouchableOpacity
                        onPress={handleSave_e}
                        style={{ height: 30, width: 30, paddingLeft: 4 }}
                      >
                        <Ionicons
                          name="checkmark-sharp"
                          size={24}
                          color="#FACA4E"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ flex: 1, bottom: "15%" }}>
                    <View style={{ top: "5%" }}>
                      <FlatList
                        data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, itemIndex) => `${itemIndex}`}
                        renderItem={({ item }) => renderAppsFav_e(item)}
                        contentContainerStyle={{
                          borderWidth: 1,
                          marginRight: wp(2.3),
                          // marginTop: hp(3),
                          borderColor: "#00000017",
                          borderRadius: wp(3),
                        }}
                      />
                    </View>
                    <View style={{ top: "5%" }}>
                      <FlatList
                        data={dataApps.slice(Math.ceil(dataApps.length / 2))}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, itemIndex) => `${itemIndex}`}
                        renderItem={({ item }) => renderAppsFav_e(item)}
                        contentContainerStyle={{
                          borderWidth: 1,
                          marginRight: wp(2.3),
                          // marginBottom: hp(3),
                          borderColor: "#00000017",
                          borderRadius: wp(3),
                        }}
                      />
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={modalVisible_d}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible_d(false)}
      >
        <View style={styles.modalContainer1}>
          <View style={styles.modalContent1}>
            <View style={{ marginTop: hp(-3), height: hp(30) }}>
              {isLoading ? (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ActivityIndicator size="large" color="#FACA4E" />
                </View>
              ) : (
                <>
                  <View style={styles.leftContent1}>
                    <Text style={styles.leftText1}>Favorite Apps</Text>
                    <View style={{ left: "100%" }}>
                      <TouchableOpacity
                        onPress={handleSave_d}
                        style={{ height: 30, width: 30, paddingLeft: 4 }}
                      >
                        <Ionicons
                          name="checkmark-sharp"
                          size={24}
                          color="#FACA4E"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ flex: 1, bottom: "15%" }}>
                    <View style={{ top: "5%" }}>
                      <FlatList
                        data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, itemIndex) => `${itemIndex}`}
                        renderItem={({ item }) => renderAppsFav_d(item)}
                        contentContainerStyle={{
                          borderWidth: 1,
                          marginRight: wp(2.3),
                          // marginTop: hp(3),
                          borderColor: "#00000017",
                          borderRadius: wp(3),
                        }}
                      />
                    </View>
                    <View style={{ top: "5%" }}>
                      <FlatList
                        data={dataApps.slice(Math.ceil(dataApps.length / 2))}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, itemIndex) => `${itemIndex}`}
                        renderItem={({ item }) => renderAppsFav_d(item)}
                        contentContainerStyle={{
                          borderWidth: 1,
                          marginRight: wp(2.3),
                          // marginBottom: hp(3),
                          borderColor: "#00000017",
                          borderRadius: wp(3),
                        }}
                      />
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={modalVisible_fd}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible_fd(false)}
      >
        <View style={styles.modalContainer1}>
          <View style={styles.modalContent1}>
            <View style={{ marginTop: hp(-3), height: hp(30) }}>
              {isLoading ? (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ActivityIndicator size="large" color="#FACA4E" />
                </View>
              ) : (
                <>
                  <View style={styles.leftContent1}>
                    <Text style={styles.leftText1}>Favorite Apps</Text>
                    <View style={{ left: "100%" }}>
                      <TouchableOpacity
                        onPress={handleSave_fd}
                        style={{ height: 30, width: 30, paddingLeft: 4 }}
                      >
                        <Ionicons
                          name="checkmark-sharp"
                          size={24}
                          color="#FACA4E"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ flex: 1, bottom: "15%" }}>
                    <View style={{ top: "5%" }}>
                      <FlatList
                        data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, itemIndex) => `${itemIndex}`}
                        renderItem={({ item }) => renderAppsFav_fd(item)}
                        contentContainerStyle={{
                          borderWidth: 1,
                          marginRight: wp(2.3),
                          // marginTop: hp(3),
                          borderColor: "#00000017",
                          borderRadius: wp(3),
                        }}
                      />
                    </View>
                    <View style={{ top: "5%" }}>
                      <FlatList
                        data={dataApps.slice(Math.ceil(dataApps.length / 2))}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, itemIndex) => `${itemIndex}`}
                        renderItem={({ item }) => renderAppsFav_fd(item)}
                        contentContainerStyle={{
                          borderWidth: 1,
                          marginRight: wp(2.3),
                          // marginBottom: hp(3),
                          borderColor: "#00000017",
                          borderRadius: wp(3),
                        }}
                      />
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={modalVisible_sm}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible_sm(false)}
      >
        <View style={styles.modalContainer1}>
          <View style={styles.modalContent1}>
            <View style={{ marginTop: hp(-3), height: hp(30) }}>
              {isLoading ? (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ActivityIndicator size="large" color="#FACA4E" />
                </View>
              ) : (
                <>
                  <View style={styles.leftContent1}>
                    <Text style={styles.leftText1}>Favorite Apps</Text>
                    <View style={{ left: "100%" }}>
                      <TouchableOpacity
                        onPress={handleSave_sm}
                        style={{ height: 30, width: 30, paddingLeft: 4 }}
                      >
                        <Ionicons
                          name="checkmark-sharp"
                          size={24}
                          color="#FACA4E"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ flex: 1, bottom: "15%" }}>
                    <View style={{ top: "5%" }}>
                      <FlatList
                        data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, itemIndex) => `${itemIndex}`}
                        renderItem={({ item }) => renderAppsFav_sm(item)}
                        contentContainerStyle={{
                          borderWidth: 1,
                          marginRight: wp(2.3),
                          // marginTop: hp(3),
                          borderColor: "#00000017",
                          borderRadius: wp(3),
                        }}
                      />
                    </View>
                    <View style={{ top: "5%" }}>
                      <FlatList
                        data={dataApps.slice(Math.ceil(dataApps.length / 2))}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, itemIndex) => `${itemIndex}`}
                        renderItem={({ item }) => renderAppsFav_sm(item)}
                        contentContainerStyle={{
                          borderWidth: 1,
                          marginRight: wp(2.3),
                          // marginBottom: hp(3),
                          borderColor: "#00000017",
                          borderRadius: wp(3),
                        }}
                      />
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={modalVisible_mw}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible_mw(false)}
      >
        <View style={styles.modalContainer1}>
          <View style={styles.modalContent1}>
            <View style={{ marginTop: hp(-3), height: hp(30) }}>
              {isLoading ? (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ActivityIndicator size="large" color="#FACA4E" />
                </View>
              ) : (
                <>
                  <View style={styles.leftContent1}>
                    <Text style={styles.leftText1}>Favorite Apps</Text>
                    <View style={{ left: "100%" }}>
                      <TouchableOpacity
                        onPress={handleSave_mw}
                        style={{ height: 30, width: 30, paddingLeft: 4 }}
                      >
                        <Ionicons
                          name="checkmark-sharp"
                          size={24}
                          color="#FACA4E"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ flex: 1, bottom: "15%" }}>
                    <View style={{ top: "5%" }}>
                      <FlatList
                        data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, itemIndex) => `${itemIndex}`}
                        renderItem={({ item }) => renderAppsFav_mw(item)}
                        contentContainerStyle={{
                          borderWidth: 1,
                          marginRight: wp(2.3),
                          // marginTop: hp(3),
                          borderColor: "#00000017",
                          borderRadius: wp(3),
                        }}
                      />
                    </View>
                    <View style={{ top: "5%" }}>
                      <FlatList
                        data={dataApps.slice(Math.ceil(dataApps.length / 2))}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, itemIndex) => `${itemIndex}`}
                        renderItem={({ item }) => renderAppsFav_mw(item)}
                        contentContainerStyle={{
                          borderWidth: 1,
                          marginRight: wp(2.3),
                          // marginBottom: hp(3),
                          borderColor: "#00000017",
                          borderRadius: wp(3),
                        }}
                      />
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={modalVisible_g}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible_g(false)}
      >
        <View style={styles.modalContainer1}>
          <View style={styles.modalContent1}>
            <View style={{ marginTop: hp(-3), height: hp(30) }}>
              {isLoading ? (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ActivityIndicator size="large" color="#FACA4E" />
                </View>
              ) : (
                <>
                  <View style={styles.leftContent1}>
                    <Text style={styles.leftText1}>Favorite Apps</Text>
                    <View style={{ left: "100%" }}>
                      <TouchableOpacity
                        onPress={handleSave_g}
                        style={{ height: 30, width: 30, paddingLeft: 4 }}
                      >
                        <Ionicons
                          name="checkmark-sharp"
                          size={24}
                          color="#FACA4E"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ flex: 1, bottom: "15%" }}>
                    <View style={{ top: "5%" }}>
                      <FlatList
                        data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, itemIndex) => `${itemIndex}`}
                        renderItem={({ item }) => renderAppsFav_g(item)}
                        contentContainerStyle={{
                          borderWidth: 1,
                          marginRight: wp(2.3),
                          // marginTop: hp(3),
                          borderColor: "#00000017",
                          borderRadius: wp(3),
                        }}
                      />
                    </View>
                    <View style={{ top: "5%" }}>
                      <FlatList
                        data={dataApps.slice(Math.ceil(dataApps.length / 2))}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, itemIndex) => `${itemIndex}`}
                        renderItem={({ item }) => renderAppsFav_g(item)}
                        contentContainerStyle={{
                          borderWidth: 1,
                          marginRight: wp(2.3),
                          // marginBottom: hp(3),
                          borderColor: "#00000017",
                          borderRadius: wp(3),
                        }}
                      />
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={modalVisible_em}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible_em(false)}
      >
        <View style={styles.modalContainer1}>
          <View style={styles.modalContent1}>
            <View style={{ marginTop: hp(-3), height: hp(30) }}>
              {isLoading ? (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ActivityIndicator size="large" color="#FACA4E" />
                </View>
              ) : (
                <>
                  <View style={styles.leftContent1}>
                    <Text style={styles.leftText1}>Favorite Apps</Text>
                    <View style={{ left: "100%" }}>
                      <TouchableOpacity
                        onPress={handleSave_em}
                        style={{ height: 30, width: 30, paddingLeft: 4 }}
                      >
                        <Ionicons
                          name="checkmark-sharp"
                          size={24}
                          color="#FACA4E"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ flex: 1, bottom: "15%" }}>
                    <View style={{ top: "5%" }}>
                      <FlatList
                        data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, itemIndex) => `${itemIndex}`}
                        renderItem={({ item }) => renderAppsFav_em(item)}
                        contentContainerStyle={{
                          borderWidth: 1,
                          marginRight: wp(2.3),
                          // marginTop: hp(3),
                          borderColor: "#00000017",
                          borderRadius: wp(3),
                        }}
                      />
                    </View>
                    <View style={{ top: "5%" }}>
                      <FlatList
                        data={dataApps.slice(Math.ceil(dataApps.length / 2))}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, itemIndex) => `${itemIndex}`}
                        renderItem={({ item }) => renderAppsFav_em(item)}
                        contentContainerStyle={{
                          borderWidth: 1,
                          marginRight: wp(2.3),
                          // marginBottom: hp(3),
                          borderColor: "#00000017",
                          borderRadius: wp(3),
                        }}
                      />
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginHorizontal: wp(3),
    backgroundColor: "white",
  },
  bannerview: {
    height: hp(15),
    marginTop: hp(2),
    marginBottom: hp(1),
    alignSelf: "center",
    resizeMode: "cover",
    width: "100%",
    borderRadius: wp(2),
    paddingHorizontal: wp(5),
  },
  TopBannerView:{
    height:'100%', width:'100%', borderWidth:1, borderColor:'gray',  borderRadius: 10, flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerBlur: {
    flex: 1,
    backgroundColor: "rgba(234,233,238)",
    //backgroundColor: 'white'
  },
  searchBar: {
    height: hp(5.9),
    marginTop: hp(3),
    flex: 1,
    backgroundColor: "#F2F2F2",
    flexDirection: "row",
    alignItems: "center",
    //marginLeft: wp(3.8),
    borderRadius: wp(5),
    borderWidth: 0.5,
    borderColor: "#00000017",
  },
  // latestSearchList: {
  //   // marginTop: hp(2.1),
  //   height: hp(7),
  //   marginLeft: wp(5),
  // },

  searchHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: hp(5),
    marginHorizontal: wp(8),
    height: hp(8),
    //borderWidth: 3,
  },
  latestSearch: {
    fontFamily: "Inter",
    fontWeight: "bold",
    fontSize: wp(4.3),
    marginTop: hp(2),
    marginLeft: wp(10),
    color: "#595959",
  },
  // latestSearchList: {
  //   marginTop: hp(2.1),
  //   height: hp(7),
  //   //marginLeft: wp(5),
  // },
  searchesDetails: {
    flexDirection: "row",
    marginLeft: wp(3),
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#F2F2F2",
    borderRadius: wp(5),
  },
  textSearchDetails: {
    fontFamily: "Inter",
    fontWeight: "700",
    fontSize: hp(1.8),
  },
  textHeader: {
    fontSize: wp(5.7),
    color: "#333333",
    fontFamily: "Inter",
    fontWeight: "bold",
  },

  // Category Styles
  items: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //borderWidth: 1,
    borderColor: "black",
    padding: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  overlayButton: {
    backgroundColor: "#FACA4E",
    padding: 10,
    alignItems: "center",
    //marginHorizontal: wp(5),
    justifyContent: "center",
    marginTop: hp(5),
    borderRadius: 5,
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },

  modalContent: {
    //   width: '80%',
    //justifyContent:'center',
    //alignItems:'center',
    //borderWidth:3,
    //backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backgroundColor: "transparent",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },

  modalContentCross: {
    position: "absolute",
    backgroundColor: "white",
    top: 18,
    zIndex: 999,
    right: 16,
    width: wp(10),
    height: wp(10),
    borderRadius: wp(10),
    justifyContent: "center",
    alignItems: "center",
  },
  //---------------\\

  //video styles
  latestSearchListVideo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp(2.1),
    height: hp(7),
    marginLeft: wp(5),
    //borderWidth: 3,
  },
  ti: {
    marginHorizontal: "7%",
    marginTop: "5%",
    width: 300,
    backgroundColor: "white",
    fontSize: wp(4),
    paddingLeft: "2%",
    borderRadius: 10,
  },
  textInputSelectedCategory: {
    borderWidth: 1,
    borderRadius: wp(3),
    width: "98%",
    borderColor: "#FACA4E",

    paddingHorizontal: 20,
    paddingVertical: 6.8,
    marginBottom: 20,
    marginTop: hp(3),
  },
  textInputCategoryNonSelected: {
    borderWidth: 1,
    borderRadius: wp(3),
    width: "98%",
    borderColor: "#E7EAF2",
    paddingHorizontal: 20,
    paddingVertical: 6.8,
    marginBottom: 20,
    marginTop: hp(3),
  },
  iconStyle: {
    color: "#C4C4C4",
    width: 20,
    height: 20,
  },
  iconStyleInactive: {
    color: "#FACA4E",
  },
  maintext: {
    fontSize: hp(2.3),
    color: "#303030",
    fontWeight: "bold",
  },
  modaltextview: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: wp(90),
    borderRadius: 25,
    backgroundColor: "white",
    paddingHorizontal: wp(15),
  },
  optiontext: {
    fontSize: hp(1.7),
    color: "#303030",
    marginLeft: wp(4),
  },
  nonselectedItems: {
    width: wp(35),
    justifyContent: "space-evenly",
    alignItems: "center",
    height: hp(14),
    borderRadius: wp(1.8),
    borderWidth: 1,
    borderColor: "#E7EAF2",
  },
  selectedItems: {
    width: wp(35),
    justifyContent: "space-evenly",
    alignItems: "center",
    height: hp(14),
    borderRadius: wp(1.8),
    borderWidth: 1,
    borderColor: "#FACA4E",
  },

  // Disc Styles
  searchesDetailsDisc: {
    flexDirection: "row",
    marginLeft: wp(3),
    alignItems: "center",
    justifyContent: "center",
    width: wp(25),
    backgroundColor: "#F2F2F2",
    borderRadius: wp(5),
    height: hp(5),
  },
  latestSearchListDisc: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp(2.1),
    height: hp(7),
    marginHorizontal: wp(8),
    //marginLeft: wp(5),
    //borderWidth: 3,
  },

  //---------------\\

  // Pic tour styles

  latestSearchListPicss: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp(2.1),
    height: hp(7),
    marginLeft: wp(5),
    //borderWidth: 3,
  },

  //----------------\\
  //Market Zone

  latestSearchListMarket: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp(2.1),
    height: hp(7),
    marginLeft: wp(5),
    //borderWidth: 3,
  },
  latestSearchList: {
    flexDirection: "row",
    alignItems: "center",
    // marginTop: hp(1),
    height: hp(7),
  },
  searchesDetailsCategory: {
    flexDirection: "row",
    marginLeft: wp(3),
    alignItems: "center",
    justifyContent: "center",
    width: wp(30),
    backgroundColor: "#F2F2F2",
    borderRadius: wp(5),
    height: hp(5),
  },
  // ///////////////////////////

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },

  modalContent: {
    //   width: '80%',
    //justifyContent:'center',
    //alignItems:'center',
    //borderWidth:3,
    //backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backgroundColor: "transparent",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },

  modalContentCross: {
    position: "absolute",
    backgroundColor: "white",
    top: 18,
    zIndex: 999,
    right: 16,
    width: wp(10),
    height: wp(10),
    borderRadius: wp(10),
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent1: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    elevation: 5,
    height: "40%",
  },
  leftContent1: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    top: "10%",
  },
  leftText1: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  rightContent1: {
    marginLeft: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  additionalContentContainer: {
    marginTop: 10,
    height: hp(25),
    borderWidth: 1,
    borderColor: "#00000017",
    borderRadius: wp(3),
    justifyContent: "center",
  },
  flatListContainer: {
    paddingHorizontal: wp(2.3),
    marginTop: hp(3),
  },
});
