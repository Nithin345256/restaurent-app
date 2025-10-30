import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AdminBottomNavigation({ activeTab, setActiveTab }) {
  return (
    <View style={styles.navBar}>
      <TouchableOpacity
        style={[styles.navItem, activeTab === 'pending' && styles.navItemActive]}
        onPress={() => setActiveTab('pending')}
      >
        <Ionicons name="hourglass-outline" size={24} color={activeTab === 'pending' ? '#EF4444' : '#64748B'} />
        <Text style={[styles.navText, activeTab === 'pending' && styles.navTextActive]}>Pending</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.navItem, activeTab === 'hotels' && styles.navItemActive]}
        onPress={() => setActiveTab('hotels')}
      >
        <Ionicons name="business-outline" size={24} color={activeTab === 'hotels' ? '#EF4444' : '#64748B'} />
        <Text style={[styles.navText, activeTab === 'hotels' && styles.navTextActive]}>Hotels</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.navItem, activeTab === 'users' && styles.navItemActive]}
        onPress={() => setActiveTab('users')}
      >
        <Ionicons name="people-outline" size={24} color={activeTab === 'users' ? '#EF4444' : '#64748B'} />
        <Text style={[styles.navText, activeTab === 'users' && styles.navTextActive]}>Users</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.navItem, activeTab === 'common' && styles.navItemActive]}
        onPress={() => setActiveTab('common')}
      >
        <Ionicons name="cube-outline" size={24} color={activeTab === 'common' ? '#EF4444' : '#64748B'} />
        <Text style={[styles.navText, activeTab === 'common' && styles.navTextActive]}>Common</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingVertical: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: { flex: 1, alignItems: 'center', paddingVertical: 6, borderRadius: 8 },
  navItemActive: { backgroundColor: '#FEF2F2' },
  navText: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  navTextActive: { color: '#EF4444', fontWeight: '600' },
});