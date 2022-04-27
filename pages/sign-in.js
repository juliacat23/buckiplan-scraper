import Head from 'next/head';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { getSession, getCsrfToken, signIn } from 'next-auth/react';

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';

export default function page({ CsrfToken, providers }) {
    const [isSubmitting, setSubmitting] = useState(false);
    const { register, handleSubmit } = useForm();

    const handleProviderSignIn = (provider) => {
        signIn(provider.id);
    };

    const onSubmit = async (data) => {
        setSubmitting(true);
        try {
            signIn('buckiplan-login', {
                callbackUrl: '/',
                email: data.email,
                password: data.password,
            });
        } catch (error) {
            console.error(error);
            setSubmitting(false);
        }
    };

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}
        >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}
                >
                    <Stack spacing={4}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input
                                name="csrfToken"
                                {...register('csrfToken')}
                                type="hidden"
                                hidden
                            />
                            <FormControl id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    {...register('email')}
                                ></Input>
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input
                                    id="password"
                                    type="password"
                                    minLength={12}
                                    required
                                    {...register('password')}
                                />
                            </FormControl>
                            <Stack spacing={10}>
                                <Button
                                    type="submit"
                                    bg={'blue.400'}
                                    color={'white'}
                                >
                                    Sign in
                                </Button>
                            </Stack>
                        </form>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}

export async function GetServerSideProps(context) {
    const session = await getSession(context);

    if (session) {
        return { redirect: { permanent: false, destination: '/' } };
    }

    const csrfToken = await getCsrfToken({ req });
    return {
        csrfToken,
    };
}
