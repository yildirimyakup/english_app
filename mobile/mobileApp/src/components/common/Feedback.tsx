import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { clearFeedback } from '../../store/feedback.slice';

export default function Feedback() {
  const dispatch = useDispatch();
  const { message, type } = useSelector((state: RootState) => state.feedback);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (message) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          dispatch(clearFeedback());
        });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message, dispatch, fadeAnim]);

  if (!message) return null;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View
        style={[styles.box, type === 'success' ? styles.success : styles.error]}
      >
        <Text style={styles.text}>{message}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
    zIndex: 999,
  },
  box: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    maxWidth: '80%',
  },
  success: {
    backgroundColor: '#4CAF50',
  },
  error: {
    backgroundColor: '#F44336',
  },
  text: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
});
