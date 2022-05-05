import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    HStack,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
    Select,
} from '@chakra-ui/react';

import { MajorLookup } from '../components/Profile/MajorLookup';
import { useState, useMemo } from 'react';

import { SmallCloseIcon } from '@chakra-ui/icons';

export default function Profile() {
    const [dataValue, setDataValue] = useState('def');
    const options = useMemo(() => MajorLookup[dataValue], [dataValue]);

    const onChange = ({ target: { value } }) => {
        setDataValue(value);
    };
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}
        >
            <Stack
                spacing={4}
                w={'full'}
                maxW={'md'}
                bg={useColorModeValue('white', 'gray.700')}
                rounded={'xl'}
                boxShadow={'lg'}
                p={6}
                my={12}
            >
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                    Welcome to BuckiPlan
                </Heading>
                <FormControl id="college" isRequired>
                    <FormLabel>Your College</FormLabel>
                    <Select onChange={onChange}>
                        <option value="def">Choose your college</option>
                        <option value="Architecture">Architecture</option>
                        <option value="ASC">Arts and Sciences</option>
                        <option value="Business">Business</option>
                        <option value="Denistry">Denistry</option>
                        <option value="EHE">Education and Human Ecology</option>
                        <option value="Engineering">Engineering</option>
                        <option value="ENR">
                            Environmental and Natural Resources
                        </option>
                        <option value="FAES">
                            Food, Agricultural and Environmental Sciences
                        </option>
                        <option value="HRS">
                            Health and Rehabilitation Sciences
                        </option>
                        <option value="Medicine">Medicine</option>
                        <option value="Nursing">Nursing</option>
                        <option value="Pharmacy">Pharmacy</option>
                        <option value="PUA">Public Affairs</option>
                        <option value="PHL">Public Health</option>
                        <option value="SKW">Social Work</option>
                    </Select>
                </FormControl>
                <FormControl id="major" isRequired>
                    <FormLabel>Your Major</FormLabel>
                    <Select disabled={dataValue === 'def'}>
                        {[...MajorLookup.def, ...options].map(
                            ({ id, text }) => (
                                <option key={id} value={id}>
                                    {text}
                                </option>
                            )
                        )}
                    </Select>
                </FormControl>
                <FormControl id="email" isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input
                        placeholder="your-email@example.com"
                        _placeholder={{ color: 'gray.500' }}
                        type="email"
                    />
                </FormControl>
                <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input
                        placeholder="password"
                        _placeholder={{ color: 'gray.500' }}
                        type="password"
                    />
                </FormControl>
                <Stack spacing={6} direction={['column', 'row']}>
                    <Button
                        bg={'red.400'}
                        color={'white'}
                        w="full"
                        _hover={{
                            bg: 'red.500',
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        bg={'blue.400'}
                        color={'white'}
                        w="full"
                        _hover={{
                            bg: 'blue.500',
                        }}
                    >
                        Submit
                    </Button>
                </Stack>
            </Stack>
        </Flex>
    );
}
