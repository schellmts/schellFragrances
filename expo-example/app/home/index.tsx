import { faker } from "@faker-js/faker";
import {router, Stack} from "expo-router";
import {Alert, FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";

import HeaderRight from "../../components/HeaderRight";
import Loading from "../../components/Loading";
import StyledButton from "../../components/StyledButton";
import ViewFragrance from "../../components/ViewFragrance";
import useCollection from "../../firebase/hooks/useCollection";
import globalStyles from "../../styles/globalStyles";
import Fragrance from "../../types/Fragrance";

export default function Home() {
    const { data, create, remove, refreshData, loading } =
        useCollection<Fragrance>("fragrances");

    // @ts-ignore
    return (
        <View style={globalStyles.container}>
            <Stack.Screen
                options={{
                    title: "",
                    headerRight: () => <HeaderRight />,
                }}
            />

            <Text style={globalStyles.title}>Schell Fragrances</Text>


            <TouchableOpacity style={styles.button} onPress={() => router.push('/home/create')}>
                <Text style={styles.buttonText}>Create Fragrance</Text>
            </TouchableOpacity>

            {loading ? (
                <Loading />
            ) : (
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <ViewFragrance
                            fragrance={item}
                            onPress={() => router.push(`/home/${item.id}`)}
                            onDelete={async () => {
                                await remove(item.id!);
                                await refreshData();
                            }}
                        />
                    )}
                    style={{ width: "100%" }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#a3bd31",
        margin: 20,
        padding: 10,
        borderRadius: 5
    }, buttonText: {
        color: "white",
        fontWeight: 800,
        fontSize: 18,
    }
})
