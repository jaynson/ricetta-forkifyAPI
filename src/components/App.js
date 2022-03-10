import React from 'react';
import HeaderView from './HeaderView';
import MainView from './MainView';

const App = () => {
    return (
        <div className='container'>
            <HeaderView />
            <MainView />
        </div>
    );
};

export default App;