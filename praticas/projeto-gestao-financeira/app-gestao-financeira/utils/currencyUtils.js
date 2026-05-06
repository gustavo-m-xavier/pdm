export const handleCurrencyChange = (text) => {
  const formattedValue = text.replace(/\D/g, "");

  const numberValue = formattedValue ? parseFloat(formattedValue) / 100 : 0;

  setForm({ ...form, value: numberValue });
};
