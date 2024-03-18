import React, { useState } from "react";
import { Button, Input, Select, Textarea, Stack, RadioGroup, Radio } from "@chakra-ui/react";

const BudgetInput = ({ onSubmit, onClose }) => {
  const [budget, setBudget] = useState(0);

  const handleSubmit = () => {
    onSubmit(budget);
    onClose();
  };

  return (
    <Stack spacing={4}>
      <Input value={budget} onChange={(e) => setBudget(Number(e.target.value))} type="number" step="0.01" placeholder="Enter budget" />
      <Button onClick={handleSubmit}>Submit</Button>
    </Stack>
  );
};

export default BudgetInput;
