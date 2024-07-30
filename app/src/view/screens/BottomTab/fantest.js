// import {
//     StyleSheet,
//     FlatList,
//     Image,
//     ActivityIndicator,
//     StatusBar,
//     TouchableOpacity,
//     ScrollView,
//     TextInput,
//     Text,
//     View,
//   } from "react-native";
//   import React, { useState, useEffect, useRef } from "react";
//   import {
//     heightPercentageToDP as hp,
//     widthPercentageToDP,
//     widthPercentageToDP as wp,
//   } from "react-native-responsive-screen";
//   import Fontiso from "react-native-vector-icons/Fontisto";
//   import Entypo from "react-native-vector-icons/Entypo";
//   import Ionicons from "react-native-vector-icons/Ionicons";
//   import RBSheet from "react-native-raw-bottom-sheet";
//   import Camera from "../../../assets/svg/Camera.svg";
//   import Gallery from "../../../assets/svg/Gallery.svg";
//   import AsyncStorage from "@react-native-async-storage/async-storage";
//   import { useIsFocused } from "@react-navigation/native";
  
//   import Headers from "../../../assets/Custom/Headers";
//   import { appImages } from "../../../assets/utilities";
//   import Add from "../../../assets/svg/AddMainScreen.svg";
//   import { base_url } from "../../../../../baseUrl";
//   import { launchCamera, launchImageLibrary } from "react-native-image-picker";
//   export default function Fans_star({ navigation }) {
//     const [data, setData] = useState(null);
  
//     const [authToken, setAuthToken] = useState("");
  
//     const [dataElectronics, setDataElectronics] = useState(null);
  
//     const isFocused = useIsFocused();
  
//     const [dataVehicles, setDataVehicles] = useState(null);
  
//     const [dataClothing, setDataClothing] = useState(null);
  
//     //const [regions, setRegions] = useState(null);
  
//     const [regions, setRegions] = useState(null);
  
//     const [loading, setLoading] = useState(false);
  
//     const [categoriesSelect, setCategorySelect] = useState([]);
  
//     const [snackBarVisible, setSnackbarVisible] = useState(false);
  
//     const [dataTopVideos, setDataTopVideos] = useState([]);
  
//     const ref_RBSheetCamera = useRef(null);
//     const [imageUri, setImageUri] = useState(null);
//     const [imageInfo, setImageInfo] = useState(null);
//     const RegionArea = [
//       "Sports",
//       "Live",
//       "Showbiz",
//       "Business",
//       "Politics",
//       "Science and tech",
//     ];
//     const [selectedItemId, setSelectedItemId] = useState(RegionArea[0]);
  
//     const [select_live, setSelect_live] = useState(null);
//     const [selectedCategory, setSelectedCategory] = useState(null);
  
//     const handleCategorySelect = (category) => {
//       setSelectedCategory(category);
//     };
//     useEffect(() => {
//       // Make the API request and update the 'data' state
//       if (selectedItemId === null) {
//         setSelectedItemId("Africa");
//       } else {
//         fetchVideos();
//       }
//     }, [selectedItemId, isFocused]);
  
//     const fetchVideos = async () => {
//       // Simulate loading
//       setLoading(true);
//       // Fetch data one by one
  
//       await getUserID();
  
//       await fetchAll();
  
//       await fetchTopVideos();
  
//       await fetchElectronics();
  
//       await fetchVehicles();
  
//       await fetchClothing();
//       // Once all data is fetched, set loading to false
//       setLoading(false);
//     };
  
//     const getUserID = async () => {
//       // console.log('AT User Id');
//       try {
//         const result = await AsyncStorage.getItem("authToken ");
//         if (result !== null) {
//           setAuthToken(result);
//           //await fetchRegion(result);
//           await fetchCategory(result);
//           console.log("user id retrieved:", result);
//         }
//       } catch (error) {
//         // Handle errors here
//         console.error("Error retrieving user ID:", error);
//       }
//     };
  
//     /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
//     // useEffect(() => {
//     //   const getAuthToken = async () => {
//     //     try {
//     //       const token = await AsyncStorage.getItem("authToken ");
//     //       if (token) {
//     //         setAuthToken(token);
//     //       } else {
//     //         throw new Error("No auth token found");
//     //       }
//     //     } catch (err) {
//     //       console.error("Error retrieving auth token:", err);
//     //       setError(err);
//     //     }
//     //   };
  
//     //   getAuthToken();
//     // }, []);
  
//     // useEffect(() => {
//     //   if (authToken && isFocused) {
//     //     if(selectedItemId == null)
//     //       // console.log('useeffect mein id hai', selectedItemId)
//     //       {
//     //         setSelectedItemId(29)
//     //       }
  
//     //     // fetchAllData();
//     //     fetchAllCinematicsCategory();
//     //   }
//     // }, [authToken]);
  
//     // useEffect(() => {
//     //   if (authToken) {
//     //     fetchAllData();
//     //   }
//     // }, [authToken, selectedItemId]);
  
