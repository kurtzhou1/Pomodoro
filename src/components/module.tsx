import React from 'react';
import ToDoList from './ToDoList'
import Clock from './clock'
import './styles/comon.scss'
import { MenuFoldOutlined, PlusSquareOutlined } from '@ant-design/icons';

const containers:React.FC = () => {
    return (
        <div className='timer_module'>
            <Clock />
            <ToDoList />
            <div className='bottomIconWrap'>
                <div><PlusSquareOutlined /></div>
                <div><MenuFoldOutlined /></div>
            </div>
        </div>
    )
}

export default containers