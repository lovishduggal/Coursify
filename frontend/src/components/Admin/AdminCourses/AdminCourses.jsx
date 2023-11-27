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
import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import cursor from '../../../assets/images/cursor.png';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import CourseModal from './CourseModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  addLecture,
  deleteCourse,
  deleteLecture,
  getAllCourses,
  getCourseLectures,
} from '../../../redux/slices/courseSlice';
import { useEffect } from 'react';
function AdminCourses() {
  const dispatch = useDispatch();
  const { courses, lectures } = useSelector(state => state.course);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [courseId, setCourseId] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
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
  async function coureDetailsHandler(id, title) {
    await dispatch(getCourseLectures({ id }));
    onOpen();
    setCourseId(id);
    setCourseTitle(title);
  }
  async function deleteButtonHandler(id) {
    await dispatch(deleteCourse({ id }));
  }
  function deleteLectureButtonHandler(courseId, lectureId) {
    dispatch(deleteLecture({courseId, lectureId}))
  }
  function addLectureHandler(e, id, title, description, video) {
    e.preventDefault();
    const form = new FormData();
    form.append('title', title);
    form.append('description', description);
    form.append('file', video);
    dispatch(addLecture({ id, form }));
  }
  useEffect(() => {
    (async () => {
      await dispatch(getAllCourses({ keyword: '', category: '' }));
    })();
  }, [dispatch]);
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
                courses?.map(item => (
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
          id={courseId}
          courseTitle={courseTitle}
          deleteButtonHandler={deleteLectureButtonHandler}
          addLectureHandler={addLectureHandler}
          lectures={lectures}
        />
      </Box>
      <Sidebar />
    </Grid>
  );
}

export default AdminCourses;

function Row({ item, coureDetailsHandler, deleteButtonHandler }) {
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
          >
            View Lectures
          </Button>

          <Button
            onClick={() => deleteButtonHandler(item._id)}
            color={'purple.600'}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
