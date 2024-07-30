import {
  StyleSheet,
  FlatList,
  Text,
  Image,
  ScrollView,
  Platform,
  ActivityIndicator,
  TextInput,
  StatusBar,
  PermissionsAndroid,
  ImageBackground,
  View,
  TouchableOpacity,
} from "react-native";
import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from "react";

import Back from "../../../assets/svg/back.svg";

import { appImages } from "../../../assets/utilities/index";
import Slider from "@react-native-community/slider";
import VolumeUp from "../../../assets/svg/VolumeUp.svg";
import Like from "../../../assets/svg/Like.svg";
import UnLike from "../../../assets/svg/Unlike.svg";
import Comment from "../../../assets/svg/Comment.svg";
import Send from "../../../assets/svg/Send.svg";
import Download from "../../../assets/svg/Download.svg";
import DownArrowComments from "../../../assets/svg/DownArrowComments.svg";
import UpArrowComments from "../../../assets/svg/UpArrowComments.svg";

import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Share from "react-native-share";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import Fontiso from "react-native-vector-icons/Fontisto";
import RBSheet from "react-native-raw-bottom-sheet";
import FontAwsome from "react-native-vector-icons/FontAwesome";

import AntDesign from "react-native-vector-icons/AntDesign";

import IonIcons from "react-native-vector-icons/Ionicons";

import ButtonSend from "../../../assets/svg/ButtonSend.svg";

import Video from "react-native-video";

import SmileEmoji from "../../../assets/svg/SmileEmoji.svg";

import EmojiPicker from "rn-emoji-keyboard";

import axios from "axios";

import RNFetchBlob from "rn-fetch-blob";
import { useIsFocused } from "@react-navigation/native";
import Entypo from "react-native-vector-icons/Entypo";
import CustomSnackbar from "../../../assets/Custom/CustomSnackBar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { base_url } from "../../../../../baseUrl";

