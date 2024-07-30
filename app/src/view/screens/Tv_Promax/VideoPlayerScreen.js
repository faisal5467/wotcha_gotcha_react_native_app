import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import IonIcons from 'react-native-vector-icons/Ionicons';

const VideoPlayerScreen = ({ navigation, route }) => {
  const { videoUri } = route.params;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <IonIcons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Video
        source={{ uri: videoUri }}
        style={styles.video}
        controls={true}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  video: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: "13%",
    left: 20,
    zIndex: 1,
  },
});

export default VideoPlayerScreen;
