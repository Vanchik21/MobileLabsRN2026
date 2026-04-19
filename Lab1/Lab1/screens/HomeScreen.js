import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const newsData = [
    {
      id: '1',
      title: 'Заголовок новини',
      date: 'Дата новини',
      text: 'Короткий текст новини',
    },
    {
      id: '2',
      title: 'Заголовок новини',
      date: 'Дата новини',
      text: 'Короткий текст новини',
    },
    {
      id: '3',
      title: 'Заголовок новини',
      date: 'Дата новини',
      text: 'Короткий текст новини',
    },
    {
      id: '4',
      title: 'Заголовок новини',
      date: 'Дата новини',
      text: 'Короткий текст новини',
    },
    {
      id: '5',
      title: 'Заголовок новини',
      date: 'Дата новини',
      text: 'Короткий текст новини',
    },
    {
      id: '6',
      title: 'Заголовок новини',
      date: 'Дата новини',
      text: 'Короткий текст новини',
    },
    {
      id: '7',
      title: 'Заголовок новини',
      date: 'Дата новини',
      text: 'Короткий текст новини',
    },
    {
      id: '8',
      title: 'Заголовок новини',
      date: 'Дата новини',
      text: 'Короткий текст новини',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Новини</Text>

      <ScrollView style={styles.newsContainer}>
        {newsData.map((news) => (
          <View key={news.id} style={styles.newsCard}>
            <View style={styles.imagePlaceholder}>
              <Ionicons name="image" size={40} color="#b0b0b0" />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.newsTitle}>{news.title}</Text>
              <Text style={styles.newsDate}>{news.date}</Text>
              <Text style={styles.newsText}>{news.text}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Прізвище ім'я та по-батькові, група</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 15,
  },
  newsContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  newsCard: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  newsDate: {
    fontSize: 12,
    color: '#a0a0a0',
    marginTop: 2,
    marginBottom: 2,
  },
  newsText: {
    fontSize: 12,
    color: '#555',
  },
  footer: {
    padding: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#555',
  },
});