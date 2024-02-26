import React, { useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './string.module.css'

export const StringComponent: React.FC = () => {
  const [word, setWord] = useState<string>('');
  const [lettersState, setLettersState] = useState<{ letter: string, state: ElementStates }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const reverseString = async () => {
    const lettersState = word.split('').map(letter => ({ letter: letter, state: ElementStates.Default }));
    setIsLoading(true);
    let letters = lettersState;

    let start = 0;
    let end = word.length - 1;

    while (start < end) {
      letters[start].state = ElementStates.Changing;
      letters[end].state = ElementStates.Changing;
      setLettersState([...letters]);
      await sleep(500); 

      [letters[start].letter, letters[end].letter] = [letters[end].letter, letters[start].letter];

      letters[start].state = ElementStates.Modified;
      letters[end].state = ElementStates.Modified;
      setLettersState([...letters]);
      await sleep(500);

      start++;
      end--;
    }

    if (start === end) {
      letters[start].state = ElementStates.Modified;
      setLettersState([...letters]);
    }
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWord = e.target.value;
    setWord(newWord);
  };

  return (
    <SolutionLayout title="Строка"> 
     <div className={styles.inputZone}>
        <Input 
          type="text" 
          maxLength={11} 
          isLimitText={true} 
          onChange={handleChange}
        />
        <Button 
          type="button" 
          text="развернуть" 
          disabled={word.length === 0 || isLoading} 
          onClick={reverseString} 
          isLoader={isLoading}
        />
     </div>
     <div className={styles.sequence}>

       {lettersState.map((item, index) => (
          <Circle
            key={index}
            letter={item.letter}
            state={item.state}
            isSmall={false}
            extraClass={styles.circleMargin}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
