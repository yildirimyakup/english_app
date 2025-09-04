import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const circleSize = width * 0.1; // daire boyutu ekran genişliğine göre

export default StyleSheet.create({
  // Level kartı
  levelCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  lockedCard: {
    opacity: 0.6,
  },

  // ikon satırı
  iconRow: {
    flexDirection: 'row',
    flexWrap: 'wrap', // taşarsa alt satıra geçer
    justifyContent: 'flex-start',
    gap: 8,
    marginTop: 8,
  },
  circleIconWrapper: {
    width: circleSize,
    height: circleSize,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
  },
  iconOverlay: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: circleSize,
    height: circleSize,
  },

  // Progress bar
  progressBar: {
    height: 6,
    backgroundColor: '#e0e0e0',
    width: '100%',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  progressFillRed: {
    height: '100%',
    backgroundColor: '#ff0000ff',
  },
  progressFillYellow: {
    height: '100%',
    backgroundColor: '#ffe100ff',
  },

  // Satır düzeni
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },

  // Level numarası dairesi
  circle: {
    width: circleSize * 1.2,
    height: circleSize * 1.2,
    borderRadius: circleSize * 0.6,
    backgroundColor: '#9C27B0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  circleText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: circleSize * 0.45,
  },

  info: { flex: 1 },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: { fontSize: 14, color: '#666' },
  lockText: { marginTop: 4, fontSize: 14, color: 'red', fontWeight: 'bold' },
});
