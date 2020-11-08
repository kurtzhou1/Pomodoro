export interface input{
    text: string
}

export interface todos{
    id: number,
    toDoList: string,
    isDone: boolean,
}

export interface IState{
    input: input,
    todos: todos[],
    value: number,
    hasDoneItem:string[],
}