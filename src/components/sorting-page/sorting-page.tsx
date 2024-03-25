import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button/button';
import { Column } from '../ui/column/column';
import { RadioInput } from '../ui/radio-input/radio-input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './sorting-page.module.css';
import { ElementStates } from '../../types/element-states';
import { DELAY_IN_MS } from '../../constants/delays';
import { sleep } from '../../utils/utils-functions';

export const SortingPage= () => {
  const [selectedSortingMethod, setSelectedSortingMethod] = useState('selection');
  const [currArr, setCurrArr] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [comparingIndexes, setComparingIndexes] = useState<number[]>([]);
  const [sortedIndexes, setSortedIndexes] = useState<number[]>([]);

  useEffect(() => {
    generateRandomArray();
  }, []);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSortingMethod(event.target.value);
  };

  const generateRandomArray = () => {
    const length = Math.floor(Math.random() * (17 - 3 + 1)) + 3;
    const arr = Array.from({ length }, () => Math.floor(Math.random() * 101));
    setCurrArr(arr);
    setComparingIndexes([]);
    setSortedIndexes([]);
  };

  const selectionSort = async(newArr:number[],direction:'ascending'|'descending', len:number)=>{
    for (let i = 0; i < len; i++) {
      let minOrMaxIndex = i;
      for (let j = i + 1; j < len; j++) {
        setComparingIndexes([minOrMaxIndex, j]);
        await sleep(DELAY_IN_MS);
        const shouldSwap = direction === 'ascending' ? newArr[j] < newArr[minOrMaxIndex] : newArr[j] > newArr[minOrMaxIndex];
        if (shouldSwap) {
          minOrMaxIndex = j;
        }
      }
      if (minOrMaxIndex !== i) {
        [newArr[i], newArr[minOrMaxIndex]] = [newArr[minOrMaxIndex], newArr[i]];
        await sleep(DELAY_IN_MS);
      }
      setSortedIndexes((prev) => [...prev, i]);
      setCurrArr([...newArr]);
    }
  }

  const bubbleSort = async(newArr:number[], direction:'ascending'|'descending', len:number) =>{
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - i - 1; j++) {
        setComparingIndexes([j, j + 1]);
        await sleep(DELAY_IN_MS);
        const shouldSwap = direction === 'ascending' ? newArr[j] > newArr[j + 1] : newArr[j] < newArr[j + 1];
        if (shouldSwap) {
          let temp = newArr[j];
          newArr[j] = newArr[j + 1];
          newArr[j + 1] = temp;

          await sleep(DELAY_IN_MS);
          setCurrArr([...newArr]);
        }
      }
      setSortedIndexes(prev => [...prev, len - i - 1]);
    }
  }

  const sortArray = async (direction: 'ascending' | 'descending') => {
    setIsSorting(true);
    setSortedIndexes([])
    const newArr = [...currArr];
    const len = newArr.length;

    if (selectedSortingMethod === 'selection') {
      selectionSort(newArr, direction, len)
    } 
    if (selectedSortingMethod === 'bubble') {
      bubbleSort(newArr,direction,len)
    }
    setIsSorting(false);
    setComparingIndexes([]);
  };

  const startSorting = (direction: 'ascending' | 'descending') => {
    sortArray(direction);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.inputZone}>
        <div className={styles.radioInputs}>
          <RadioInput name="sortingMethod" label="Выбор" value="selection" checked={selectedSortingMethod === 'selection'} onChange={handleRadioChange} disabled={isSorting} />
          <RadioInput name="sortingMethod" label="Пузырек" value="bubble" checked={selectedSortingMethod === 'bubble'} onChange={handleRadioChange} disabled={isSorting} />
        </div>
        <div className={styles.buttonList}>
          <Button text={'По возрастанию'} onClick={() => startSorting('ascending')} disabled={isSorting} />
          <Button text={'По убыванию'} onClick={() => startSorting('descending')} disabled={isSorting} />
          <Button text={'Новый массив'} onClick={generateRandomArray} disabled={isSorting}/>
        </div>
      </div>
      <div className={styles.arrayDisplay}>
        {currArr.map((value, index) => (
          <Column key={index} index={value} state={sortedIndexes.includes(index) ? ElementStates.Modified : comparingIndexes.includes(index) ? ElementStates.Changing : ElementStates.Default} />
        ))}
      </div>
    </SolutionLayout>
  );
};

