import { useContext, useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";

import { useRouter } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { ToastAndroid, Platform } from "react-native";

import { api } from "../services/api";

import { AuthContext } from "../context/AuthContext";
import { colors } from "../constants/colors";

export default function Login() {
  const router = useRouter();

  const { setUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  function validateForm() {
    if (!email.trim() || !password.trim()) {
      ToastAndroid.show("Preencha todos os campos", ToastAndroid.SHORT);

      return false;
    }

    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(email)) {
      ToastAndroid.show("Email inválido", ToastAndroid.SHORT);

      return false;
    }

    return true;
  }

  async function handleLogin() {
    if (!validateForm()) return;

    try {
      setLoading(true);

      const response = await api.login({ email, password });

      const { user, token } = response;

      setUser(user);

      await AsyncStorage.setItem("@user", JSON.stringify(user));

      await AsyncStorage.setItem("@token", token);

      if (Platform.OS === "android") {
        ToastAndroid.show("Login realizado com sucesso!", ToastAndroid.SHORT);
      } else {
        alert("Login realizado com sucesso!");
      }

      router.replace("/");
    } catch (error) {
      console.log(error);
      ToastAndroid.show("Email ou senha inválidos", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Bem-vindo</Text>

            <Text style={styles.subtitle}>Faça login para continuar</Text>
          </View>

          <View style={styles.form}>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              editable={!loading}
            />

            <TextInput
              placeholder="Senha"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              editable={!loading}
            />

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.buttonText}>Entrar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  header: {
    marginBottom: 32,
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: "#6B7280",
  },

  form: {
    gap: 16,
  },

  input: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  button: {
    backgroundColor: colors.primary,
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },

  buttonDisabled: {
    opacity: 0.7,
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
