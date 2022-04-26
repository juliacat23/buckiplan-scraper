import React from 'react';
import Logo from './Navigation/Logo';
import MenuLinks from './Navigation/MenuLinks';
import MenuToggle from './Navigation/MenuToggle';
import ToggleLayout from './Navigation/ToggleLayout';
import NavBarContainer from './Navigation/NavBarContainer';

const NavBar = (props) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <NavBarContainer {...props}>
            <Logo w="300px" />
            <MenuLinks isOpen={isOpen} />
            <ToggleLayout />
            <MenuToggle toggle={toggle} isOpen />
        </NavBarContainer>
    );
};

export default NavBar;
