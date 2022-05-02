import { Stack, useColorModeValue } from '@chakra-ui/react';
import NavItems from './NavItems';
import MobileNavItem from './MobileNavItem';

const MobileNav = () => {
    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            p={4}
            display={{ md: 'none' }}
        >
            {NavItems.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};

export default MobileNav;
