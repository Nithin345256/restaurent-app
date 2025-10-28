import React, { useState, useEffect, useContext } from 'react';
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
  Modal,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../context/AuthContext';
import { api } from '../services/api';

export default function HotelDashboard({ navigation }) {
  const { logout: contextLogout } = useContext(AuthContext);

  // Hotel registration form
  const [hotelForm, setHotelForm] = useState({
    name: '',
    place: '',
    address: '',
    lat: '',
    long: '',
    options: [],
    photo: null,
  });

  // Add custom menu item form
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
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Bottom navigation tabs
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' | 'add' | 'profile'

  // Search inside Menu tab
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMenuItems, setFilteredMenuItems] = useState([]);

  // Price modal for adding common item
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [priceInput, setPriceInput] = useState('');
  const [currentCommonItem, setCurrentCommonItem] = useState(null); // { id, name }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (hotel?.menu) {
      const q = searchQuery.trim().toLowerCase();
      const filtered = q.length === 0
        ? hotel.menu
        : hotel.menu.filter(item =>
            (item.name || '').toLowerCase().includes(q) ||
            (item.category || '').toLowerCase().includes(q)
          );
      setFilteredMenuItems(filtered);
    } else {
      setFilteredMenuItems([]);
    }
  }, [hotel?.menu, searchQuery]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const hotelRes = await api.get('/hotels/my-hotel/details');
      if (hotelRes.data) {
        setIsRegistered(true);
        setHotel(hotelRes.data);
      } else {
        setIsRegistered(false);
        setHotel(null);
      }
      const commonRes = await api.get('/common-menu');
      setCommonMenuItems(Array.isArray(commonRes.data) ? commonRes.data : []);
    } catch (error) {
      if (error.response?.status === 404) {
        setIsRegistered(false);
        setHotel(null);
      } else if (error.message === 'Network Error') {
        Alert.alert('Connection Error', 'Cannot reach server. Check your internet or server.');
      } else {
        Alert.alert('Error', error.response?.data?.message || 'Failed to load data');
      }
    } finally {
      setLoading(false);
    }
  };

  const pingServer = async () => {
    try {
      await api.get('/health');
      return true;
    } catch (_) {
      Alert.alert('Cannot reach server', `Base: ${api.defaults.baseURL}`);
      return false;
    }
  };

  const toggleOption = (option) => {
    setHotelForm((prev) => ({
      ...prev,
      options: prev.options.includes(option)
        ? prev.options.filter((o) => o !== option)
        : [...prev.options, option],
    }));
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Allow photo library access.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.85,
    });
    if (!result.canceled && result.assets?.length > 0) {
      const asset = result.assets[0];
      setHotelForm((prev) => ({ ...prev, photo: asset }));
    }
  };

  const handleRegisterHotel = async () => {
    if (!hotelForm.name || !hotelForm.place || !hotelForm.address) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }
    if (hotelForm.options.length === 0) {
      Alert.alert('Error', 'Select at least one restaurant type');
      return;
    }
    if (!hotelForm.photo) {
      Alert.alert('Error', 'Please select a restaurant photo');
      return;
    }
    const ok = await pingServer();
    if (!ok) return;

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('name', hotelForm.name.trim());
      formData.append('place', hotelForm.place.trim());
      formData.append('address', hotelForm.address.trim());
      formData.append('lat', hotelForm.lat || '0');
      formData.append('long', hotelForm.long || '0');
      formData.append('options', JSON.stringify(hotelForm.options));

      const uri = hotelForm.photo.uri.startsWith('file://') ? hotelForm.photo.uri : `file://${hotelForm.photo.uri}`;
      const fileExt = (uri.split('.').pop() || 'jpg').toLowerCase();
      const mime = fileExt === 'png' ? 'image/png' : fileExt === 'webp' ? 'image/webp' : 'image/jpeg';
      formData.append('photo', { uri, type: mime, name: `hotel_${Date.now()}.${fileExt}` });

      const token = await AsyncStorage.getItem('token');
      const resp = await fetch(`${api.defaults.baseURL}/hotels`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: formData,
      });
      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({}));
        throw new Error(errData.message || `Server error: ${resp.status}`);
      }
      const data = await resp.json();
      setIsRegistered(true);
      setHotel(data.hotel || data);
      Alert.alert('Success', 'Hotel registered successfully!');
      setHotelForm({ name: '', place: '', address: '', lat: '', long: '', options: [], photo: null });
    } catch (e) {
      Alert.alert('Error', e.message || 'Failed to register hotel');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddMenuItem = async () => {
    if (!menuForm.name || !menuForm.price) {
      Alert.alert('Error', 'Name and price are required');
      return;
    }
    if ((menuForm.mealType === 'lunch' || menuForm.mealType === 'dinner') && !menuForm.category) {
      Alert.alert('Error', 'Category is required for lunch/dinner');
      return;
    }
    if (isNaN(parseFloat(menuForm.price)) || parseFloat(menuForm.price) <= 0) {
      Alert.alert('Error', 'Enter a valid price');
      return;
    }
    setSubmitting(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const payload = {
        name: menuForm.name.trim(),
        category: menuForm.mealType === 'breakfast' ? '' : menuForm.category,
        foodType: menuForm.foodType,
        price: parseFloat(menuForm.price),
        thaliEligible: menuForm.thaliEligible,
        type: menuForm.type,
        mealType: menuForm.mealType,
      };
      const res = await api.post('/hotels/add-menu-item', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHotel(res.data.hotel);
      Alert.alert('Success', 'Menu item added');
      setMenuForm({ name: '', category: '', foodType: 'veg', price: '', thaliEligible: false, type: 'single', mealType: 'breakfast' });
    } catch (e) {
      Alert.alert('Error', e.response?.data?.message || 'Failed to add menu item');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddCommonItemPrompt = (commonItemId, name) => {
    setCurrentCommonItem({ id: commonItemId, name });
    setPriceInput('');
    setShowPriceModal(true);
  };

  const addCommonItem = async () => {
    const priceNum = parseFloat(priceInput);
    if (isNaN(priceNum) || priceNum <= 0) {
      Alert.alert('Error', 'Enter a valid price');
      return;
    }
    try {
      const res = await api.post(`/hotels/add-common-item/${currentCommonItem.id}`, { price: priceNum });
      setHotel(res.data.hotel);
      Alert.alert('Success', 'Item added');
    } catch (e) {
      Alert.alert('Error', e.response?.data?.message || 'Failed to add item');
    } finally {
      setShowPriceModal(false);
      setPriceInput('');
      setCurrentCommonItem(null);
    }
  };

  const logout = async () => {
    try {
      if (typeof contextLogout === 'function') await contextLogout();
    } catch (_) {}
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.logoContainer}><Text style={styles.logoText}>🍽️</Text></View>
          <View style={styles.centerContent}>
            <Text style={styles.title}>Hotel Dashboard</Text>
            <Text style={styles.subtitle}>Manage your restaurant</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#EF4444" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    );
  }

  const renderMenuTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="🔍 Search menu items..."
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <ScrollView style={styles.menuList}>
        {filteredMenuItems.length > 0 ? (
          filteredMenuItems.map((item) => (
            <View key={item._id} style={styles.menuItem}>
              {item.photo ? (
                <Image source={{ uri: item.photo }} style={styles.menuItemImage} />
              ) : (
                <View style={[styles.menuItemImage, { backgroundColor: '#E5E7EB' }]} />
              )}
              <View style={styles.menuItemInfo}>
                <Text style={styles.menuItemName}>{item.name}</Text>
                <Text style={styles.menuItemDetails}>
                  {(item.mealType || 'breakfast')} • {(item.category || 'N/A')} • {(item.foodType || 'veg')} • ₹{item.price}
                </Text>
                {item.thaliEligible ? <Text style={styles.thaliTag}>Available in Thali</Text> : null}
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}><Text style={styles.emptyText}>No menu items</Text></View>
        )}
      </ScrollView>
    </View>
  );

  const renderAddTab = () => (
    <ScrollView style={styles.tabContent} contentContainerStyle={{ paddingBottom: 100 }}>
      {!isRegistered ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Register Your Restaurant</Text>
          <Text style={styles.cardSubtitle}>Fill details to get started</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Restaurant Name *</Text>
            <TextInput style={styles.input} placeholder="Enter name" placeholderTextColor="#9CA3AF" value={hotelForm.name} onChangeText={(t) => setHotelForm({ ...hotelForm, name: t })} />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Place/City *</Text>
            <TextInput style={styles.input} placeholder="Enter place" placeholderTextColor="#9CA3AF" value={hotelForm.place} onChangeText={(t) => setHotelForm({ ...hotelForm, place: t })} />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Address *</Text>
            <TextInput style={[styles.input, styles.textArea]} placeholder="Enter full address" placeholderTextColor="#9CA3AF" value={hotelForm.address} onChangeText={(t) => setHotelForm({ ...hotelForm, address: t })} multiline numberOfLines={3} />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Location (optional)</Text>
            <View style={styles.coordinateRow}>
              <TextInput style={[styles.input, styles.coordinateInput]} placeholder="Latitude" placeholderTextColor="#9CA3AF" value={hotelForm.lat} onChangeText={(t) => setHotelForm({ ...hotelForm, lat: t })} keyboardType="numeric" />
              <TextInput style={[styles.input, styles.coordinateInput]} placeholder="Longitude" placeholderTextColor="#9CA3AF" value={hotelForm.long} onChangeText={(t) => setHotelForm({ ...hotelForm, long: t })} keyboardType="numeric" />
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Restaurant Type *</Text>
            <View style={styles.optionsRow}>
              <TouchableOpacity style={[styles.optionButton, hotelForm.options.includes('veg') && styles.optionButtonActive]} onPress={() => toggleOption('veg')}>
                <Text style={[styles.optionText, hotelForm.options.includes('veg') && styles.optionTextActive]}>🟢 Veg</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.optionButton, hotelForm.options.includes('nonveg') && styles.optionButtonActive]} onPress={() => toggleOption('nonveg')}>
                <Text style={[styles.optionText, hotelForm.options.includes('nonveg') && styles.optionTextActive]}>🔴 Non-Veg</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Restaurant Photo *</Text>
            {hotelForm.photo ? (
              <Image source={{ uri: hotelForm.photo.uri }} style={styles.preview} />
            ) : (
              <View style={styles.photoPlaceholder}><Text style={styles.photoPlaceholderText}>No photo selected</Text></View>
            )}
            <TouchableOpacity style={styles.photoButton} onPress={pickImage}><Text style={styles.photoButtonText}>Choose Photo</Text></TouchableOpacity>
          </View>
          <TouchableOpacity style={[styles.submitButton, submitting && styles.submitButtonDisabled]} disabled={submitting} onPress={handleRegisterHotel}>
            {submitting ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.submitButtonText}>Register Restaurant</Text>}
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Add Menu Item</Text>
            <Text style={styles.cardSubtitle}>Photo will be added by admin</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Item Name *</Text>
              <TextInput style={styles.input} placeholder="Enter item name" placeholderTextColor="#9CA3AF" value={menuForm.name} onChangeText={(t) => setMenuForm({ ...menuForm, name: t })} />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Price *</Text>
              <TextInput style={styles.input} placeholder="Enter price" placeholderTextColor="#9CA3AF" value={menuForm.price} keyboardType="numeric" onChangeText={(t) => setMenuForm({ ...menuForm, price: t })} />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Meal Type</Text>
              <View style={styles.pickerContainer}>
                <Picker selectedValue={menuForm.mealType} onValueChange={(v) => setMenuForm({ ...menuForm, mealType: v })} style={styles.picker}>
                  <Picker.Item label="Breakfast" value="breakfast" />
                  <Picker.Item label="Lunch" value="lunch" />
                  <Picker.Item label="Dinner" value="dinner" />
                </Picker>
              </View>
            </View>
            {menuForm.mealType !== 'breakfast' && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Category *</Text>
                <View style={styles.pickerContainer}>
                  <Picker selectedValue={menuForm.category} onValueChange={(v) => setMenuForm({ ...menuForm, category: v })} style={styles.picker}>
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
                <Picker selectedValue={menuForm.foodType} onValueChange={(v) => setMenuForm({ ...menuForm, foodType: v })} style={styles.picker}>
                  <Picker.Item label="Veg" value="veg" />
                  <Picker.Item label="Non-Veg" value="nonveg" />
                </Picker>
              </View>
            </View>
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Available in Thali</Text>
              <Switch value={menuForm.thaliEligible} onValueChange={(v) => setMenuForm({ ...menuForm, thaliEligible: v })} trackColor={{ false: '#D1D5DB', true: '#FCA5A5' }} thumbColor={menuForm.thaliEligible ? '#EF4444' : '#F3F4F6'} />
            </View>
            <TouchableOpacity style={[styles.submitButton, submitting && styles.submitButtonDisabled]} disabled={submitting} onPress={handleAddMenuItem}>
              {submitting ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.submitButtonText}>Add to Menu</Text>}
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Add from Common Items</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {commonMenuItems.map((item) => (
                <TouchableOpacity key={item._id} style={styles.commonItemCard} onPress={() => handleAddCommonItemPrompt(item._id, item.name)}>
                  {item.photo ? (
                    <Image source={{ uri: item.photo }} style={styles.commonItemImage} />
                  ) : (
                    <View style={[styles.commonItemImage, { backgroundColor: '#E5E7EB' }]} />
                  )}
                  <Text style={styles.commonItemName}>{item.name}</Text>
                  <Text style={styles.commonItemCategory}>{item.category}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </>
      )}
    </ScrollView>
  );

  const renderProfileTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Hotel Information</Text>
        {hotel ? (
          <>
            <Text style={styles.infoText}>{hotel.name}</Text>
            <Text style={styles.infoText}>{hotel.address}, {hotel.place}</Text>
            <View style={styles.optionsRow}>
              {hotel.options?.map((opt) => (
                <View key={opt} style={opt === 'veg' ? styles.vegBadge : styles.nonVegBadge}>
                  <Text style={opt === 'veg' ? styles.vegText : styles.nonVegText}>
                    {opt === 'veg' ? '🟢 Veg' : '🔴 Non-Veg'}
                  </Text>
                </View>
              ))}
            </View>
          </>
        ) : (
          <Text style={styles.infoText}>No hotel registered yet</Text>
        )}
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Account</Text>
        <TouchableOpacity style={styles.actionButton} onPress={logout}>
          <Text style={styles.actionButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderNavigationBar = () => (
    <View style={styles.navBar}>
      <TouchableOpacity style={[styles.navItem, activeTab === 'menu' && styles.navItemActive]} onPress={() => setActiveTab('menu')}>
        <Text style={styles.navIcon}>📋</Text>
        <Text style={[styles.navText, activeTab === 'menu' && styles.navTextActive]}>Menu</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.navItem, activeTab === 'add' && styles.navItemActive]} onPress={() => setActiveTab('add')}>
        <Text style={styles.navIcon}>➕</Text>
        <Text style={[styles.navText, activeTab === 'add' && styles.navTextActive]}>Add</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.navItem, activeTab === 'profile' && styles.navItemActive]} onPress={() => setActiveTab('profile')}>
        <Text style={styles.navIcon}>👤</Text>
        <Text style={[styles.navText, activeTab === 'profile' && styles.navTextActive]}>Profile</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}><Text style={styles.logoText}>🍽️</Text></View>
        <View style={styles.centerContent}>
          <Text style={styles.title}>Hotel Dashboard</Text>
          <Text style={styles.subtitle}>Manage your restaurant</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}><Text style={styles.logoutText}>Logout</Text></TouchableOpacity>
      </View>

      {activeTab === 'menu' && renderMenuTab()}
      {activeTab === 'add' && renderAddTab()}
      {activeTab === 'profile' && renderProfileTab()}

      {renderNavigationBar()}

      <Modal visible={showPriceModal} transparent animationType="fade" onRequestClose={() => setShowPriceModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Set Price</Text>
            <Text style={styles.modalSubtitle}>Enter price for {currentCommonItem?.name}:</Text>
            <TextInput style={styles.modalInput} placeholder="Enter price (e.g., 50)" keyboardType="numeric" value={priceInput} onChangeText={setPriceInput} />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setShowPriceModal(false)}><Text style={styles.cancelButtonText}>Cancel</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.addButton, (!priceInput || isNaN(parseFloat(priceInput))) && styles.addButtonDisabled]} onPress={addCommonItem} disabled={!priceInput || isNaN(parseFloat(priceInput))}>
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
    backgroundColor: '#F8FAFC',
    paddingBottom: 70,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  logoContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: { fontSize: 24 },
  centerContent: { flex: 1, alignItems: 'center', paddingHorizontal: 20 },
  title: { fontSize: 20, fontWeight: '600', color: '#1E293B' },
  subtitle: { fontSize: 12, color: '#64748B' },
  logoutButton: { backgroundColor: '#EF4444', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 8 },
  logoutText: { color: '#FFFFFF', fontSize: 13, fontWeight: '500' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 8, color: '#1E293B' },

  // Tabs
  tabContent: { paddingHorizontal: 20 },
  searchContainer: { marginBottom: 12 },
  searchInput: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 10, padding: 12, color: '#1E293B' },
  menuList: { },
  menuItem: { flexDirection: 'row', backgroundColor: '#F1F5F9', borderRadius: 10, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  menuItemImage: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
  menuItemInfo: { flex: 1, justifyContent: 'center' },
  menuItemName: { fontSize: 16, fontWeight: '600', color: '#1E293B', marginBottom: 2 },
  menuItemDetails: { fontSize: 13, color: '#64748B' },
  thaliTag: { fontSize: 12, color: '#EF4444', marginTop: 4 },

  // Cards & inputs
  card: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#E2E8F0' },
  cardTitle: { fontSize: 18, fontWeight: '600', color: '#1E293B', marginBottom: 4 },
  cardSubtitle: { fontSize: 13, color: '#64748B', marginBottom: 12 },
  inputGroup: { marginBottom: 12 },
  label: { fontSize: 12, color: '#475569', marginBottom: 6, fontWeight: '500' },
  input: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 10, padding: 12, color: '#1E293B' },
  textArea: { height: 80, textAlignVertical: 'top' },
  coordinateRow: { flexDirection: 'row', gap: 10 },
  coordinateInput: { flex: 1 },
  optionsRow: { flexDirection: 'row', gap: 8 },
  optionButton: { flex: 1, backgroundColor: '#F1F5F9', borderRadius: 10, paddingVertical: 12, alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  optionButtonActive: { backgroundColor: '#EF4444', borderColor: '#EF4444' },
  optionText: { color: '#64748B', fontWeight: '500' },
  optionTextActive: { color: '#FFFFFF' },
  preview: { width: '100%', height: 160, borderRadius: 10, marginBottom: 12 },
  photoPlaceholder: { width: '100%', height: 160, borderRadius: 10, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0', borderStyle: 'dashed', marginBottom: 12 },
  photoPlaceholderText: { color: '#9CA3AF' },
  photoButton: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EF4444', borderRadius: 10, padding: 12, alignItems: 'center' },
  photoButtonText: { color: '#EF4444', fontWeight: '500' },
  submitButton: { backgroundColor: '#EF4444', borderRadius: 10, padding: 14, alignItems: 'center' },
  submitButtonDisabled: { backgroundColor: '#F3F4F6' },
  submitButtonText: { color: '#FFFFFF', fontWeight: '600' },
  infoText: { color: '#475569', marginBottom: 6 },

  // Common items carousel
  commonItemCard: { width: 120, marginRight: 10, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 10, padding: 10, alignItems: 'center', backgroundColor: '#F9FAFB' },
  commonItemImage: { width: 100, height: 70, borderRadius: 8, marginBottom: 8 },
  commonItemName: { fontSize: 12, color: '#1E293B', fontWeight: '600' },
  commonItemCategory: { fontSize: 12, color: '#64748B' },
  emptyContainer: { alignItems: 'center', paddingVertical: 20 },
  emptyText: { color: '#64748B' },

  // Bottom nav
  navBar: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E5E7EB', flexDirection: 'row', paddingVertical: 8, paddingHorizontal: 12 },
  navItem: { flex: 1, alignItems: 'center', paddingVertical: 6, borderRadius: 8 },
  navItemActive: { backgroundColor: '#FEF2F2' },
  navIcon: { fontSize: 18 },
  navText: { fontSize: 12, color: '#6B7280' },
  navTextActive: { color: '#EF4444', fontWeight: '600' },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20, width: '80%', maxWidth: 320 },
  modalTitle: { fontSize: 18, fontWeight: '600', color: '#1E293B', textAlign: 'center', marginBottom: 8 },
  modalSubtitle: { fontSize: 14, color: '#64748B', textAlign: 'center', marginBottom: 12 },
  modalInput: { backgroundColor: '#F1F5F9', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 10, padding: 12, color: '#1E293B', textAlign: 'center', marginBottom: 12 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  cancelButton: { flex: 1, backgroundColor: '#F3F4F6', borderRadius: 10, padding: 12, alignItems: 'center', marginRight: 8 },
  cancelButtonText: { color: '#64748B', fontWeight: '500' },
  addButton: { flex: 1, backgroundColor: '#EF4444', borderRadius: 10, padding: 12, alignItems: 'center', marginLeft: 8 },
  addButtonDisabled: { backgroundColor: '#F3F4F6' },
  addButtonText: { color: '#FFFFFF', fontWeight: '600' },

  // Additional styles for form elements
  pickerContainer: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 10, overflow: 'hidden' },
  picker: { height: 44, color: '#1E293B' },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingVertical: 8 },
  switchLabel: { fontSize: 14, color: '#475569', fontWeight: '500' },
  vegBadge: { backgroundColor: '#ECFDF5', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, borderWidth: 1, borderColor: '#10B981' },
  vegText: { color: '#047857', fontSize: 11, fontWeight: '500' },
  nonVegBadge: { backgroundColor: '#FEF2F2', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, borderWidth: 1, borderColor: '#EF4444' },
  nonVegText: { color: '#EF4444', fontSize: 11, fontWeight: '500' },
  actionButton: { backgroundColor: '#EF4444', borderRadius: 10, padding: 12, alignItems: 'center' },
  actionButtonText: { color: '#FFFFFF', fontWeight: '600' },
});