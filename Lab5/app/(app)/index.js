import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { Link, Stack } from 'expo-router';
import { products } from '../../data/products';
import { useAuth } from '../../context/AuthContext';

export default function Catalog() {
    const { logout } = useAuth();
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const slideAnim = React.useRef(new Animated.Value(16)).current;

    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 450,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 450,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
        ]).start();
    }, [fadeAnim, slideAnim]);

    return (
        <View style={styles.container}>
            <View style={styles.topBand} />
            <Stack.Screen options={{ headerShown: false }} />

            <Animated.View
                style={[
                    styles.content,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }],
                    },
                ]}
            >
                <View style={styles.header}>
                    <View>
                        <Text style={styles.eyebrow}>Каталог</Text>
                        <Text style={styles.title}>Актуальні гаджети</Text>
                    </View>
                    <TouchableOpacity onPress={logout} style={styles.logoutButton}>
                        <Text style={styles.logoutText}>Вийти</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={products}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Link href={`/details/${item.id}`} asChild>
                            <TouchableOpacity style={styles.card}>
                                <Image source={{ uri: item.image }} style={styles.image} />
                                <View style={styles.infoContainer}>
                                    <Text style={styles.name} numberOfLines={1}>
                                        {item.name}
                                    </Text>
                                    <Text style={styles.price}>${item.price}</Text>
                                </View>
                            </TouchableOpacity>
                        </Link>
                    )}
                />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#07131F',
    },
    topBand: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 180,
        backgroundColor: '#0B2A3C',
        borderBottomLeftRadius: 36,
        borderBottomRightRadius: 36,
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 56,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 18,
    },
    eyebrow: {
        color: '#FDBA74',
        fontSize: 12,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 4,
    },
    title: {
        fontSize: 28,
        fontWeight: '900',
        color: '#F8FAFC',
    },
    logoutButton: {
        backgroundColor: '#F97316',
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 12,
    },
    logoutText: {
        color: '#FFFFFF',
        fontWeight: '800',
        fontSize: 14,
    },
    listContent: {
        paddingBottom: 20,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#F8FBFF',
        padding: 14,
        marginBottom: 12,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#DCE6EF',
        elevation: 3,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
    },
    image: {
        width: 78,
        height: 78,
        borderRadius: 12,
        marginRight: 14,
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        fontSize: 17,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 6,
    },
    price: {
        color: '#F97316',
        fontSize: 16,
        fontWeight: '700',
    },
});
