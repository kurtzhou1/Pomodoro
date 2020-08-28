import React,{useState} from 'react';
import {IState} from '../libs/common';
import { useSelector, useDispatch } from 'react-redux';
import {CHANGE_TEXT,ADD_TODOLIST,DONE_TODOLIST,REMOVE_TODOLIST} from '../constant'
import { PlusOutlined } from '@ant-design/icons';
import './styles/comon.scss'
import styles from './styles/css.module.scss';

const ToDoList:React.FC = () => {

  const inputText = useSelector((state:IState) => state.input.text)
  const todoList = useSelector((state:IState) => state.todos)
  const dispatch = useDispatch()

  const changeText = (value:string) =>{
      dispatch({
        type: CHANGE_TEXT,
        payload: {input:value}
      })
  }

  const addEvent = () => {
      if(inputText.length > 0) {
          dispatch({
            type: ADD_TODOLIST,
            payload: {addEvent:inputText}
          })
      }
  }

  const removeEvent = (value:number) =>{
    dispatch({
      type:REMOVE_TODOLIST,
      payload: {removeEvent:value}
    })
  }

  const finishEvent = ((value:number)=>{
    dispatch({
      type:DONE_TODOLIST,
      payload:{finishEvent:value}
    })
  })

  return (
    <div className="Pomodoro_module">
      <input value={inputText} onChange={e=>changeText(e.target.value)} placeholder='type something and add'/>
      <div className='add' onClick={()=>addEvent()}>＋</div>
      <div className='item_wrap'>
        {todoList.map(data=>{
          return(
          <div className='item'>
              <div className='id'>{data.id}</div>
              <div className='toDoList'>{data.toDoList}</div>
              {/* <div onClick={()=>finishEvent(data.id)}>{data.isDone? '✔ 已完成':'✘ 未完成'}</div> */}
              <div className={styles.todo_list_cancel} onClick={()=>removeEvent(data.id)}>
                <PlusOutlined />
              </div>
          </div>
          )
        })}
      </div>
    </div>
  );
}

export default ToDoList;
