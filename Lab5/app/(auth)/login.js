import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Animated, Easing, TouchableOpacity, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fadeAnim] = useState(new Animated.Value(0));
    const [slideAnim] = useState(new Animated.Value(20));

    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
        ]).start();
    }, [fadeAnim, slideAnim]);

    const handleLogin = () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert('Увага', 'Будь ласка, введіть пошту та пароль');
            return;
        }

        const isSuccess = login(email, password);

        if (isSuccess) {
            router.replace('/');
        } else {
            Alert.alert(
                'Помилка входу',
                'Користувача не знайдено або дані невірні. Спочатку зареєструйтесь.'
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.bgCircleLarge} />
            <View style={styles.bgCircleSmall} />

            <Animated.View
                style={[
                    styles.panel,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }],
                    },
                ]}
            >
                <Text style={styles.eyebrow}>Вхід до системи</Text>
                <Text style={styles.title}>Магазин Device Hub</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#6B7280"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Пароль"
                    placeholderTextColor="#6B7280"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Увійти</Text>
                </TouchableOpacity>

                <Link href="/register" style={styles.link}>
                    <Text style={styles.linkText}>Немає акаунту? Створити профіль</Text>
                </Link>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        backgroundColor: '#07131F',
    },
    bgCircleLarge: {
        position: 'absolute',
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: '#0B2A3C',
        top: -80,
        right: -80,
    },
    bgCircleSmall: {
        position: 'absolute',
        width: 220,
        height: 220,
        borderRadius: 110,
        backgroundColor: '#113A4A',
        bottom: -90,
        left: -80,
    },
    panel: {
        backgroundColor: '#F4F7FB',
        borderRadius: 24,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 24,
        elevation: 10,
    },
    eyebrow: {
        fontSize: 13,
        color: '#F97316',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 6,
    },
    title: {
        fontSize: 28,
        fontWeight: '900',
        color: '#0F172A',
        marginBottom: 24,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D4DEE7',
        borderRadius: 14,
        padding: 14,
        marginBottom: 14,
        color: '#111827',
    },
    button: {
        backgroundColor: '#F97316',
        paddingVertical: 15,
        borderRadius: 14,
        marginTop: 8,
    },
    buttonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: '800',
        fontSize: 16,
    },
    link: {
        marginTop: 18,
        textAlign: 'center',
    },
    linkText: {
        color: '#0B5C73',
        fontSize: 15,
        fontWeight: '600',
    },
});