//     // const fetchAllData = async () => {
//     //   setLoading(true);
//     //   setNoData(false);
//     //   try {
//     //     // await fetchAllCinematicsCategory();
//     //     await fetchTopVideos();
//     //     await fetchSubCategory(selectedItemId);
//     //   } catch (error) {
//     //     console.error("Error fetching data:", error);
//     //   } finally {
//     //     setLoading(false);
//     //   }
//     // };
  
//     // const fetchAllCinematicsCategory = async () => {
//     //   //console.log("Categry in id", selectedItemId)
//     //   const token = authToken;
  
//     //   try {
//     //     const response = await fetch(
//     //       base_url + "cinematics/category/getAll?page=1&limit=100",
//     //       {
//     //         method: "GET",
//     //         headers: {
//     //           Authorization: `Bearer ${token}`,
//     //         },
//     //       }
//     //     );
  
//     //     const result = await response.json();
//     //     // console.log("AllCategories---", result.AllCategories);
//     //     setData(result.AllCategories); // Update the state with the fetched data
//     //   } catch (error) {
//     //     console.error("Error Trending:", error);
//     //   }
//     // };
  
//     // const fetchTopVideos = async () => {
//     //    // console.log("Categry in id", selectedItemId);
//     //    const token = authToken;
  
//     //    try {
//     //      const response = await fetch(
//     //        base_url + "cinematics/getTopVideo",
//     //        {
//     //          method: "GET",
//     //          headers: {
//     //            Authorization: `Bearer ${token}`,
//     //          },
//     //        }
//     //      );
  
//     //      const result = await response.json();
//     //     //  console.log("getTopVideo------..", result.data);
//     //      setDataTopVideos(result.data);
//     //    } catch (error) {
//     //      console.error("Error Trending:", error);
//     //    }
//     // };
  
//     // const fetchSubCategory = async (selectedItemId) => {
//     //   const token = authToken;
  
//     //   try {
//     //     const response = await fetch(
//     //       `${base_url}cinematics/getByCategory/${selectedItemId}?page=1&limit=1000`,
//     //       {
//     //         method: "GET",
//     //         headers: {
//     //           Authorization: `Bearer ${token}`,
//     //         },
//     //       }
//     //     );
  
//     //     const result = await response.json();
  
//     //     if (Array.isArray(result.data) && result.data.length > 0) {
//     //       const formattedSections = result.data.map(category => ({
//     //         title: category.sub_category_name,
//     //         data: category.video_result.videos,
//     //       }));
  
//     //       // console.log('results---', formattedSections);
//     //       setSections(formattedSections);
  
//     //       // Check if there is no data
//     //       const hasNoData = formattedSections.every(section => section.data.length === 0);
//     //       setNoData(hasNoData);
//     //     } else {
//     //       setSections([]);
//     //       setNoData(true);
//     //     }
//     //   } catch (error) {
//     //     console.error("Error fetching subcategories:", error);
//     //     setNoData(true);  // Assume no data on error
//     //   }
//     // };
  
//     // const renderVideoItem = ({ item }) => (
//     //   // <TouchableOpacity onPress={handle_details}>
//     //   <TouchableOpacity onPress={() => navigation.navigate('Cinematics_details', {videoData: item})}>
//     //   <View style={styles.itemContainer}>
//     //     {/* <Image source={require('../../../assets/images/img1.png')} style={styles.image} /> */}
//     //     <Image source={{ uri: item.thumbnail }} style={styles.image} />
//     //     <Text style={styles.text}>{item.name}</Text>
//     //     <Text style={styles.text1}>{item.description}</Text>
//     //   </View>
//     // </TouchableOpacity>
//     // );
  
//     // const renderSection = ({ item }) => (
//     //   <View style={styles.sectionContainer}>
//     //     <Text style={styles.sectionHeader}>{item.title}</Text>
//     //     {item.data.length === 0 ? (
//     //       <Text style={styles.noDataText}>No Data available</Text>
//     //     ) : (
//     //     <FlatList
//     //       data={item.data}
//     //       renderItem={renderVideoItem}
//     //       keyExtractor={(videoItem) => videoItem.video_id.toString()}
//     //       horizontal
//     //       showsHorizontalScrollIndicator={false}
//     //     />
//     //   )}
//     //   </View>
//     // );
  
//     ////////////////////////////////////////////////////////////////////////////////////////////////
//     const fetchAll = async () => {
//       //console.log("Categry in id", selectedItemId)
//       const token = authToken;
  
//       try {
//         const response = await fetch(
//           base_url + "item/getAllItems?page=1&limit=2",
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
  
//         const result = await response.json();
//         console.log("AllItems", result.AllItems);
//         setData(result.AllItems); // Update the state with the fetched data
//       } catch (error) {
//         console.error("Error Trending:", error);
//       }
//     };
  