export default function Kids_vid_details({ navigation, route }) {
  const [showFullContent, setShowFullContent] = useState(false);

  const [pastedURL, setPastedURL] = useState(
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  );

  const [comments, setComments] = useState([]);

  const [likes, setLikes] = useState(null);

  const [mute, setMute] = useState(false);

  const [paused, setPaused] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const [authToken, setAuthToken] = useState("");

  const [commentsCount, setCommentsCount] = useState(null);

  const [showReply, setShowReply] = useState(false);

  const [loading, setLoading] = useState(false);

  const [userId, setUserId] = useState("");

  const [showLikes, setShowLikes] = useState(false);

  const [showMenu, setShowMenu] = useState(false);

  const [progress, setProgress] = useState(0);

  const [totalDuration, setTotalDuration] = useState("");

  const [isBottomSheetExpanded, setIsBottomSheetExpanded] = useState(false);
  const isFocused = useIsFocused();
  const ref_Comments = useRef(null);

  const refSlide = useRef();

  const bottomSheetRef = useRef(null);
  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const [snackbarVisible, setsnackbarVisible] = useState(false);

  const [commentText, setCommentText] = useState(null); // State variable to hold the text
  const refCommentsSheet = useRef();
  useEffect(() => {
    // This code will run whenever progress state changes
    if (progress && progress.seekableDuration !== undefined) {
      // Assuming progress.seekableDuration is the duration in seconds
      const formattedDuration = formatDuration(progress.seekableDuration);
      // Do something with formattedDuration, such as setting it in another state
      // setFormattedDuration(formattedDuration);
      // console.log('Formatted Duration:', formattedDuration);

      setTotalDuration(formattedDuration);
    }
  }, [progress]); // The effect will re-run whenever the progress state changes

  const receivedData = route.params?.videoData;

  console.log("Data Recieved on", receivedData.total_likes);

  var details = receivedData.description;
  /* 'Hold onto your seats and get ready to be mesmerized by the beauty and grandeur of the Hold onto your seats'; */

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const toggleContentLike = () => {
    setShowLikes(!showLikes);
    sendLikes();
  };

  const openEmoji = () => {
    console.log("Is Open");
    setIsOpen(true);
    console.log("Is Open", isOpen);
  };

  const toggleMute = () => {
    setMute(!mute);
  };

  const togglePaused = () => {
    setPaused(!paused);
  };
  const shareViaWhatsApp = async () => {
    const shareOptions = {
      title: "Share via",
      message: "Hey! Check out this video!",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      //social: Share.Social,
    };

    try {
      await Share.open(shareOptions);
    } catch (error) {
      console.error("Error sharing via WhatsApp:", error.message);
    }
  };

  useEffect(() => {
    // Make the API request and update the 'data' state
    if (isFocused) {
      //  console.log('isfucesd')
      fetchAll();
    }
  }, [isFocused]);

  const fetchAll = async () => {
    // Simulate loading
    setLoading(true);
    // Fetch data one by one

    await getUserID();
    //await fetchComments();
    //await fetchLikes();
    // await fetchCommentsCounts();

    // Once all data is fetched, set loading to false
    setLoading(false);
  };

  const getUserID = async () => {
    // console.log("Id's");
    try {
      const result = await AsyncStorage.getItem("userId ");
      if (result !== null) {
        setUserId(result);
        // console.log('user id retrieved:', result);
      } else {
        console.log("user id null:", result);
      }

      const result1 = await AsyncStorage.getItem("authToken ");
      if (result1 !== null) {
        setAuthToken(result1);

        console.log("user token retrieved:", result1);
        await fetchComments(result1);
      } else {
        console.log("result is null", result);
      }
    } catch (error) {
      // Handle errors here
      console.error("Error retrieving user ID:", error);
    }
  };

  const fetchComments = async (result) => {
    const token = result;

    try {
      const response = await fetch(
        base_url +
          `kidVids/getComments/${receivedData.video_id}?page=1&limit=100000`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        // totalComments
        // setCommentsCount(data.totalComments)
        // console.log("All Comments of usersssss", data.totalComments)
        // console.log("All Comments of usersssss", data.comments)
        setCommentsCount(data.totalComments);
        setComments(data.comments);
        // await fetchLikes(result);
      } else {
        console.error(
          "Failed to fetch comments:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchLikes = async (result) => {
    const token = result;

    try {
      const response = await fetch(
        base_url + `xpi/getAllLikesByVideo/${receivedData.video_id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("All Likes", data.totalLikes);
        setLikes(data.totalLikes);
        // await fetchCommentsCounts(result);
      } else {
        console.error(
          "Failed to fetch categories:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchCommentsCounts = async (value) => {
    const token = value;

    try {
      const response = await fetch(
        base_url +
          `kidVids/getComments/${receivedData.video_id}?page=1&limit=100000`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        // console.log("All Comments", data.totalComments);
        // setCommentsCount(data.totalComments);

        // await fetchSpecificVideo(value);
      } else {
        console.error(
          "Failed to fetch categories:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //----------------------------------\\

  const fetchSpecificVideo = async (result) => {
    console.log("GET SPECIFIC VIDEO CALLED", result);
    const token = result;

    try {
      const response = await fetch(
        base_url +
          `xpi/getSpecificVideo/${receivedData?.video_id}?user_id=${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        //console.log("All Comments of usersssss", data.AllComents)
        console.log("video Is liked or not>>>>>>>>", data.Video);
        // setShowLikes(data?.Video?.is_liked)
      } else {
        console.error(
          "Failed to fetch categories:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //------------------------------------\\

  const dismissSnackbar = () => {
    setsnackbarVisible(false);
  };

  const handleUpdatePassword = async () => {
    // Perform the password update logic here
    // For example, you can make an API request to update the password

    // Assuming the update was successful
    // setsnackbarVisible(true);

    // Automatically hide the Snackbar after 3 seconds
    setTimeout(() => {
      setsnackbarVisible(false);

      if (pastedURL !== "") {
        requestStoragePermission();
      } else {
        //console.log("Please Add Video Url")
      }

      //navigation.goBack();
    }, 3000);
  };

  const clearTextInput = () => {
    //console.log('came to logssssss', commentText);
    // Clear the text in the TextInput
    setCommentText(null);
    sendComment();
  };

  const copyAssetVideo = async () => {
    try {
      const videoAssetPath = "../../../assets/images/DummyVideo.mp4"; // Adjust the path to your asset
      const videoFileName = "CopiedVideo.mp4"; // Choose a name for the copied video

      const assetData = RNFetchBlob.asset(videoAssetPath);
      const destinationPath = `${RNFetchBlob.fs.dirs.DownloadDir}/${videoFileName}`;

      await assetData.copyFile(destinationPath);

      //ToastAndroid.show('Video copied successfully', ToastAndroid.SHORT);
      //console.log('Copied video path:', destinationPath);
    } catch (error) {
      console.error("Error copying asset video:", error);
      //ToastAndroid.show('Failed to copy video', ToastAndroid.LONG);
    }
  };

  const chats = [
    {
      id: 1,
      name: "John Doe",
      message: "The laughter in this video is contagious!",
      reply: false,
    },
    {
      id: 2,
      name: "Olivia Bennett",
      message: "I wish I had a friend group like this. You all are incredible!",
      reply: false,
    },
    {
      id: 3,
      name: "Ethan Rodriguez",
      message:
        "This video just made my day! Thanks for sharing your awesome moments.",
      reply: false,
    },
    {
      id: 4,
      name: "Mia Bennett",
      message: "Friendship goals right there! Love how close you all are",
      reply: false,
    },
    {
      id: 5,
      name: "Liam Sullivan",
      message:
        "Looks like you guys are having an absolute blast! Wish I could join in on the fun",
      reply: false,
    },
  ];

  const handlePick = (emojiObject) => {
    console.log("Emoji Object", emojiObject);
    //setIsOpen(false)
    setCommentText(emojiObject.emoji);

    /* example emojiObject = {
        "emoji": "❤️",
        "name": "red heart",
        "slug": "red_heart",
        "unicode_version": "0.6",
      }
    */
  };

  const sendComment = async () => {
    setLoading(true);
    const token = authToken; // Replace with your actual token

    try {
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const commentData = {
        video_id: receivedData.video_id,
        user_id: userId,
        comment: commentText,
      };

      const response = await axios.post(
        base_url + "kidVids/addComment",
        commentData,
        axiosConfig
      );

      console.log("Response", response);

      if (response.status === 200) {
        setLoading(false);
        console.log("Comment sent successfully");
        fetchAll();
      } else {
        setLoading(false);
        fetchAll();
        console.error(
          "Failed to send comment:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  const sendLikes = async () => {
    setLoading(true);
    const token = authToken; // Replace with your actual token
    console.log("authToken----", authToken);
    console.log("userid---", userId);
    console.log("video_id---", receivedData.video_id);
    try {
        const axiosConfig = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };

        const commentData = {
            user_id: userId,
            video_id: receivedData.video_id,
        };

        const response = await axios.post(
            base_url + "kidVids/toggleLikeVideo",
            commentData,
            axiosConfig
        );

        console.log("Response", response);

        if (response.status === 200 || response.status === 201) {
            setLoading(false);
            console.log("Video liked successfully");
            fetchAll();
        } else {
            setLoading(false);
            fetchAll();
            console.error(
                "Failed to send likes:",
                response.status,
                response.statusText
            );
        }
    } catch (error) {
        setLoading(false);
        console.error("Error:", error);
    }
};

  // const sendLikes = async () => {
  //   setLoading(true);
  //   const token = authToken; // Replace with your actual token
  //   console.log("authToken----", authToken);
  //   console.log("userid---", userId);
  //   console.log("video_id---", receivedData.video_id);
  //   try {
  //     const axiosConfig = {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     };

  //     const commentData = {
  //       video_id: receivedData.video_id,
  //       user_id: userId,
  //     };

  //     const response = await axios.post(
  //       base_url + "kidVids/toggleLikeVideo",
  //       commentData,
  //       axiosConfig
  //     );

  //     console.log("Response", response);

  //     if (response.status === 200) {
  //       setLoading(false);
  //       console.log("Video Liked  successfully");
  //       fetchAll();
  //     } else {
  //       setLoading(false);
  //       fetchAll();
  //       console.error(
  //         "Failed to send comment:",
  //         response.status,
  //         response.statusText
  //       );
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     console.error("Error:", error);
  //   }
  // };

  const renderComments = (item) => {
    //console.log('Items of comments', item);
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ViewElseProfile", { id: item?.userid })
          }
          style={{
            height: hp(10),
            //borderWidth:3,
            paddingHorizontal: wp(5),
            alignItems: "center",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <View
            style={{
              height: wp(14),
              alignSelf: "center",
              resizeMode: "hidden",
              width: wp(14),
              borderRadius: wp(14),
            }}
          >
            <MaterialCommunityIcons
              style={{ marginTop: hp(0.5) }}
              name={"account-circle"}
              size={50}
              color={"#FACA4E"}
            />

            {/* <Image
              style={{width: '100%', borderRadius: wp(2.1), height: '100%'}}
              source={appImages.profileImg}
            /> */}
          </View>

          <View
            style={{
              //flex: 1,
              marginLeft: wp(3),
              height: hp(5),
              //marginTop: hp(1),
              //borderWidth:3,
              justifyContent: "space-around",
            }}
          >
            <Text
              style={{
                color: "#000000",
                fontFamily: "Inter-Medium",
                fontSize: hp(2.1),
              }}
            >
              {item.username}
            </Text>

            <Text
              style={{
                color: "#4C4C4C",
                fontFamily: "Inter-Regular",
                marginTop: hp(2.1),
                fontSize: hp(1.6),
              }}
            >
              {item.comment}
            </Text>

            {false && (
              <TouchableOpacity
                onPress={() => setShowReply(!showReply)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  //borderWidth:3,
                  height: hp(3),
                  width: wp(21),
                }}
              >
                {showReply === true ? (
                  <UpArrowComments />
                ) : (
                  <DownArrowComments />
                )}

                <Text
                  style={{
                    color: "#FACA4E",
                    fontFamily: "Inter-Regular",
                    marginLeft: wp(1.8),
                    fontSize: hp(1.6),
                  }}
                >
                  2
                </Text>

                <Text
                  style={{
                    color: "#FACA4E",
                    fontFamily: "Inter-Regular",
                    marginLeft: wp(1.3),
                    fontSize: hp(1.6),
                  }}
                >
                  replies
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>

        {showReply && (
          <View
            style={{
              justifyContent: "space-evenly",
              height: hp(15),
              //borderWidth:3,
              marginLeft: wp(20),
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: hp(6),
                width: "100%",
              }}
            >
              <View
                style={{
                  height: wp(10),
                  alignSelf: "center",
                  resizeMode: "hidden",
                  width: wp(10),
                  borderRadius: wp(10),
                }}
              >
                <Image
                  style={{
                    width: "100%",
                    borderRadius: wp(2.1),
                    height: "100%",
                  }}
                  source={appImages.profileImg}
                />
              </View>

              <View style={{ flex: 1, justifyContent: "space-between" }}>
                <Text
                  style={{
                    color: "#000000",
                    fontFamily: "Inter-Regular",
                    marginLeft: wp(1.8),
                    fontSize: hp(1.6),
                  }}
                >
                  Olivia Bennett
                </Text>

                <Text
                  style={{
                    color: "#4C4C4C",
                    fontFamily: "Inter-Regular",
                    marginLeft: wp(2),
                    fontSize: hp(1.3),
                  }}
                >
                  I wish I had a friend group like this. You all are incredible!
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: hp(6),
                width: "100%",
              }}
            >
              <View
                style={{
                  height: wp(10),
                  alignSelf: "center",
                  resizeMode: "hidden",
                  width: wp(10),
                  borderRadius: wp(10),
                }}
              >
                <Image
                  style={{
                    width: "100%",
                    borderRadius: wp(2.1),
                    height: "100%",
                  }}
                  source={appImages.profileImg}
                />
              </View>

              <View style={{ flex: 1, justifyContent: "space-between" }}>
                <Text
                  style={{
                    color: "#000000",
                    fontFamily: "Inter-Regular",
                    marginLeft: wp(1.8),
                    fontSize: hp(1.6),
                  }}
                >
                  Olivia Bennett
                </Text>

                <Text
                  style={{
                    color: "#4C4C4C",
                    fontFamily: "Inter-Regular",
                    marginLeft: wp(2),
                    fontSize: hp(1.3),
                  }}
                >
                  I wish I had a friend group like this. You all are incredible!
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  };

  const videos = require("../../../assets/images/DummyVideo.mp4"); // Reference your asset file here

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Downloader App Storage Permission",
          message:
            "Downloader App needs access to your storage " +
            "so you can download files",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        downloadFile();
      } else {
        console.log("storage permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  function formatDuration(durationInSeconds) {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  const openComments = () => {
    setIsBottomSheetExpanded(!isBottomSheetExpanded);
    refCommentsSheet.current.open();
  };
  // const openComments = () => {
  //   setPaused(true);

  //   setIsBottomSheetExpanded(!isBottomSheetExpanded);
  // };

  const downloadFile = () => {
    const { config, fs } = RNFetchBlob;
    const date = new Date();
    const fileDir = fs.dirs.DownloadDir;
    config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          fileDir +
          "/download_" +
          Math.floor(date.getDate() + date.getSeconds() / 2) +
          ".mp4",
        description: "file download",
      },
    })
      .fetch("GET", receivedData.video, {
        //some headers ..
      })
      .then((res) => {
        setsnackbarVisible(true);
        // the temp file path
        console.log("The file saved to ", res.path());
        // alert('file downloaded successfully ');
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
        // Handle errors if necessary
      });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {/* Add a parent View */}

        {/* Existing components go here */}

        {/* Add the play button View */}
        {!isBottomSheetExpanded && paused === true && (
          <View
            style={{
              position: "absolute",
              top: "50%",
              left: "48%",
              zIndex: 1,
            }}
          >
            <AntDesign name={"pause"} size={35} color={"#FACA4E"} />
          </View>
        )}

        <TouchableOpacity
          onPress={() => togglePaused()}
          style={styles.backgroundVideo}
        >
          <Video
            resizeMode="cover" // Use "cover" to make it cover the entire screen
            repeat={true} // You can set other video props as needed
            ref={refSlide}
            muted={mute}
            paused={paused}
            source={{
              uri: receivedData.video,
            }}
            style={{ height: "100%", width: "100%" }}
            onProgress={(x) => {
              // console.log('Current Progress', x);
              setProgress(x);
            }}
          />
        </TouchableOpacity>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="dark-content" // You can set the StatusBar text color to dark or light
        />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IonIcons name={"chevron-back"} color={"white"} size={25} />
          </TouchableOpacity>

          <Image
            source={appImages.logoTransparent}
            style={{ height: hp(15), width: wp(35), marginLeft: wp(23) }}
            resizeMode="contain"
          />

          {showMenu && (
            <TouchableOpacity style={{ marginLeft: wp(18), marginTop: hp(1) }}>
              <Entypo name={"dots-three-vertical"} size={18} color={"white"} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.bottomView}>
          <View style={{ height: hp(30), marginHorizontal: wp(8) }}>
          <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: hp(5),
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ViewElseProfile", {
                    id: receivedData?.user_id,
                  })
                }
                style={{
                  height: '100%',
                  width:'13%',
                  borderRadius: hp(6) / 2,
                  marginLeft: wp(3),
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                {receivedData?.user_image ? (
                  <Image
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: hp(6) / 2,
                      resizeMode:'cover'
                    }}
                    source={{ uri: receivedData.user_image }}
                  />
                ) : (
                  <MaterialCommunityIcons
                    style={{ marginTop: hp(0.5) }}
                    name={"account-circle"}
                    size={30}
                    color={"#FACA4E"}
                  />
                )}
              </TouchableOpacity>

              <Text style={styles.textProfileName}>
                {receivedData.username}
              </Text>
            </View>
            {/* <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: hp(5),
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ViewElseProfile", {
                    id: receivedData?.user_id,
                  })
                }
                style={{
                  height: hp(10),
                  width: wp(10),
                  borderRadius: wp(8),
                  marginLeft: wp(3),
                  //borderWidth:1,
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <MaterialCommunityIcons
                  style={{ marginTop: hp(0.5) }}
                  name={"account-circle"}
                  size={30}
                  color={"#FACA4E"}
                />

                 <Image
                  style={{
                    flex: 1,
                    width: null,
                    height: null,
                    resizeMode: 'contain',
                  }}
                  source={appImages.profileImg}
                />
              </TouchableOpacity>

              <Text style={styles.textProfileName}>
                {receivedData.username}
              </Text>
            </View> */}

            <ScrollView
              showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
              style={{ flex: 1, marginLeft: wp(5), marginTop: hp(1) }}
              contentContainerStyle={{ verticalLine: false }}
            >
              <Text
                style={{
                  marginTop: hp(1),
                  fontFamily: "Inter",
                  fontSize: hp(1.8),
                  lineHeight: hp(2.1),
                  color: "#FFFFFF",
                }}
              >
                {showFullContent
                  ? details
                  : details.length > 90
                  ? details.substring(0, 90) + "..."
                  : details.slice(0)}
              </Text>

              <TouchableOpacity onPress={toggleContent}>
                <Text
                  style={{
                    fontFamily: "Inter",
                    fontSize: hp(1.8),
                    color: "#FACA4E",
                  }}
                >
                  {details.length > 90
                    ? showFullContent
                      ? "See Less"
                      : "See More"
                    : null}
                </Text>
              </TouchableOpacity>
            </ScrollView>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                height: hp(5),
              }}
            >
              <View
                style={{
                  height: hp(2),
                  width: wp(65),
                  justifyContent: "center",
                }}
              >
                <Slider
                  value={progress.currentTime}
                  minimumValue={0}
                  thumbTintColor="#FACA4E"
                  maximumValue={progress.seekableDuration}
                  minimumTrackTintColor={"#FACA4E"}
                  maximumTrackTintColor={"#F6F6F6"}
                  onValueChange={(x) => {
                    refSlide.current.seek(x);
                  }}
                />
              </View>

              {totalDuration !== "" ? (
                <Text
                  style={{
                    fontFamily: "Inter",
                    fontSize: hp(1.5),
                    color: "#FFFFFF",
                  }}
                >
                  {totalDuration}
                </Text>
              ) : null}
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: hp(5),
                  width: wp(5),
                }}
                onPress={() => toggleMute()}
              >
                {mute === false ? (
                  <FontAwsome name={"volume-up"} size={18} color={"#FACA4E"} />
                ) : (
                  <FontAwsome name={"volume-off"} size={18} color={"#FACA4E"} />
                )}
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                height: hp(8),
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: wp(15),
                  //borderWidth:3,
                  height: hp(5),
                }}
              >
                <TouchableOpacity onPress={toggleContentLike}>
                  {showLikes ? (
                    <Like height={21} width={21} />
                  ) : (
                    <UnLike height={21} width={21} />
                  )}
                </TouchableOpacity>

                <Text
                  style={{
                    fontFamily: "Inter-Regular",
                    fontSize: hp(1.7),
                    marginRight: wp(3),
                    color: "#FFFFFF",
                  }}
                >
                  {receivedData.total_likes}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => openComments()}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: wp(15),
                  height: hp(5),
                }}
              >
                <TouchableOpacity onPress={() => openComments()}>
                  <Comment height={21} width={21} />
                </TouchableOpacity>

                <Text
                  style={{
                    fontFamily: "Inter-Regular",
                    fontSize: hp(1.7),
                    color: "#FFFFFF",
                  }}
                >
                  {commentsCount}
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  width: wp(15),
                  height: hp(5),
                }}
              >
                <TouchableOpacity onPress={() => shareViaWhatsApp()}>
                  <Send height={20} width={20} />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  width: wp(10),
                  height: hp(5),
                }}
              >
                <TouchableOpacity onPress={() => handleUpdatePassword()}>
                  <Download height={20} width={20} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <CustomSnackbar
          message={"success"}
          messageDescription={"Video downloaded successfully"}
          onDismiss={dismissSnackbar} // Make sure this function is defined
          visible={snackbarVisible}
        />

        {/* <RBSheet
        ref={ref_Comments}
        height={330}
        openDuration={250}
        enableOverDrag={false}
        enabledGestureInteraction={false}
        closeOnDragDown={false}
        closeOnPressMask={false}
        customStyles={{
          container: {
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

        <View style={{marginTop: hp(1),flex:1}}>
        <FlatList
          style={{flexGrow:1}}
          showsVerticalScrollIndicator={false}
          data={chats}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => renderComments(item)}
        />
      </View>

      <View style={{width:'100%', flexDirection:'row', alignItems:'center', height:hp(8)}}>
      <TouchableOpacity style={{height:hp(8), justifyContent:'center', alignItems:'center', width:wp(14),}}>
        <SmileEmoji/>
      </TouchableOpacity>

      <TextInput placeholderTextColor={'#848484'} placeholder='Write Comment Here' style={{flex:1, marginLeft:wp(1),}}/>

      <TouchableOpacity>
        <ButtonSend/>
      </TouchableOpacity>
      </View>

        
      </RBSheet> */}

        {/* <BottomSheet
          ref={ref_Comments}
          index={isBottomSheetExpanded ? 0 : -1} // Set to -1 to start with collapsed state
          snapPoints={["65%", "90%"]} // Adjust snap points as needed
          onScroll={(event) => {
            console.log("Event", event);
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
              backgroundColor: "white",
            },
            draggableIcon: {
              backgroundColor: "white",
            },
          }}
        >
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              height: hp(5),
            }}
          >
            <Text
              style={{
                color: "#000000",
                fontFamily: "Inter-Bold",
                fontSize: hp(2.3),
              }}
            >
              Comments
            </Text>
          </View>

          <View style={{ marginTop: hp(1), flex: 1 }}>
            {comments.length === 0 || comments === null ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>No Comments Yet</Text>
              </View>
            ) : (
              <BottomSheetFlatList
                data={comments}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => renderComments(item)}
                extraData={loading}
              />
            )}
          </View>

          {showReply === false ? (
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                height: hp(8),
              }}
            >
              <View
                style={{
                  height: hp(8),
                  justifyContent: "center",
                  alignItems: "center",
                  width: wp(14),
                }}
              >
                <SmileEmoji />
              </View>

              <TextInput
                value={commentText} // Bind the value to the state variable
                onChangeText={(text) => setCommentText(text)} // Update state on text change
                placeholderTextColor={"#848484"}
                placeholder="Write Comment Heressssss"
                style={{ flex: 1, marginLeft: wp(1) }}
              />

              <TouchableOpacity onPress={() => clearTextInput}>
                <ButtonSend />
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                height: hp(8),
              }}
            >
              <View
                onpress={() => setIsOpen(true)}
                style={{
                  height: hp(8),
                  justifyContent: "center",
                  alignItems: "center",
                  width: wp(14),
                }}
              >
                <SmileEmoji />
              </View>

              <TextInput
                value={commentText} // Bind the value to the state variable
                onChangeText={(text) => setCommentText(text)} // Update state on text change
                placeholderTextColor={"#848484"}
                placeholder="Add a reply"
                style={{ flex: 1, marginLeft: wp(1) }}
              />

              <TouchableOpacity onPress={() => clearTextInput()}>
                <ButtonSend />
              </TouchableOpacity>
            </View>
          )}
        </BottomSheet> */}

