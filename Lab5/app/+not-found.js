import { Link, Stack } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Сторінка не знайдена',
                    headerShown: true,
                    headerStyle: { backgroundColor: '#0B2A3C' },
                    headerTintColor: '#F8FAFC',
                    headerTitleStyle: { fontWeight: '700' },
                }}
            />
            <View style={styles.container}>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>404</Text>
                </View>
                <Text style={styles.title}>Екран не знайдено</Text>
                <Link href="/" style={styles.link}>
                    <Text style={styles.linkText}>Повернутися на головну</Text>
                </Link>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        backgroundColor: '#07131F',
    },
    badge: {
        backgroundColor: '#F97316',
        borderRadius: 999,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginBottom: 16,
    },
    badgeText: {
        color: '#FFFFFF',
        fontWeight: '800',
        fontSize: 14,
        letterSpacing: 1,
    },
    title: {
        fontSize: 26,
        fontWeight: '900',
        color: '#F8FAFC',
        textAlign: 'center',
    },
    link: {
        marginTop: 18,
        backgroundColor: '#0EA5A4',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    linkText: {
        color: '#F8FAFC',
        fontSize: 16,
        fontWeight: '700',
    },
});
