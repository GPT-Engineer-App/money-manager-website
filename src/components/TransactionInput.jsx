import React, { useState } from "react";
import { Button, Input, Select, Textarea, Stack, RadioGroup, Radio } from "@chakra-ui/react";

const TransactionInput = ({ onSubmit, onClose }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("expense");

  const handleSubmit = () => {
    onSubmit({ name, amount: Number(amount), category, description, type });
    onClose();
  };

  return (
    <Stack spacing={4}>
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter transaction name" />
      <Input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" step="0.01" placeholder="Enter amount" onBlur={(e) => setAmount(Number(e.target.value).toLocaleString("en-US", { style: "currency", currency: "USD" }))} />
      <Select value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Select category">
        <option value="housing">Housing</option>
        <option value="transport">Transport</option>
        <option value="others">Others</option>
      </Select>
      <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description (optional)" />
      <RadioGroup value={type} onChange={setType}>
        <Stack direction="row">
          <Radio value="income">Income</Radio>
          <Radio value="expense">Expense</Radio>
        </Stack>
      </RadioGroup>
      <Button onClick={handleSubmit}>Submit</Button>
    </Stack>
  );
};

export default TransactionInput;
