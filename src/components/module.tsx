import React, { useState } from 'react';
import ToDoList from './ToDoList'
import Clock from './clock'
import './styles/comon.scss'
import { MenuFoldOutlined, PlusSquareOutlined } from '@ant-design/icons';
import HasDone from './hasDone';

const Containers:React.FC = () => {

    const [leftVisible,setLeftVisible]= useState<boolean>(false)
    const [rightVisible,setRightVisible]= useState<boolean>(false)

    // const [percentage, setPercentage] = useState<number>(100); // 圓的圓周

    return (
        <div className='timer_module'>
            <Clock />
            <div className={`leftVisible ${leftVisible ? "show":""}`}>
                <ToDoList />
            </div>
            <div className={`rightVisible ${rightVisible ? 'show':''}`}>
                <HasDone />
            </div>
            <div className='bottomIconWrap'>
                <div onClick={()=>setLeftVisible(!leftVisible)}><PlusSquareOutlined /></div>
                <div onClick={()=>setRightVisible(!rightVisible)}><MenuFoldOutlined /></div>
            </div>
        </div>
    )
}

export default Containers
