import { StyleSheet, Text, View } from "react-native";

function DespesaSumario({ despesas, periodo }) {
  const somaDespesas = despesas.reduce((soma, despesa) => {
    return soma + despesa.valor;
  }, 0);

  return (
    <View style={styles.sumarioContainer}>
      <Text style={styles.periodoText}>{periodo}</Text>
      <Text style={styles.valorText}>R$ {somaDespesas.toFixed(2)}</Text>
    </View>
  );
}

export default DespesaSumario;

const styles = StyleSheet.create({
  sumarioContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    backgroundColor: "#dcdcdc",
    borderRadius: 6,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  periodoText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  valorText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2e8b57",
  },
});
