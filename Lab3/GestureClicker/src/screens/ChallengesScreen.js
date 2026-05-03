import React, { useContext } from 'react';
import { ScrollView, View, Text } from 'react-native';
import styled from 'styled-components/native';
import { GameContext } from '../GameContext';

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${(props) => props.theme.background};
  padding: 20px;
`;

const ChallengeItem = styled.View`
  padding: 15px;
  background-color: ${(props) => (props.completed ? '#d4edda' : '#f8d7da')};
  border-radius: 10px;
  margin-bottom: 10px;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

export default function ChallengesScreen() {
  const { score, stats } = useContext(GameContext);

  const challenges = [
    { title: 'Зробити 10 кліків', completed: stats.taps >= 10 },
    { title: 'Зробити подвійний клік 5 разів', completed: stats.doubleTaps >= 5 },
    { title: 'Утримувати об`єкт 3 секунди', completed: stats.longPresses >= 1 },
    { title: 'Перетягнути об`єкт', completed: stats.drags >= 1 },
    { title: 'Зробити свайп вправо', completed: stats.swipeRights >= 1 },
    { title: 'Зробити свайп вліво', completed: stats.swipeLefts >= 1 },
    { title: 'Змінити розмір об`єкта', completed: stats.pinches >= 1 },
    { title: 'Отримати 100 очок', completed: score >= 100 },
    { title: 'Власне завдання: Зробити 3 свайпи вліво', completed: stats.swipeLefts >= 3 },
  ];

  return (
    <Container>
      {challenges.map((item, index) => (
        <ChallengeItem key={index} completed={item.completed}>
          <Title>{item.title}</Title>
          <Text>{item.completed ? 'Виконано' : ' Не виконано'}</Text>
        </ChallengeItem>
      ))}
    </Container>
  );
}