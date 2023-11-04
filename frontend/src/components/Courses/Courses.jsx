import {
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { categories } from '../../Contants/courses';
import { FaHeading } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Course({
  views,
  title,
  imageSrc,
  id,
  addToPlaylistHandler,
  creator,
  description,
  lectureCount,
}) {
  return (
    <VStack className="course" alignItems={['center', 'flex-start']}>
      <Image src={imageSrc} boxSize={'60'} objectFit={'contain'} />
      <Heading
        textAlign={['center', 'left']}
        maxW={'200px'}
        fontFamily={'sans-serif'}
        noOfLines={3}
        children={title}
        size={'sm'}
      />
      <Text noOfLines={2} children={description} />
      <HStack>
        <Text
          fontWeight={'bold'}
          textTransform={'uppercase'}
          children={'Creator'}
        />
        <Text font={'body'} textTransform={'uppercase'} children={creator} />
      </HStack>
      <Heading
        textAlign={'center'}
        size={'xs'}
        children={`Lectures - ${lectureCount}`}
        textTransform={'uppercase'}
      />
      <Heading
        size={'xs'}
        children={`Views - ${views}`}
        textTransform={'uppercase'}
      />
      <Stack direction={['column', 'row']} alignItems={'center'}>
        <Link to={`/course/${id}`}>
          <Button colorScheme="yellow">Watch Now</Button>
        </Link>
        <Button
          variant={'ghost'}
          colorScheme="yellow"
          onClick={() => addToPlaylistHandler(id)}
        >
          {' '}
          Add to playlist
        </Button>
      </Stack>
    </VStack>
  );
}
function Courses() {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');

  function addToPlaylistHandler() {}

  return (
    <Container minH={'95vh'} maxW="container.lg" paddingY={'8'}>
      <Heading children="All Courses" m={'8'} />
      <Input
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        type={'text'}
        placeholder={'Search a course...'}
        focusBorderColor="yellow.500"
      />
      <HStack
        overflowX={'auto'}
        paddingY={'8'}
        css={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {categories.map((item, idx) => (
          <Button key={idx} onClick={e => setCategory(item)} minW={'60'}>
            <Text children={item} />
          </Button>
        ))}
      </HStack>
      <Stack
        direction={['column', 'row']}
        flexWrap={'wrap'}
        justifyContent={['flex-start', 'space-evenly']}
        alignItems={['center', 'flex-end']}
      >
        <Course
          title={'web-dev'}
          description={'description'}
          views={'22'}
          imageSrc={
            'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&q=60&w=400&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D'
          }
          id={'1'}
          creator={'lovish'}
          lectureCount={'7'}
          addToPlaylistHandler={addToPlaylistHandler}
        />
        <Course
          title={'web-dev'}
          description={'description'}
          views={'22'}
          imageSrc={
            'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&q=60&w=400&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D'
          }
          id={'1'}
          creator={'lovish'}
          lectureCount={'7'}
          addToPlaylistHandler={addToPlaylistHandler}
        />
        <Course
          title={'web-dev'}
          description={'description'}
          views={'22'}
          imageSrc={
            'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&q=60&w=400&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D'
          }
          id={'1'}
          creator={'lovish'}
          lectureCount={'7'}
          addToPlaylistHandler={addToPlaylistHandler}
        />
        <Course
          title={'web-dev'}
          description={'description'}
          views={'22'}
          imageSrc={
            'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&q=60&w=400&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D'
          }
          id={'1'}
          creator={'lovish'}
          lectureCount={'7'}
          addToPlaylistHandler={addToPlaylistHandler}
        />
      </Stack>
    </Container>
  );
}

export default Courses;
