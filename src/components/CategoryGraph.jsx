import React from "react";
import { Box, Text } from "@chakra-ui/react";

const CategoryGraph = ({ transactions }) => {
  const categoryTotals = transactions.reduce((totals, transaction) => {
    if (totals[transaction.category]) {
      totals[transaction.category] += transaction.amount;
    } else {
      totals[transaction.category] = transaction.amount;
    }
    return totals;
  }, {});

  return (
    <Box>
      <Text fontSize="xl" mb={4}>
        Category Breakdown
      </Text>
      {Object.entries(categoryTotals).map(([category, total]) => (
        <Box key={category} mb={2}>
          <Text>
            {category}: {total}
          </Text>
        </Box>
      ))}
    </Box>
  );
};

export default CategoryGraph;
