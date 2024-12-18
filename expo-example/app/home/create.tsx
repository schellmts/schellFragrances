import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { useRouter } from "expo-router";
import useCollection from "../../firebase/hooks/useCollection";
import Fragrance from "../../types/Fragrance";

export default function Create() {
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [quantity, setQuantity] = useState("");
    const [description, setDescription] = useState("");
    const { create } = useCollection<Fragrance>("fragrances");
    const router = useRouter();

    const handleSubmit = async () => {
        if (!name || !brand || !quantity || !description) {
            Alert.alert("Error", "Please fill all fields");
            return;
        }

        try {
            await create({
                name,
                brand,
                quantity: parseInt(quantity, 10),
                description,
            });
            Alert.alert("Success", "Fragrance created!");
            router.push("/home");
        } catch (error: any) {
            Alert.alert("Error", error.message || "Something went wrong");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register New Fragrance</Text>
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
                <Text>Notes:</Text>
                <TextInput
                    multiline
                    style={styles.input}
                    placeholder="Fragrance Notes"
                    value={description}
                    onChangeText={setDescription}
                />
            </View>
            <View>
                <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
                    <Text style={styles.submitText}>Submit</Text>
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
