import React, { useState, useEffect } from 'react';
import { TextInput, TouchableOpacity, Text, View, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';
import styled from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Container = styled.View`
    flex: 1;
    background-color: #f4f7ff;
    padding: 20px;
    padding-top: ${props => Math.max(props.top, 20)}px;
    padding-bottom: ${props => props.bottom + 10}px;
`;

export default function FileEditor({ route, navigation }) {
    const insets = useSafeAreaInsets();
    const { fileUri, name } = route.params;
    const [content, setContent] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const info = await FileSystem.getInfoAsync(fileUri);
                if (info.exists) setContent(await FileSystem.readAsStringAsync(fileUri));
            } catch (e) { console.log("New file"); }
        })();
    }, [fileUri]);

    const handleSave = async () => {
        try {
            await FileSystem.writeAsStringAsync(fileUri, content);
            Alert.alert('Успіх', 'Файл збережено');
            navigation.goBack();
        } catch (e) { Alert.alert("Помилка збереження"); }
    };

    return (
        <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <Container top={insets.top} bottom={insets.bottom}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 15}}>
                    <Text style={{color: '#102a43', fontWeight: '700', fontSize: 18}} numberOfLines={1}>{name}</Text>
                </View>

                <TextInput
                    multiline
                    style={{
                        flex: 1,
                        backgroundColor: '#ffffff',
                        borderRadius: 18,
                        padding: 20,
                        textAlignVertical: 'top',
                        borderWidth: 1,
                        borderColor: '#9fb3c8',
                        fontSize: 16,
                        elevation: 2,
                        color: '#243b53'
                    }}
                    value={content}
                    onChangeText={setContent}
                    placeholder="Ваш текст тут..."
                    placeholderTextColor="#829ab1"
                />

                <View style={{flexDirection: 'row', marginTop: 20, gap: 12}}>
                    <Btn onPress={() => navigation.goBack()} style={{backgroundColor: '#e2e8f0', flex: 1}}>
                        <Text style={{color: '#334155', fontWeight: '700'}}>Назад</Text>
                    </Btn>
                    <Btn onPress={handleSave} style={{flex: 2}}>
                        <Text style={{color: '#ffffff', fontWeight: '700'}}>Зберегти</Text>
                    </Btn>
                </View>
            </Container>
        </KeyboardAvoidingView>
    );
}

const Btn = styled.TouchableOpacity`
    background-color: #2563eb;
    padding: 16px;
    border-radius: 14px;
    align-items: center;
    elevation: 3;
`;