//     const fetchElectronics = async () => {
//       console.log("Categry in id", selectedItemId);
//       const token = authToken;
  
//       try {
//         const response = await fetch(
//           base_url +
//             `item/getAllItemByCategory/5?page=1&limit=5&region=${selectedItemId}`,
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
  
//         const result = await response.json();
//         console.log(" s", result.AllItems);
//         setDataElectronics(result.AllItems); // Update the state with the fetched data
//       } catch (error) {
//         console.error("Error Trending:", error);
//       }
//     };
  
//     const fetchVehicles = async () => {
//       //console.log("Categry in id", selectedItemId)
//       const token = authToken;
  
//       try {
//         const response = await fetch(
//           base_url +
//             `item/getAllItemByCategory/6?page=1&limit=5&region=${selectedItemId}`,
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
  
//         const result = await response.json();
//         console.log("AllItems", result.AllItems);
//         setDataVehicles(result.AllItems); // Update the state with the fetched data
//       } catch (error) {
//         console.error("Error Trending:", error);
//       }
//     };
  
//     const fetchTopVideos = async () => {
//       const token = authToken;
  
//       try {
//         const response = await fetch(base_url + `top/app/top_item`, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
  
//         const result = await response.json();
//         console.log(
//           "Resultings of Top Market Place",
//           result.topitem[0]?.images[0]?.image
//         );
//         setDataTopVideos(result.topitem[0]); // Update the state with the fetched data
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };
  
//     const fetchClothing = async () => {
//       //console.log("Categry in id", selectedItemId)
//       const token = authToken;
  
//       try {
//         const response = await fetch(
//           base_url +
//             `item/getAllItemByCategory/12?page=1&limit=5&region=${selectedItemId}`,
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
  
//         const result = await response.json();
//         console.log("AllItems", result.AllItems);
//         setDataClothing(result.AllItems); // Update the state with the fetched data
//       } catch (error) {
//         console.error("Error Trending:", error);
//       }
//     };
  
//     const fetchRegion = async (resultId) => {
//       //console.log("Categry in id", selectedItemId)
//       const token = resultId;
  
//       try {
//         const response = await fetch(base_url + "region/getAllRegion", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
  
//         const result = await response.json();
//         console.log("AllItems", result.allRegion);
//         setRegions(result.allRegion); // Update the state with the fetched data
  
//         // await fetchCategory(resultId);
//       } catch (error) {
//         console.error("Error Trending:", error);
//       }
//     };
//     const fetchCategory = async (result) => {
//       console.log(" Categories Result", result);
//       const token = result;
  
//       try {
//         const response = await fetch(
//           base_url + "itemCategory/getAllItemCategories?page=1&limit=5",
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
  
//         if (response.ok) {
//           const data = await response.json();
  
//           console.log("Data ", data);
  
//           // Use the data from the API to set the categories
//           const categories = data.AllCategories.map((category) => ({
//             label: category.name, // Use the "name" property as the label
//             value: category.id.toString(), // Convert "id" to a string for the value
//           }));
  
//           setCategorySelect(categories); // Update the state with the formatted category data
  
//           console.log("Data Categories", categoriesSelect);
//         } else {
//           console.error(
//             "Failed to fetch categories:",
//             response.status,
//             response.statusText
//           );
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };
//     const handle_add = () => {
//       ref_RBSheetCamera.current.open();
//     };
//     const dataCinematics = [
//       {
//         id: 1,
//         image: require("../../../assets/images/img1.png"),
//         title: "Name here",
//         time: "5 days ago",
//       },
//       {
//         id: 2,
//         image: require("../../../assets/images/img2.png"),
//         title: "Name here",
//         time: "5 days ago",
//       },
//       {
//         id: 3,
//         image: require("../../../assets/images/img3.png"),
//         title: "Name here",
//         time: "5 days ago",
//       },
//     ];
  
//     const handle_details = () => {
//       navigation.navigate("Fans_star_details");
//     };
//     const renderItem = ({ item }) => (
//       <TouchableOpacity onPress={handle_details}>
//         <View style={styles.itemContainer}>
//           <Image source={item.image} style={styles.image} />
//           <Text style={styles.text}>{item.title}</Text>
//           <Text style={styles.text1}>{item.time}</Text>
//         </View>
//       </TouchableOpacity>
//     );
  
//     const searches = [
//       { id: 1, title: "Africa" },
//       { id: 2, title: "Europe" },
//       { id: 3, title: "N America" },
//       { id: 4, title: "L. America" },
//       { id: 5, title: "Asia" },
//       { id: 6, title: "Middle East" },
//       { id: 7, title: "Carribean" },
//     ];
  
//     const handleUpdatePassword = async () => {
//       // Perform the password update logic here
//       // For example, you can make an API request to update the password
  
//       // Assuming the update was successful
//       setSnackbarVisible(true);
  
//       // Automatically hide the Snackbar after 3 seconds
//       setTimeout(() => {
//         setSnackbarVisible(false);
//       }, 3000);
//     };
  
