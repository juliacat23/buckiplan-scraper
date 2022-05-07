import { Input } from '@chakra-ui/react';
import { useState } from 'react';

export default function BasicProfile(props) {
    const [firstName, setFirstName] = useState('');
    const handleChangeFirstName = (event) => {
        // console.log(event.currentTarget.value); debugging
        setFirstName(event.currentTarget.value);
    };

    const [lastName, setLastName] = useState('');
    const handleChangeLastName = (event) => {
        console.log(event.currentTarget.value);
        setLastName(event.currentTarget.value);
    };
    return (
        <div className="profile">
            <div className="profile-section">
                <div className="profile-subHeader onboarding-subHeader-indent">
                    <span className="profile-subHeader-font"> Your Name</span>
                </div>
                <div className="profile-inputs profile-inputs--name">
                    <div className="profile-inputWrapper profile-inputWrapper--name">
                        <label className="profile-label">
                            <span className="profile-subHeader--font">
                                First Name
                                <span className="profile-required-star">*</span>
                            </span>
                        </label>
                        <Input
                            className="profile-input"
                            type="text"
                            value={firstName}
                            onChange={handleChangeFirstName}
                        />
                    </div>
                    <div className="profile-inputWrapper profile-inputWrapper--name">
                        <label className="profile-label">
                            <span className="profile-subHeader--font">
                                Last Name
                                <span className="profile-required-star">*</span>
                            </span>
                        </label>
                        <Input
                            className="profile-input"
                            type="text"
                            value={lastName}
                            onChange={handleChangeLastName}
                        />
                    </div>
                    <div className="profile-inputWrapper profile-inputWrapper--name">
                        <label className="profile-label">
                            <span className="profile-subHeader--font">
                                Last Name
                                <span className="profile-required-star">*</span>
                            </span>
                        </label>
                        <Input className="profile-input" />
                    </div>
                    <div className="profile-inputWrapper profile-inputWrapper--name profile-inputWrapper--description">
                        <label className="profile-label">
                            <span className="profile-subHeader-font">
                                Entrance Season
                                <span className="profile-required-star">*</span>
                            </span>
                        </label>
                        <div className="profile-selectWrapper"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
