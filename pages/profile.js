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

import { SmallCloseIcon } from '@chakra-ui/icons';

import { useSelect } from 'react';

export default function Profile() {
    const [selected, setSelected] = useState('');
    const changeSelectOptionHandler = (event) => {
        setSelected(event.target.value);
    };

    const ARC = [
        'Architecture',
        'City and Regional Planning',
        'Landscape Architecture',
    ];
    const BUS = [
        'Accounting',
        'Aviation Management',
        'Business Economics',
        'Finance',
        'Human Resources',
        'Information Systems',
        'Insurance',
        'International Business',
        'Logistics Management',
        'Marketing',
        'Operations Management',
        'Real Estate and Urban Analysis',
    ];
    const EHE = [
        'Child and Youth Studies',
        'Consumer and Family Financial Services',
        'Education (Early Childhood)',
        'Education (Integrated Languate Arts/English)',
        'Education (Middle Childhood)',
        'Education (Science and Mathematics)',
        'Education (Special Ed)',
        'Education (Teaching English to Speakers of Other Languages)',
        'Education (Technical Education and Training)',
        'Education (World Language)',
        'Exercise Science Education',
        'Fashion and Retail Studies',
        'Human Promotion, Nutrition and Exercise Science',
        'Hospitality Management',
        'Human Development and Family Science',
        'Human Nutrition',
        'Sport Industry',
        'Sports Coaching, Recreation and Physical Education',
    ];
    const ENG = [
        'Aerospace Engineering',
        'Aviation',
        'Biomedical Engineering',
        'Chemical Engineering',
        'Civil Engineering',
        'Computer Science and Engineering',
        'Electrical and Computer Engineering',
        'Engineering Physics',
        'Environmental Engineering',
        'Food, Agricultural and Biological Engineering',
        'Industrial and Systems Engineering',
        'Material Science and Engineering',
        'Mechnical Engineering',
        'Welding Engineering',
    ];
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
                <FormControl id="userName">
                    <FormLabel>User Icon</FormLabel>
                    <Stack direction={['column', 'row']} spacing={6}>
                        <Center>
                            <Avatar size="xl" src="https://bit.ly/sage-adebayo">
                                <AvatarBadge
                                    as={IconButton}
                                    size="sm"
                                    rounded="full"
                                    top="-10px"
                                    colorScheme="red"
                                    aria-label="remove Image"
                                    icon={<SmallCloseIcon />}
                                />
                            </Avatar>
                        </Center>
                        <Center w="full">
                            <Button w="full">Change Icon</Button>
                        </Center>
                    </Stack>
                </FormControl>
                <FormControl id="college" isRequired>
                    <FormLabel>Your College</FormLabel>
                    <Select
                        placeholder="Select One"
                        _placeholder={{ color: 'gray.500' }}
                    >
                        <option value="ASC">Arts and Sciences</option>
                        <option value="DEN">Denistry</option>
                        <option value="DEN">Education and Human Ecology</option>
                        <option value="ENG">Engineering</option>
                        <option value="BUS">Fisher College of Business</option>
                        <option value="FAE">
                            Food, Agricultural, and Environmental Sciences
                        </option>
                        <option value="HRS">
                            Health and Rehabilitation Sciences
                        </option>
                        <option value="JGL">
                            John Glenn College of Public Affairs
                        </option>
                        <option value="ARC">
                            Knowlton School of Architecture
                        </option>
                        <option value="MED">Medicine</option>
                        <option value="NUR">Nursing</option>
                        <option value="PHR">Pharmacy</option>
                        <option value="PUB">Public Health</option>
                        <option value="SWK">Social Work</option>
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