//     const goToScreen = () => {
//       ref_RBSheetCamera.current.close();
  
//       navigation.navigate("Sell");
//     };
  
//     const takePhotoFromCamera = async (value) => {
//       ref_RBSheetCamera.current.close();
  
//       launchCamera(
//         {
//           mediaType: "photo",
//           //videoQuality: 'medium',
//         },
//         (response) => {
//           console.log("image here", response);
//           if (!response.didCancel) {
//             if (response.assets && response.assets.length > 0) {
//               setImageUri(response.assets[0].uri);
//               setImageInfo(response.assets[0]);
  
//               console.log("response", response.assets[0].uri);
//               navigation.navigate("Fans_star_upload", {
//                 imageUri: response.assets[0].uri,
//               });
//             } else if (response.uri) {
//               // Handle the case when no assets are present (e.g., for videos)
//               setImageUri(response.uri);
//               console.log("response", response.uri);
//               navigation.navigate("Fans_star_upload", {
//                 imageUri: response.assets[0].uri,
//               });
//             }
//           }
//         }
//       );
//     };
  
//     const choosePhotoFromLibrary = (value) => {
//       ref_RBSheetCamera.current.close();
  
//       // setSelectedItem(value);
//       launchImageLibrary({ mediaType: "photo" }, (response) => {
//         console.log("image here", response);
//         if (!response.didCancel && response.assets.length > 0) {
//           setImageUri(response.assets[0].uri);
//           setImageInfo(response.assets[0]);
//         }
  
//         console.log("response", imageUri);
//         navigation.navigate("Fans_star_upload", {
//           imageUri: response.assets[0].uri,
//         });
//       });
//     };
//     const takeVideoFromCamera = async () => {
//       ref_RBSheetCamera.current.close();
  
//       launchCamera(
//         {
//           mediaType: "video",
//         },
//         (response) => {
//           console.log("video here", response);
//           if (!response.didCancel) {
//             if (response.assets && response.assets.length > 0) {
//               setImageUri(response.assets[0].uri);
//               setImageInfo(response.assets[0]);
  
//               console.log("response", response.assets[0].uri);
//               navigation.navigate("Fans_star_upload", {
//                 imageUri: response.assets[0].uri,
//               });
//             }
//           }
//         }
//       );
//     };
  
//     const chooseVideoFromLibrary = () => {
//       ref_RBSheetCamera.current.close();
  
//       launchImageLibrary({ mediaType: "video" }, (response) => {
//         console.log("video here", response);
//         if (!response.didCancel && response.assets.length > 0) {
//           setImageUri(response.assets[0].uri);
//           setImageInfo(response.assets[0]);
//           navigation.navigate("Fans_star_upload", {
//             imageUri: response.assets[0].uri,
//           });
//         }
//       });
//     };
//     const renderAvailableAppsMarket = (item) => {
//       console.log("Items of market zone", item?.images[0]?.image);
//       return (
//         <TouchableOpacity
//           onPress={() =>
//             navigation.navigate("ProductDetails", { ProductDetails: item })
//           }
//           style={{ width: wp(25.5), margin: 5 }}
//         >
//           <View>
//             {!item?.images[0]?.image ||
//             item?.images[0]?.image === "undefined" ||
//             item?.images[0]?.image.startsWith("/") ? (
//               <Image
//                 style={{
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   zIndex: 1,
//                   width: "100%",
//                   height: hp(12),
//                   borderRadius: wp(1),
//                   resizeMode: "cover",
//                 }}
//                 source={appImages.galleryPlaceHolder}
//               />
//             ) : (
//               <Image
//                 style={{
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
  
//                   zIndex: 1, // Ensure it's on top of other elements
//                   //flex: 1,
//                   width: "100%",
//                   height: hp(16),
//                   borderRadius: wp(2.5),
//                   resizeMode: "cover",
//                 }}
//                 source={{ uri: item?.images[0]?.image }}
//               />
//             )}
//           </View>
  
//           <View
//             style={{
//               position: "absolute",
//               top: hp(12),
//               left: 7,
//               //height: hp(3),
//               //width: wp(21),
//               //borderRadius: wp(3),
//               //backgroundColor: '#FACA4E',
//               justifyContent: "center",
//               alignItems: "center",
//               zIndex: 2, // Ensure it's on top
//             }}
//           >
//             <Text
//               style={{
//                 fontSize: hp(1.7),
//                 fontFamily: "Inter",
//                 color: "black",
//                 fontWeight: "700",
//               }}
//             >
//               {item?.title}
//             </Text>
//           </View>
//         </TouchableOpacity>
//       );
//     };
  
