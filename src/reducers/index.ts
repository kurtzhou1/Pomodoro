import {CHANGE_TEXT,ADD_TODOLIST,DONE_TODOLIST,TIME_START} from '../constant'
import {IState, todos} from '../libs/common'

export const initState:IState = {
    input:{
        text:'',
    },
    todos:[{
      id:0,
      toDoList: '範文測試',
      isDone: false,
    }],
    time:{
      workTime: 0.1,
      breakTime: 0.1,
    },
    button:{
      isPause: false,
      isReset: false,
    }
}

export const reducer = (state=initState , action:any):IState =>{
    switch(action.type){
        case CHANGE_TEXT:
            return {...state,input:{text:action.payload.input}}
        case ADD_TODOLIST:
            const tmp_add_toDoList = state.todos.splice(0)
            const todoLength = tmp_add_toDoList.length
            tmp_add_toDoList.push({id:todoLength,toDoList:action.payload.addEvent,isDone: false})
            return {...state,todos:tmp_add_toDoList}
        case DONE_TODOLIST:
            const tmp_done_toDoList = state.todos.splice(0)
            tmp_done_toDoList[action.payload.finishEvent].isDone = !tmp_done_toDoList[action.payload.finishEvent].isDone
            console.log('id=>>',action.payload.finishEvent)
            return {...state,todos:tmp_done_toDoList}
        default:
            return state
    }
}