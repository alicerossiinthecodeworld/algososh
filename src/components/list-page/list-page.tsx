import React, { useState } from 'react';
import { ElementStates } from '../../types/element-states';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';

import styles from './list-page.module.css';

interface ListNode {
  value: string;
  next: ListNode | null;
}

const initialList: ListNode[] = [
  { value: '0', next: null },
  { value: '34', next: null },
  { value: '8', next: null },
  { value: '1', next: null },
];


export const ListPage = () => {
  const [list, setList] = useState<ListNode[]>(initialList);
  const [value, setValue] = useState('');
  const [index, setIndex] = useState('');
  const [tempList, setTempList] = useState<ListNode[]>([]); 
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const deleteAtIndex = async () => {
    let indexToDelete = Number(index)
    for (let i = 0; i <= indexToDelete; i++) {
      setHighlightedIndex(i);
      await new Promise(resolve => setTimeout(resolve, 500)); 
    }
    setHighlightedIndex(null);
    setList(prevList => prevList.filter((_, index) => index !== indexToDelete));
  };

  const createNewNode = (value: string): ListNode => ({
    value,
    next: null,
  });
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
  const handleIndexChange = (e: React.ChangeEvent<HTMLInputElement>) => setIndex(e.target.value);
  const renderList = () => {
    const currentList = tempList.length > 0 ? tempList : list;
    const elements = currentList.map((item, index) => (
      <Circle
        key={index}
        letter={item.value}
        state={index === highlightedIndex ? ElementStates.Changing : ElementStates.Default}
        index={index}
        head={index === 0 ? 'head' : undefined}
        tail={index === list.length - 1 ? 'tail' : undefined}
      />
    ));

    return <div className={styles.sequence}>{elements}</div>;
  };
  const addAtHead = () => {
    const newNode = createNewNode(value);
    setList([newNode, ...list]);
    setValue('');
  };

  const addAtTail = () => {
    const newNode = createNewNode(value);
    setList([...list, newNode]);
    setValue('');
  };

  const deleteFromHead = () => {
    setList(list.slice(1));
  };

  const deleteFromTail = () => {
    setList(list.slice(0, -1));
  };

  const addAtIndex = async () => {
    const indexToAdd = parseInt(index, 10);
    const newValue = createNewNode(value); 
    if (isNaN(indexToAdd) || indexToAdd < 0 || indexToAdd > list.length || value.trim() === '') {
      alert('Пожалуйста, введите корректные данные');
      return;
    }
  
    for (let i = 0; i < indexToAdd; i++) {
      setHighlightedIndex(i);
      await new Promise((resolve) => setTimeout(resolve, 500)); 
    }

    setList((prevList) => {
      const newList = [...prevList];
      newList.splice(indexToAdd, 0, newValue); 
      return newList;
    });
  
    setValue('');
    setIndex('');
    setHighlightedIndex(null);
  };
  
  return (
    <SolutionLayout title="Связный список">
      <div className={styles.inputZone}>
        <Input
          type="text"
          maxLength={4}
          value={value}
          onChange={handleValueChange}
          extraClass={styles.input}
          isLimitText={true}
          placeholder="Введите значение"
        />
        <Button text="Добавить в head" onClick={addAtHead} extraClass={styles.listButton} />
        <Button text="Добавить в tail" onClick={addAtTail} extraClass={styles.listButtons} />
        <Button text="Удалить из head" onClick={deleteFromHead} extraClass={styles.listButtons} />
        <Button text="Удалить из tail" onClick={deleteFromTail} extraClass={styles.listButtons} />
      </div>
      <div className={styles.inputZone}>
        <Input
          type="number"
          placeholder="Введите индекс"
          value={index}
          onChange={handleIndexChange}
          extraClass={styles.input}
        />
        <Button text="Добавить по индексу" onClick={addAtIndex} extraClass={styles.indexButton} />
        <Button text="Удалить по индексу" onClick={deleteAtIndex} extraClass={styles.indexButton} />
      </div>
      <div className={styles.listContainer}>
        {renderList()}
      </div>
    </SolutionLayout>
  );
};
