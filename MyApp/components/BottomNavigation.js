import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BottomNavigation({ navigation, active }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.tab} 
        onPress={() => navigation.navigate('UserHome')}
      >
        <Ionicons 
          name={active === 'home' ? 'home' : 'home-outline'} 
          size={24} 
          color={active === 'home' ? '#E23744' : '#64748B'} 
        />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.tab} 
        onPress={() => navigation.navigate('Search')}
      >
        <Ionicons 
          name={active === 'search' ? 'search' : 'search-outline'} 
          size={24} 
          color={active === 'search' ? '#E23744' : '#64748B'} 
        />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.tab} 
        onPress={() => navigation.navigate('Cart')}
      >
        <Ionicons 
          name={active === 'cart' ? 'cart' : 'cart-outline'} 
          size={24} 
          color={active === 'cart' ? '#E23744' : '#64748B'} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
});