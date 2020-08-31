import React,{useState} from 'react';
import {IState,todos} from '../libs/common';
import { useSelector, useDispatch } from 'react-redux';
import {CHANGE_TEXT,ADD_TODOLIST,DONE_TODOLIST,REMOVE_TODOLIST,SELECT_RADIO_VALUE} from '../constant'
import { PlusOutlined } from '@ant-design/icons';
import './styles/comon.scss'
import styles from './styles/css.module.scss';

const ToDoList:React.FC = () => {

  const inputText = useSelector((state:IState) => state.input.text)
  const toDoList = useSelector((state:IState) => state.todos)
  const radioValue = useSelector((state:IState)=> state.value)
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
      type: REMOVE_TODOLIST,
      payload: { removeId:value },
    });
  }

  const selectRadioValue = (value:number) => {
    dispatch({
      type: SELECT_RADIO_VALUE,
      payload: { radioValue:value }
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
        {toDoList.map((data:todos)=>
          <div className='item'>
              <div className={`id ${radioValue === data.id ? 'show':''}`}><input name='item' type='radio' value={data.id} onChange={e=>selectRadioValue(parseInt(e.target.value))}/><span>{data.id}</span></div>
              <div className='toDoList'>{data.toDoList}</div>
              {/* <div onClick={()=>finishEvent(data.id)}>{data.isDone? '✔ 已完成':'✘ 未完成'}</div> */}
              <div className={styles.todo_list_cancel} onClick={()=>removeEvent(data.id)}>
                <PlusOutlined />
              </div>
          </div>
          )
        }
      </div>
    </div>
  );
}

export default ToDoList;
