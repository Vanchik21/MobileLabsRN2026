import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Animated, Easing, TouchableOpacity, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function RegisterScreen() {
    const { register } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fadeAnim] = useState(new Animated.Value(0));
    const [slideAnim] = useState(new Animated.Value(20));

    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 550,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 550,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
        ]).start();
    }, [fadeAnim, slideAnim]);

    const handleRegister = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name.trim() || !email.trim() || !password.trim()) {
            Alert.alert('Помилка', 'Заповніть всі поля');
            return;
        }
        if (!emailRegex.test(email)) {
            Alert.alert('Помилка', 'Введіть коректний Email (напр. user@mail.com)');
            return;
        }
        if (password.length < 6) {
            Alert.alert('Помилка', 'Пароль має бути не менше 6 символів');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Помилка', 'Паролі не збігаються');
            return;
        }

        register(email, password, name);
        router.replace('/');
    };

    return (
        <View style={styles.container}>
            <View style={styles.bgBarTop} />
            <View style={styles.bgBarBottom} />

            <Animated.View
                style={[
                    styles.panel,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }],
                    },
                ]}
            >
                <Text style={styles.eyebrow}>Реєстрація</Text>
                <Text style={styles.title}>Створити профіль</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Ім'я"
                    placeholderTextColor="#6B7280"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#6B7280"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
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
                <TextInput
                    style={styles.input}
                    placeholder="Підтвердити пароль"
                    placeholderTextColor="#6B7280"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Зареєструватися</Text>
                </TouchableOpacity>

                <Link href="/login" style={styles.link}>
                    <Text style={styles.linkText}>Вже є акаунт? Увійти</Text>
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
        backgroundColor: '#061822',
    },
    bgBarTop: {
        position: 'absolute',
        width: '130%',
        height: 180,
        backgroundColor: '#0B2A3C',
        top: -40,
        left: -40,
        borderBottomRightRadius: 140,
    },
    bgBarBottom: {
        position: 'absolute',
        width: '120%',
        height: 160,
        backgroundColor: '#0E3448',
        bottom: -40,
        right: -40,
        borderTopLeftRadius: 120,
    },
    panel: {
        backgroundColor: '#F4F7FB',
        borderRadius: 24,
        padding: 22,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 22,
        elevation: 9,
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
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D4DEE7',
        borderRadius: 14,
        padding: 14,
        marginBottom: 12,
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
        marginTop: 16,
        textAlign: 'center',
    },
    linkText: {
        color: '#0B5C73',
        fontSize: 15,
        fontWeight: '600',
    },
});
