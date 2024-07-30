import { StyleSheet, Image, TouchableOpacity, Text, View } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import BottomtabNavigation from "./BottomtabNavigation";
import { useNavigation } from "@react-navigation/native";
import HomeActive from "../assets/svg/HomeActive.svg";
import CategoryActive from "../assets/svg/CategoryActive.svg";
import VideoActive from "../assets/svg/VideoActive.svg";
import MailActive from "../assets/svg/MailActive.svg";
import ProfileActive from "../assets/svg/ProfileActive.svg";
import MarketActive from "../assets/svg/MarketActive.svg";
import Cinematiceactive from "../assets/svg/Cinematiceactive.svg";
import AddActive from "../assets/svg/AddActive.svg";
import FansActive from "../assets/svg/FansActive.svg";
import KidsActive from "../assets/svg/KidsActive.svg";
import TVpromaxActive from "../assets/svg/TVpromaxActive.svg";
import PuzzleActive from "../assets/svg/PuzzleActive.svg";
import BlogsActive from "../assets/svg/BlogsActive.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PrivacyPolicyActiveActive from "../assets/svg/PrivacyPolicyActive.svg";
import TermsAndconditionActive from "../assets/svg/TermsAndConditionActive.svg";
import ContactUsActive from "../assets/svg/ContactUsActive.svg";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import RBSheet from "react-native-raw-bottom-sheet";
import EvilIcons from "react-native-vector-icons/EvilIcons";

import { base_url } from "../../../baseUrl";
import { appImages } from "../assets/utilities";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useIsFocused } from "@react-navigation/native";

