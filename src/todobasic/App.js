import {useState} from 'react';
import List from './list';

const App=()=> {
  const [inputList,setInputList]=useState('');
  const [items,setItems]=useState([]);

  const itemEvent=(event)=>{
    setInputList(event.target.value);
  }
  const additems=()=>{
    setItems([
      ...items,
      inputList]
    );
    setInputList("");
  }

  const deleteitem=(id)=>{
    setItems(
      items.filter((val,i) => {return i!==id})
  )}

  return (
    <div className="main_div">
      <div className="center_div">
        <br/>
         <h1>ToDo List</h1>
        <br/>
        <input type="text" placeholder="Add Items" onChange={itemEvent} value={inputList}/>
        <button onClick={additems}>+</button>
        <ol>
          {items.map( (val,i) => { return <List key={i} id={i} text={val} onSelect={deleteitem}/> })}
        </ol>
      </div>      
    </div>
  );
}

export default App;
