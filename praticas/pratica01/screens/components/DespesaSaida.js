import { Text, View } from "react-native";
import DespesaSumario from "./DespesaSumario";
import DespesaLista from "./DespesaLista";

function DespesaSaída({ despesas, periodo }) {
  return (
    <View>
      <DespesaSumario despesas={despesas} periodo={periodo} />
      <DespesaLista despesas={despesas} />
    </View>
  );
}

export default DespesaSaída;