//     const renderAvailableApps = (item) => {
//       console.log("Items of market zone", item?.images[0]?.image);
//       return (
//         <TouchableOpacity
//           onPress={() =>
//             navigation.navigate("ProductDetails", { ProductDetails: item })
//           }
//           style={{ width: wp(25.5), margin: 5 }}
//         >
//           <View>
//             {!item?.images[0]?.image ||
//             item?.images[0]?.image === "undefined" ||
//             item?.images[0]?.image.startsWith("/") ? (
//               <Image
//                 style={{
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   zIndex: 1,
//                   width: "100%",
//                   height: hp(12),
//                   borderRadius: wp(1),
//                   resizeMode: "cover",
//                 }}
//                 source={appImages.galleryPlaceHolder}
//               />
//             ) : (
//               <Image
//                 style={{
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
  
//                   zIndex: 1, // Ensure it's on top of other elements
//                   //flex: 1,
//                   width: "100%",
//                   height: hp(16),
//                   borderRadius: wp(2.5),
//                   resizeMode: "cover",
//                 }}
//                 source={{ uri: item?.images[0]?.image }}
//               />
//             )}
//           </View>
  
//           <View
//             style={{
//               position: "absolute",
//               top: hp(12),
//               left: 7,
//               //height: hp(3),
//               //width: wp(21),
//               //borderRadius: wp(3),
//               //backgroundColor: '#FACA4E',
//               justifyContent: "center",
//               alignItems: "center",
//               zIndex: 2, // Ensure it's on top
//             }}
//           >
//             <Text
//               style={{
//                 fontSize: hp(1.7),
//                 fontFamily: "Inter",
//                 color: "black",
//                 fontWeight: "700",
//               }}
//             >
//               {item?.title}
//             </Text>
//           </View>
//         </TouchableOpacity>
//       );
//     };
  
//     const renderSearches = (item) => {
//       const isSelected = selectedItemId === item;
  
//       return (
//         <TouchableOpacity
//           style={[
//             styles.searchesDetails,
//             {
//               backgroundColor: isSelected ? "#FACA4E" : "#F2F2F2",
//             },
//           ]}
//           onPress={() => handleCategorySelect(item)}
//         >
//           <Text
//             style={[
//               styles.textSearchDetails,
//               { color: isSelected ? "#232323" : "#939393" },
//             ]}
//           >
//             {item}
//           </Text>
//         </TouchableOpacity>
//       );
//     };
  
//     const goto_camera = () => {
//       navigation.navigate("CameraView");
//     };
//     const handle_add_live = () => {
//       navigation.navigate("Live_upload");
//     };
//     return (
//       <View style={styles.container}>
//         <StatusBar
//           translucent={true}
//           backgroundColor="transparent"
//           barStyle="dark-content" // You can set the StatusBar text color to dark or light
//         />
  
