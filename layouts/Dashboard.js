import { Box, Center } from '@chakra-ui/react';
import Sidebar from '../components/Sidebar/Sidebar';

export default function DefaultLayout({ children }) {
    return (
        <>
            <Box>
                <Sidebar />
                <Center>{children}</Center>
            </Box>
        </>
    );
}
