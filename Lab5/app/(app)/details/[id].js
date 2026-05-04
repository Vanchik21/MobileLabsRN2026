import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { products } from '../../../data/products';

export default function ProductDetails() {
    const { id } = useLocalSearchParams();
    const product = products.find((p) => p.id === id);

    if (!product) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyTitle}>Товар не знайдено</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Stack.Screen
                options={{
                    title: product.name,
                    headerShown: true,
                    headerStyle: { backgroundColor: '#0B2A3C' },
                    headerTintColor: '#F8FAFC',
                    headerTitleStyle: { fontWeight: '700' },
                }}
            />
            <Image source={{ uri: product.image }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.price}>${product.price}</Text>
                <Text style={styles.desc}>{product.description}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#07131F',
    },
    contentContainer: {
        paddingBottom: 24,
    },
    image: {
        width: '100%',
        height: 320,
    },
    info: {
        marginTop: -16,
        marginHorizontal: 14,
        backgroundColor: '#F4F7FB',
        borderRadius: 22,
        padding: 18,
        borderWidth: 1,
        borderColor: '#DCE6EF',
    },
    name: {
        fontSize: 28,
        fontWeight: '900',
        color: '#0F172A',
        marginBottom: 10,
    },
    price: {
        fontSize: 24,
        color: '#F97316',
        fontWeight: '800',
        marginBottom: 14,
    },
    desc: {
        fontSize: 16,
        color: '#334155',
        lineHeight: 24,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#07131F',
        padding: 20,
    },
    emptyTitle: {
        color: '#F8FAFC',
        fontSize: 22,
        fontWeight: '700',
    },
});
