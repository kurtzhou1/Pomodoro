import React, { useState } from 'react';
import ToDoList from './ToDoList'
import Clock from './clock'
import './styles/comon.scss'
import { MenuFoldOutlined, PlusSquareOutlined } from '@ant-design/icons';

const Containers:React.FC = () => {

    const [leftVisible,setLeftVisible]= useState<boolean>(false)
    // const [percentage, setPercentage] = useState<number>(100); // 圓的圓周

    return (
        <div className='timer_module'>
            <Clock />
            <div className={`leftVisible ${leftVisible ? "show":""}`}>
                <ToDoList />
            </div>
            <div className='bottomIconWrap'>
                <div onClick={()=>setLeftVisible(!leftVisible)}><PlusSquareOutlined /></div>
                <div><MenuFoldOutlined /></div>
            </div>
        </div>
    )
}

export default Containers
