// Simple re-export of the cleaned componentimport React from 'react';// Simple re-export to use the cleaned HotelDetailsNew component

import HotelDetails from './HotelDetailsNew';

export default HotelDetails;import { View, Text, StyleSheet, Image, ScrollView, ImageBackground } from 'react-native';// This maintains stable imports in App.js while providing a clean implementation



export default function HotelDetails({ route, navigation }) {import React from 'react';

  const hotel = route?.params?.hotel || { name: "Hotel", place: "Unknown", photo: null };import { View, Text, StyleSheet, Image, ScrollView, ImageBackground } from 'react-native';

  

  return (export default function HotelDetails({ route, navigation }) {

    <View style={styles.container}>  const hotel = route?.params?.hotel || { name: "Hotel", place: "Unknown", photo: null };

      <ScrollView contentContainerStyle={styles.scrollContent}>  

        <ImageBackground  return (

          source={hotel.photo ? { uri: hotel.photo } : { uri: 'https://via.placeholder.com/400x200/eee/999?text=No+Hotel+Image' }}    <View style={styles.container}>

          style={styles.headerBackground}      <ScrollView contentContainerStyle={styles.scrollContent}>

          imageStyle={styles.headerBackgroundImage}        <ImageBackground

        >          source={hotel.photo ? { uri: hotel.photo } : { uri: 'https://via.placeholder.com/400x200/eee/999?text=No+Hotel+Image' }}

          <View style={styles.headerOverlay}>          style={styles.headerBackground}

            <Text style={styles.hotelName}>{hotel.name}</Text>          imageStyle={styles.headerBackgroundImage}

            <Text style={styles.hotelLocation}>{hotel.place}</Text>        >

          </View>          <View style={styles.headerOverlay}>

        </ImageBackground>            <Text style={styles.hotelName}>{hotel.name}</Text>

                    <Text style={styles.hotelLocation}>{hotel.place}</Text>

        <View style={styles.content}>          </View>

          {/* Content will be added back in future updates */}        </ImageBackground>

          <Text style={styles.placeholder}>Loading hotel details...</Text>        

        </View>        <View style={styles.content}>

      </ScrollView>          {/* Content will be added back in future updates */}

    </View>          <Text style={styles.placeholder}>Loading hotel details...</Text>

  );        </View>

}      </ScrollView>

    </View>

const styles = StyleSheet.create({  );

  container: {}

    flex: 1,

    backgroundColor: '#fff',const styles = StyleSheet.create({

  },  container: {

  scrollContent: {    flex: 1,

    flexGrow: 1,    backgroundColor: '#fff',

  },  },

  headerBackground: {  scrollContent: {

    height: 200,    flexGrow: 1,

    width: '100%',  },

  },  headerBackground: {

  headerBackgroundImage: {    height: 200,

    resizeMode: 'cover',    width: '100%',

  },  },

  headerOverlay: {  headerBackgroundImage: {

    flex: 1,    resizeMode: 'cover',

    backgroundColor: 'rgba(0,0,0,0.3)',  },

    padding: 20,  headerOverlay: {

    justifyContent: 'flex-end',    flex: 1,

  },    backgroundColor: 'rgba(0,0,0,0.3)',

  hotelName: {    padding: 20,

    color: '#fff',    justifyContent: 'flex-end',

    fontSize: 24,  },

    fontWeight: 'bold',  hotelName: {

    marginBottom: 5,    color: '#fff',

  },    fontSize: 24,

  hotelLocation: {    fontWeight: 'bold',

    color: '#fff',    marginBottom: 5,

    fontSize: 16,  },

  },  hotelLocation: {

  content: {    color: '#fff',

    padding: 20,    fontSize: 16,

  },  },

  placeholder: {  content: {

    textAlign: 'center',    padding: 20,

    color: '#666',  },

    marginTop: 20,  placeholder: {

  }    textAlign: 'center',

});    color: '#666',
    marginTop: 20,
  }
});
        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          </View>
        )}

        {/* Removed Hotel Banner as it's now part of the header background */}
        {/* Fallback for no photo, if ImageBackground source is null */}
        {!hotel.photo && (
          <View style={styles.bannerCard}> {/* Reusing bannerCard for consistency if no photo */}
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.banner
          ) : (
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          )}
        </View>

        {/* Toggle Buttons */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === "breakfast" && styles.toggleButtonActive]}
            onPress={() => setViewMode("breakfast")}
          >
            <Text style={[styles.toggleButtonText, viewMode === "breakfast" && styles.toggleButtonTextActive]}>
              Breakfast
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === "thali" && styles.toggleButtonActive]}
            onPress={() => setViewMode("thali")}
          >
            <Text style={[styles.toggleButtonText, viewMode === "thali" && styles.toggleButtonTextActive]}>
              Lunch / Dinner
            </Text>
          </TouchableOpacity>
        </View>

        {/* BREAKFAST VIEW */}
        {viewMode === "breakfast" && (
          <View style={styles.contentSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Breakfast Menu</Text>
              <Text style={styles.sectionSubtitle}>Available from 7 AM - 11 AM</Text>
            </View>

            {breakfastItems.length > 0 ? (
              breakfastItems.map((item) => (
                <View key={item._id} style={styles.itemCard}>
                  <View style={styles.itemHeader}>
                    <View style={styles.itemTitleRow}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <View style={item.foodType === "veg" ? styles.vegDot : styles.nonVegDot} />
                    </View>
                    <Text style={styles.itemPrice}>₹{item.price}</Text>
                  </View>
                  <View style={styles.itemAction}>
                    {breakfastQuantities[item._id] > 0 ? (
                      <View style={styles.quantityControl}>
                        <TouchableOpacity
                          style={styles.quantityBtn}
                          onPress={() => decrementBreakfast(item._id)}
                        >
                          <Text style={styles.quantityBtnText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityValue}>{breakfastQuantities[item._id]}</Text>
                        <TouchableOpacity
                          style={styles.quantityBtn}
                          onPress={() => incrementBreakfast(item._id)}
                        >
                          <Text style={styles.quantityBtnText}>+</Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={styles.addBtn}
                        onPress={() => incrementBreakfast(item._id)}
                      >
                        <Text style={styles.addBtnText}>ADD</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No breakfast items available</Text>
              </View>
            )}
          </View>
        )}

        {/* THALI VIEW */}
        {viewMode === "thali" && (
          <View style={styles.contentSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Build Your Thali</Text>
              
              {/* Lunch/Dinner Toggle */}
              <View style={styles.mealTypeTabs}>
                <TouchableOpacity
                  style={[styles.mealTab, thaliMealType === "lunch" && styles.mealTabActive]}
                  onPress={() => setThaliMealType("lunch")}
                >
                  <Text style={[styles.mealTabText, thaliMealType === "lunch" && styles.mealTabTextActive]}>
                    Lunch
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.mealTab, thaliMealType === "dinner" && styles.mealTabActive]}
                  onPress={() => setThaliMealType("dinner")}
                >
                  <Text style={[styles.mealTabText, thaliMealType === "dinner" && styles.mealTabTextActive]}>
                    Dinner
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Starters Section */}
            {starterItems.length > 0 && (
              <View style={styles.categorySection}>
                <Text style={styles.categoryTitle}>Starters Available</Text>
                {starterItems.map((item) => (
                  <View key={item._id} style={styles.thaliItemCard}>
                    <View style={styles.thaliItemInfo}>
                      <View style={styles.thaliItemTitleRow}>
                        <Text style={styles.thaliItemName}>{item.name}</Text>
                        <View style={item.foodType === "veg" ? styles.vegDotSmall : styles.nonVegDotSmall} />
                      </View>
                      <Text style={styles.thaliItemPrice}>₹{item.price}</Text>
                    </View>
                    <TouchableOpacity
                      style={[
                        styles.selectCircle,
                        isItemSelected("starter", item._id) && styles.selectCircleActive,
                      ]}
                      onPress={() => toggleThaliItem("starter", item._id)}
                    >
                      <Text style={[
                        styles.selectCircleText,
                        isItemSelected("starter", item._id) && styles.selectCircleTextActive,
                      ]}>
                        {isItemSelected("starter", item._id) ? "✓" : "+"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            {/* Rice Section */}
            {riceItems.length > 0 && (
              <View style={styles.categorySection}>
                <Text style={styles.categoryTitle}>Rice Items Available</Text>
                {riceItems.map((item) => (
                  <View key={item._id} style={styles.thaliItemCard}>
                    <View style={styles.thaliItemInfo}>
                      <View style={styles.thaliItemTitleRow}>
                        <Text style={styles.thaliItemName}>{item.name}</Text>
                        <View style={item.foodType === "veg" ? styles.vegDotSmall : styles.nonVegDotSmall} />
                      </View>
                      <Text style={styles.thaliItemPrice}>₹{item.price}</Text>
                    </View>
                    <TouchableOpacity
                      style={[
                        styles.selectCircle,
                        isItemSelected("rice", item._id) && styles.selectCircleActive,
                      ]}
                      onPress={() => toggleThaliItem("rice", item._id)}
                    >
                      <Text style={[
                        styles.selectCircleText,
                        isItemSelected("rice", item._id) && styles.selectCircleTextActive,
                      ]}>
                        {isItemSelected("rice", item._id) ? "✓" : "+"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            {/* Juices Section */}
            {juiceItems.length > 0 && (
              <View style={styles.categorySection}>
                <Text style={styles.categoryTitle}>Juices Available</Text>
                {juiceItems.map((item) => (
                  <View key={item._id} style={styles.thaliItemCard}>
                    <View style={styles.thaliItemInfo}>
                      <View style={styles.thaliItemTitleRow}>
                        <Text style={styles.thaliItemName}>{item.name}</Text>
                        <View style={item.foodType === "veg" ? styles.vegDotSmall : styles.nonVegDotSmall} />
                      </View>
                      <Text style={styles.thaliItemPrice}>₹{item.price}</Text>
                    </View>
                    <TouchableOpacity
                      style={[
                        styles.selectCircle,
                        isItemSelected("juices", item._id) && styles.selectCircleActive,
                      ]}
                      onPress={() => toggleThaliItem("juices", item._id)}
                    >
                      <Text style={[
                        styles.selectCircleText,
                        isItemSelected("juices", item._id) && styles.selectCircleTextActive,
                      ]}>
                        {isItemSelected("juices", item._id) ? "✓" : "+"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            {/* Others Section */}
            {otherItems.length > 0 && (
              <View style={styles.categorySection}>
                <Text style={styles.categoryTitle}>Others Available</Text>
                {otherItems.map((item) => (
                  <View key={item._id} style={styles.thaliItemCard}>
                    <View style={styles.thaliItemInfo}>
                      <View style={styles.thaliItemTitleRow}>
                        <Text style={styles.thaliItemName}>{item.name}</Text>
                        <View style={item.foodType === "veg" ? styles.vegDotSmall : styles.nonVegDotSmall} />
                      </View>
                      <Text style={styles.thaliItemPrice}>₹{item.price}</Text>
                    </View>
                    <TouchableOpacity
                      style={[
                        styles.selectCircle,
                        isItemSelected("others", item._id) && styles.selectCircleActive,
                      ]}
                      onPress={() => toggleThaliItem("others", item._id)}
                    >
                      <Text style={[
                        styles.selectCircleText,
                        isItemSelected("others", item._id) && styles.selectCircleTextActive,
                      ]}>
                        {isItemSelected("others", item._id) ? "✓" : "+"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            {/* Plates Counter - Now at the bottom */}
            <View style={styles.platesSection}>
              <Text style={styles.platesSectionTitle}>How Many Plates Do You Need?</Text>
              
              {/* Show selected items summary */}
              {Object.values(thaliSelections).some(arr => arr.length > 0) && (
                <View style={styles.selectionSummary}>
                  <Text style={styles.summaryTitle}>Selected Items:</Text>
                  {thaliSelections.starter.length > 0 && (
                    <Text style={styles.summaryText}>
                      Starters: {thaliSelections.starter.length} items
                    </Text>
                  )}
                  {thaliSelections.rice.length > 0 && (
                    <Text style={styles.summaryText}>
                      Rice: {thaliSelections.rice.length} items
                    </Text>
                  )}
                  {thaliSelections.juices.length > 0 && (
                    <Text style={styles.summaryText}>
                      Juices: {thaliSelections.juices.length} items
                    </Text>
                  )}
                  {thaliSelections.others.length > 0 && (
                    <Text style={styles.summaryText}>
                      Others: {thaliSelections.others.length} items
                    </Text>
                  )}
                </View>
              )}
              
              <View style={styles.platesCounter}>
                <TouchableOpacity
                  style={styles.platesBtn}
                  onPress={() => setThaliPlates(Math.max(0, thaliPlates - 1))}
                >
                  <Text style={styles.platesBtnText}>-</Text>
                </TouchableOpacity>
                <View style={styles.platesDisplay}>
                  <Text style={styles.platesNumber}>{thaliPlates}</Text>
                  <Text style={styles.platesLabel}>Plates</Text>
                </View>
                <TouchableOpacity
                  style={styles.platesBtn}
                  onPress={() => setThaliPlates(thaliPlates + 1)}
                >
                  <Text style={styles.platesBtnText}>+</Text>
                </TouchableOpacity>
              </View>
              
              {Object.values(thaliSelections).some(arr => arr.length > 0) ? (
                <View style={styles.priceBreakdown}>
                  <Text style={styles.pricePerPlate}>
                    ₹{computeThaliTotal() / thaliPlates} per plate
                  </Text>
                  <Text style={styles.platesTotal}>
                    Total: ₹{thaliTotal}
                  </Text>
                </View>
              ) : (
                <Text style={styles.selectItemsHint}>
                  Please select items to see the price
                </Text>
              )}
            </View>
          </View>
        )}

        {/* Checkout Bar */}
        {grandTotal > 0 && (
          <View style={styles.checkoutBar}>
            <View style={styles.checkoutLeft}>
              <Text style={styles.checkoutLabel}>Total Amount</Text>
              <Text style={styles.checkoutTotal}>₹{grandTotal}</Text>
            </View>
            <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
              <Text style={styles.checkoutBtnText}>Proceed</Text>
            </TouchableOpacity>
          </View>
        )}
        {/* trailing old content removed */}