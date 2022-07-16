import logo from'./logo.png';
import {useState,useEffect} from 'react';

const Todo=()=>{
    
    const getLocalItmes = () => {
    let list = localStorage.getItem('lists');
    console.log(list);

    if (list) {return JSON.parse(localStorage.getItem('lists'));} 
    else { return []; }
    }

    const [inputData,setInputData]=useState('');
    const [items,setItems]= useState(getLocalItmes());
    const [toggleSubmit,setToggleSubmit]=useState(true);
    const [isEditItem,setIsEditItem]=useState();
    
    useEffect(()=>{
        localStorage.setItem('lists',JSON.stringify(items))
    },[items]);

    const addItem=()=>{
       if(!inputData){}
       else if(toggleSubmit)
       {
        const data={id:new Date().getTime().toString(),name:inputData}
        setItems([...items,data]);
        setInputData('');
       }
       else{
        setItems(items.map((val)=>{ 
            if(val.id!==isEditItem)return val;
            return {...val,name:inputData};
        }));
        setInputData('');
        setToggleSubmit(true);
        setIsEditItem(null);
       }
    }
    
    const removeAll=()=>{setItems([])}

    const editItem=(id)=>{
      let item=items.find((val)=>{return val.id===id});
      setToggleSubmit(false);
      setInputData(item.name);
      setIsEditItem(id);
    }

    const deleteItem=(key)=>{
       setItems(items.filter((val)=>{return key!==val.id;}));
    }



    return <>
     <div className="main-div">
         <div className="child-div">
            <figure>
            <img src={logo} alt="logo"/>
            <figcaption>Add Your List here</figcaption>
            </figure>
            <div className="addItems">
                <input type="text" value={inputData} onChange={(e)=>setInputData(e.target.value)}placeholder="Add Items..."/>
               {toggleSubmit?<i className="fa fa-plus add-btn" title="Add Item" onClick={addItem}></i>:<i className="fa fa-edit add-btn" title="Edit Item" onClick={addItem}></i>}
            </div>
            <div className="showItems">
                {items.map((val)=>{
                    return <div key={val.id} className="eachItem">
                    <h3>{val.name}</h3>
                    <div className='todo-btn'>
                       <i className="fa fa-edit add-btn" title="Edit Item" onClick={()=>{editItem(val.id)}}></i>
                       <i className="fa fa-trash add-btn" title="Delete Item" onClick={()=>{deleteItem(val.id)}}></i>
                    </div>
                    </div>})}
            </div>
            <div className="showItems">
                <button className="btn effect04" data-sm-link-text="REMOVE ALL" onClick={removeAll}><span>CHECK LIST</span></button>
            </div>
         </div>
     </div>
    </>;
}

export default Todo;