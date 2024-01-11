'use client';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Textarea, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '@/libs/firebase';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';

const create = () => {
  const router = useRouter();
  const [todoTitle, setTodoTitle] = useState<string>('');
  const [todoDetail, setTodoDetail] = useState<string>('');
  const [todoStatus, setTodoStatus] = useState<string>('未着手');

  // TODOを追加ボタンが押下された時の処理
  const handleAddTodo = () => {
    console.log('TODOを追加');
    // todoTitle or todoDetailに何も入力されていなかったときの処理
    if (todoTitle === '' && todoDetail === '') return;
    // Firebaseにデータを追加する処理
    const addDataRef = collection(db, 'todos');
    addDoc(addDataRef, {
      id: uuidv4(),
      title: todoTitle,
      detail: todoDetail,
      status: todoStatus,
    });
    setTodoTitle('');
    setTodoDetail('');
    setTodoStatus('');
    router.push('/todos');
  };
  return (
    <>
      <header>
        <Flex bg={'#FED7D7'}>
          <Box p='4' fontSize='25px' fontWeight={'bold'}>
            TODO作成
          </Box>
          <Box p='4'>
            <Button onClick={() => handleAddTodo()}>
              <PlusSquareIcon />
              TODOを追加
            </Button>
          </Box>
        </Flex>
      </header>
      <main>
        <Box>
          <Text>TODO TITLE</Text>
          <Textarea
            value={todoTitle}
            onChange={(e) => {
              setTodoTitle(e.target.value);
            }}
            w='800px'
          ></Textarea>
        </Box>
        <Box>
          <Text>TODO DETAIL</Text>
          <Textarea value={todoDetail} onChange={(e) => setTodoDetail(e.target.value)} w='800px' h='350px'></Textarea>
        </Box>
        <Box>
          <Text>TODO STATUS</Text>
          <RadioGroup value={todoStatus} onChange={(e) => setTodoStatus(e)}>
            <Stack direction='row'>
              <Radio value='未着手' fontWeight='bold' fontSize='24px' mr='16px'>
                未着手
              </Radio>
              <Radio value='着手' fontWeight='bold' fontSize='24px' mr='16px'>
                着手
              </Radio>
              <Radio value='完了' fontWeight='bold' fontSize='24px'>
                完了
              </Radio>
            </Stack>
          </RadioGroup>
        </Box>
      </main>
    </>
  );
};

export default create;
