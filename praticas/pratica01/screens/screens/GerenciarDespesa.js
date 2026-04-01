import { useState } from "react";
import { Pressable, StyleSheet, Text, View, TextInput } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

function GerenciarDespesa() {
  const [data, setData] = useState(new Date());
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");

  const [showPicker, setShowPicker] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || data;
    setShowPicker(false);
    setData(currentDate);
  };

  const handleChangeValor = (text) => {
    const cleanedText = text.replace(/[^0-9]/g, "");
    const match = cleanedText.match(/^(\d{0,})(\d{0,2})$/);

    if (match) {
      setValor(cleanedText);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          maxLength={20}
          value={descricao}
          onChangeText={setDescricao}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Valor Despesa</Text>
        <TextInput
          style={styles.input}
          maxLength={20}
          keyboardType="number-pad"
          value={valor}
          onChangeText={handleChangeValor}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Data da Despesa</Text>
        <Pressable onPress={() => setShowPicker(true)} style={styles.input}>
          <Text>{data.toLocaleDateString("pt-BR")}</Text>
        </Pressable>
        {showPicker && (
          <DateTimePicker
            value={data}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
      </View>
    </View>
  );
}

export default GerenciarDespesa;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 16,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
  },
});
