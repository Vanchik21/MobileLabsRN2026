import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { newsData } from '../data';

export default function MainScreen({ navigation }) {
  const [data, setData] = useState(newsData.slice(0, 15));
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setData(newsData.slice(0, 15));
      setIsRefreshing(false);
    }, 1500);
  };

  const handleLoadMore = () => {
    if (data.length < newsData.length) {
      const moreData = newsData.slice(data.length, data.length + 10);
      setData([...data, ...moreData]);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.item}
      onPress={() => navigation.navigate('Details', { item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={<Text style={styles.header}>Стрічка новин</Text>}
      ListFooterComponent={data.length < newsData.length ? <ActivityIndicator size="large" /> : <Text style={styles.footer}>Кінець списку</Text>}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      initialNumToRender={10}
      maxToRenderPerBatch={5}
      windowSize={5}
    />
  );
}

const styles = StyleSheet.create({
  item: { flexDirection: 'row', padding: 10 },
  image: { width: 50, height: 50, marginRight: 10, borderRadius: 25 },
  title: { fontWeight: 'bold' },
  header: { fontSize: 24, fontWeight: 'bold', padding: 15, textAlign: 'center' },
  footer: { padding: 15, textAlign: 'center', color: 'gray' },
  separator: { height: 1, backgroundColor: '#ccc' }
});