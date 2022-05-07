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
import { property } from 'lodash';

export default function Profile({ props }) {
    const [dataValue, setDataValue] = useState('def');
    const options = useMemo(() => MajorLookup[dataValue], [dataValue]);

    const onChange = ({ target: { value } }) => {
        setDataValue(value);
    };
    return (
        <div className="profile">
            <div className="profile-main">
                <div className="profile-content">
                    <div className="profile-top">
                        <div className="profile-header">
                            <span>Welcome to BuckiPlan</span>
                        </div>
                        <div className="profile-header">
                            <span>Hi ?</span>
                        </div>
                        <BasicProfile />
                    </div>
                </div>
            </div>
        </div>
    );
}

export const getServerSideProps = async ({ params, res }) => {
    try {
        const { id } = params;
        const res = await fetch(`/api/users${id}`);
        console.log(res.json);
        const data = await res.json;

        return {
            props: { data },
        };
    } catch {
        res.statusCode = 404;
        return {
            props: {},
        };
    }
};
