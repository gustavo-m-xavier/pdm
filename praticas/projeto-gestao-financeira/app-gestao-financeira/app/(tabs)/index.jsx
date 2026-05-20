import { MoneyContext } from "../../context/GlobalState.jsx";
import { useContext, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
} from "react-native";
import TransactionItem from "../../components/TransactionItem.jsx";
import { globalStyles } from "../../styles/globalStyles.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useRouter } from "expo-router";

export default function Transactions() {
  const { transactions } = useContext(MoneyContext);

  const { user, loading } = useContext(AuthContext);

  const router = useRouter();
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user]);

  return (
    <View style={globalStyles.screenContainer}>
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Olá, {user?.name}!
        </Text>

        <Text style={styles.subtitle}>
          Confira suas transações
        </Text>
      </View>

      <FlatList
        data={transactions}
        renderItem={({ item }) => (
          <TransactionItem {...item} />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={globalStyles.secondaryText}>
            Ainda não há nenhum item!
          </Text>
        }
        style={globalStyles.content}
        contentContainerStyle={{
          paddingBottom: 24,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 12,
  },

  greeting: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 16,
    color: "#6B7280",
  },
});