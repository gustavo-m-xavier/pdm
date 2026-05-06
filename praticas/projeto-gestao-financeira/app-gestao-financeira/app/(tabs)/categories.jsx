import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  Alert,
  StyleSheet,
} from "react-native";

import { MoneyContext } from "../../context/MoneyContext";

const COLORS = [
  "#FFB6B6",
  "#B6E3FF",
  "#B6FFB9",
  "#FFE7B6",
  "#D9B6FF",
  "#FFB6F3",
];

export default function Categories() {
  const { categories, addCategory, removeCategory } =
    useContext(MoneyContext);

  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [icon, setIcon] = useState("category");
  const [color, setColor] = useState(COLORS[0]);

  const handleCreate = async () => {
    if (!name || !displayName) {
      Alert.alert("Erro", "Preencha name e displayName");
      return;
    }

    try {
      await addCategory({
        name,
        displayName,
        icon,
        background: color,
        isIncome: false,
      });

      setName("");
      setDisplayName("");
      setIcon("category");
      setColor(COLORS[0]);
    } catch (err) {
      Alert.alert("Erro", "Não foi possível criar categoria");
    }
  };

  const handleDelete = (item) => {
    Alert.alert(
      "Excluir categoria",
      `Deseja excluir ${item.displayName}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await removeCategory(item.id);
            } catch (err) {
              Alert.alert(
                "Erro",
                err?.response?.data?.message ||
                  "Não foi possível excluir"
              );
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <View
          style={[
            styles.icon,
            { backgroundColor: item.background },
          ]}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.displayName}</Text>
          <Text style={styles.subtitle}>
            {item.name} {item.isIncome ? " • Receita" : ""}
          </Text>

          <View style={styles.badges}>
            {item.isDefault ? (
              <Text style={styles.badgeDefault}>Padrão</Text>
            ) : (
              <Text style={styles.badgeCustom}>Personalizada</Text>
            )}
          </View>
        </View>

        {!item.isDefault && (
          <Pressable onPress={() => handleDelete(item)}>
            <Text style={styles.delete}>Excluir</Text>
          </Pressable>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.sectionTitle}>
          Criar categoria
        </Text>

        <TextInput
          placeholder="name (ex: health)"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <TextInput
          placeholder="displayName (ex: Saúde)"
          value={displayName}
          onChangeText={setDisplayName}
          style={styles.input}
        />

        <TextInput
          placeholder="icon (ex: favorite)"
          value={icon}
          onChangeText={setIcon}
          style={styles.input}
        />

        <View style={styles.colors}>
          {COLORS.map((c) => (
            <Pressable
              key={c}
              onPress={() => setColor(c)}
              style={[
                styles.color,
                {
                  backgroundColor: c,
                  borderWidth: color === c ? 2 : 0,
                },
              ]}
            />
          ))}
        </View>

        <Pressable style={styles.button} onPress={handleCreate}>
          <Text style={styles.buttonText}>
            Criar categoria
          </Text>
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>
        Categorias
      </Text>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  form: {
    marginBottom: 20,
    padding: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  colors: {
    flexDirection: "row",
    marginVertical: 10,
    gap: 8,
  },
  color: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  button: {
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  subtitle: {
    fontSize: 12,
    color: "#666",
  },
  badges: {
    flexDirection: "row",
    marginTop: 4,
    gap: 6,
  },
  badgeDefault: {
    fontSize: 10,
    backgroundColor: "#ddd",
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  badgeCustom: {
    fontSize: 10,
    backgroundColor: "#cde6ff",
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  delete: {
    color: "red",
    fontWeight: "bold",
  },
});