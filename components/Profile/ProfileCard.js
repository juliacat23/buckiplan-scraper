import {
    Container,
    FormControl,
    FormLabel,
    Code,
    Box,
    useColorModeValue,
} from '@chakra-ui/react';

import {
    AsyncCreatableSelect,
    AsyncSelect,
    CreatableSelect,
    Select,
} from 'chakra-react-select';

function ProfileNameCard() {
    return (
        <Box borderWidth="1px">
            <FormControl p={4}>
                <FormLabel>First Name</FormLabel>
            </FormControl>
        </Box>
    );
}
