import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Fragrance from "../types/Fragrance";

interface Props {
    fragrance: Fragrance;
    onPress?: () => void;
    onDelete?: () => void;
}

export default function ViewFragrance({ fragrance, onPress, onDelete }: Props) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={styles.item}>
                <Text style={styles.name}>{fragrance.name}</Text>
                <Text>Brand: {fragrance.brand}</Text>
                <Text>Quantity: {fragrance.quantity}ml</Text>
                <Text>Notes: {fragrance.description}</Text>
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
                <Text style={styles.delete}>Delete</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        position: "relative",
        marginVertical: 5,
        backgroundColor: "#fff",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    item: {

    },
    name: {
        fontWeight: "bold",
        fontSize: 16,
    },
    deleteButton: {
        backgroundColor: "#ecd9d9",
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        marginTop: 10,
        borderWidth: 1,
        borderColor: "red",
    },
    delete: {
        color: "red",
        textAlign: "center",
    },
});
