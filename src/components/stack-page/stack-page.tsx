import React from "react";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

export const StackPage: React.FC = () => {
  return (
    <SolutionLayout title="Стек">
      <Input type="text" maxLength={4} isLimitText={true}/>
    </SolutionLayout>
  );
};
