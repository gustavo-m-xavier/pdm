import DespesaSaída from "../components/DespesaSaida";
import { filterLast7Days } from "../utils/filterDate";
import { DUMMY_DESPESAS } from "../constants/DummyDespesas";

function DespesaRecente() {
  return (
    <DespesaSaída
      despesas={filterLast7Days(DUMMY_DESPESAS)}
      periodo={"Últimos 7 dias"}
    />
  );
}

export default DespesaRecente;
