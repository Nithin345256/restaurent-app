// Centralized API configuration for the mobile app.
// Tries to auto-detect Metro host for Expo Go; falls back to manual host.

// On Expo Go, Constants.expoConfig.hostUri often looks like "192.168.x.x:19000"
let detectedHost = null;
try {
  // Lazy require to avoid bundling issues if Constants isn't available
  const Constants = require('expo-constants').default;
  const hostUri = Constants?.expoConfig?.hostUri || Constants?.manifest2?.extra?.expoClient?.hostUri || Constants?.manifest?.hostUri;
  if (hostUri && typeof hostUri === 'string') {
    const match = hostUri.match(/^(.*?):\d+/);
    if (match && match[1]) {
      detectedHost = match[1];
    }
  }
} catch (_) {
  // noop
}

// Fallback: set your hotspot/LAN IP here if detection fails
const FALLBACK_HOST = '192.168.0.174'; // TODO: replace with your current hotspot IP
const PORT = 8000;

export const API_HOST = `http://${detectedHost || FALLBACK_HOST}:${PORT}`;
export const API_BASE_URL = `${API_HOST}/api`;
