import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../helpers/axiosInstance';
import { useNavigate } from 'react-router-dom';
import {
  buySubscription,
  verifyUserPayment,
} from '../../redux/slices/paymentSlice';
import logo from '../../assets/images/logo.png';
import { updateUser } from '../../redux/slices/userSlice';

function Subscribe() {
  const dispatch = useDispatch();
  const [key, setKey] = useState('');
  const { subscriptionId } = useSelector(state => state.payment);
  const { user } = useSelector(state => state.user);
  const navigate = useNavigate();

  async function subscribeHandler() {
    const {
      data: { key },
    } = await axiosInstance.get(`/razorpaykey`);

    setKey(key);

    const { payload } = await dispatch(buySubscription());
    if (payload.success) {
      dispatch(updateUser({ user: payload.user }));
    }
  }

  useEffect(() => {
    const paymentDetails = {
      razorpay_payment_id: '',
      razorpay_subscription_id: '',
      razorpay_signature: '',
    };
    if (subscriptionId) {
      const openPopUp = () => {
        const options = {
          key,
          name: 'Coursify',
          description: 'Get access to all premium content',
          image: logo,
          subscription_id: subscriptionId,
          handler: async function (response) {
            paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
            paymentDetails.razorpay_subscription_id =
              response.razorpay_subscription_id;
            paymentDetails.razorpay_signature = response.razorpay_signature;
            const { payload } = await dispatch(
              verifyUserPayment(paymentDetails)
            );
            if (payload?.success) {
              await dispatch(updateUser({ user: payload?.user }));
              navigate(
                `/paymentsuccess?reference=${paymentDetails.razorpay_payment_id}`
              );
            } else {
              navigate('/paymentfail');
            }
          },
          prefill: {
            name: user?.name,
            email: user?.email,
          },
          notes: {
            address: 'Amristsar, Punjab',
          },
          theme: {
            color: '#FFC800',
          },
        };

        const razor = new window.Razorpay(options);
        razor.open();
      };
      openPopUp();
    }
  }, [key, subscriptionId, dispatch, navigate, user?.name, user?.email]);
  return (
    <Container h="90vh" p="16">
      <Heading children="Welcome" my="8" textAlign={'center'} />

      <VStack
        boxShadow={'lg'}
        alignItems="stretch"
        borderRadius={'lg'}
        spacing="0"
      >
        <Box bg="yellow.400" p={'4'} css={{ borderRadius: '8px 8px 0 0' }}>
          <Text color={'black'} children={`Pro Pack - ₹99.00`} />
        </Box>
        <Box p="4">
          <VStack textAlign={'center'} px="8" mt={'4'} spacing="8">
            <Text children={`Join pro pack and get access to all content.`} />
            <Heading size="md" children={'₹1 Only'} />
          </VStack>

          <Button
            onClick={subscribeHandler}
            my="8"
            w="full"
            colorScheme={'yellow'}
          >
            Buy Now
          </Button>
        </Box>

        <Box bg="blackAlpha.600" p="4" css={{ borderRadius: '0 0 8px 8px' }}>
          <Heading
            color={'white'}
            textTransform="uppercase"
            size="sm"
            children={'100% refund at cancellation'}
          />

          <Text
            fontSize={'xs'}
            color="white"
            children={'*Terms & Conditions Apply'}
          />
        </Box>
      </VStack>
    </Container>
  );
}

export default Subscribe;
