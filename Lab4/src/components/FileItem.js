import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { formatBytes } from '../utils/formatters';

const Item = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    padding: 15px;
    background: #ffffff;
    margin-bottom: 10px;
    border-radius: 14px;
    border: 1px solid #d7e3fc;
`;

const Badge = styled.View`
    min-width: 46px;
    padding-vertical: 6px;
    padding-horizontal: 8px;
    border-radius: 999px;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
    background-color: ${props => (props.isDir ? '#f59e0b' : '#2563eb')};
`;

export default function FileItem({ item, onPress, onLongPress }) {
    const isDir = item.isDirectory;
    const date = item.modificationTime ? new Date(item.modificationTime * 1000).toLocaleDateString() : '';

    return (
        <Item onPress={onPress} onLongPress={onLongPress}>
            <Badge isDir={isDir}>
                <Text style={{fontSize: 11, fontWeight: '700', color: '#ffffff'}}>{isDir ? 'DIR' : 'TXT'}</Text>
            </Badge>
            <View style={{flex: 1}}>
                <Name style={{fontWeight: '700', color: '#102a43'}}>{item.name}</Name>
                <Text style={{fontSize: 11, color: '#627d98'}}>
                    {isDir ? 'Папка' : formatBytes(item.size)} {date && `• ${date}`}
                </Text>
            </View>
        </Item>
    );
}
const Name = styled.Text`font-size: 15px;`;
