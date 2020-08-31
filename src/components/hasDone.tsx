import React, { useState } from 'react'
import {useSelector} from 'react-redux'
import {IState} from '../libs/common'

const HasDone:React.FC = () => {

    const hasDoneItem = useSelector((state:IState)=>state.hasDoneItem)

    return(
        <div className='hasDone'>
            <div className='title'>已完成工作事項</div>
            <div className='hasDoneItem'>{hasDoneItem.map(item=><div>{item}</div>)}</div>
        </div>
    )
}

export default HasDone