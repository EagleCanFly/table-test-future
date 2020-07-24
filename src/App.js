import React from 'react';
import s from './App.module.css';
import TableContainer from "./components/Table/TableContainer.jsx";


function App() {
    return (
        <div className={s.app}>
            <div className={s.container}>
                <TableContainer/>

            </div>
        </div>
    );
}

export default App;