//         <View style={{ marginTop: hp(5) }}>
//           <Headers
//             OnpresshowHome={() => {
//               navigation.navigate("Dashboard");
//             }}
//             showHome={true}
//             showText={true}
//             onPressSearch={() => navigation.navigate("SearchProducts")}
//             text={"Fans-Stars Zone"}
//             showSearch={true}
//           />
//         </View>
  
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           style={{
//             flex: 1,
//             marginTop: hp(1),
//             marginHorizontal: wp(8),
//           }}
//         >
//           <View
//             style={{
//               height: hp(18),
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <Image
//               style={{ width: wp(80), resizeMode: "contain" }}
//               source={appImages.bannerAds}
//             />
//           </View>
//           <View style={styles.latestSearchList}>
//             <FlatList
//               style={{ flex: 1 }}
//               contentContainerStyle={{ alignItems: "center" }}
//               showsHorizontalScrollIndicator={false}
//               horizontal
//               //data={regions}
//               data={RegionArea}
//               //keyExtractor={item => item.id.toString()}
//               renderItem={({ item }) => renderSearches(item)}
//             />
//           </View>
//           {selectedCategory === "Live" ? (
//             <>
//               <View></View>
//             </>
//           ) : (
//             <>
//               <View
//                 style={{
//                   marginTop: hp(1.5),
//                   flexDirection: "row",
//                   height: hp(16),
//                 }}
//               >
//                 <View
//                   style={{ width: wp(43), height: "100%", borderRadius: wp(5) }}
//                 >
//                   {dataTopVideos.length === 0 ? (
//                     <Image
//                       style={{
//                         position: "absolute",
//                         top: 0,
//                         left: 0,
//                         zIndex: 1, // Ensure it's on top of other elements
//                         //flex: 1,
//                         width: "100%",
//                         height: "100%",
//                         borderRadius: wp(3),
//                         resizeMode: "cover",
//                       }}
//                       source={appImages.galleryPlaceHolder}
//                     />
//                   ) : (
//                     <Image
//                       style={{
//                         position: "absolute",
//                         top: 0,
//                         left: 0,
//                         zIndex: 1, // Ensure it's on top of other elements
//                         //flex: 1,
//                         width: "100%",
//                         height: "100%",
//                         borderRadius: wp(3),
//                         resizeMode: "cover",
//                       }}
//                       source={{ uri: dataTopVideos?.images[0]?.image }}
//                     />
//                   )}
//                   <View
//                     style={{
//                       position: "absolute",
//                       top: hp(12),
//                       left: 7,
//                       //height: hp(3),
//                       //width: wp(21),
//                       //borderRadius: wp(3),
//                       //backgroundColor: '',
//                       justifyContent: "center",
//                       alignItems: "center",
//                       zIndex: 2, // Ensure it's on top
//                     }}
//                   >
//                     <Text
//                       ellipsizeMode="tail"
//                       numberOfLines={1}
//                       style={{
//                         fontSize: hp(2.5),
//                         fontFamily: "Inter-Medium",
//                         color: "black",
//                         fontWeight: "700",
//                       }}
//                     >
//                       {dataTopVideos?.item_name}
//                     </Text>
//                   </View>
//                 </View>
  
//                 <View style={{ justifyContent: "flex-end", width: "50%" }}>
//                   <Text
//                     style={{
//                       fontSize: hp(1.5),
//                       marginLeft: wp(1),
//                       lineHeight: hp(2),
//                       fontFamily: "Inter-Regular",
//                       color: "#000000",
//                       //fontWeight: '700',
//                     }}
//                   >
//                     {/*  Explore the intricate web of global politics in this
//                 thought-provoking video as we delve into the ever-shifting
//                 landscape of international diplomacy...... */}
  
//                     {dataTopVideos === undefined || dataTopVideos.length === 0
//                       ? "No Top Pic Shown"
//                       : dataTopVideos?.description}
//                   </Text>
//                 </View>
//               </View>
  
//               <View>
//                 <Text
//                   style={{
//                     fontWeight: "bold",
//                     color: "#4A4A4A",
//                     fontSize: hp(2),
//                     textAlign: "left",
//                     fontFamily: "Inter",
//                     top: "5%",
//                   }}
//                 >
//                   Latest Stories
//                 </Text>
//                 <View style={{ margin: "4%" }}></View>
//                 <FlatList
//                   data={dataCinematics}
//                   renderItem={renderItem}
//                   keyExtractor={(item) => item.id.toString()}
//                   horizontal={true}
//                   showsHorizontalScrollIndicator={false}
//                   contentContainerStyle={styles.flatListContent}
//                 />
//               </View>
//               <View>
//                 <Text
//                   style={{
//                     fontWeight: "bold",
//                     color: "#4A4A4A",
//                     fontSize: hp(1.9),
//                     textAlign: "left",
//                     fontFamily: "Inter",
//                     top: "5%",
//                   }}
//                 >
//                   Fun and Joy
//                 </Text>
//                 <View style={{ margin: "4%" }}></View>
//                 <FlatList
//                   data={dataCinematics}
//                   renderItem={renderItem}
//                   keyExtractor={(item) => item.id.toString()}
//                   horizontal={true}
//                   showsHorizontalScrollIndicator={false}
//                   contentContainerStyle={styles.flatListContent}
//                 />
//               </View>
//               <View>
//                 <Text
//                   style={{
//                     fontWeight: "bold",
//                     color: "#4A4A4A",
//                     fontSize: hp(2),
//                     textAlign: "left",
//                     fontFamily: "Inter",
//                     top: "6%",
//                   }}
//                 >
//                   Events & Shows
//                 </Text>
//                 <View style={{ margin: "4%" }}></View>
//                 <FlatList
//                   data={dataCinematics}
//                   renderItem={renderItem}
//                   keyExtractor={(item) => item.id.toString()}
//                   horizontal={true}
//                   showsHorizontalScrollIndicator={false}
//                   contentContainerStyle={styles.flatListContent}
//                 />
//               </View>
//               <View>
//                 <Text
//                   style={{
//                     fontWeight: "bold",
//                     color: "#4A4A4A",
//                     fontSize: hp(2),
//                     textAlign: "left",
//                     fontFamily: "Inter",
//                     top: "6%",
//                   }}
//                 >
//                   All Others
//                 </Text>
//                 <View style={{ margin: "4%" }}></View>
//                 <FlatList
//                   data={dataCinematics}
//                   renderItem={renderItem}
//                   keyExtractor={(item) => item.id.toString()}
//                   horizontal={true}
//                   showsHorizontalScrollIndicator={false}
//                   contentContainerStyle={styles.flatListContent}
//                 />
//               </View>
//             </>
//           )}
//         </ScrollView>
//         {selectedCategory === "Live" ? (
//           <>
//             <TouchableOpacity
//               onPress={handle_add_live}
//               style={{ position: "absolute", bottom: 1, right: 25 }}
//             >
//               <Add />
//             </TouchableOpacity>
//           </>
//         ) : (
//           <>
//             <TouchableOpacity
//               onPress={handle_add}
//               style={{ position: "absolute", bottom: 1, right: 25 }}
//             >
//               <Add />
//             </TouchableOpacity>
//           </>
//         )}
//         <RBSheet
//           ref={ref_RBSheetCamera}
//           closeOnDragDown={true}
//           closeOnPressMask={false}
//           animationType="fade"
//           minClosingHeight={0}
//           customStyles={{
//             wrapper: {
//               backgroundColor: "rgba(52, 52, 52, 0.5)",
//             },
//             draggableIcon: {
//               backgroundColor: "white",
//             },
//             container: {
//               borderTopLeftRadius: wp(10),
//               borderTopRightRadius: wp(10),
//               height: hp(39),
//             },
//           }}
//         >
//           <View
//             style={{
//               flexDirection: "row",
//               justifyContent: "space-between",
//               marginHorizontal: wp(8),
//               alignItems: "center",
//             }}
//           >
//             <Text
//               style={{
//                 fontFamily: "Inter-Medium",
//                 color: "#303030",
//                 fontSize: hp(2.3),
//               }}
//             >
//               Select an option
//             </Text>
//             <TouchableOpacity onPress={() => ref_RBSheetCamera.current.close()}>
//               <Ionicons
//                 name="close"
//                 size={22}
//                 color={"#303030"}
//                 onPress={() => ref_RBSheetCamera.current.close()}
//               />
//             </TouchableOpacity>
//           </View>
  
//           <View
//             style={{
//               //flexDirection: 'row',
//               justifyContent: "space-evenly",
//               //alignItems: 'center',
//               //borderWidth: 3,
//               marginTop: hp(3),
//             }}
//           >
//             <TouchableOpacity
//               onPress={() => goToScreen()}
//               style={{ flexDirection: "row", marginHorizontal: wp(7) }}
//             >
//               <Text
//                 style={{
//                   fontFamily: "Inter-Regular",
//                   color: "#656565",
//                   marginLeft: wp(3),
//                   fontSize: hp(2.1),
//                 }}
//               >
//                 Phones And Electronics
//               </Text>
//             </TouchableOpacity>
  
//             <View
//               style={{
//                 height: hp(0.1),
//                 marginHorizontal: wp(8),
//                 marginTop: hp(3),
//                 backgroundColor: "#00000012",
//               }}
//             ></View>
  
//             <TouchableOpacity
//               onPress={() => goToScreen()}
//               style={{
//                 flexDirection: "row",
//                 marginTop: hp(1.8),
//                 marginHorizontal: wp(7),
//               }}
//             >
//               <Text
//                 style={{
//                   fontFamily: "Inter-Regular",
//                   color: "#656565",
//                   marginLeft: wp(3),
//                   fontSize: hp(2.1),
//                 }}
//               >
//                 Vehicle Parts
//               </Text>
//             </TouchableOpacity>
  
//             <View
//               style={{
//                 height: hp(0.1),
//                 marginHorizontal: wp(8),
//                 marginTop: hp(3),
//                 backgroundColor: "#00000012",
//               }}
//             ></View>
  
//             <TouchableOpacity
//               onPress={() => goToScreen()}
//               style={{
//                 flexDirection: "row",
//                 marginTop: hp(1.8),
//                 marginHorizontal: wp(7),
//               }}
//             >
//               <Text
//                 style={{
//                   fontFamily: "Inter-Regular",
//                   color: "#656565",
//                   marginLeft: wp(3),
//                   fontSize: hp(2.1),
//                 }}
//               >
//                 Clothing and Related item
//               </Text>
//             </TouchableOpacity>
  
//             <View
//               style={{
//                 height: hp(0.1),
//                 marginTop: hp(1.8),
//                 marginHorizontal: wp(8),
//                 marginTop: hp(3),
//                 backgroundColor: "#00000012",
//               }}
//             ></View>
  
//             <TouchableOpacity
//               onPress={() => goToScreen()}
//               style={{
//                 flexDirection: "row",
//                 marginTop: hp(1.8),
//                 marginHorizontal: wp(7),
//               }}
//             >
//               <Text
//                 style={{
//                   fontFamily: "Inter-Regular",
//                   color: "#656565",
//                   marginLeft: wp(3),
//                   fontSize: hp(2.1),
//                 }}
//               >
//                 All other items
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </RBSheet>
  
//         <RBSheet
//           ref={ref_RBSheetCamera}
//           closeOnDragDown={true}
//           closeOnPressMask={false}
//           animationType="fade"
//           minClosingHeight={0}
//           customStyles={{
//             wrapper: {
//               backgroundColor: "rgba(52, 52, 52, 0.5)",
//             },
//             draggableIcon: {
//               backgroundColor: "white",
//             },
//             container: {
//               borderTopLeftRadius: wp(10),
//               borderTopRightRadius: wp(10),
//               height: hp(25),
//             },
//           }}
//         >
//           <View
//             style={{
//               flexDirection: "row",
//               justifyContent: "space-between", // Set to space between to separate text and icon
//               marginHorizontal: wp(8),
//               alignItems: "center",
//             }}
//           >
//             <Text
//               style={{
//                 fontWeight: "bold",
//                 textAlign: "left",
//                 color: "black",
//                 fontSize: hp(2.1),
//               }}
//             >
//               Select an option
//             </Text>
//             <TouchableOpacity onPress={() => ref_RBSheetCamera.current.close()}>
//               <Ionicons
//                 name="close"
//                 size={23}
//                 color={"#303030"}
//                 onPress={() => ref_RBSheetCamera.current.close()}
//               />
//             </TouchableOpacity>
//           </View>
  
//           <View
//             style={{
//               top: "1%",
//               flex: 1,
//               marginHorizontal: wp(8),
//               marginBottom: hp(1),
//               flexDirection: "row",
//               justifyContent: "space-between",
//             }}
//           >
//             <TouchableOpacity
//               onPress={() => takeVideoFromCamera("Camera")}
//               // onPress={goto_camera}
//               style={{
//                 alignItems: "center",
//                 justifyContent: "center",
//                 flex: 1,
//                 borderRadius: 10,
//                 borderColor: "#FACA4E",
//                 borderWidth: 1,
//               }}
//             >
//               <View style={{ marginLeft: wp(3) }}>
//                 <Camera width={21} height={21} />
//               </View>
  
//               <Text
//                 style={{
//                   color: "grey",
//                   marginLeft: wp(3),
//                   // fontWeight: "600",
//                   fontSize: hp(2.1),
//                 }}
//               >
//                 Take a Video
//               </Text>
//             </TouchableOpacity>
  
//             <TouchableOpacity
//               onPress={() => chooseVideoFromLibrary("gallery")}
//               style={{
//                 alignItems: "center",
//                 justifyContent: "center", // Center the icon and text vertically
//                 flex: 1,
//                 borderRadius: 10,
//                 borderColor: "grey",
//                 borderWidth: 1,
//                 marginLeft: wp(8), // Add margin to separate the options
//               }}
//             >
//               <View style={{ marginLeft: wp(3) }}>
//                 <Gallery width={21} height={21} />
//               </View>
  
//               <Text
//                 style={{
//                   color: "grey",
//                   marginLeft: wp(3),
//                   fontWeight: "600",
//                   fontFamily: "BebasNeue-Regular",
//                   fontSize: hp(2.1),
//                 }}
//               >
//                 Choose a Video
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </RBSheet>
//       </View>
//     );
//   }
  
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: "white",
//     },
//     searchBar: {
//       height: hp(5.9),
//       marginTop: hp(3),
//       flex: 1,
//       backgroundColor: "#F2F2F2",
//       flexDirection: "row",
//       alignItems: "center",
//       //marginLeft: wp(3.8),
//       borderRadius: wp(5),
//       borderWidth: 0.5,
//       borderColor: "#00000017",
//     },
//     latestSearchList: {
//       flexDirection: "row",
//       alignItems: "center",
//       marginTop: hp(2.1),
//       height: hp(7),
//       // marginLeft: wp(1),
//       //borderWidth: 3,
//     },
//     searchHeader: {
//       flexDirection: "row",
//       alignItems: "center",
//       justifyContent: "space-evenly",
//       marginTop: hp(5),
//       marginHorizontal: wp(8),
//       height: hp(8),
//       //borderWidth: 3,
//     },
//     latestSearch: {
//       fontFamily: "Inter",
//       fontWeight: "bold",
//       fontSize: wp(4.3),
//       marginTop: hp(2),
//       marginLeft: wp(10),
//       color: "#595959",
//     },
//     searchesDetails: {
//       flexDirection: "row",
//       marginLeft: wp(3),
//       alignItems: "center",
//       justifyContent: "center",
//       width: wp(30),
//       backgroundColor: "#F2F2F2",
//       borderRadius: wp(5),
//       height: hp(5),
//     },
//     textSearchDetails: {
//       fontFamily: "Inter",
//       fontWeight: "700",
//       fontSize: hp(1.8),
//     },
//     textHeader: {
//       fontSize: wp(5.7),
//       color: "#333333",
//       fontFamily: "Inter",
//       fontWeight: "bold",
//     },
//     itemContainer: {
//       marginRight: wp(2),
//       alignItems: "center",
//     },
//     image: {
//       width: wp(35),
//       height: hp(12),
//       resizeMode: "cover",
//       borderRadius: 10,
//     },
//     text: {
//       fontWeight: "700",
//       color: "#4A4A4A",
//       fontSize: hp(1.8),
//       // textAlign: 'left',
//       fontFamily: "Inter",
//       marginTop: 5,
//       fontSize: hp(1.9),
//       right: "20%",
//     },
//     text1: {
//       // fontWeight: 'bold',
//       color: "#4A4A4A",
//       fontSize: hp(1.3),
//       // textAlign: 'left',
//       fontFamily: "Inter",
//       // marginTop: 5,
//       right: "25%",
//     },
//     flatListContent: {
//       paddingHorizontal: wp(2),
//     },
//   });
  