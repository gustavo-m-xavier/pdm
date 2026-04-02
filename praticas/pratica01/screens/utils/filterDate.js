export function filterLast7Days(despesas) {
  const dataAtual = new Date();
  const data7DiasAtras = new Date(
    dataAtual.getFullYear(),
    dataAtual.getMonth(),
    dataAtual.getDate() - 7,
  );

  return despesas.filter((despesa) => {
    const dataDespesa = new Date(despesa.data);
    return dataDespesa >= data7DiasAtras && dataDespesa <= dataAtual;
  });
}