const Drawer = createDrawerNavigator();
const DrawerNavigation = ({ navigation }) => {
  const [authToken, setAuthToken] = useState(null);
  const [userId, setUserId] = useState("");

  const [name, setName] = useState("");

  const [image, setImage] = useState("");

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  const ref_RBSheetLogout = useRef(null);
  const logOut = async () => {
    ref_RBSheetLogout.current.close();
    console.log("KEYS CALLED");
    try {
      const keysToExclude = ["UserToken", "favouriteData"];
      const keys = await AsyncStorage.getAllKeys();
      const filteredKeys = keys.filter((key) => !keysToExclude.includes(key));
      await AsyncStorage.multiRemove(filteredKeys);
      const remainingKeys = await AsyncStorage.getAllKeys();
      if (remainingKeys.length === keysToExclude.length) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Signin_signup" }],
        });
      } else {
        console.log("Failed To Delete Keys");
      }
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
    }
    navigation.navigate("Signin_signup");
  };

  const CustomDrawerContent = (props) => {
    const navigation = useNavigation();

    ///// // 24.5.2024, to get the user profile drawer mein
    // useEffect(() => {
    //   fetchVideos();
    // }, [isFocused]);

    const fetchVideos = async () => {
      // Simulate loading
      setLoading(true);

      // Fetch data one by one
      await getUserID();
      //await fetchUser();
      setLoading(false);
      // Once all data is fetched, set loading to false
    };

    const getUserID = async () => {
      // console.log("AT User Id");
      try {
        const result = await AsyncStorage.getItem("authToken ");
        if (result !== null) {
          setAuthToken(result);
          await fetchUserId(result);
          // console.log('user token retrieved of profile:', result);
        }

        /* console.log("User Id", userId);
        console.log("authToken", authToken); */
      } catch (error) {
        // Handle errors here
        console.error("Error retrieving user ID:", error);
      }
    };

    const fetchUserId = async (tokens) => {
      // console.log("Token", tokens);
      const result3 = await AsyncStorage.getItem("userId ");
      if (result3 !== null) {
        setUserId(result3);

        // console.log('user id retrieved:', result3);
        fetchUser(tokens, result3);
      } else {
        console.log("result is null", result3);
      }
    };
    const fetchUser = async (tokens, user) => {
      // console.log("Came to fetch Id");
      const token = tokens;

      try {
        const response = await fetch(base_url + `user/getUser/${user}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();
        // console.log("Resultings", result.user);
        setName(result.user.username);
        setImage(result.user.image);
        setEmail(result.user.email);
        // fetchMyVideos(tokens, user);
      } catch (error) {
        console.error("Error USER:", error);
      }
    };
    // ///////user profile end
    return (
      <DrawerContentScrollView
        {...props}
        style={{}}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#ffffff",
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              // height: hp(25),
            }}
          >
            <Image
              source={appImages.logo}
              style={{
                width: hp(25),
                height: hp(13),
                resizeMode: "contain",
                // marginVertical: hp(5),
              }}
            />
          </View>

          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              // marginTop: hp(3),
              height: hp(8),
              // backgroundColor:'red',
              marginBottom: wp(10),
            }}
          >
            {image ? (
              <View
                style={{
                  width: wp(15),
                  marginLeft: wp(0.1),
                  height: wp(15),
                  borderRadius: wp(20) / 2,
                }}
              >
                <Image
                  // source={require("../assets/images/Profile.png")}
                  source={{uri: image}}
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "contain",
                    borderRadius: wp(20) / 2,
                  }}
                />
              </View>
            ) : (
              <EvilIcons
                style={{ marginTop: hp(0.5) }}
                name={"user"}
                size={55}
                color={"#FACA4E"}
              />
            )}
            <View style={{marginLeft:5}}>
              <Text
                style={{
                  fontSize: hp(2.3),
                  //marginLeft: wp(2),
                  // marginTop: hp(1.3),
                  color: "#FACA4E",
                  //fontWeight: 'bold',
                  fontFamily: "Inter-Medium",
                }}
              >
                {name}
              </Text>

              <Text
                style={{
                  fontSize: hp(2),
                  // marginLeft: wp(2),
                  //   /marginTop:hp(0.1),
                  color: "#77838F",
                  //fontWeight: 'bold',
                  fontFamily: "Inter-Regular",
                }}
              >
                {email}
              </Text>
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity
           onPress={() => navigation.navigate('ViewProfile')}
            style={{
              alignItems: "center",
              flexDirection:'row',
              marginBottom: hp(5),
              paddingLeft:wp(9)
            }}
          >
            {image ? (
              <Image source={{ uri: image }} style={styles.profileImgs} />
            ) : (
              <MaterialCommunityIcons
                // style={{ marginTop: hp(0.5) }}
                name={"account-circle"}
                size={35}
                color={"#FACA4E"}
              />
            )}
            <Text style={styles.profileText}>My Profile</Text>
          </TouchableOpacity> */}

          <View style={{ flex: 1 }}>
            <View style={{ marginLeft: 18, marginTop: hp(-5) }}>
              <DrawerItem
                label="Home"
                labelStyle={{
                  color: "#333333",
                  marginLeft: wp(-2.3),
                  fontFamily: "Inter-Medium",
                }}
                onPress={() => navigation.navigate("Home")}
                icon={(focused) => <HomeActive />}
              />
              <DrawerItem
                label="Mass Apps"
                labelStyle={{
                  color: "#333333",
                  marginLeft: wp(-4.3),
                  fontFamily: "Inter-Medium",
                }}
                // onPress={() => navigation.navigate('Category')}
                onPress={() => navigation.navigate("Categories")}
                icon={(focused) => <CategoryActive />}
              />

              <DrawerItem
                label="Video Mania"
                // onPress={() => navigation.navigate('Videos')}
                onPress={() => navigation.navigate("Video")}
                labelStyle={{
                  color: "#333333",
                  marginLeft: wp(-5),
                  fontFamily: "Inter-Medium",
                }}
                icon={(focused) => <VideoActive />}
              />
              <DrawerItem
                label="DISC"
                labelStyle={{
                  color: "#333333",
                  marginLeft: wp(-4),
                  fontFamily: "Inter-Medium",
                }}
                // onPress={() => navigation.navigate('Mail')}
                onPress={() => navigation.navigate("Disc")}
                icon={(focused) => <MailActive />}
              />

              <DrawerItem
                label="Pic Tours"
                labelStyle={{
                  color: "#333333",
                  marginLeft: wp(-2),
                  fontFamily: "Inter-Medium",
                }}
                // onPress={() => navigation.navigate('PicTourss')}
                onPress={() => navigation.navigate("PicTours")}
                icon={(focused) => <ProfileActive />}
              />

              <DrawerItem
                label="Market Zone"
                labelStyle={{
                  color: "#333333",
                  marginLeft: wp(-5),
                  fontFamily: "Inter-Medium",
                }}
                // onPress={() => navigation.navigate('MarketPlace')}
                onPress={() => navigation.navigate("MarketZone")}
                icon={(focused) => <MarketActive />}
              />
              <DrawerItem
                label="Cinematics"
                labelStyle={{
                  color: "#333333",
                  marginLeft: wp(-5),
                  fontFamily: "Inter-Medium",
                }}
                onPress={() => navigation.navigate("Cinematics")}
                icon={(focused) => <Cinematiceactive />}
              />
              <DrawerItem
                label="Fans_star Zone"
                labelStyle={{
                  color: "#333333",
                  marginLeft: wp(-5),
                  fontFamily: "Inter-Medium",
                }}
                onPress={() => navigation.navigate("Fans_star")}
                icon={(focused) => <FansActive />}
              />
              <DrawerItem
                label="Kid-Vids"
                labelStyle={{
                  color: "#333333",
                  marginLeft: wp(-5),
                  fontFamily: "Inter-Medium",
                }}
                // onPress={() => navigation.navigate('Kids-Vids')}
                onPress={() => navigation.navigate("Kids_vid")}
                icon={(focused) => <KidsActive />}
              />
              <DrawerItem
                label="TV Progmax"
                labelStyle={{
                  color: "#333333",
                  marginLeft: wp(-5),
                  fontFamily: "Inter-Medium",
                }}
                onPress={() => navigation.navigate("Tv_Promax")}
                icon={(focused) => <TVpromaxActive />}
              />
              <DrawerItem
                label="Learning & Hobbies"
                labelStyle={{
                  color: "#333333",
                  marginLeft: wp(-5),
                  fontFamily: "Inter-Medium",
                }}
                onPress={() => navigation.navigate("Learning")}
                icon={(focused) => <PuzzleActive />}
              />

              <DrawerItem
                label="Banner Advertisement"
                labelStyle={{
                  color: "#333333",
                  marginLeft: wp(-4.3),
                  fontFamily: "Inter-Medium",
                }}
                onPress={() => navigation.navigate("ViewBanners")}
                icon={(focused) => <AddActive />}
              />

              <DrawerItem
                label="Privacy policy"
                labelStyle={{
                  color: "#333333",
                  marginLeft: wp(-4.1),
                  fontFamily: "Inter-Medium",
                }}
                onPress={() => navigation.navigate("PrivacyPolicy")}
                icon={(focused) => <PrivacyPolicyActiveActive />}
              />

              <DrawerItem
                label="Terms & Condition"
                labelStyle={{
                  color: "#333333",
                  marginLeft: wp(-4.1),
                  fontFamily: "Inter-Medium",
                }}
                onPress={() => navigation.navigate("TermsAndCondition")}
                icon={(focused) => <TermsAndconditionActive />}
              />
              <DrawerItem
                label="Notification"
                labelStyle={{
                  color: "#333333",
                  marginLeft: wp(-4.1),
                  fontFamily: "Inter-Medium",
                }}
                onPress={() => navigation.navigate("Notification")}
                icon={(focused) => (
                  <MaterialIcons
                    color={"#FACA4E"}
                    name="notifications-on"
                    size={25}
                  />
                )}
              />

              <DrawerItem
                label="Contact Us"
                labelStyle={{
                  color: "#333333",
                  marginLeft: wp(-4.1),
                  fontFamily: "Inter-Medium",
                }}
                onPress={() => navigation.navigate("ContactUs")}
                icon={(focused) => <ContactUsActive />}
              />
            </View>
            <View
              style={{
                flex: 1,
                marginTop: hp(3),
                justifyContent: "flex-end",
                alignItems: "center",
                marginBottom: hp(5),
              }}
            >
              <TouchableOpacity
                onPress={() => ref_RBSheetLogout.current.open()}
                style={{
                  width: wp(60),
                  height: 40,
                  backgroundColor: "#FACA4E",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 20,
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    color: "#232323",
                    fontFamily: "Inter-Regular",
                    marginLeft: 10,
                  }}
                >
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </DrawerContentScrollView>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Drawer.Navigator
        screenOptions={{ headerShown: false }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Home" component={BottomtabNavigation} />
      </Drawer.Navigator>
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
            justifyContent: "center",
            alignItems: "center",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingTop: 0,
            padding: 20,
            zIndex: 999,
          },
          draggableIcon: {
            backgroundColor: "transparent",
          },
        }}
      >
        <Image source={appImages.alert} style={{ resizeMode: "contain" }} />
        <Text
          style={[
            styles.txtNotification,
            { marginTop: 1, fontSize: hp(2.5), fontWeight: "500" },
          ]}
        >
          Confirmation
        </Text>

        <Text style={{ marginTop: hp(2) }}>Do You Really Want To Logout?</Text>

        <View style={styles.buttonDirections}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => ref_RBSheetLogout.current.close()}
          >
            <Text style={styles.textButton}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => logOut()}
            style={[styles.button, { backgroundColor: "#FACA4E" }]}
          >
            <Text style={[styles.textButton, { color: "#232323" }]}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </View>
  );
};

export default DrawerNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
  buttonDirections: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp(4.3),
    width: "100%",
    marginLeft: wp(5),
    justifyContent: "space-evenly",
  },
  button: {
    borderColor: "#FACA4E",
    borderWidth: 0.8,
    borderRadius: wp(5),
    width: wp(35),
    height: hp(5.5),
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    color: "#FACA4E",
    fontWeight: "bold",
  },
  txtNotification: {
    fontWeight: "500",
    marginTop: hp(10),
    marginLeft: wp(5),
    fontSize: hp(2.3),
    color: "#0B0B0B",
  },
  profileImgs: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(10) / 2,
    overflow: "hidden",
  },
  profileText: {
    marginLeft: 10,
    fontSize: 18,
    fontFamily: "Inter-Medium",
    color: "#333333",
  },
});
