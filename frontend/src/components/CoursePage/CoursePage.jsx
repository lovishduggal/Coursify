import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Heading,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import intro from '../../assets/videos/intro.mp4';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getCourseLectures } from '../../redux/slices/courseSlice';
function CoursePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [lectureNumber, setLectureNumber] = useState(0);
  const { lectures } = useSelector(state => state.course);
  const { user } = useSelector(state => state.user);

  useEffect(() => {
    (() => {
      dispatch(getCourseLectures({ id }));
    })();
  }, [dispatch, id]);

  if (
    user.role !== 'admin' &&
    (user.subscription === undefined || user.subscription.status !== 'active')
  ) {
    return <Navigate to={'/subscribe'} />;
  }

  return (
    <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']}>
      {lectures && lectures?.length > 0 ? (
        <>
          <Box>
            <video
              width={'100%'}
              controls
              controlsList="nodownload noremoteplayback"
              disablePictureInPicture
              disableRemotePlayback
              src={lectures[lectureNumber]?.video?.url}
            ></video>

            <Heading
              m="4"
              children={`#${lectureNumber + 1} ${
                lectures[lectureNumber]?.title
              }`}
            />

            <Heading m="4" children="Description" />
            <Text m="4" children={lectures[lectureNumber]?.description} />
          </Box>

          <VStack>
            {lectures?.map((element, index) => (
              <button
                onClick={() => setLectureNumber(index)}
                key={element._id}
                style={{
                  width: '100%',
                  padding: '1rem',
                  textAlign: 'center',
                  margin: 0,
                  borderBottom: '1px solid rgba(0,0,0,0.2)',
                }}
              >
                <Text noOfLines={1}>
                  #{index + 1} {element.title}
                </Text>
              </button>
            ))}
          </VStack>
        </>
      ) : (
        <Container
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Heading width={'100%'} textAlign={'center'} children="No Lectures" />
        </Container>
      )}
    </Grid>
  );
}

export default CoursePage;
