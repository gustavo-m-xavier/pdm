import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import Button from "../../components/Button";
import { useContext, useRef, useState } from "react";
import DescriptionInput from "../../components/DescriptionInput";
import CurrencyInput from "../../components/CurrencyInput";
import DatePicker from "../../components/DatePicker";
import CategoryPicker from "../../components/CategoryPicker";
import { MoneyContext } from "../../context/GlobalState.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { categories } from "../../constants/categories.js";
import { showMessage } from "../../utils/showMessage.js";
import { api } from "../../services/api.js";

const initialForm = {
  description: "",
  value: 0,
  date: new Date(),
  categoryId: categories.income.name,
};

export default function AddTransactions() {
  const [form, setForm] = useState(initialForm);
  const valueInputRef = useRef();

  const { transactions, addTransaction } = useContext(MoneyContext);

  const setAsyncStorage = async (data) => {
    try {
      await AsyncStorage.setItem("transactions", JSON.stringify(data));
    } catch (e) {
      console.log(e);
    }
  };

  const createTransaction = async () => {
    try {
      await addTransaction(form);

      setForm(initialForm);

      showMessage("Sucesso!", "Transação adicionada com sucesso!");
    } catch (error) {
      console.log(error);

      showMessage("Erro", "Não foi possível criar a transação.");
    }
  };

  return (
    <KeyboardAvoidingView style={globalStyles.screenContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={globalStyles.content}>
          <View style={styles.form}>
            <DescriptionInput
              form={form}
              setForm={setForm}
              valueInputRef={valueInputRef}
            />
            <CurrencyInput
              form={form}
              setForm={setForm}
              valueInputRef={valueInputRef}
            />
            <DatePicker form={form} setForm={setForm} />
            <CategoryPicker form={form} setForm={setForm} />
          </View>
          <Button onPress={createTransaction}>Adicionar</Button>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  form: { gap: 12, marginBottom: 40, marginTop: 10 },
});
