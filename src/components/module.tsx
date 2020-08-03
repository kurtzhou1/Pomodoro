import React from 'react';
import ToDoList from './ToDoList'
import Clock from './clock'

const containers:React.FC = () => {
    return (
        <>
            <ToDoList />
            <Clock />
        </>
    )
}

export default containers