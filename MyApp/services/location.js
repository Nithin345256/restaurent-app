import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getStorageKey = (userId) => `user_location_v1_${userId}`;

export async function requestLocationPermission() {
  const existing = await Location.getForegroundPermissionsAsync();
  if (existing?.granted) return true;
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status === 'granted';
}

export async function getCurrentPosition(options = {}) {
  const hasPermission = await requestLocationPermission();
  if (!hasPermission) return null;
  try {
    const pos = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
      ...options,
    });
    return {
      lat: pos.coords.latitude,
      long: pos.coords.longitude,
      timestamp: pos.timestamp,
      source: 'gps',
    };
  } catch (_) {
    return null;
  }
}

export async function reverseGeocode(lat, long) {
  try {
    const [place] = await Location.reverseGeocodeAsync({ latitude: lat, longitude: long });
    if (!place) return null;
    const parts = [place.name, place.street, place.city, place.region, place.postalCode]
      .filter(Boolean)
      .join(', ');
    return parts || null;
  } catch (_) {
    return null;
  }
}

export async function loadSavedLocation(userId) {
  if (!userId) return null;
  try {
    const raw = await AsyncStorage.getItem(getStorageKey(userId));
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

export async function saveLocation(userId, payload) {
  if (!userId) return;
  try {
    const existingData = await loadSavedLocation(userId) || { current: null, history: [] };
    let history = existingData.history || [];

    // Check if the new location is already in history
    const isDuplicate = history.some(item => item.label === payload.label);

    if (!isDuplicate) {
      // Add to the beginning of the history
      history.unshift({
        type: payload.type,
        label: payload.label,
        // Store only necessary data for history
        ...(payload.type === 'gps' && { gps: { lat: payload.gps.lat, long: payload.gps.long } }),
      });
      // Limit history to 5 items
      if (history.length > 5) {
        history = history.slice(0, 5);
      }
    }

    const newData = {
      current: payload,
      history: history,
    };

    await AsyncStorage.setItem(getStorageKey(userId), JSON.stringify(newData));
  } catch (_) {}
}

export async function clearManualLocation(userId) {
  if (!userId) return;
  const existingData = await loadSavedLocation(userId);
  if (!existingData) return;
  // Keep history, but clear the current manual location
  const payload = { ...existingData, current: { ...existingData.current, manual: null } };
  await AsyncStorage.setItem(getStorageKey(userId), JSON.stringify(payload));
}

export function isFresh(timestampMs, ttlMs = 24 * 60 * 60 * 1000) {
  if (!timestampMs) return false;
  return Date.now() - Number(timestampMs) < ttlMs;
}
