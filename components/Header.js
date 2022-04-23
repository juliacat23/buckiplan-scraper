import Head from 'next/head';

import '../styles/Header.module.scss';

const Header = () => (
    <div className='landing top-sec'>
        <div className='container p-0 m-0'>
            <div className='row top-bar phonepad no-gutters'>
                <div className='col'>
                    <div className='row no-gutters top-section'>
                        <h1 className='plan-head mt-5'>
                            <div>Schedule Smarter</div>
                            <div>Plan Ahead</div>
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Header;
