'use client';
import {
  Box,
  Flex,
  Text,
  Select,
  Button,
  Center,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Table,
} from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';
import { db } from '@/libs/firebase';
import { useEffect, useState } from 'react';
import { doc, deleteDoc, collection, getDocs } from 'firebase/firestore';

type Todo = {
  id: string;
  title: string;
  detail: string;
  status: string;
};

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // ブラウザがリロードされた時に実行される(useEffectの第2引数の関数に[]を指定しているため)
  useEffect(() => {
    // collection関数でFireStoreのデータベース情報とテーブルに該当するコレクション情報を取得し、変数へ格納
    const firestorePostData = collection(db, 'todos');
    // データ取得用配列
    const arrTodos: Todo[] = [];
    // getDocs関数でデータベースの情報を取得し、一旦用意した配列へ取得したデータを格納
    getDocs(firestorePostData).then((snapShot) => {
      snapShot.forEach((docs) => {
        const doc = docs.data();
        arrTodos.push({
          id: doc.id,
          title: doc.title,
          detail: doc.detail,
          status: doc.status,
        });
      });
      // データベースから取得したデータが入っている配列をステートに渡して、外部参照が可能な状態へ
      // setTodos関数によって渡されたデータは変数todosへ格納
      setTodos(arrTodos);
    });
  }, []);

  const router = useRouter();
  const handleClickCreate = () => {
    router.push('todos/create');
  };
  // 削除ボタンが押された時の処理
  const handleClickDelete = async (id: string) => {
    console.log('削除');
    console.log(id);

    await deleteDoc(doc(db, 'todos', id));
  };
  return (
    <>
      <header>
        <Flex bg={'#FED7D7'}>
          <Box p='4' fontSize='25px' fontWeight={'bold'}>
            TODOリスト
          </Box>
          <Box p='4'>
            <Button onClick={handleClickCreate}>
              <PlusSquareIcon />
              TODOを作成
            </Button>
          </Box>
        </Flex>
        <Box w='250px' h='50px' pl='20px' pt='10px' display='flex'>
          <Center h='100%'>
            <Text w='90px'>絞り込み：</Text>
          </Center>
          <Select placeholder='全て' w='192px'>
            <option value='未着手'>未着手</option>
            <option value='着手'>着手</option>
            <option value='完了'>完了</option>
          </Select>
        </Box>
      </header>
      <main>
        <TableContainer>
          <Table variant='striped' mt='30px'>
            <Thead>
              <Tr>
                <Th>TODO TITLE</Th>
                <Th>TODO DETAIL</Th>
                <Th>TODO STATUS</Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* 変数todosは配列として構成されているのでmap関数で一覧取得 */}
              {todos.map((todo) => (
                <Tr key={todo.id}>
                  <Td>{todo.title}</Td>
                  <Td>{todo.detail}</Td>
                  <Td>{todo.status}</Td>
                  <Td>
                    <Button onClick={() => handleClickDelete(todo.id)}>削除</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </main>
      <footer></footer>
    </>
  );
}