{/* ///RBSheet Start on 24.6.2024 */}
<RBSheet
          ref={refCommentsSheet}
          height={450}
          openDuration={250}
          closeOnDragDown={true}
          customStyles={{
            container: {
              borderTopLeftRadius: 18,
              borderTopRightRadius: 18,
              paddingTop: 0,
              paddingHorizontal: 0,
              zIndex: 999,
              backgroundColor: "white",
            },
          }}
        >
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              height: hp(5),
            }}
          >
            <Text
              style={{
                color: "#000000",
                fontFamily: "Inter-Bold",
                fontSize: hp(2.3),
              }}
            >
              Comments
            </Text>
          </View>

          <View style={{ marginTop: hp(1), flex: 1 }}>
            {comments.length === 0 || comments === null ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>No Comments Yet</Text>
              </View>
            ) : (
              <FlatList
                data={comments}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => renderComments(item)}
                extraData={loading}
              />
            )}
          </View>


          {loading && (
        <View
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: [{ translateX: -25 }, { translateY: -25 }],
          }}
        >
          <ActivityIndicator size="large" color="#FACA4E" />
        </View>
      )}

          {isBottomSheetExpanded === false ? (
            <View
              style={{
                width: "100%",
                position: "absolute",
                bottom: 0,
                left: 0,
                backgroundColor: "white",
                flexDirection: "row",
                alignItems: "center",
                height: hp(8),
              }}
            >
              <TouchableOpacity
                onPress={() => openEmoji()}
                style={{
                  height: hp(8),
                  justifyContent: "center",
                  alignItems: "center",
                  width: wp(14),
                }}
              >
                <SmileEmoji />
              </TouchableOpacity>

              <TextInput
                value={commentText} // Bind the value to the state variable
                onChangeText={(text) => setCommentText(text)} // Update state on text change
                placeholderTextColor={"#848484"}
                placeholder="Write Comment Here"
                style={{ flex: 1, marginLeft: wp(1) }}
              />

              <TouchableOpacity
                style={{ marginRight: wp(3) }}
                onPress={() => clearTextInput()}
              >
                <ButtonSend />
              </TouchableOpacity>
            </View>
          ) : (
            isBottomSheetExpanded && (
              <View
                style={{
                  width: "100%",
                  backgroundColor: "white",
                  flexDirection: "row",
                  alignItems: "center",
                  height: hp(8),
                }}
              >
                <TouchableOpacity
                  onPress={() => openEmoji()}
                  style={{
                    height: hp(8),
                    justifyContent: "center",
                    alignItems: "center",
                    width: wp(14),
                  }}
                >
                  <SmileEmoji />
                </TouchableOpacity>

                <TextInput
                  value={commentText} // Bind the value to the state variable
                  onChangeText={(text) => setCommentText(text)} // Update state on text change
                  placeholderTextColor={"#848484"}
                  // placeholder="Add a reply"
                  placeholder="Write Comment Here"
                  style={{ flex: 1, marginLeft: wp(1) }}
                />
                <TouchableOpacity style={{ marginRight: wp(3) }} onPress={() => clearTextInput()}>
                  <ButtonSend />
                </TouchableOpacity>
              </View>
            )
          )}

          {/* ///////////////////////// */}

          {/* {showReply === false ? (
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                height: hp(8),
              }}
            >
              <View
                style={{
                  height: hp(8),
                  justifyContent: "center",
                  alignItems: "center",
                  width: wp(14),
                }}
              >
                <SmileEmoji />
              </View>

              <TextInput
                value={commentText} // Bind the value to the state variable
                onChangeText={(text) => setCommentText(text)} // Update state on text change
                placeholderTextColor={"#848484"}
                placeholder="Write Comment Heressssss"
                style={{ flex: 1, marginLeft: wp(1) }}
              />

              <TouchableOpacity onPress={() => clearTextInput}>
                <ButtonSend />
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                height: hp(8),
              }}
            >
              <View
                onpress={() => setIsOpen(true)}
                style={{
                  height: hp(8),
                  justifyContent: "center",
                  alignItems: "center",
                  width: wp(14),
                }}
              >
                <SmileEmoji />
              </View>

              <TextInput
                value={commentText} // Bind the value to the state variable
                onChangeText={(text) => setCommentText(text)} // Update state on text change
                placeholderTextColor={"#848484"}
                placeholder="Add a reply"
                style={{ flex: 1, marginLeft: wp(1) }}
              />

              <TouchableOpacity onPress={() => clearTextInput()}>
                <ButtonSend />
              </TouchableOpacity>
            </View>
          )} */}
        </RBSheet>
{/* RBSheet end */}

        {isOpen === true ? (
          <EmojiPicker
            onEmojiSelected={handlePick}
            open={true}
            onClose={() => setIsOpen(false)}
          />
        ) : null}

        {/* {isBottomSheetExpanded && showReply === false ? (
          <View
            style={{
              width: "100%",
              position: "absolute",
              bottom: 0,
              left: 0,
              backgroundColor: "white",
              flexDirection: "row",
              alignItems: "center",
              height: hp(8),
            }}
          >
            <TouchableOpacity
              onPress={() => openEmoji()}
              style={{
                height: hp(8),
                justifyContent: "center",
                alignItems: "center",
                width: wp(14),
              }}
            >
              <SmileEmoji />
            </TouchableOpacity>

            <TextInput
              value={commentText} // Bind the value to the state variable
              onChangeText={(text) => setCommentText(text)} // Update state on text change
              placeholderTextColor={"#848484"}
              placeholder="Write Comment Here"
              style={{ flex: 1, marginLeft: wp(1) }}
            />

            <TouchableOpacity
              style={{ marginRight: wp(3) }}
              onPress={() => clearTextInput()}
            >
              <ButtonSend />
            </TouchableOpacity>
          </View>
        ) : (
          isBottomSheetExpanded && (
            <View
              style={{
                width: "100%",
                backgroundColor: "white",
                flexDirection: "row",
                alignItems: "center",
                height: hp(8),
              }}
            >
              <View
                style={{
                  height: hp(8),
                  justifyContent: "center",
                  alignItems: "center",
                  width: wp(14),
                }}
              >
                <SmileEmoji />
              </View>

              <TextInput
                value={commentText} // Bind the value to the state variable
                onChangeText={(text) => setCommentText(text)} // Update state on text change
                placeholderTextColor={"#848484"}
                placeholder="Add a reply"
                style={{ flex: 1, marginLeft: wp(1) }}
              />

              <TouchableOpacity onPress={() => clearTextInput()}>
                <ButtonSend />
              </TouchableOpacity>
            </View>
          )
        )} */}
      </View>

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
        {loading && <ActivityIndicator size="large" color="#FACA4E" />}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    height: hp(15),
    marginTop: hp(3),
    alignItems: "center",
    marginHorizontal: wp(8),
  },
  bottomView: {
    flex: 1,
    justifyContent: "flex-end",
    // You can add padding or content to this view as needed.
  },
  textProfileName: {
    color: "#FFFFFF",
    fontSize: hp(2),
    marginLeft: wp(3),
    fontFamily: "Inter",
    fontWeight: "bold",
  },
  backgroundVideo: {
    position: "absolute",
    flex: 1,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
