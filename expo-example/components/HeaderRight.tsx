import { useRouter } from "expo-router";
import {Alert, StyleSheet, Text, TouchableOpacity} from "react-native";

import useAuth from "../firebase/hooks/useAuth";
import StyledButton from "./StyledButton";

export default function HeaderRight() {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <>
      <Text style={styles.headerText}>user: {user?.email}</Text>
      <TouchableOpacity onPress={async () => {
          try {
            await logout();
            router.replace("/");
          } catch (error: any) {
            Alert.alert("Logout error", error.toString());
          }
        }}

      >
          <Text style={styles.logoutbutton}>Logout</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
    logoutbutton: {
        color: "red",
    },
    headerText: {
        paddingEnd: 15,
    }
})
