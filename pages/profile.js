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
import BasicProfile from '../components/Profile/BasicProfile';
import { useSession } from 'next-auth/react';

export default function Profile() {
    const { data: session, status } = useSession();

    const [dataValue, setDataValue] = useState('def');
    const options = useMemo(() => MajorLookup[dataValue], [dataValue]);

    const onChange = ({ target: { value } }) => {
        setDataValue(value);
    };
    if (status === 'authenticated') {
        return (
            <div className="profile">
                <div className="profile-main">
                    <div className="profile-content">
                        <div className="profile-top">
                            <div className="profile-header">
                                <span>Welcome to BuckiPlan</span>
                            </div>
                            <div className="profile-header">
                                <span>Hi {session.user.name}</span>
                            </div>
                            <BasicProfile />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
