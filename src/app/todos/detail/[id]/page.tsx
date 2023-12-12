'use client';
import { Box, Flex, Input, Button, RadioGroup, Radio, Stack } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
export default function Detail() {
  return (
    <>
      <Box>
        <header>
          <Flex bg={'#FED7D7'}>
            <Box p='4' fontSize='25px' fontWeight={'bold'}>
              TODO
            </Box>
            <Box p='4'>
              <Button>
                <EditIcon />
                TODOを編集
              </Button>
            </Box>
            <Box p='4'>
              <Button>
                <DeleteIcon />
                TODOを削除
              </Button>
            </Box>
          </Flex>
        </header>
        <main>
          <Box>
            <Box>TODO TITLE</Box>
            <Input w='800px'></Input>
            <Box>TODO DETAIL</Box>
            <Input w='800px' h='350px'></Input>
            <Box>TODO STATUS</Box>
            <RadioGroup>
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
      </Box>
    </>
  );
}
