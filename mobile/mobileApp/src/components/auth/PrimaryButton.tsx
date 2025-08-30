import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function PrimaryButton({ title, onPress, loading }: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ marginVertical: 10, height: 50 }}
      activeOpacity={0.8} // basıldığında hafif efekt
    >
      <LinearGradient
        colors={['#eceaeeff', '#FF6FD8', '#fffffcff']} // daha canlı gradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.button}
      >
        <Text style={styles.text}>{loading ? '...' : title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 30, // daha yuvarlak görünüm
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    width: '100%',
    alignSelf: 'center',
    height: '100%',
    shadowColor: '#000', // gölge ekledik
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6, // Android gölge
  },
  text: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 1, // oyun tarzı için harf aralığı
    textTransform: 'uppercase', // yazıyı büyük harf yapar
  },
});
