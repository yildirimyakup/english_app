import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { playSound } from '../../../services/audio/play.service';
import { apiURLConfig } from '../../../services/api/index.service';

const { width, height } = Dimensions.get('window');

export default function FlashcardScreen({ route, navigation }: any) {
  const { words } = route.params;
  const [index, setIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const { API_URL } = apiURLConfig();

  const flipAnim = useRef(new Animated.Value(0)).current;
  const rotateY = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  useEffect(() => {
    playSound(API_URL + words[index].audio);
  }, [API_URL, index, words]);

  const handlePress = () => {
    if (!showBack) {
      Animated.timing(flipAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start(() => setShowBack(true));
    } else {
      setShowBack(false);
      flipAnim.setValue(0);
      if (index < words.length - 1) {
        setIndex(index + 1);
      } else {
        navigation.goBack();
      }
    }
  };

  /*const replaySound = () => {
    if (words[index]?.audio) {
      playSoundFromUrl('http://127.0.0.1:4000/api' + words[index].audio);
    }
  }; */

  const word = words[index];
  const formatWord = (text: string) =>
    text ? text.charAt(0).toUpperCase() + text.slice(1) : '';

  return (
    <ImageBackground
      source={require('../../../../assets/bg.png')}
      style={styles.container}
      resizeMode="cover"
    >
      {/* ✅ Üstte ilerleme barı */}
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${((index + 1) / words.length) * 100}%` },
          ]}
        />
      </View>

      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.cardWrapper}>
          {/* Ön yüz */}
          <Animated.View
            style={[
              styles.card,
              {
                transform: [{ rotateY }],
                zIndex: !showBack ? 1 : 0,
              },
            ]}
          >
            <Text style={styles.frontText}>{formatWord(word.english)}</Text>

            <TouchableOpacity style={styles.soundButton}>
              <Ionicons name="volume-high" size={34} color="#4CAF50" />
            </TouchableOpacity>
          </Animated.View>

          {/* Arka yüz */}
          <Animated.View
            style={[
              styles.card,
              {
                transform: [
                  {
                    rotateY: flipAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['180deg', '360deg'],
                    }),
                  },
                ],
                position: 'absolute',
                top: 0,
              },
            ]}
          >
            <Text style={styles.backText}>{formatWord(word.turkish)}</Text>
            <TouchableOpacity style={styles.soundButton}>
              <Ionicons name="volume-high" size={34} color="#2196F3" />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  progressBar: {
    position: 'absolute',
    top: 60,
    left: 30,
    right: 30,
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  cardWrapper: {
    width: width * 0.8,
    height: height * 0.45,
    alignSelf: 'center',
  },
  card: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
    padding: 24,
  },
  frontText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
  },
  backText: {
    fontSize: 32,
    color: '#444',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  soundButton: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
});
