import React from 'react';
import { Text, Box, useColorModeValue } from '@chakra-ui/react';

export default function Logo(props) {
    return (
        <Box {...props}>
            <Text fontsize="lg" fontWeight="bold" px={4}>
                BuckiPlan
            </Text>
        </Box>
    );
}
