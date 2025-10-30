import React, { useState, useEffect, useContext, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TextInput,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from "../context/AuthContext";
import Logo from "../components/Logo";
// Using App-level Tab Navigator; no local bottom navigation here
import { api } from "../services/api";
import { getCurrentPosition, reverseGeocode, loadSavedLocation, saveLocation, isFresh, clearManualLocation } from "../services/location";
import TopBar from "../components/TopBar";

export default function UserHome({ navigation }) {
  const { user, logout } = useContext(AuthContext);
  const [activeNav, setActiveNav] = useState('home');
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [commonMenuItems, setCommonMenuItems] = useState([]);
  const [selectedCommonItem, setSelectedCommonItem] = useState(null);
  const [locationLabel, setLocationLabel] = useState("Detecting location...");
  const [manualModalVisible, setManualModalVisible] = useState(false);
  const [locationHistory, setLocationHistory] = useState([]);
  const manualAddressRef = useRef("");
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);
  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const [changePasswordVisible, setChangePasswordVisible] = useState(false);
  const [profileForm, setProfileForm] = useState({ firstName: '', secondName: '', phoneNumber: '', address: '' });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '' });

  useEffect(() => {
    fetchCommonMenuItems();
    fetchHotels();
  }, [filter, searchQuery]);

  useEffect(() => {
    if (selectedCommonItem) {
      fetchHotelsByCommonItem(selectedCommonItem._id);
    } else {
      fetchHotels();
    }
  }, [selectedCommonItem]);

  // Refresh location whenever screen gains focus
  useFocusEffect(
    React.useCallback(() => {
      refreshLocationOnFocus();
      return undefined;
    }, [user?.id]) // Re-run when the user ID changes
  );

  const refreshLocationOnFocus = async () => {
    // Load any saved manual address first
    const savedData = await loadSavedLocation(user?.id);
    setLocationHistory(savedData?.history || []);
    if (savedData?.current?.manual?.address) {
      setLocationLabel(savedData.current.manual.address);
      return; // honor manual override
    }
    // Use cached GPS if fresh within 24 hours
    if (savedData?.current?.gps && isFresh(savedData.current.gps.timestamp)) {
      setLocationLabel(savedData.current.label || `${savedData.current.gps.lat.toFixed(3)}, ${savedData.current.gps.long.toFixed(3)}`);
      return;
    }
    const current = await getCurrentPosition();
    if (current) {
      const address = await reverseGeocode(current.lat, current.long);
      const label = address || `${current.lat.toFixed(3)}, ${current.long.toFixed(3)}`;
      setLocationLabel(label);
      await saveLocation(user?.id, { type: 'gps', gps: current, label });
    } else {
      setLocationLabel("Location permission needed");
    }
  };

  const loadProfile = async () => {
    try {
      const res = await api.get('/auth/profile');
      setProfileForm({
        firstName: res.data.firstName || '',
        secondName: res.data.secondName || '',
        phoneNumber: res.data.phoneNumber || '',
        address: res.data.address || '',
      });
    } catch (_) {}
  };

  const fetchCommonMenuItems = async () => {
    try {
      const res = await api.get("/common-menu");
      let items = Array.isArray(res.data) ? res.data : res.data.commonMenuItems || [];
      // Fix photo URLs to be absolute
      items = items.map(item => ({
        ...item,
        photo: item.photo && item.photo.startsWith("/uploads/")
          ? `${api.defaults.baseURL.replace('/api','')}${item.photo}`
          : item.photo
      }));
      console.log("Fetched common menu items:", items);
      setCommonMenuItems(items);
    } catch (error) {
      console.log("Error fetching common menu items:", error);
      setCommonMenuItems([]);
    }
  };

  const fetchHotelsByCommonItem = async (commonItemId) => {
    setLoading(true);
    try {
      const res = await api.get(`/hotels/by-common-item/${commonItemId}`);
      let fetchedHotels = Array.isArray(res.data) ? res.data : res.data.hotels || [];
      if (searchQuery) {
        fetchedHotels = fetchedHotels.filter((hotel) =>
          hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      setHotels(fetchedHotels);
    } catch (error) {
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchHotels = async () => {
    setLoading(true);
    try {
      let url = "/hotels";
      if (filter !== "all") {
        url = `/hotels/type?type=${filter}`;
      }
      const response = await api.get(url);
      // Support both array and object response formats
      let fetchedHotels = Array.isArray(response.data)
        ? response.data
        : response.data.hotels || [];
      // Fix photo URLs to absolute
      fetchedHotels = fetchedHotels.map(h => ({
        ...h,
        photo: h.photo && String(h.photo).startsWith("/uploads/")
          ? `${api.defaults.baseURL.replace('/api','')}${h.photo}`
          : h.photo
      }));
      if (searchQuery) {
        fetchedHotels = fetchedHotels.filter((hotel) =>
          hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      setHotels(fetchedHotels);
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Failed to fetch hotels");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (type) => {
    setFilter(type);
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

  const renderHotel = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("HotelDetails", { hotelId: item._id })}
      activeOpacity={0.8}
    >
      {item.photo ? (
        <Image source={{ uri: item.photo }} style={styles.hotelImage} />
      ) : (
        <View style={styles.placeholderPhoto}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}
      <View style={styles.cardContent}>
        <Text style={styles.hotelName}>{item.name}</Text>
        <Text style={styles.hotelAddress} numberOfLines={2}>
          📍 {item.address}
        </Text>
        {item.options?.length > 0 && (
          <View style={styles.optionsContainer}>
            {item.options.includes("veg") && (
              <View style={styles.vegBadge}>
                <Text style={styles.vegText}>🟢 Veg</Text>
              </View>
            )}
            {item.options.includes("nonveg") && (
              <View style={styles.nonVegBadge}>
                <Text style={styles.nonVegText}>🔴 Non-Veg</Text>
              </View>
            )}
          </View>
        )}
        <TouchableOpacity
          style={styles.viewMenuButton}
          onPress={() => navigation.navigate("HotelDetails", { hotelId: item._id })}
        >
          <Text style={styles.viewMenuText}>View Menu →</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  // Grid rendering for hotels (2 per row)
  const renderHotelGrid = () => {
    const rows = [];
    for (let i = 0; i < hotels.length; i += 2) {
      rows.push(
        <View style={styles.hotelRow} key={i}>
          <View style={{ flex: 1, marginRight: 8 }}>{renderHotel({ item: hotels[i] })}</View>
          {hotels[i + 1] && <View style={{ flex: 1, marginLeft: 8 }}>{renderHotel({ item: hotels[i + 1] })}</View>}
        </View>
      );
    }
    return rows;
  };

  // Using shared BottomNavigation component for consistency

  if (loading) {
    return (
      <View style={styles.container}>
        <TopBar
          title="Restaurants"
          subtitle={`📍 ${locationLabel}`}
          onSubtitlePress={() => setManualModalVisible(true)}
          onProfilePress={async () => { await loadProfile(); setProfileMenuVisible(true); }}
        />
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.center}>
            <Logo size={80} />
            <ActivityIndicator size="large" color="#EF4444" style={{ marginTop: 12 }} />
            <Text style={styles.loadingText}>Loading restaurants...</Text>
          </View>
        </ScrollView>
        {/* Bottom navigation handled by Tab Navigator */}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TopBar
        title="Restaurants"
        subtitle={`📍 ${locationLabel}`}
        onSubtitlePress={async () => { await refreshLocationOnFocus(); setManualModalVisible(true); }}
        onProfilePress={async () => { await loadProfile(); setProfileMenuVisible(true); }}
      />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="🔍 Search restaurants..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Common Menu Items Horizontal Scroll */}
        <View style={styles.commonMenuSection}>
          <Text style={styles.sectionTitle}>Popular Foods</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.commonMenuScroll}>
            {commonMenuItems.map((item) => (
              <TouchableOpacity
                key={item._id}
                style={[
                  styles.commonMenuItem,
                  selectedCommonItem?._id === item._id && styles.commonMenuItemActive
                ]}
                onPress={() => setSelectedCommonItem(selectedCommonItem?._id === item._id ? null : item)}
                activeOpacity={0.8}
              >
                {item.photo && (
                  <Image source={{ uri: item.photo }} style={styles.commonMenuImage} />
                )}
                <Text style={styles.commonMenuName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.commonMenuCategory} numberOfLines={1}>{item.category}</Text>
                <Text style={styles.commonMenuType}>{item.foodType === "veg" ? "🟢 Veg" : "🔴 Non-Veg"}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Filter Buttons - Hide when a common menu item is selected */}
        {!selectedCommonItem && (
          <View style={styles.filterButtonsSection}>
            <View style={styles.filterButtons}>
              <TouchableOpacity
                style={[styles.filterButton, filter === "all" && styles.filterButtonActive]}
                onPress={() => handleFilterChange("all")}
                activeOpacity={0.8}
              >
                <Text style={[styles.filterButtonText, filter === "all" && styles.filterButtonTextActive]}>
                  All
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterButton, filter === "veg" && styles.filterButtonActive]}
                onPress={() => handleFilterChange("veg")}
                activeOpacity={0.8}
              >
                <Text style={[styles.filterButtonText, filter === "veg" && styles.filterButtonTextActive]}>
                  🟢 Veg
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterButton, filter === "nonveg" && styles.filterButtonActive]}
                onPress={() => handleFilterChange("nonveg")}
                activeOpacity={0.8}
              >
                <Text style={[styles.filterButtonText, filter === "nonveg" && styles.filterButtonTextActive]}>
                  🔴 Non-Veg
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Hotels Grid */}
        <View style={styles.listContent}>
          {hotels.length > 0 ? (
            renderHotelGrid()
          ) : selectedCommonItem ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No hotels found for this food</Text>
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No restaurants found</Text>
              <Text style={styles.emptySubtext}>Try adjusting your filters</Text>
            </View>
          )}
        </View>
      </ScrollView>
      {/* Bottom navigation handled by Tab Navigator */}

      {/* Manual location entry modal */}
      <Modal
        visible={manualModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setManualModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Set Your Location</Text>
            <TextInput
              style={styles.manualInput}
              placeholder="Enter address or area"
              placeholderTextColor="#9CA3AF"
              defaultValue={manualAddressRef.current}
              onChangeText={(t) => { manualAddressRef.current = t; }}
            />
            {locationHistory.length > 0 && (
              <View style={styles.historyContainer}>
                <Text style={styles.historyTitle}>Previously Used</Text>
                {locationHistory.map((loc, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={styles.historyItem}
                    onPress={async () => {
                      setLocationLabel(loc.label);
                      if (loc.type === 'manual') {
                        await saveLocation(user?.id, { type: 'manual', manual: { address: loc.label }, label: loc.label });
                      } else { // gps
                        await saveLocation(user?.id, { type: 'gps', gps: loc.gps, label: loc.label });
                      }
                      setManualModalVisible(false);
                    }}>
                    <Text style={styles.historyLabel}>{loc.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            <View style={{ flexDirection: 'row', gap: 12, marginTop: 12 }}>
              <Pressable style={styles.modalButtonSecondary} onPress={() => setManualModalVisible(false)}>
                <Text style={styles.modalButtonTextSecondary}>Cancel</Text>
              </Pressable>
              <Pressable
                style={styles.modalButtonPrimary}
                onPress={async () => {
                  const address = String(manualAddressRef.current || '').trim();
                  if (!address) return setManualModalVisible(false);
                  setLocationLabel(address);
                  await saveLocation(user?.id, { type: 'manual', manual: { address }, label: address });
                  setManualModalVisible(false);
                }}
              >
                <Text style={styles.modalButtonTextPrimary}>Save</Text>
              </Pressable>
            </View>
            <Pressable
              style={[styles.modalButtonSecondary, { marginTop: 8 }]}
              onPress={async () => {
                setManualModalVisible(false);
                manualAddressRef.current = "";
                await clearManualLocation(user?.id);
                await refreshLocationOnFocus();
              }}
            >
              <Text style={styles.modalButtonTextSecondary}>Use current location</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Profile menu */}
      <Modal
        visible={profileMenuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setProfileMenuVisible(false)}
      >
        <Pressable style={styles.profileMenuBackdrop} onPress={() => setProfileMenuVisible(false)}>
          <Pressable style={styles.profileMenuContainer}>
            <View style={styles.profileMenuHeader}>
              <Text style={styles.profileMenuTitle}>Account Options</Text>
              <View style={styles.profileMenuHandle} />
            </View>
            <Pressable style={styles.profileMenuItem} onPress={() => { setProfileMenuVisible(false); setEditProfileVisible(true); }}>
              <Ionicons name="person-outline" size={22} color="#475569" />
              <Text style={styles.profileMenuItemText}>Edit Profile</Text>
            </Pressable>
            <Pressable style={styles.profileMenuItem} onPress={() => { setProfileMenuVisible(false); setChangePasswordVisible(true); }}>
              <Ionicons name="lock-closed-outline" size={22} color="#475569" />
              <Text style={styles.profileMenuItemText}>Change Password</Text>
            </Pressable>
            <Pressable style={styles.profileMenuItem} onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={22} color="#EF4444" />
              <Text style={[styles.profileMenuItemText, { color: '#EF4444' }]}>Logout</Text>
            </Pressable>
            <Pressable 
              style={[styles.profileMenuItem, { justifyContent: 'center', backgroundColor: '#F1F5F9', marginTop: 16 }]} 
              onPress={() => setProfileMenuVisible(false)}
            >
              <Text style={[
                  styles.profileMenuItemText, 
                  { fontWeight: '600', color: '#475569' }
                ]}
              >
                Cancel
              </Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Edit profile modal */}
      <Modal
        visible={editProfileVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setEditProfileVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Edit profile</Text>
            <Text style={styles.modalLabel}>First name</Text>
            <TextInput style={styles.manualInput} placeholder="Enter first name" placeholderTextColor="#4B5563" value={profileForm.firstName} onChangeText={(t)=>setProfileForm(p=>({...p, firstName:t}))} autoCapitalize="words" selectionColor="#EF4444" />
            <View style={{ height: 8 }} />
            <Text style={styles.modalLabel}>Last name</Text>
            <TextInput style={styles.manualInput} placeholder="Enter last name" placeholderTextColor="#4B5563" value={profileForm.secondName} onChangeText={(t)=>setProfileForm(p=>({...p, secondName:t}))} autoCapitalize="words" selectionColor="#EF4444" />
            <View style={{ height: 8 }} />
            <Text style={styles.modalLabel}>Phone</Text>
            <TextInput style={styles.manualInput} placeholder="Enter phone number" keyboardType="phone-pad" placeholderTextColor="#4B5563" value={profileForm.phoneNumber} onChangeText={(t)=>setProfileForm(p=>({...p, phoneNumber:t}))} selectionColor="#EF4444" />
            <View style={{ height: 8 }} />
            <Text style={styles.modalLabel}>Address (optional)</Text>
            <TextInput style={styles.manualInput} placeholder="Enter address" placeholderTextColor="#4B5563" value={profileForm.address} onChangeText={(t)=>setProfileForm(p=>({...p, address:t}))} selectionColor="#EF4444" />
            <View style={{ flexDirection:'row', gap:12, marginTop:12 }}>
              <Pressable style={styles.modalButtonSecondary} onPress={()=>setEditProfileVisible(false)}>
                <Text style={styles.modalButtonTextSecondary}>Cancel</Text>
              </Pressable>
              <Pressable
                style={styles.modalButtonPrimary}
                onPress={async ()=>{
                  try {
                    await api.put('/auth/profile', { 
                      firstName: profileForm.firstName, 
                      secondName: profileForm.secondName, 
                      phoneNumber: profileForm.phoneNumber,
                      address: profileForm.address,
                    });
                    setEditProfileVisible(false);
                    Alert.alert('Success', 'Profile updated');
                  } catch (e) {
                    Alert.alert('Error', e.response?.data?.message || 'Failed to update');
                  }
                }}
              >
                <Text style={styles.modalButtonTextPrimary}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Change password modal */}
      <Modal
        visible={changePasswordVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setChangePasswordVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Update password</Text>
            <TextInput style={styles.manualInput} placeholder="Current password" placeholderTextColor="#9CA3AF" secureTextEntry value={passwordForm.currentPassword} onChangeText={(t)=>setPasswordForm(p=>({...p, currentPassword:t}))} />
            <View style={{ height: 8 }} />
            <TextInput style={styles.manualInput} placeholder="New password" placeholderTextColor="#9CA3AF" secureTextEntry value={passwordForm.newPassword} onChangeText={(t)=>setPasswordForm(p=>({...p, newPassword:t}))} />
            <View style={{ flexDirection:'row', gap:12, marginTop:12 }}>
              <Pressable style={styles.modalButtonSecondary} onPress={()=>setChangePasswordVisible(false)}>
                <Text style={styles.modalButtonTextSecondary}>Cancel</Text>
              </Pressable>
              <Pressable
                style={styles.modalButtonPrimary}
                onPress={async ()=>{
                  try {
                    await api.put('/auth/change-password', passwordForm);
                    setChangePasswordVisible(false);
                    setPasswordForm({ currentPassword:'', newPassword:'' });
                    Alert.alert('Success', 'Password updated');
                  } catch (e) {
                    Alert.alert('Error', e.response?.data?.message || 'Failed to update');
                  }
                }}
              >
                <Text style={styles.modalButtonTextPrimary}>Save</Text>
              </Pressable>
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
    marginTop: 0,
  },
  mainContent: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    marginBottom: 12,
  },
  headerLeft: { },
  headerEmoji: { },
  headerCenter: { },
  headerRight: { },
  logoText: { fontSize: 36 },
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
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  modalCard: { width: '90%', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#E2E8F0', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.12, shadowRadius: 6, elevation: 4 },
  modalTitle: { fontSize: 16, fontWeight: '600', color: '#1E293B', marginBottom: 8 },
  modalLabel: { fontSize: 12, color: '#374151', marginBottom: 6, marginTop: 4 },
  manualInput: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#9CA3AF', borderRadius: 10, padding: 12, fontSize: 16, color: '#111827' },
  modalButtonPrimary: { flex: 1, backgroundColor: '#EF4444', paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  modalButtonSecondary: { flex: 1, backgroundColor: '#F1F5F9', paddingVertical: 10, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  modalButtonTextPrimary: { color: '#FFFFFF', fontWeight: '600' },
  modalButtonTextSecondary: { color: '#1E293B', fontWeight: '500' },
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
    color: "#000000",
    fontSize: 16,
    marginTop: 12,
    fontWeight: "500",
  },
  searchSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchContainer: {
    marginBottom: 0,
  },
  searchInput: {
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    color: "#1E293B",
  },
  commonMenuSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 12,
  },
  commonMenuScroll: {
    paddingBottom: 8,
  },
  commonMenuItem: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    width: 100,
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  commonMenuItemActive: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },
  commonMenuImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginBottom: 8,
    resizeMode: "cover",
  },
  commonMenuName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1E293B",
    textAlign: "center",
    marginBottom: 2,
  },
  commonMenuCategory: {
    fontSize: 10,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 2,
  },
  commonMenuType: {
    fontSize: 10,
    color: "#EF4444",
    fontWeight: "500",
    textAlign: "center",
  },
  filterButtonsSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  filterButtons: {
    flexDirection: "row",
    gap: 8,
  },
  filterButton: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  filterButtonActive: {
    backgroundColor: "#EF4444",
    borderColor: "#EF4444",
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748B",
  },
  filterButtonTextActive: {
    color: "#FFFFFF",
  },
  listContent: {
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  hotelImage: {
    width: "100%",
    height: 160,
    resizeMode: "cover",
  },
  placeholderPhoto: {
    width: "100%",
    height: 160,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#9CA3AF",
    fontSize: 14,
    fontWeight: "500",
  },
  cardContent: {
    padding: 12,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 4,
  },
  hotelAddress: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 8,
    lineHeight: 20,
  },
  optionsContainer: {
    flexDirection: "row",
    gap: 8,
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
  viewMenuButton: {
    backgroundColor: "#EF4444",
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: "center",
  },
  viewMenuText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "500",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000000",
    color: "#1E293B",
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#64748B",
  },
  hotelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },  

  // Modal Styles (used for multiple modals)
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  modalCard: { width: '90%', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#E2E8F0', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.12, shadowRadius: 6, elevation: 4 },
  modalTitle: { fontSize: 16, fontWeight: '600', color: '#000000', marginBottom: 8 },
  modalLabel: { fontSize: 12, color: '#374151', marginBottom: 6, marginTop: 4 },
  manualInput: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#9CA3AF', borderRadius: 10, padding: 12, fontSize: 16, color: '#111827' },
  modalButtonPrimary: { flex: 1, backgroundColor: '#EF4444', paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  modalButtonSecondary: { flex: 1, backgroundColor: '#F1F5F9', paddingVertical: 10, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  modalButtonTextPrimary: { color: '#FFFFFF', fontWeight: '600' },
  modalButtonTextSecondary: { color: '#000000', fontWeight: '500' },

  // New Profile Menu Styles
  profileMenuBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  profileMenuContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40, // Extra space for home indicator
  },
  profileMenuHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileMenuHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#E2E8F0',
    borderRadius: 2.5,
    marginBottom: 12,
  },
  profileMenuTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  profileMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 12,
  },
  profileMenuItemText: {
    fontSize: 16,
    color: '#334155',
    marginLeft: 16,
    fontWeight: '500',
  },
});