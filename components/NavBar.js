import { Toggle } from '@supabase/ui';
import React from 'react';
import {
    Logo,
    MenuLinks,
    MenuToggle,
    NavBarContainer,
    ToggleLayout,
} from '../components/Navigation';

const NavBar = (props) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <NavBarContainer {...props}>
            <Logo w="100px" />
            <MenuLinks isOpen={isOpen} />
            <Toggle />
            <MenuToggle toggle={toggle} isOpen />
        </NavBarContainer>
    );
};

export default NavBar;
