import { Box, Center } from '@chakra-ui/react';
import NavBar from '../components/NavBar';

export default function DefaultLayout({ children }) {
    return (
        <>
            <Box>
                <NavBar />
                <Center>{children}</Center>
            </Box>
        </>
    );
}
