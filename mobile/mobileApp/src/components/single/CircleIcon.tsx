import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Dimensions } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

function CircleIcon({
  progress,
  icon,
  unlocked,
}: {
  progress: number;
  icon: string;
  unlocked: boolean;
}) {
  const { width } = Dimensions.get('window');
  const radius = width * 0.06;
  const strokeWidth = 4;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * progress) / 100;

  // ✅ useRef ile animasyon değeri sabitleniyor
  const scaleAnim = useRef(new Animated.Value(unlocked ? 1 : 0.8)).current;

  useEffect(() => {
    if (unlocked) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }).start();
    }
  }, [unlocked, scaleAnim]);

  return (
    <Animated.View
      style={[
        { transform: [{ scale: scaleAnim }] },
        { opacity: unlocked ? 1 : 0.5 },
      ]}
    >
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Svg width={radius * 2} height={radius * 2}>
          <Circle
            stroke="#e0e0e0"
            fill="none"
            cx={radius}
            cy={radius}
            r={radius - strokeWidth / 2}
            strokeWidth={strokeWidth}
          />
          {unlocked && (
            <Circle
              stroke="#4CAF50"
              fill="none"
              cx={radius}
              cy={radius}
              r={radius - strokeWidth / 2}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          )}
        </Svg>
        <View
          style={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: radius * 0.6 }}>
            {unlocked ? icon : '🔒'}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
}

export default CircleIcon;
