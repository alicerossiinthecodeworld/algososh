import React, { useState } from "react";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

export const FibonacciPage: React.FC = () => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isValidInput, setIsValidInput] = useState<boolean>(true);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const fibonacciAsync = async (n: number) => {
    if (n <= 19){
      setIsLoading(true);
      setSequence([]);
      let fibSequence: number[] = [1];
      setSequence(fibSequence.slice());
      for (let i = 2; i <= n + 1; i++) {
        await sleep(500);
        fibSequence = [...fibSequence, calculateFibonacci(i)];
        setSequence(fibSequence);
      }
      setIsLoading(false);
    }
  };

  const calculateFibonacci = (n: number): number => {
    if (n <= 1) {
      return n;
    }
    return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
  };
  const handleFibonacciCalculation = () => {
    const inputVal = parseInt((document.querySelector('input') as HTMLInputElement).value);
    if (!isNaN(inputVal) && inputVal >= 1 && inputVal <= 19) {
      fibonacciAsync(inputVal);
    }
    else{
      alert("введите число от 0 до 19")
    }
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.inputZone}>
        <Input isLimitText={true} maxLength={2} type={'number'} min={1} max={19}   onChange={(e) => {
    const target = e.target as HTMLInputElement; 
    setIsValidInput(!isNaN(parseInt(target.value)) && parseInt(target.value) >= 1 && parseInt(target.value) <= 19);
  }} />
        <Button
          text={"Рассчитать"}
          type="button"
          onClick={handleFibonacciCalculation}
          isLoader={isLoading}
          disabled={isLoading||!isValidInput}
        />
      </div>
      <div className={styles.sequence}>
        {sequence.map((num, index) => (
          <Circle
            key={index}
            letter={num.toString()}
            state={ElementStates.Default}
            index={index}
            isSmall={false}
            extraClass={styles.circleMargin}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};