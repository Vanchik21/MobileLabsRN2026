import React, { useContext, useRef } from 'react';
import { View, Text, Animated, Dimensions } from 'react-native';
import { State, TapGestureHandler, LongPressGestureHandler, PanGestureHandler, FlingGestureHandler, PinchGestureHandler, Directions } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { GameContext } from '../GameContext';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.background};
`;

const ScoreText = styled.Text`
  font-size: 48px;
  font-weight: bold;
  color: ${(props) => props.theme.text};
  margin-bottom: 50px;
`;

const ClickerCircle = styled(Animated.View)`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  background-color: #00bfff;
  align-items: center;
  justify-content: center;
  elevation: 5;
`;

const ClickerText = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: bold;
`;

export default function HomeScreen() {
  const { score, updateStat } = useContext(GameContext);
  
  const doubleTapRef = useRef(null);
  const panRef = useRef(null);

  const onSingleTap = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) updateStat('taps', 1);
  };

  const onDoubleTap = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) updateStat('doubleTaps', 2);
  };

  const onLongPress = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) updateStat('longPresses', 5);
  };

  const onPan = (event) => {
    if (event.nativeEvent.state === State.END) updateStat('drags', 0); // Просто фіксуємо драг
  };

  const onSwipeRight = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) updateStat('swipeRights', Math.floor(Math.random() * 10) + 1);
  };

  const onSwipeLeft = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) updateStat('swipeLefts', Math.floor(Math.random() * 10) + 1);
  };

  const onPinch = (event) => {
    if (event.nativeEvent.state === State.END) updateStat('pinches', 3);
  };

  return (
    <Container>
      <ScoreText>{score}</ScoreText>
      
      {}
      <PinchGestureHandler onHandlerStateChange={onPinch}>
        <Animated.View>
          <FlingGestureHandler direction={Directions.RIGHT} onHandlerStateChange={onSwipeRight}>
            <Animated.View>
              <FlingGestureHandler direction={Directions.LEFT} onHandlerStateChange={onSwipeLeft}>
                <Animated.View>
                  <PanGestureHandler ref={panRef} onHandlerStateChange={onPan}>
                    <Animated.View>
                      <LongPressGestureHandler onHandlerStateChange={onLongPress} minDurationMs={3000}>
                        <Animated.View>
                          <TapGestureHandler waitFor={doubleTapRef} onHandlerStateChange={onSingleTap}>
                            <Animated.View>
                              <TapGestureHandler ref={doubleTapRef} numberOfTaps={2} onHandlerStateChange={onDoubleTap}>
                                <ClickerCircle>
                                  <ClickerText>TAP ME</ClickerText>
                                </ClickerCircle>
                              </TapGestureHandler>
                            </Animated.View>
                          </TapGestureHandler>
                        </Animated.View>
                      </LongPressGestureHandler>
                    </Animated.View>
                  </PanGestureHandler>
                </Animated.View>
              </FlingGestureHandler>
            </Animated.View>
          </FlingGestureHandler>
        </Animated.View>
      </PinchGestureHandler>
    </Container>
  );
}