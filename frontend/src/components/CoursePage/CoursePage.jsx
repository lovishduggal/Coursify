import React, { useState } from 'react';
import { Box, Grid, Heading, Spinner, Text, VStack } from '@chakra-ui/react';
import intro from '../../assets/videos/intro.mp4';
function CoursePage() {
  const [lectureNumber, setLectureNumber] = useState(0);
  const lectures = [
    {
      _id: '1',
      title: 'web-dev',
      description:
        'description description description description description-1',
      video: {
        url: intro,
      },
    },
    {
      _id: '2',
      title: 'web-dev',
      description:
        'description description description description description-2',
      video: {
        url: 'https://player.vimeo.com/external/286292019.sd.mp4?s=4232cafab437fbc5d95df661766b4f76e094d0b7&profile_id=164&oauth2_token_id=57447761',
      },
    },
    {
      _id: '3',
      title: 'web-dev',
      description:
        'description description description description description -3',
      video: {
        url: 'https://player.vimeo.com/external/399219524.sd.mp4?s=54539cd5083ca68ba891f2ab294420cab509f35f&profile_id=164&oauth2_token_id=57447761',
      },
    },
  ];
  return (
    <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']}>
      {lectures && lectures.length > 0 ? (
        <>
          <Box>
            <video
              width={'100%'}
              controls
              controlsList="nodownload noremoteplayback"
              disablePictureInPicture
              disableRemotePlayback
              src={lectures[lectureNumber].video.url}
            ></video>

            <Heading
              m="4"
              children={`#${lectureNumber + 1} ${
                lectures[lectureNumber].title
              }`}
            />

            <Heading m="4" children="Description" />
            <Text m="4" children={lectures[lectureNumber].description} />
          </Box>

          <VStack>
            {lectures.map((element, index) => (
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
        <Heading children="No Lectures" />
      )}
    </Grid>
  );
}

export default CoursePage;
