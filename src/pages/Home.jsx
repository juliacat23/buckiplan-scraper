import React from 'react';

class Home extends React.Component {
    render() {
        return (
            <React.Fragment>
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
                                <div className='row no-gutters top-section'>
                                    <div className='plan-subhead'>
                                        <div>
                                            Introducting the newest and easiest
                                        </div>
                                        <div>way to plan courses at OSU</div>
                                    </div>
                                </div>
                                <div className='row justify-content-center'>
                                    <div className='col top-section'>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Home;
