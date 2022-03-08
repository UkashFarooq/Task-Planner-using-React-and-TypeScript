import * as React from 'react';
import { isDate } from 'util';
import './App.css';
import InputFeild from './components/InputFeild';
import { Todo } from './components/model';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult} from 'react-beautiful-dnd';
// let name : any;
// let age : number | string;
// let isStudent: boolean;
// let hobbies: string[];
// let role : [number,string];

// let personName : unknown;
//  we can use any or unknown if we don't know the data type of the variable but unknown is better to use.
// let printName : (name:string) => never;
// function definition
// void returns undefined but never doesnt return anything.

// type Person = {
// name: string,
// age: number
// };

// let person : Person = {
// name:'Uche',
// age: 27
// };

// let lotsOfPeople : Person[];

// type X = {
//   a : string,
//   b: number,
// };

// type Y = X & {
//   c : string,
//   d: number,
// };

// let y : Y ={
//   c: 'Uche',
//   d : 25,
//   a : 'Ukash',
//   b: 12
// };
// this is how inheritance works in case of type.
// We have to define all the inherited variables or else it shows error.

// interface Person {
//   name: string;
//   age? : number;
//   }

// interface Guy extends Person {
//   profession : string;
// }
// this is how inheritance works in case of interface.
// we can inherit type for interface and vice versa by using the correct syntax.




const App: React.FC = () => {
  const [todo, setTodo] = React.useState<string>("");

  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = React.useState<Todo[]>([])

  const handleAdd = (e : React.FormEvent) => {
    e.preventDefault();
  if(todo) {
    setTodos([...todos,{id:Date.now(), todo,isDone:false}]);
    setTodo(""); 
  }
  };

  const onDragEnd= (result:DropResult) => {
    const {source,destination} = result;

    if (!destination) return;
    if(destination.droppableId ===source.droppableId &&
       destination.index=== source.index) return;
      
      
    let add, 
      active=todos,
      complete = completedTodos;
    
    

    if(source.droppableId==='TodosList'){
      add = active[source.index];
      active.splice(source.index, 1);
    } else{
      add = complete[source.index];
      complete.splice(source.index,1);
    };

    if(destination.droppableId==='TodosList'){
      active.splice(destination.index,0, add);
    } else{
      complete.splice(destination.index,0, add);

    };
    setCompletedTodos(complete);
    setTodos(active);
    };



  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <div className="App">
    <span className='heading'>Any-Do</span>
    <InputFeild todo ={todo} setTodo={setTodo} handleAdd= {handleAdd}/>
     <TodoList todos={todos} setTodos={setTodos}
     completedTodos={completedTodos}
     setCompletedTodos={setCompletedTodos}
     />
    

    </div>
    </DragDropContext>
  );
}

export default App;
