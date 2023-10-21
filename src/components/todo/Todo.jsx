import React from 'react'
import './todo.css'
import { useState, useEffect } from 'react'

const Todo = () => {
    const [inputValue, setInputValue] = useState('')
    const [editIndex, setEditIndex] = useState("")
    const [editIcon, setEditIcon] = useState(false)
    const [todoList, setTodoList] = useState([])
    
    // Load stored items from local storage when the component mounts
    useEffect(() => {
        const storedObjectString = localStorage.getItem('mytodo');
        if (storedObjectString) {
            try {
                const retrievedObject = JSON.parse(storedObjectString);
                setTodoList(retrievedObject);
            } catch (error) {
                console.error('Error parsing stored object:', error);
            }
        }
    }, []); // Empty dependency array to run only once when the component mounts
    
    // add todo 
    const addItem = ()=>{
        // if item is already exist then update the corresponding entry
        if (editIndex && todoList) {
            const updatedList = todoList.map((curElem) => {
                if (curElem.id === editIndex) {
                    return { ...curElem, name: inputValue };
                } else {
                    return curElem;
                }
            });
            setTodoList(updatedList);
            setEditIndex("");
            setEditIcon(false);
        }else{
            // if item isn't exist then create new element
            const newItem = {
                id: new Date().getTime().toString(),
                name: inputValue
            }
            let newTodoList = todoList
            newTodoList.push(newItem)
            setTodoList(newTodoList);
        }

        setInputValue(''); // Reset the input field

        // Store the string in localStorage under a specific key
        localStorage.setItem('mytodo', JSON.stringify(todoList));
    }

    const deleteTodo = (id) => {
        const newList = todoList.filter((curElem) => {
            return curElem.id !== id;
        });
    
        // Update the state with the filtered array
        setTodoList(newList);

        // Store the string in localStorage under a specific key
        localStorage.setItem('mytodo', JSON.stringify(newList));
    }

    // edit todo
    const editTodo = (id) =>{
        todoList.forEach((curElem)=>{
            if(curElem.id == id){
                setInputValue(curElem.name);
                setEditIndex(id);
                setEditIcon(true)
                return;
            }
        })
    }
    
  return (
    <>
        <section className="section-todo">
            <div className="todo-container">
                <div className="todo-figure">
                    <figure>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                        </svg>
                    </figure>
                    <figcaption>My TODO List</figcaption>
                </div>
                <div className="todo-input">
                    <input type="text" placeholder='✍ Enter todo..' value={inputValue} onChange={(event)=>{setInputValue(event.target.value)}}/>
                    <button type='submit' onClick={addItem}>
                        {
                            editIcon ? 
                            (
                                <svg style={{width: '50%', color: 'blue'}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                            ):
                            (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            )
                        }
                    </button>
                </div>
                <div className='todo-item-container'>
                {
                    todoList.length > 0 && (
                        todoList.map((curElem, index) => (
                            <div className="todo-body" key={index}>
                                <div className="todo-body--text">{curElem.name}</div>
                                <div className="todo-body--action">
                                    <span className="edit-todo" onClick={()=>{editTodo(curElem.id)}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>
                                    </span>
                                    <span className="delete-todo" onClick={()=>{deleteTodo(curElem.id)}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        ))
                    )
                }
                </div>

                <button className="remove-all">Checked todo</button>
            </div>
        </section>
    </>
  )
}

export default Todo