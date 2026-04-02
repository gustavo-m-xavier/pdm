import { Text } from "react-native";
import DespesaSaída from "../components/DespesaSaida";
import { DUMMY_DESPESAS } from "../constants/DummyDespesas";

function TodasDespesas() {
  return <DespesaSaída despesas={DUMMY_DESPESAS} periodo="Todos" />;
}

export default TodasDespesas;
