import {CHANGE_TEXT,ADD_TODOLIST,DONE_TODOLIST,REMOVE_TODOLIST,SELECT_RADIO_VALUE,HAS_DONE_ITEM} from '../constant'
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
      workTime: 0.5,
      breakTime: 0.5,
    },
    value: 0,
    hasDoneItem: []
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
            return {...state,todos:tmp_done_toDoList}
        case REMOVE_TODOLIST:
            const remove_Finish_Todo = state.todos.map(item=>item)
            const index = state.todos.find((todo) => {
                return todo.id === action.payload.removeId
            });
            if (index)
            remove_Finish_Todo.splice(index.id, 1);
            for (var i = 0; i < remove_Finish_Todo.length; i++) {
                remove_Finish_Todo[i].id = i;
            }
            return {...state, todos:remove_Finish_Todo}
        case SELECT_RADIO_VALUE:
            return {...state,value:action.payload.radioValue}
        case HAS_DONE_ITEM:
            const tmp_add_doneItem = state.hasDoneItem.map(item=>item)
            tmp_add_doneItem.push(action.payload.addItem)
            return {...state,hasDoneItem:tmp_add_doneItem}
        default:
            return state
    }
}