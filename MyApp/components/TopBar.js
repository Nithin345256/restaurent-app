import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function TopBar({ title, subtitle, onSubtitlePress, onProfilePress }) {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <StatusBar style="dark" backgroundColor="#FFFFFF" translucent={false} />
      <View style={styles.container}>
        <View style={styles.left}>
          <Text style={styles.emoji}>🍽️</Text>
        </View>
        <View style={styles.center}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? (
            <TouchableOpacity onPress={onSubtitlePress}>
              <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <TouchableOpacity style={styles.right} onPress={onProfilePress}>
          <Ionicons name="person-circle" size={30} color="#E23744" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#FFFFFF' },
  container: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    // Remove borders/shadows to avoid grey line at top
    borderBottomWidth: 0,
    shadowOpacity: 0,
    elevation: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  left: { width: 36, alignItems: 'center' },
  emoji: { fontSize: 22 },
  center: { flex: 1, alignItems: 'center' },
  right: { width: 36, alignItems: 'flex-end' },
  title: { fontSize: 20, fontWeight: '700', color: '#1E293B' },
  subtitle: { marginTop: 2, fontSize: 12, color: '#64748B', maxWidth: '90%' },
});


