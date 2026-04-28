import React from 'react';
import { View, Text, SectionList, StyleSheet } from 'react-native';
import { contactsData } from '../data';

export default function ContactsScreen() {
  return (
    <SectionList
      sections={contactsData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

const styles = StyleSheet.create({
  header: { fontSize: 20, fontWeight: 'bold', backgroundColor: '#eee', padding: 10 },
  item: { padding: 15, fontSize: 16 },
  separator: { height: 1, backgroundColor: '#ccc' }
});