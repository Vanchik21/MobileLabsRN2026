import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, Alert, TouchableOpacity, Text, View, Modal, TextInput } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';
import styled from 'styled-components/native';
import FileItem from '../components/FileItem';
import { formatBytes } from '../utils/formatters';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Screen = styled.View`
    flex: 1;
    background-color: #f4f7ff;
    padding-top: ${props => props.top}px;
    padding-bottom: ${props => props.bottom}px;
`;

const Header = styled.View`
    background-color: #ffffff;
    padding: 18px;
    margin-horizontal: 15px;
    margin-top: 10px;
    border-radius: 18px;
    elevation: 4;
    shadow-color: #102a43;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.12;
    shadow-radius: 8px;
    border-width: 1px;
    border-color: #d7e3fc;
`;

export default function FileManager({ navigation }) {
    const insets = useSafeAreaInsets();
    const [currentDir, setCurrentDir] = useState(FileSystem.documentDirectory);
    const [items, setItems] = useState([]);
    const [stats, setStats] = useState({ total: 0, free: 0 });

    // Модалки
    const [modalVisible, setModalVisible] = useState(false);
    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

    const [inputValue, setInputValue] = useState('');
    const [activeItem, setActiveItem] = useState(null);
    const [isFolder, setIsFolder] = useState(false);

    const loadData = useCallback(async () => {
        if (!currentDir) return;
        try {
            const files = await FileSystem.readDirectoryAsync(currentDir);
            const details = await Promise.all(files.map(async (name) => {
                const info = await FileSystem.getInfoAsync(currentDir + name);
                return { ...info, name };
            }));
            setItems(details.sort((a, b) => b.isDirectory - a.isDirectory));

            let free = 0; let total = 0;
            if (typeof FileSystem.getFreeDiskStorageAsync === 'function') free = await FileSystem.getFreeDiskStorageAsync();
            if (typeof FileSystem.getTotalDiskStorageAsync === 'function') total = await FileSystem.getTotalDiskStorageAsync();
            setStats({ total: total || (free + 5000000000), free });
        } catch (e) { console.log(e.message); }
    }, [currentDir]);

    useEffect(() => {
        loadData();
        const unsub = navigation.addListener('focus', loadData);
        return unsub;
    }, [navigation, loadData]);

    const handleConfirm = async () => {
        if (!inputValue.trim()) return;
        try {
            if (activeItem) {
                await FileSystem.moveAsync({ from: activeItem.uri, to: currentDir + inputValue });
            } else {
                if (isFolder) {
                    await FileSystem.makeDirectoryAsync(currentDir + inputValue, { intermediates: true });
                } else {
                    const fileName = inputValue.endsWith('.txt') ? inputValue : inputValue + '.txt';
                    navigation.navigate('Editor', { fileUri: currentDir + fileName, name: fileName });
                }
            }
            setModalVisible(false);
            setInputValue('');
            setActiveItem(null);
            loadData();
        } catch (e) { Alert.alert("Помилка", "Не вдалося виконати дію"); }
    };

    const handleDelete = async () => {
        if (!activeItem) return;
        try {
            await FileSystem.deleteAsync(activeItem.uri);
            setConfirmDeleteVisible(false);
            setActiveItem(null);
            loadData();
        } catch (e) { Alert.alert("Помилка", "Не вдалося видалити"); }
    };

    const goBackPath = () => {
        const parts = currentDir.split('/').filter(Boolean);
        if (parts.length <= 3) {
            setCurrentDir(FileSystem.documentDirectory);
            return;
        }
        parts.pop();
        const newPath = 'file:///' + parts.slice(1).join('/') + '/';
        setCurrentDir(newPath);
    };

    return (
        <Screen top={insets.top} bottom={insets.bottom}>

            {/* 1. Модалка Створення / Перейменування */}
            <Modal transparent visible={modalVisible} animationType="fade">
                <ModalOverlay>
                    <ModalContent>
                        <Text style={{fontWeight: '700', color: '#0f172a', marginBottom: 15, fontSize: 18}}>
                            {activeItem ? 'Перейменування' : (isFolder ? 'Нова папка' : 'Новий файл')}
                        </Text>
                        <StyledInput
                            value={inputValue}
                            onChangeText={setInputValue}
                            autoFocus
                            placeholder="Назва..."
                        />
                        <View style={{flexDirection: 'row', marginTop: 25, gap: 10}}>
                            <ModalBtn onPress={() => {setModalVisible(false); setActiveItem(null);}} style={{backgroundColor: '#e2e8f0'}}>
                                <Text style={{color: '#334155', fontWeight: '600'}}>Скасувати</Text>
                            </ModalBtn>
                            <ModalBtn onPress={handleConfirm}>
                                <Text style={{color: '#ffffff', fontWeight: '700'}}>Підтвердити</Text>
                            </ModalBtn>
                        </View>
                    </ModalContent>
                </ModalOverlay>
            </Modal>

            {/* 2. Модалка Підтвердження Видалення */}
            <Modal transparent visible={confirmDeleteVisible} animationType="fade">
                <ModalOverlay>
                    <ModalContent>
                        <Text style={{fontWeight: '700', color: '#b91c1c', marginBottom: 10, fontSize: 18}}>Підтвердження видалення</Text>
                        <Text style={{color: '#666', marginBottom: 20}}>
                            Ви впевнені, що хочете видалити "{activeItem?.name}"?
                        </Text>
                        <View style={{flexDirection: 'row', gap: 10}}>
                            <ModalBtn onPress={() => setConfirmDeleteVisible(false)} style={{backgroundColor: '#e2e8f0'}}>
                                <Text style={{color: '#334155', fontWeight: '600'}}>Скасувати</Text>
                            </ModalBtn>
                            <ModalBtn onPress={handleDelete} style={{backgroundColor: '#dc2626'}}>
                                <Text style={{color: '#ffffff', fontWeight: '700'}}>Видалити</Text>
                            </ModalBtn>
                        </View>
                    </ModalContent>
                </ModalOverlay>
            </Modal>

            <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
                <Text style={{fontSize: 28, fontWeight: '800', color: '#102a43'}}>Файловий менеджер</Text>
            </View>

            <Header>
                <Text style={{fontSize: 10, color: '#486581', fontWeight: '700'}}>ПОТОЧНИЙ ШЛЯХ</Text>
                <Text numberOfLines={1} style={{fontSize: 12, color: '#334e68', marginBottom: 10}}>
                    {currentDir?.replace(FileSystem.documentDirectory, 'root/') || 'root/'}
                </Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#d7e3fc', paddingTop: 10}}>
                    <Stat label="Всього" val={formatBytes(stats.total)} color="#334e68" />
                    <Stat label="Вільно" val={formatBytes(stats.free)} color="#0f9d58" />
                    <Stat label="Зайнято" val={formatBytes(stats.total - stats.free)} color="#d97706" />
                </View>
            </Header>

            <FlatList
                data={items}
                contentContainerStyle={{ padding: 20, paddingBottom: 150 }}
                keyExtractor={(item) => item.uri}
                ListHeaderComponent={currentDir !== FileSystem.documentDirectory && (
                    <TouchableOpacity onPress={goBackPath} style={{padding: 12, backgroundColor: '#d7e3fc', borderRadius: 14, marginBottom: 15, alignItems: 'center', borderWidth: 1, borderColor: '#9fb3c8'}}>
                        <Text style={{color: '#102a43', fontWeight: '700'}}>Повернутися на рівень вище</Text>
                    </TouchableOpacity>
                )}
                renderItem={({ item }) => (
                    <FileItem
                        item={item}
                        onPress={() => item.isDirectory ? setCurrentDir(item.uri + '/') : navigation.navigate('Editor', { fileUri: item.uri, name: item.name })}
                        onLongPress={() => {
                            Alert.alert(item.name, "Дія:", [
                                { text: "Скасувати", style: "cancel" },
                                { text: "Перейменувати", onPress: () => { setActiveItem(item); setInputValue(item.name); setModalVisible(true); }},
                                { text: "Видалити", style: 'destructive', onPress: () => { setActiveItem(item); setConfirmDeleteVisible(true); }}
                            ]);
                        }}
                    />
                )}
            />

            <View style={{position: 'absolute', bottom: insets.bottom + 20, right: 20, alignItems: 'center', gap: 12}}>
                <FAB small style={{backgroundColor: '#f59e0b'}} onPress={() => { setActiveItem(null); setIsFolder(true); setInputValue(''); setModalVisible(true); }}>
                    <Text style={{fontSize: 14, color: '#ffffff', fontWeight: '700'}}>DIR</Text>
                </FAB>
                <FAB onPress={() => { setActiveItem(null); setIsFolder(false); setInputValue(''); setModalVisible(true); }}>
                    <Text style={{color: '#ffffff', fontSize: 35, lineHeight: 38}}>+</Text>
                </FAB>
            </View>
        </Screen>
    );
}

const ModalOverlay = styled.View`flex: 1; background-color: rgba(15, 23, 42, 0.38); justify-content: center; align-items: center;`;
const ModalContent = styled.View`width: 85%; background-color: #ffffff; padding: 25px; border-radius: 20px; elevation: 10; border-width: 1px; border-color: #d7e3fc;`;
const StyledInput = styled.TextInput`background-color: #f8fafc; border-radius: 12px; padding: 15px; font-size: 16px; color: #1f2937; margin-top: 10px; border-width: 1px; border-color: #cbd5e1;`;
const ModalBtn = styled.TouchableOpacity`flex: 1; background-color: #2563eb; padding: 15px; border-radius: 12px; align-items: center;`;
const Stat = ({ label, val, color }) => (<View><Text style={{fontSize: 9, color: '#829ab1'}}>{label}</Text><Text style={{fontSize: 12, fontWeight: '700', color}}>{val}</Text></View>);
const FAB = styled.TouchableOpacity`
    background-color: #2563eb;
    width: ${props => props.small ? '55px' : '75px'};
    height: ${props => props.small ? '55px' : '75px'};
    border-radius: 40px;
    justify-content: center;
    align-items: center;
    elevation: 8;
`;
