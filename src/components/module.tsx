import React from 'react';
import ToDoList from './ToDoList'
import Clock from './clock'
import './styles/comon.scss'

const containers:React.FC = () => {
    return (
        <div className='timer_module'>
            <ToDoList />
            <Clock />
        </div>
    )
}

export default containers