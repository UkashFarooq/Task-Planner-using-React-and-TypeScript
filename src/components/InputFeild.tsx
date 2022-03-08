import React from 'react';
import './styles.css';

interface Props{
 todo: string;
 setTodo:  React.Dispatch<React.SetStateAction<string>>;
 handleAdd: (e: React.FormEvent) => void;
}

const InputFeild : React.FC<Props> =  ({todo,setTodo, handleAdd}) => {
    const inputref = React.useRef<HTMLInputElement>(null);


    return <form className='input' onSubmit={(e)=>{
        handleAdd(e);
        inputref.current?.blur();
        }}>
        <input
        ref= {inputref}
        type='input' 
        value={todo}
        onChange={
            (e)=> setTodo(e.target.value)
        }
        placeholder='Enter a task' className='input__box' />
        <button className='input_submit' type ='submit'>Go</button> 


    </form>;
}



export default InputFeild;