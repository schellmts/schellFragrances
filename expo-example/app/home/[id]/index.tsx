import {router, Stack, useGlobalSearchParams} from "expo-router";
import { useState, useEffect } from "react";
import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";

import useDocument from "../../../firebase/hooks/useDocument";
import globalStyles from "../../../styles/globalStyles";
import Fragrance from "../../../types/Fragrance";

export default function UpdateFragrance() {
    const { id } = useGlobalSearchParams();
    const { data: fragrance, loading, upsert } = useDocument<Fragrance>("fragrances", id as string);

    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [quantity, setQuantity] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (fragrance) {
            setName(fragrance.name || "");
            setBrand(fragrance.brand || "");
            setQuantity(fragrance.quantity?.toString() || "");
            setDescription(fragrance.description || "");
        }
    }, [fragrance]);

    const handleUpdate = async () => {
        if (!name || !brand || !quantity || !description) {
            Alert.alert("Error", "Please fill all fields");
            return;
        }

        try {
            await upsert({
                name,
                brand,
                quantity: parseInt(quantity, 10),
                description,
            });
            Alert.alert("Success", "Fragrance updated!");
            router.replace("/home");
        } catch (error: any) {
            Alert.alert("Error", error.message || "Something went wrong");
        }
    };

    if (loading) return <Text>Loading...</Text>;

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: "Update Fragrance" }} />

            <Text style={styles.title}>Update Fragrance</Text>

            <View>
                <Text>Name:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Fragrance Name"
                    value={name}
                    onChangeText={setName}
                />
            </View>

            <View>
                <Text>Brand:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Fragrance Brand"
                    value={brand}
                    onChangeText={setBrand}
                />
            </View>

            <View>
                <Text>Quantity:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Fragrance Quantity (ml)"
                    value={quantity}
                    keyboardType="numeric"
                    onChangeText={setQuantity}
                />
            </View>

            <View>
                <Text>Description:</Text>
                <TextInput
                    multiline
                    style={styles.input}
                    placeholder="Fragrance Description"
                    value={description}
                    onChangeText={setDescription}
                />
            </View>

            <View>
                <TouchableOpacity style={styles.submit} onPress={handleUpdate}>
                    <Text style={styles.submitText}>Update</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        gap: 20,
    },
    title: {
        fontSize: 18,
    },
    input: {
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 5,
        padding: 10,
    },
    submit: {
        backgroundColor: "#a3bd31",
        padding: 10,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    submitText: {
        color: "white",
        textAlign: "center",
        fontWeight: "900",
        fontSize: 20,
    },
});
