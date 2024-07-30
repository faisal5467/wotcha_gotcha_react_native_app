import React, { useRef , useState, useEffect} from 'react';
import { Text, TouchableOpacity, StyleSheet, View, ScrollView , StatusBar, Dimensions} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation , useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeActive from '../assets/svg/HomeActive.svg';
import HomeInActive from '../assets/svg/HomeInactive.svg';
import CategoryActive from '../assets/svg/CategoryActive.svg';
import CategoryInActive from '../assets/svg/CategoryInactive.svg';
import VideoActive from '../assets/svg/VideoActive.svg';
import VideoInActive from '../assets/svg/VideoInactive.svg';
import MailActive from '../assets/svg/MailActive.svg';
import MailInActive from '../assets/svg/MailInActive.svg';
import ProfileActive from '../assets/svg/ProfileActive.svg';
import ProfileInActive from '../assets/svg/ProfileInactive.svg';
import MarketZoneActive from '../assets/svg/MarketActive.svg';
import MarketZoneInActive from '../assets/svg/MarketInactive.svg';
import More from '../assets/svg/More.svg';
import Cinematics_svg from "../assets/svg/Cinematics.svg";
import Fans from "../assets/svg/Fans.svg";
import Kids from "../assets/svg/Kids.svg";
import Television from "../assets/svg/Television.svg";
import Puzzle from "../assets/svg/Puzzle.svg";
import MoreInactive from "../assets/svg/MoreInactive.svg";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fans_star from '../view/screens/fans_star/Fans_star';
import Kids_vid from '../view/screens/kids_vid/Kids_vid';
import Tv_Promax from '../view/screens/Tv_Promax/Tv_Promax';
// import Cinematics from '../view/screens/Cinematics/Cinematics';
import Learning from '../view/screens/Learning/Learning';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import MoreScreen from '../view/screens/BottomTab/More';
import Dashboard from './../view/screens/BottomTab/Dashboard';
import Categories from './../view/screens/BottomTab/Categories';
import Video from './../view/screens/BottomTab/Video';
import Disc from './../view/screens/BottomTab/Disc';
import MarketZone from './../view/screens/BottomTab/MarketZone';
import PicTours from '../view/screens/BottomTab/PicTours';
import PuzzleActive from  '../assets/svg/PuzzleActive.svg';
import Cinematiceactive from '../assets/svg/Cinematiceactive.svg';
import FansActive from '../assets/svg/FansActive.svg';
import TVpromaxActive from '../assets/svg/TVpromaxActive.svg';
import KidsActive from '../assets/svg/KidsActive.svg';
import Cinematics from '../view/screens/Cinematics/Cinematics';
import DashboardTwo from '../view/screens/BottomTab/DashboardTwo';
const Bottom = createBottomTabNavigator();
const BottomtabNavigation = () => {
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);
  const [sheetHeight, setSheetHeight] = useState(700);
  const [selectedScreen, setSelectedScreen] = useState('Dashboard');
  const [screen, setScreen] = useState([]);

  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const storedIcons = await AsyncStorage.getItem('bottomNavIcons');
        if (storedIcons) {
          const parsedIcons = JSON.parse(storedIcons);
          setScreen(parsedIcons.slice(0, 3).map(name => ({ name })));
        }
      } catch (error) {
        console.error('Error reading icons from storage:', error);
      }
    };

    fetchIcons();
    const interval = setInterval(fetchIcons, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const screenHeight = Dimensions.get('window').height;
    const statusBarHeight = StatusBar.currentHeight || 0;
    const newHeight = screenHeight - statusBarHeight - 100;
    setSheetHeight(newHeight);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setSelectedScreen('Dashboard');
    }, [])
  );

  const handleScreenSelect = (screenName) => {
    setSelectedScreen(screenName);
    navigation.navigate(screenName);
  };

  return (
    <View style={{ flex: 1 }}>
      <Bottom.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: 'yellow',
          tabBarInactiveTintColor: '#CACACA',
          tabBarLabelStyle: { display: 'none' },
          tabBarStyle: { display: 'flex' },
        }}
      >
        <Bottom.Screen
          name="Dashboard"
          component={Dashboard}
          listeners={{
            tabPress: () => handleScreenSelect('Dashboard'),
          }}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              focused ? <HomeActive size={size} color={color} /> : <HomeInActive size={size} color={color} />
            ),
          }}
        />
        {screen.map((screen, index) => (
          <Bottom.Screen
            key={index}
            name={screen.name}
            listeners={{
              tabPress: () => handleScreenSelect(screen.name),
            }}
            options={{
              tabBarIcon: ({ color, size, focused }) => {
                let iconComponent;
                switch (screen.name) {
                  // case 'Home':
                  //   iconComponent = focused ? <HomeActive size={size} color={color} /> : <HomeInActive size={size} color={color} />;
                  //   break;
                  case 'Mass App':
                    iconComponent = focused ? <CategoryActive size={size} color={color} /> : <CategoryInActive size={size} color={color} />;
                    break;
                  case 'Videos Mania':
                    iconComponent = focused ? <VideoActive size={size} color={color} /> : <VideoInActive size={size} color={color} />;
                    break;
                  case 'DISC':
                    iconComponent = focused ? <MailActive size={size} color={color} /> : <MailInActive size={size} color={color} />;
                    break;
                  case 'Pic Tour':
                    iconComponent = focused ? <ProfileActive size={size} color={color} /> : <ProfileInActive size={size} color={color} />;
                    break;
                  case 'Market Zone':
                    iconComponent = focused ? <MarketZoneActive size={size} color={color} /> : <MarketZoneInActive size={size} color={color} />;
                    break;
                  case 'Cinematics':
                    iconComponent = focused ? <Cinematiceactive size={size} color={color} /> : <Cinematics_svg size={size} color={color} />;
                    break;
                  case 'Fans-Stars Area':
                    iconComponent = focused ? <FansActive size={size} color={color} /> : <Fans size={size} color={color} />;
                    break;
                  case 'Kids-Vids':
                    iconComponent = focused ? <KidsActive size={size} color={color} /> : <Kids size={size} color={color} />;
                    break;
                  case 'TV Progmax':
                    iconComponent = focused ? <TVpromaxActive size={size} color={color} /> : <Television size={size} color={color} />;
                    break;
                  case 'Learning & Hobbies':
                    iconComponent = focused ? <PuzzleActive size={size} color={color} /> : <Puzzle size={size} color={color} />;
                    break;
                  default:
                    iconComponent = <More width={23} height={23} />;
                }
                return iconComponent;
              }
            }}
          >
            {() => {
              switch (screen.name) {
                // case 'Home':
                //   return <Dashboard />;
                case 'Mass App':
                  return <Categories />;
                case 'Videos Mania':
                  return <Video />;
                case 'DISC':
                  return <Disc />;
                case 'Pic Tour':
                  return <PicTours />;
                case 'Market Zone':
                  return <MarketZone />;
                case 'Cinematics':
                  return <Cinematics />;
                case 'Fans-Stars Area':
                  return <Fans_star/>;
                case 'Kids-Vids':
                  return <Kids_vid />;
                case 'TV Progmax':
                  return <Tv_Promax />;
                case 'Learning & Hobbies':
                  return <Learning />;
                default:
                  return null;
              }
            }}
          </Bottom.Screen>
        ))}
        <Bottom.Screen 
          name="MoreScreen" 
          component={MoreScreen}  
          listeners={{
            tabPress: () => handleScreenSelect('MoreScreen'),
          }}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              focused ? <MoreInactive width={23} height={23} /> : <More width={23} height={23} />
            ),
          }}
        />
      </Bottom.Navigator>
    </View>
  );
};

export default BottomtabNavigation;

const styles = StyleSheet.create({
  moreIcon: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
});