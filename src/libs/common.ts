export interface input{
    text: string
}

export interface todos{
    id: number,
    toDoList: string,
    isDone: boolean,
}

export interface time{
    workTime: number,
    breakTime: number,
}

export interface button{
    isPause: boolean,
    isReset: boolean,
}

export interface IState{
    input: input,
    todos: todos[],
    time: time,
    value: number,
    button: button,
}