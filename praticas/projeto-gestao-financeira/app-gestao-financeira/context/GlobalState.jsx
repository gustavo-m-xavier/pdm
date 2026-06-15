import { createContext, useCallback, useEffect, useState } from "react";

import { api } from "../services/api";

export const MoneyContext = createContext();

export default function GlobalState({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [cats, txs] = await Promise.all([
        api.listCategories(),
        api.listTransactions(),
      ]);

      setCategories(cats);
      setTransactions(txs);
    } catch (e) {
      setError(e.message ?? "Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addTransaction = useCallback(async (data) => {
    try {
      setError(null);

      const createdTransaction = await api.createTransaction(data);

      setTransactions((prev) => [createdTransaction, ...prev]);

      return createdTransaction;
    } catch (e) {
      setError(e.message ?? "Erro ao criar transação");
      throw e;
    }
  }, []);

  const removeTransaction = useCallback(async (id) => {
    try {
      setError(null);

      await api.deleteTransaction(id);

      setTransactions((prev) =>
        prev.filter((transaction) => transaction.id !== id),
      );
    } catch (e) {
      setError(e.message ?? "Erro ao remover transação");
      throw e;
    }
  }, []);

  const addCategory = useCallback(async (data) => {
    try {
      setError(null);

      const createdCategory = await api.createCategory(data);

      setCategories((prev) => [createdCategory, ...prev]);

      return createdCategory;
    } catch (e) {
      setError(e.message ?? "Erro ao criar categoria");
      throw e;
    }
  }, []);

  const removeCategory = useCallback(async (id) => {
    try {
      setError(null);

      await api.deleteCategory(id);

      setCategories((prev) => prev.filter((category) => category.id !== id));
    } catch (e) {
      setError(e.message ?? "Erro ao remover categoria");
      throw e;
    }
  }, []);

  return (
    <MoneyContext.Provider
      value={{
        transactions,
        categories,
        loading,
        error,

        refresh,

        addTransaction,
        removeTransaction,

        addCategory,
        removeCategory,
      }}
    >
      {children}
    </MoneyContext.Provider>
  );
}
