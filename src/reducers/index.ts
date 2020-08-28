import {CHANGE_TEXT,ADD_TODOLIST,DONE_TODOLIST,REMOVE_TODOLIST} from '../constant'
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
      workTime: 25,
      breakTime: 5,
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
            const tmp_add_toDoList = state.todos.map(item=>item)
            const todoLength = tmp_add_toDoList.length
            tmp_add_toDoList.push({id:todoLength,toDoList:action.payload.addEvent,isDone: false})
            return {...state,todos:tmp_add_toDoList}
        case DONE_TODOLIST:
            const tmp_done_toDoList = state.todos.map(item=>item)
            tmp_done_toDoList[action.payload.finishEvent].isDone = !tmp_done_toDoList[action.payload.finishEvent].isDone
            console.log('id=>>',action.payload.finishEvent)
            return {...state,todos:tmp_done_toDoList}
        case REMOVE_TODOLIST:
            const tmp_remove_toDoList = state.todos.map(item=>item)
            tmp_remove_toDoList.splice(action.payload.removeEvent,1)
            for (let i=0; i<tmp_remove_toDoList.length;i++){
                tmp_remove_toDoList[i].id = i
            }
            return {...state,todos:tmp_remove_toDoList}
        default:
            return state
    }
}