import Head from 'next/head';

import styles from '../styles/Header.module.scss';

const Header = () => (
    <div className={styles.topSec}>
        <div className={styles.container}>
            <div className={styles.topBar}>
                <div className={styles.Col}>
                    <div className='row no-gutters top-section'>
                        <h1 className={styles.planHead}>
                            <div>Schedule Smarter</div>
                            <div>Plan Ahead</div>
                        </h1>
                    </div>
                    <div className='row no-gutters top-section'>
                        <div className='plan-subhead'></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Header;
