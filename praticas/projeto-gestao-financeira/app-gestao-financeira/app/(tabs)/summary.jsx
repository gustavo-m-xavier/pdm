import { useContext, useMemo } from "react";
import { MoneyContext } from "../../context/GlobalState.jsx";
import { categories } from "../../constants/categories";
import { globalStyles } from "../../styles/globalStyles";
import SummaryItem from "../../components/SummaryItem";

import { Dimensions, StyleSheet, Text, View } from "react-native";

import { PieChart, BarChart } from "react-native-chart-kit";

import { colors } from "../../constants/colors";

const screenWidth = Dimensions.get("window").width;

const SUMMARY_CATEGORY_KEYS = [
  categories.income.name,
  categories.food.name,
  categories.house.name,
  categories.education.name,
  categories.travel.name,
];

export default function Summary() {
  const { transactions } = useContext(MoneyContext);

  /**
   * Calcula totais por categoria e saldo geral.
   */
  const getTotals = () => {
    const totals = {
      sum: 0,
      income: 0,
      food: 0,
      education: 0,
      house: 0,
      travel: 0,
      expenses: 0,
    };

    for (let i = 0; i < transactions.length; i++) {
      const item = transactions[i];

      const categoryName = item.category?.name;

      if (!SUMMARY_CATEGORY_KEYS.includes(categoryName)) {
        continue;
      }

      const value = Number(item.value);

      totals[categoryName] += value;

      if (categoryName === categories.income.name) {
        totals.sum += value;
      } else {
        totals.sum -= value;
        totals.expenses += value;
      }
    }

    return totals;
  };

  const totals = useMemo(getTotals, [transactions]);

  const valueStyle =
    totals.sum > 0 ? globalStyles.positiveText : globalStyles.negativeText;

  const pieChartData = [
    {
      name: "Alimentação",
      value: totals.food,
      color: "#DEA17B",
      legendFontColor: "#E5E7EB",
      legendFontSize: 12,
    },
    {
      name: "Casa",
      value: totals.house,
      color: "#7C3AED",
      legendFontColor: "#E5E7EB",
      legendFontSize: 12,
    },
    {
      name: "Educação",
      value: totals.education,
      color: "#10B981",
      legendFontColor: "#E5E7EB",
      legendFontSize: 12,
    },
    {
      name: "Viagem",
      value: totals.travel,
      color: "#F43F5E",
      legendFontColor: "#E5E7EB",
      legendFontSize: 12,
    },
  ]
    .filter((item) => item.value > 0)
    .map((item) => ({
      ...item,
      value: Number(item.value),
    }));

  const chartConfig = {
    backgroundGradientFrom: "#16161A",
    backgroundGradientTo: "#16161A",

    decimalPlaces: 0,

    color: (opacity = 1) => `rgba(255,255,255,${opacity})`,

    labelColor: (opacity = 1) => `rgba(209,213,219,${opacity})`,

    fillShadowGradient: "#7F5AF0",
    fillShadowGradientOpacity: 1,

    barPercentage: 0.55,

    propsForBackgroundLines: {
      stroke: "#2A2A2E",
      strokeWidth: 1,
    },

    propsForLabels: {
      fontSize: 12,
    },

    style: {
      borderRadius: 20,
    },
  };

  return (
    <View style={globalStyles.screenContainer}>
      <View style={globalStyles.content}>
        <SummaryItem
          category={categories.income.name}
          value={totals[categories.income.name]}
        />

        <SummaryItem
          category={categories.food.name}
          value={totals[categories.food.name]}
        />

        <SummaryItem
          category={categories.house.name}
          value={totals[categories.house.name]}
        />

        <SummaryItem
          category={categories.education.name}
          value={totals[categories.education.name]}
        />

        <SummaryItem
          category={categories.travel.name}
          value={totals[categories.travel.name]}
        />

        <View style={globalStyles.line} />

        <View style={styles.balance}>
          {" "}
          <Text style={styles.balanceText}>Saldo</Text>{" "}
          <Text style={valueStyle}>
            {" "}
            {totals.sum.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}{" "}
          </Text>{" "}
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Gastos por Categoria</Text>

          {pieChartData.length > 0 ? (
            <PieChart
              data={pieChartData}
              width={screenWidth - 64}
              height={220}
              accessor="value"
              chartConfig={chartConfig}
              backgroundColor="transparent"
              paddingLeft="32"
              hasLegend={true}
              center={[10, 0]}
              absolute={false}
            />
          ) : (
            <Text style={styles.emptyText}>Nenhuma despesa cadastrada.</Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  balance: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },

  balanceText: {
    fontSize: 18,
    color: colors.primaryText,
    fontWeight: "800",
  },

  chartTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primaryText,
    marginTop: 24,
    marginBottom: 12,
  },

  emptyText: {
    color: colors.secondaryText,
    marginBottom: 16,
  },
});
