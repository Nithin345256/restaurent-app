import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
  Switch,
  StyleSheet,
  Modal, // Add this import
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { api } from '../services/api';
// Create separate API clients for different content types
const apiJSON = axios.create({
  baseURL: 'http://10.177.21.127:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const apiMultipart = axios.create({
  baseURL: 'http://10.177.21.127:8000/api',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// Add Authorization header interceptor for JSON client
apiJSON.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add Authorization header interceptor for Multipart client
apiMultipart.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default function HotelDashboard({ navigation }) {
  const [hotelForm, setHotelForm] = useState({
    name: '',
    place: '',
    address: '',
    lat: '',
    long: '',
    options: [],
    photo: null,
  });
  const [menuForm, setMenuForm] = useState({
    name: '',
    category: '',
    foodType: 'veg',
    price: '',
    thaliEligible: false,
    type: 'single',
    mealType: 'breakfast',
  });
  const [isRegistered, setIsRegistered] = useState(false);
  const [hotel, setHotel] = useState(null);
  const [commonMenuItems, setCommonMenuItems] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  // New states for the price modal
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [priceInput, setPriceInput] = useState('');
  const [currentCommonItem, setCurrentCommonItem] = useState(null); // { id, name }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const hotelRes = await apiJSON.get('/hotels/my-hotel/details');
      console.log('Hotel response:', hotelRes.data);

      if (hotelRes.data) {
        setIsRegistered(true);
        setHotel(hotelRes.data);
        console.log('Hotel found:', hotelRes.data.name);
      }

      console.log('Fetching common menu items...');
      const commonRes = await apiJSON.get('/common-menu');
      console.log('Common items response:', commonRes.data);

      setCommonMenuItems(commonRes.data || []);
    } catch (error) {
      console.error('Fetch error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });

      if (error.response?.status === 404) {
        console.log('No hotel registered yet for this user');
        setIsRegistered(false);
        setHotel(null);
      } else if (error.message === 'Network Error') {
        Alert.alert(
          'Connection Error',
          'Cannot reach server. Please check your internet connection.',
          [
            { text: 'Retry', onPress: fetchData },
            { text: 'Cancel', style: 'cancel' },
          ]
        );
      } else {
        Alert.alert(
          'Error',
          error.response?.data?.message || 'Failed to load data'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'We need access to your photos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const asset = result.assets[0];
      let fileName = asset.fileName;
      if (!fileName) {
        const uriParts = asset.uri.split('/');
        fileName = uriParts[uriParts.length - 1];
      }
      setHotelForm({ ...hotelForm, photo: { ...asset, fileName } });
    }
  };

  const handleRegisterHotel = async () => {
    if (!hotelForm.name || !hotelForm.place || !hotelForm.address) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    if (hotelForm.options.length === 0) {
      Alert.alert('Error', 'Please select at least one restaurant type');
      return;
    }

    if (!hotelForm.photo) {
      Alert.alert('Error', 'Please select a restaurant photo');
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('name', hotelForm.name.trim());
      formData.append('place', hotelForm.place.trim());
      formData.append('address', hotelForm.address.trim());
      formData.append('lat', hotelForm.lat || '0');
      formData.append('long', hotelForm.long || '0');
      formData.append('options', JSON.stringify(hotelForm.options));

      const photo = hotelForm.photo;
      const uriParts = photo.uri.split('.');
      const fileExtension = uriParts[uriParts.length - 1].toLowerCase();

      let mimeType = 'image/jpeg';
      if (fileExtension === 'png') mimeType = 'image/png';
      else if (fileExtension === 'jpg' || fileExtension === 'jpeg') mimeType = 'image/jpeg';
      else if (fileExtension === 'gif') mimeType = 'image/gif';
      else if (fileExtension === 'webp') mimeType = 'image/webp';

      const fileName = photo.fileName || `hotel_${Date.now()}.${fileExtension}`;
      let photoUri = photo.uri;
      if (!photoUri.startsWith('file://')) {
        photoUri = 'file://' + photoUri;
      }

      formData.append('photo', {
        uri: photoUri,
        type: mimeType,
        name: fileName,
      });

      console.log('Attempting hotel registration...');
      const response = await apiMultipart.post('/hotels', formData);
      console.log('✓ Hotel registered successfully!');

      setIsRegistered(true);
      setHotel(response.data.hotel || response.data);
      Alert.alert('Success', 'Hotel registered successfully!');
      
      // Reset form
      setHotelForm({
        name: '',
        place: '',
        address: '',
        lat: '',
        long: '',
        options: [],
        photo: null,
      });
    } catch (error) {
      console.error('Registration error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to register hotel'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddMenuItem = async () => {
    console.log('=== handleAddMenuItem called ===');
    console.log('Current menuForm state:', JSON.stringify(menuForm, null, 2));
    
    if (!menuForm.name || !menuForm.price) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }
    
    if ((menuForm.mealType === 'lunch' || menuForm.mealType === 'dinner') && !menuForm.category) {
      Alert.alert('Error', 'Please select a category for lunch/dinner');
      return;
    }

    if (isNaN(parseFloat(menuForm.price)) || parseFloat(menuForm.price) <= 0) {
      Alert.alert('Error', 'Please enter a valid price');
      return;
    }

    setSubmitting(true);
    try {
      const menuData = {
        name: menuForm.name.trim(),
        category: (menuForm.mealType === 'breakfast') ? '' : menuForm.category,
        foodType: menuForm.foodType,
        price: parseFloat(menuForm.price),
        thaliEligible: menuForm.thaliEligible,
        type: menuForm.type,
        mealType: menuForm.mealType,
      };

      // Explicitly get token and set header
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Session expired', 'Please login again.');
        // Use AuthContext logout to reset app state
        if (typeof logout === 'function') logout();
        setSubmitting(false);
        return;
      }
      const response = await apiJSON.post('/hotels/add-menu-item', menuData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHotel(response.data.hotel);
      Alert.alert('Success', 'Menu item added successfully!');
      setMenuForm({
        name: '',
        category: '',
        foodType: 'veg',
        price: '',
        thaliEligible: false,
        type: 'single',
        mealType: 'breakfast',
      });
    } catch (error) {
      console.error('=== Add menu item error ===');
      console.error('Error message:', error.message);
      console.error('Error response:', error.response?.data);
      console.error('Request config:', error.config);
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to add menu item'
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Updated: Show modal instead of Alert.prompt
  const handleAddCommonItem = (commonItemId, itemName) => {
    setCurrentCommonItem({ id: commonItemId, name: itemName });
    setPriceInput('');
    setShowPriceModal(true);
  };

  // New: Handle the actual add after user inputs price
  const addCommonItem = async () => {
    if (!priceInput || isNaN(parseFloat(priceInput)) || parseFloat(priceInput) <= 0) {
      Alert.alert('Error', 'Please enter a valid price');
      return;
    }
    try {
      const response = await apiJSON.post(
        `/hotels/add-common-item/${currentCommonItem.id}`,
        { price: parseFloat(priceInput) }
      );
      setHotel(response.data.hotel);
      Alert.alert('Success', 'Item added to your menu!');
    } catch (error) {
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to add item'
      );
    } finally {
      setShowPriceModal(false);
      setPriceInput('');
      setCurrentCommonItem(null);
    }
  };

  // New: Close modal
  const closePriceModal = () => {
    setShowPriceModal(false);
    setPriceInput('');
    setCurrentCommonItem(null);
  };

  const toggleOption = (option) => {
    setHotelForm((prev) => ({
      ...prev,
      options: prev.options.includes(option)
        ? prev.options.filter((opt) => opt !== option)
        : [...prev.options, option],
    }));
  };

  const logout = async () => {
  await AsyncStorage.removeItem('token');
  navigation.reset({
    index: 0,
    routes: [{ name: 'Login' }],
  });
};

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", style: "destructive", onPress: logout }
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>🍽️</Text>
            </View>
            <View style={styles.centerContent}>
              <Text style={styles.title}>Hotel Dashboard</Text>
              <Text style={styles.subtitle}>Manage your restaurant</Text>
            </View>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#EF4444" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>🍽️</Text>
          </View>
          <View style={styles.centerContent}>
            <Text style={styles.title}>Hotel Dashboard</Text>
            <Text style={styles.subtitle}>Manage your restaurant</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {!isRegistered ? (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Register Your Restaurant</Text>
            <Text style={styles.cardSubtitle}>Fill in the details to get started</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Restaurant Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter restaurant name"
                placeholderTextColor="#9CA3AF"
                value={hotelForm.name}
                onChangeText={(text) => setHotelForm({ ...hotelForm, name: text })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Place/City *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter place or city"
                placeholderTextColor="#9CA3AF"
                value={hotelForm.place}
                onChangeText={(text) => setHotelForm({ ...hotelForm, place: text })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Address *</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter full address"
                placeholderTextColor="#9CA3AF"
                value={hotelForm.address}
                onChangeText={(text) => setHotelForm({ ...hotelForm, address: text })}
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Location Coordinates</Text>
              <View style={styles.coordinateRow}>
                <TextInput
                  style={[styles.input, styles.coordinateInput]}
                  placeholder="Latitude"
                  placeholderTextColor="#9CA3AF"
                  value={hotelForm.lat}
                  onChangeText={(text) => setHotelForm({ ...hotelForm, lat: text })}
                  keyboardType="numeric"
                />
                <TextInput
                  style={[styles.input, styles.coordinateInput]}
                  placeholder="Longitude"
                  placeholderTextColor="#9CA3AF"
                  value={hotelForm.long}
                  onChangeText={(text) => setHotelForm({ ...hotelForm, long: text })}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Restaurant Type *</Text>
              <View style={styles.optionsRow}>
                <TouchableOpacity
                  style={[styles.optionButton, hotelForm.options.includes('veg') && styles.optionButtonActive]}
                  onPress={() => toggleOption('veg')}
                >
                  <Text style={[styles.optionText, hotelForm.options.includes('veg') && styles.optionTextActive]}>
                    🟢 Veg
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.optionButton, hotelForm.options.includes('nonveg') && styles.optionButtonActive]}
                  onPress={() => toggleOption('nonveg')}
                >
                  <Text style={[styles.optionText, hotelForm.options.includes('nonveg') && styles.optionTextActive]}>
                    🔴 Non-Veg
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Restaurant Photo *</Text>
              {hotelForm.photo ? (
                <Image source={{ uri: hotelForm.photo.uri }} style={styles.preview} />
              ) : (
                <View style={styles.photoPlaceholder}>
                  <Text style={styles.photoPlaceholderText}>No photo selected</Text>
                </View>
              )}
              <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
                <Text style={styles.photoButtonText}>Choose Photo</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
              onPress={handleRegisterHotel}
              disabled={submitting}
            >
              {submitting ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.submitButtonText}>Register Restaurant</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{hotel.name}</Text>
              <Text style={styles.infoText}>
                {hotel.address}, {hotel.place}
              </Text>
              <View style={styles.optionsRow}>
                {hotel.options.map((opt) => (
                  <View key={opt} style={opt === 'veg' ? styles.vegBadge : styles.nonVegBadge}>
                    <Text style={opt === 'veg' ? styles.vegText : styles.nonVegText}>
                      {opt === 'veg' ? '🟢 Veg' : '🔴 Non-Veg'}
                    </Text>
                  </View>
                ))}
              </View>
              {hotel.photo && <Image source={{ uri: hotel.photo }} style={styles.hotelImage} />}
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Add Menu Item</Text>
              <Text style={styles.cardSubtitle}>Photo will be added by admin</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Item Name *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter item name"
                  placeholderTextColor="#9CA3AF"
                  value={menuForm.name}
                  onChangeText={(text) => setMenuForm({ ...menuForm, name: text })}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Price *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter price"
                  placeholderTextColor="#9CA3AF"
                  value={menuForm.price}
                  onChangeText={(text) => setMenuForm({ ...menuForm, price: text })}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Meal Type</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={menuForm.mealType}
                    onValueChange={(value) => setMenuForm({ ...menuForm, mealType: value })}
                    style={styles.picker}
                  >
                    <Picker.Item label="Breakfast" value="breakfast" />
                    <Picker.Item label="Lunch" value="lunch" />
                    <Picker.Item label="Dinner" value="dinner" />
                  </Picker>
                </View>
              </View>

              {menuForm.mealType !== "breakfast" && (
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Category *</Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={menuForm.category}
                      onValueChange={value => setMenuForm({ ...menuForm, category: value })}
                      style={styles.picker}
                    >
                      <Picker.Item label="Select category..." value="" />
                      <Picker.Item label="Starter" value="starter" />
                      <Picker.Item label="Rice" value="rice" />
                      <Picker.Item label="Juices" value="juices" />
                      <Picker.Item label="Others" value="others" />
                    </Picker>
                  </View>
                </View>
              )}

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Food Type</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={menuForm.foodType}
                    onValueChange={(value) => setMenuForm({ ...menuForm, foodType: value })}
                    style={styles.picker}
                  >
                    <Picker.Item label="Veg" value="veg" />
                    <Picker.Item label="Non-Veg" value="nonveg" />
                  </Picker>
                </View>
              </View>

              <View style={styles.switchRow}>
                <Text style={styles.switchLabel}>Available in Thali</Text>
                <Switch
                  value={menuForm.thaliEligible}
                  onValueChange={(value) => setMenuForm({ ...menuForm, thaliEligible: value })}
                  trackColor={{ false: '#D1D5DB', true: '#FCA5A5' }}
                  thumbColor={menuForm.thaliEligible ? '#EF4444' : '#F3F4F6'}
                />
              </View>

              <TouchableOpacity
                style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
                onPress={handleAddMenuItem}
                disabled={submitting}
              >
                {submitting ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.submitButtonText}>Add to Menu</Text>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Your Menu</Text>
              {hotel.menu?.length > 0 ? (
                hotel.menu.map((item) => (
                  <View key={item._id} style={styles.menuItem}>
                    {item.photo && <Image source={{ uri: item.photo }} style={styles.menuItemImage} />}
                    <View style={styles.menuItemInfo}>
                      <Text style={styles.menuItemName}>{item.name}</Text>
                      <Text style={styles.menuItemDetails}>
                        {item.mealType} • {item.category || 'N/A'} • {item.foodType} • Rs.{item.price}
                      </Text>
                      {item.thaliEligible && (
                        <Text style={styles.thaliTag}>Available in Thali</Text>
                      )}
                    </View>
                  </View>
                ))
              ) : (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No menu items yet</Text>
                </View>
              )}
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Add Common Items</Text>
              <Text style={styles.cardSubtitle}>Quick add popular items to your menu</Text>
              {commonMenuItems.length > 0 ? (
                commonMenuItems.map((item) => (
                  <View key={item._id} style={styles.commonItem}>
                    {item.photo && <Image source={{ uri: item.photo }} style={styles.commonItemImage} />}
                    <View style={styles.commonItemInfo}>
                      <Text style={styles.commonItemName}>{item.name}</Text>
                      <Text style={styles.commonItemDetails}>{item.foodType}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.addCommonButton}
                      onPress={() => handleAddCommonItem(item._id, item.name)}
                    >
                      <Text style={styles.addCommonButtonText}>Add</Text>
                    </TouchableOpacity>
                  </View>
                ))
              ) : (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No common items available</Text>
                </View>
              )}
            </View>
          </>
        )}
      </ScrollView>

      {/* New: Price Input Modal */}
      <Modal
        visible={showPriceModal}
        transparent={true}
        animationType="fade"
        onRequestClose={closePriceModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Set Price</Text>
            <Text style={styles.modalSubtitle}>
              Enter price for {currentCommonItem?.name}:
            </Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter price (e.g., 50)"
              value={priceInput}
              onChangeText={setPriceInput}
              keyboardType="numeric"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={closePriceModal}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.addButton,
                  (!priceInput || isNaN(parseFloat(priceInput))) && styles.addButtonDisabled
                ]}
                onPress={addCommonItem}
                disabled={!priceInput || isNaN(parseFloat(priceInput))}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    marginTop: 25,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  logoContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    fontSize: 36,
  },
  centerContent: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 4,
    letterSpacing: -0.25,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "400",
  },
  logoutButton: {
    backgroundColor: "#EF4444",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#1E293B",
    fontSize: 16,
    marginTop: 12,
    fontWeight: "500",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    color: "#475569",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    color: "#1E293B",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  coordinateRow: {
    flexDirection: "row",
    gap: 12,
  },
  coordinateInput: {
    flex: 1,
  },
  optionsRow: {
    flexDirection: "row",
    gap: 8,
  },
  optionButton: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  optionButtonActive: {
    backgroundColor: "#EF4444",
    borderColor: "#EF4444",
  },
  optionText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748B",
  },
  optionTextActive: {
    color: "#FFFFFF",
  },
  preview: {
    width: "100%",
    height: 160,
    borderRadius: 10,
    marginBottom: 12,
  },
  photoPlaceholder: {
    width: "100%",
    height: 160,
    borderRadius: 10,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderStyle: "dashed",
  },
  photoPlaceholderText: {
    color: "#9CA3AF",
    fontSize: 14,
  },
  photoButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EF4444",
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
    marginBottom: 16,
  },
  photoButtonText: {
    color: "#EF4444",
    fontSize: 15,
    fontWeight: "500",
  },
  submitButton: {
    backgroundColor: "#EF4444",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  submitButtonDisabled: {
    backgroundColor: "#F3F4F6",
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  infoText: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 12,
  },
  vegBadge: {
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#10B981",
  },
  vegText: {
    color: "#047857",
    fontSize: 11,
    fontWeight: "500",
  },
  nonVegBadge: {
    backgroundColor: "#FEF2F2",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EF4444",
  },
  nonVegText: {
    color: "#EF4444",
    fontSize: 11,
    fontWeight: "500",
  },
  hotelImage: {
    width: "100%",
    height: 160,
    borderRadius: 10,
    marginTop: 12,
  },
  pickerContainer: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    overflow: "hidden",
  },
  picker: {
    height: 44,
    color: "#1E293B",
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingVertical: 8,
  },
  switchLabel: {
    fontSize: 14,
    color: "#475569",
    fontWeight: "500",
  },
  menuItem: {
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  menuItemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  menuItemInfo: {
    flex: 1,
    justifyContent: "center",
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 4,
  },
  menuItemDetails: {
    fontSize: 14,
    color: "#64748B",
  },
  thaliTag: {
    fontSize: 12,
    color: "#EF4444",
    fontWeight: "500",
    marginTop: 4,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  emptyText: {
    color: "#64748B",
    fontSize: 14,
  },
  commonItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  commonItemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  commonItemInfo: {
    flex: 1,
  },
  commonItemName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1E293B",
    marginBottom: 2,
  },
  commonItemDetails: {
    fontSize: 12,
    color: "#64748B",
  },
  addCommonButton: {
    backgroundColor: "#EF4444",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  addCommonButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "500",
  },
  // New styles for modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalInput: {
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginRight: 8,
  },
  cancelButtonText: {
    color: '#64748B',
    fontWeight: '500',
    fontSize: 16,
  },
  addButton: {
    flex: 1,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginLeft: 8,
  },
  addButtonDisabled: {
    backgroundColor: '#F3F4F6',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});