import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import Sidebar from '../Sidebar';
import cursor from '../../../assets/images/cursor.png';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import CourseModal from './CourseModal';
function AdminCourses() {
  const users = [
    {
      _id: '1',
      name: 'lovish',
      email: 'lovishduggal11@gmail.com',
      role: 'user',
      subscription: {
        status: 'active',
      },
    },
  ];
  const courses = [
    {
      _id: '1',
      poster: {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPP-OxEfDnAdyFdbYlGLG8F0rBKxH5yOTKXfOLCT1M7A&s',
      },
      title: 'web-dev',
      category: 'development',
      views: 12,
      createdBy: 'Lovish',
      numOfVideos: 2,
    },
  ];
  const { isOpen, onClose, onOpen } = useDisclosure();
  function coureDetailsHandler(userId) {
    onOpen();
  }
  function deleteButtonHandler(userId) {}
  function deleteLectureButtonHandler(courseId, lectureId) {}
  function addLectureHandler(e, courseId, title, description, video) {
    e.preventDefault();
  }
  return (
    <Grid
      css={{
        cursor: `url(${cursor}), default`,
      }}
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
    >
      <Box p={['0', '8']} overflowX="auto">
        <Heading
          textTransform={'uppercase'}
          children="All Users"
          my="16"
          textAlign={['center', 'left']}
        />
        <TableContainer w={['100vw', 'full']}>
          <Table variant={'simple'} size="lg">
            <TableCaption>All available courses in the database</TableCaption>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Poster</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Creator</Th>
                <Th isNumeric>Views</Th>
                <Th isNumeric>Lectures</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users &&
                courses.map(item => (
                  <Row
                    coureDetailsHandler={coureDetailsHandler}
                    deleteButtonHandler={deleteButtonHandler}
                    key={item._id}
                    item={item}
                  />
                ))}
            </Tbody>
          </Table>
        </TableContainer>
        <CourseModal
          isOpen={isOpen}
          onClose={onClose}
          id={'hdu86bs'}
          courseTitle={'react'}
          deleteButtonHandler={deleteLectureButtonHandler}
          addLectureHandler={addLectureHandler}
          // lectures={lectures}
          // loading={loading}
        />
      </Box>
      <Sidebar />
    </Grid>
  );
}

export default AdminCourses;

function Row({ item, coureDetailsHandler, deleteButtonHandler, loading }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>

      <Td>
        <Image src={item.poster.url} />
      </Td>

      <Td>{item.title}</Td>
      <Td textTransform={'uppercase'}>{item.category}</Td>
      <Td>{item.createdBy}</Td>
      <Td isNumeric>{item.views}</Td>
      <Td isNumeric>{item.numOfVideos}</Td>

      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            onClick={() => coureDetailsHandler(item._id, item.title)}
            variant={'outline'}
            color="purple.500"
            isLoading={loading}
          >
            View Lectures
          </Button>

          <Button
            onClick={() => deleteButtonHandler(item._id)}
            color={'purple.600'}
            isLoading={loading}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
