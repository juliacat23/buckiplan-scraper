import { Input, Select } from '@chakra-ui/react';
import { useState, useMemo } from 'react';

import { MajorLookup } from './MajorLookup';

export default function BasicProfile(props) {
    const [firstName, setFirstName] = useState('');
    const handleChangeFirstName = (event) => {
        setFirstName(event.currentTarget.value);
    };

    const [lastName, setLastName] = useState('');
    const handleChangeLastName = (event) => {
        console.log(event.currentTarget.value);
        setLastName(event.currentTarget.value);
    };

    const [dataValue, setDataValue] = useState('def');
    const options = useMemo(() => MajorLookup[dataValue], [dataValue]);

    const onChange = ({ target: { value } }) => {
        setDataValue(value);
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
                        <div className="profile-selectWrapper">
                            <Select>
                                <option value="fall">Fall</option>
                                <option value="spring">Spring</option>
                                <option value="summer">Summer</option>
                            </Select>
                        </div>
                    </div>
                    <div className="profile-inputWrapper profile-inputWrapper--name">
                        <label className="profile-label">
                            <span className="profile-subHeader--font">
                                Entrance Year
                                <span className="profile-required-star">*</span>
                            </span>
                        </label>
                        <div className="profile-selectWrapper">
                            <Select>
                                <option value="2017">2017</option>
                                <option value="2018">2018</option>
                                <option value="2019">2019</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                            </Select>
                        </div>
                    </div>
                    <div className="profile-inputWrapper profile-inputWrapper--name"></div>
                    <div className="profile-inputWrapper profile-inputWrapper--name">
                        <label className="profile-label">
                            <span className="profile-subHeader-font">
                                Graduation Season
                                <span className="profile-required-star">*</span>
                            </span>
                        </label>
                        <div className="profile-selectWrapper">
                            <Select placeholder="Select">
                                <option value="fall">Fall</option>
                                <option value="spring">Spring</option>
                                <option value="summer">Summer</option>
                            </Select>
                        </div>
                    </div>
                    <div className="profile-inputWrapper profile-inputWrapper--name">
                        <label className="profile-label">
                            <span className="profile-subHeader--font">
                                Entrance Year
                                <span className="profile-required-star">*</span>
                            </span>
                        </label>
                        <div className="profile-selectWrapper">
                            <Select>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="profile-section">
                <div className="profile-subHeader profile-subHeader-indent">
                    <span className="profile-subHeader--font">
                        Undergraduate Degree
                    </span>
                </div>
                <div className="profle-inputs profile-inputs--undergrad">
                    <div className="profile-section">
                        <div className="profile-subHeader">
                            <span className="profile-subHeader--font">
                                Your Major
                            </span>
                        </div>
                        <div className="profile-inputs profile-inputs--small">
                            <div className="profile-inputWraper profile-inputWrapper--college">
                                <label className="profile-label">College</label>
                                <div className="profile-selectWrapper">
                                    <Select onChange={onChange}>
                                        <option value="def">
                                            Choose your college
                                        </option>
                                        <option value="Architecture">
                                            Architecture
                                        </option>
                                        <option value="ASC">
                                            Arts and Sciences
                                        </option>
                                        <option value="Business">
                                            Business
                                        </option>
                                        <option value="Denistry">
                                            Denistry
                                        </option>
                                        <option value="EHE">
                                            Education and Human Ecology
                                        </option>
                                        <option value="Engineering">
                                            Engineering
                                        </option>
                                        <option value="ENR">
                                            Environmental and Natural Resources
                                        </option>
                                        <option value="FAES">
                                            Food, Agricultural and Environmental
                                            Sciences
                                        </option>
                                        <option value="HRS">
                                            Health and Rehabilitation Sciences
                                        </option>
                                        <option value="Medicine">
                                            Medicine
                                        </option>
                                        <option value="Nursing">Nursing</option>
                                        <option value="Pharmacy">
                                            Pharmacy
                                        </option>
                                        <option value="PUA">
                                            Public Affairs
                                        </option>
                                        <option value="PHL">
                                            Public Health
                                        </option>
                                        <option value="SKW">Social Work</option>
                                    </Select>
                                </div>
                            </div>
                            <div className="profile-inputWrapper profile-inputWrapper--college">
                                <label className="profile-label">Major</label>
                                <Select disabled={dataValue === 'def'}>
                                    {[...MajorLookup.def, ...options].map(
                                        ({ id, text }) => (
                                            <option key={id} value={id}>
                                                {text}
                                            </option>
                                        )
                                    )}
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profle-inputs profile-inputs--undergrad">
                    <div className="profile-section">
                        <div className="profile-subHeader">
                            <span className="profile-subHeader--font">
                                Your Minor
                            </span>
                        </div>
                        <div className="profile-inputs profile-inputs--small">
                            <div className="profile-inputWraper profile-inputWrapper--college">
                                <label className="profile-label">College</label>
                                <div className="profile-selectWrapper">
                                    <Select onChange={onChange}>
                                        <option value="def">
                                            Choose your college
                                        </option>
                                        <option value="Architecture">
                                            Architecture
                                        </option>
                                        <option value="ASC">
                                            Arts and Sciences
                                        </option>
                                        <option value="Business">
                                            Business
                                        </option>
                                        <option value="Denistry">
                                            Denistry
                                        </option>
                                        <option value="EHE">
                                            Education and Human Ecology
                                        </option>
                                        <option value="Engineering">
                                            Engineering
                                        </option>
                                        <option value="ENR">
                                            Environmental and Natural Resources
                                        </option>
                                        <option value="FAES">
                                            Food, Agricultural and Environmental
                                            Sciences
                                        </option>
                                        <option value="HRS">
                                            Health and Rehabilitation Sciences
                                        </option>
                                        <option value="Medicine">
                                            Medicine
                                        </option>
                                        <option value="Nursing">Nursing</option>
                                        <option value="Pharmacy">
                                            Pharmacy
                                        </option>
                                        <option value="PUA">
                                            Public Affairs
                                        </option>
                                        <option value="PHL">
                                            Public Health
                                        </option>
                                        <option value="SKW">Social Work</option>
                                    </Select>
                                </div>
                            </div>
                            <div className="profile-inputWrapper profile-inputWrapper--college">
                                <label className="profile-label">Major</label>
                                <Select disabled={dataValue === 'def'}>
                                    {[...MajorLookup.def, ...options].map(
                                        ({ id, text }) => (
                                            <option key={id} value={id}>
                                                {text}
                                            </option>
                                        )
                                    )}
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
