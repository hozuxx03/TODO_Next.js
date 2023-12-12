'use client';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Input, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { useState } from 'react';

export default function Create() {
  const [todoTitle, setTodoTitle] = useState<string>('');
  const [todoDetail, setTodoDetail] = useState<string>('');
  const [todoStatus, setTodoStatus] = useState<string>('');
  // TODOを追加ボタンが押下された時の処理
  const handleAddTodo = () => {};
  return (
    <>
      <header>
        <Flex bg={'#FED7D7'}>
          <Box p='4' fontSize='25px' fontWeight={'bold'}>
            TODO作成
          </Box>
          <Box p='4'>
            <Button
              onClick={() => {
                handleAddTodo;
              }}
            >
              <PlusSquareIcon />
              TODOを追加
            </Button>
          </Box>
        </Flex>
      </header>
      <main>
        <Box>
          <Box>TODO TITLE</Box>
          <Input value={todoTitle} onChange={(e) => setTodoTitle(e.target.value)} w='800px'></Input>
          <Box>TODO DETAIL</Box>
          <Input value={todoDetail} onChange={(e) => setTodoDetail(e.target.value)} w='800px' h='350px'></Input>
          <Box>TODO STATUS</Box>
          <RadioGroup value={todoStatus} onChange={(e) => setTodoStatus(e)}>
            <Stack direction='row'>
              <Radio value='High' fontWeight='bold' fontSize='24px' mr='16px'>
                未着手
              </Radio>
              <Radio value='Middle' fontWeight='bold' fontSize='24px' mr='16px'>
                着手
              </Radio>
              <Radio value='Low' fontWeight='bold' fontSize='24px'>
                完了
              </Radio>
            </Stack>
          </RadioGroup>
        </Box>
      </main>
    </>
  );
}
