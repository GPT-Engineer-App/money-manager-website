import React, { useState } from "react";
import { Box, Heading, Text, Input, Button, Stack, Select, Table, Thead, Tbody, Tr, Th, Td, Flex, Spacer } from "@chakra-ui/react";
import { FaPlus, FaSearch } from "react-icons/fa";

const Index = () => {
  const [balance, setBalance] = useState(0);
  const [budget, setBudget] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const handleAddTransaction = () => {
    const name = prompt("Enter transaction name:");
    const amount = Number(prompt("Enter transaction amount:"));
    const category = prompt("Enter transaction category:");
    const type = amount > 0 ? "income" : "expense";

    const newTransaction = {
      id: transactions.length + 1,
      name,
      amount,
      category,
      type,
    };

    setTransactions([...transactions, newTransaction]);
    setBalance(balance + amount);
  };

  const filteredTransactions = transactions.filter((transaction) => transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) && (filterCategory === "" || transaction.category === filterCategory));

  const totalIncome = transactions.filter((transaction) => transaction.type === "income").reduce((total, transaction) => total + transaction.amount, 0);

  const totalExpense = transactions.filter((transaction) => transaction.type === "expense").reduce((total, transaction) => total + transaction.amount, 0);

  return (
    <Box p={8}>
      <Heading as="h1" size="xl" mb={8}>
        Money Management
      </Heading>

      <Stack spacing={4} mb={8}>
        <Text fontSize="xl">
          Balance: <strong>{balance}</strong>
        </Text>
        <Text fontSize="xl">
          Budget: <Input value={budget} onChange={(e) => setBudget(Number(e.target.value))} type="number" placeholder="Enter budget" />
        </Text>
        <Text fontSize="xl">
          Total Income: <strong>{totalIncome}</strong>
        </Text>
        <Text fontSize="xl">
          Total Expense: <strong>{totalExpense}</strong>
        </Text>
      </Stack>

      <Flex mb={4}>
        <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search transactions" mr={2} />
        <Select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} placeholder="Filter by category" mr={2}>
          <option value="">All</option>
          {[...new Set(transactions.map((t) => t.category))].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
        <Spacer />
        <Button leftIcon={<FaPlus />} onClick={handleAddTransaction}>
          Add Transaction
        </Button>
      </Flex>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Amount</Th>
            <Th>Category</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredTransactions.map((transaction) => (
            <Tr key={transaction.id}>
              <Td>{transaction.name}</Td>
              <Td color={transaction.type === "income" ? "green.500" : "red.500"}>{transaction.amount}</Td>
              <Td>{transaction.category}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Index;
