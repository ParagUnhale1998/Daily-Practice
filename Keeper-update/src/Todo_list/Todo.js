import React, { useState } from 'react'
import TodoItem from './TodoItem';
import InputArea from './InputArea';

export default function Todo() {
    const [inputText,setInputText]= useState("")
    const [itmes,setItmes]= useState([])

    function handleChange(event){
        const newValue = event.target.value;
        setInputText(newValue);
    }

    function addItem(){
        setItmes((prevItem)=>{
        return [...prevItem,inputText]
        });
        setInputText('')
    }
    
    function deleteItem(id){
      setItmes((prevItem)=>{
      return prevItem.filter((item,index)=>{
        return index !== id
        //  if (index === id){
        //     return  item.remove()
        //     }
        })
        
      })
    }
  return (
    <div className='container'>
        <div className="heading">
            <h1>To-do List</h1>
        </div>
        {/* <InputArea onAdd={addItem}/> */}
        <div action="" className="form">
            <input onChange={handleChange} type="text" />
            <button onClick={addItem}>
            <span>Add</span>
            </button>
        </div>
        <div>
            <ul>
                {itmes.map((todoitem, index )=> {
                    // <TodoItem text={todoitem}/>
                    <TodoItem key={index} id={index} text={todoitem}  onChecked={deleteItem}/>
                })}
            </ul>
        </div>
    </div>
  )
}
