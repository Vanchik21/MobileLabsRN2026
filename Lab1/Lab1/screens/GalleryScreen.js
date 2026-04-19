import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const numColumns = 2;
const cardSize = screenWidth / numColumns - 20;

export default function GalleryScreen() {
  const galleryData = [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: '8' },
    { id: '9' },
    { id: '10' },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={galleryData}
        numColumns={numColumns}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.gridContainer}
        renderItem={() => (
          <View style={[styles.photoCard, { width: cardSize, height: cardSize }]} />
        )}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Захаров Іван ІПЗ-22-1</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gridContainer: {
    padding: 10,
    alignItems: 'center',
  },
  photoCard: {
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
  },
  footer: {
    padding: 15,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  footerText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#555',
  },
});