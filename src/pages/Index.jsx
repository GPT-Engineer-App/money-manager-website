import React, { useState } from "react";
import { Box, Heading, Text, Button, Stack, Select, Table, Thead, Tbody, Tr, Th, Td, Flex, Spacer, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from "@chakra-ui/react";
import { FaPlus, FaSearch } from "react-icons/fa";
import BudgetInput from "../components/BudgetInput";
import TransactionInput from "../components/TransactionInput";
import CategoryGraph from "../components/CategoryGraph";

const Index = () => {
  const [balance, setBalance] = useState(0);
  const [budget, setBudget] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const { isOpen: isBudgetOpen, onOpen: onBudgetOpen, onClose: onBudgetClose } = useDisclosure();
  const { isOpen: isTransactionOpen, onOpen: onTransactionOpen, onClose: onTransactionClose } = useDisclosure();

  const handleAddTransaction = (transaction) => {
    const newTransaction = {
      id: transactions.length + 1,
      ...transaction,
    };

    setTransactions([...transactions, newTransaction]);
    setBalance(balance + transaction.amount);
  };

  const handleSetBudget = (newBudget) => {
    setBudget(newBudget);
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
          Balance: <strong>{balance.toLocaleString("en-US", { style: "currency", currency: "USD" })}</strong>
        </Text>
        <Text fontSize="xl">
          Budget:{" "}
          <strong onClick={onBudgetOpen} cursor="pointer">
            {budget.toLocaleString("en-US", { style: "currency", currency: "USD" })}
          </strong>
        </Text>
        <Text fontSize="xl" color="green.500">
          Total Income: <strong>{totalIncome.toLocaleString("en-US", { style: "currency", currency: "USD" })}</strong>
        </Text>
        <Text fontSize="xl" color="red.500">
          Total Expense: <strong>{totalExpense.toLocaleString("en-US", { style: "currency", currency: "USD" })}</strong>
        </Text>
      </Stack>

      <Flex mb={4}>
        <Select icon={<FaSearch />} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search transactions" mr={2} />
        <Select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} placeholder="Filter by category" mr={2}>
          <option value="">All</option>
          {[...new Set(transactions.map((t) => t.category))].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
        <Spacer />
        <Button leftIcon={<FaPlus />} onClick={onTransactionOpen}>
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
              <Td color={transaction.type === "income" ? "green.500" : "red.500"}>{transaction.amount.toLocaleString("en-US", { style: "currency", currency: "USD" })}</Td>
              <Td>{transaction.category}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <CategoryGraph transactions={transactions} />

      <Modal isOpen={isBudgetOpen} onClose={onBudgetClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter Budget</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <BudgetInput onSubmit={handleSetBudget} onClose={onBudgetClose} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isTransactionOpen} onClose={onTransactionClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TransactionInput onSubmit={handleAddTransaction} onClose={onTransactionClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;
