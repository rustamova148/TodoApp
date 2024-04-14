import React, { useEffect, useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import Todo from "./Todo";
const LOCAL_STORAGE_KEY = "react-todo-list-todos";

const App = () => {
  const [mode,setMode]=useState(localStorage.getItem("mode"));
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState({
    id: "",
    task: "",
    completed: false,
  });

  console.log(items);

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storageTodos) {
      setItems(storageTodos); //? localstorage-de qalir amma refresh edende gedir
    }
    
    if(localStorage.getItem("mode") === null){
      setMode("light");
      localStorage.setItem("mode","light");
    }
    document.body.className = localStorage.getItem("mode");

  }, []); 

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const changeMode = () => {
   if(mode ==="light"){
    setMode("dark");
   }else{
    setMode("light"); 
   }
   localStorage.setItem("mode",mode);
   document.body.className = localStorage.getItem("mode");
  }

  const handleInputChange = (e) => {
    setInputValue({ ...inputValue, task: e.target.value });
  };
  const addInputValue = (inputValue) => {
    setItems([...items, inputValue]);
  };

  const deleteInputValue = (id) => {
    setItems((items) => items.filter((inputValue) => inputValue.id !== id));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();  
    if (inputValue.task.trim()) {
      addInputValue({ ...inputValue, id: uuidv4() });
      setInputValue({ ...inputValue, task: "" });
    }
  };

  const toggleComplete = (id) => {
    setItems(
      items.map((inputValue) => {
        if (inputValue.id === id) {
          return {
            ...inputValue,
            completed: !inputValue.completed,
          };
        }
        return inputValue;
      })
    );
  };

  const handleCheckboxClick = (id) => {
    toggleComplete(id);
  };

  const handleDelete = (id) => {
    deleteInputValue(id);
  };

  const handleDeletecompleted = () => {
    setItems((items) =>
      items.filter((inputValue) => inputValue.completed === false)
    );
  };

  const handleAll = () => {
    setItems((items) => items.map((inputValue) => inputValue));
  };
  const handleActive = () => {
    setItems((items) =>
      items.filter((inputValue) => inputValue.completed === false)
    );
  };
  const handleCompleted = () => {
    setItems((items) =>
      items.filter((inputValue) => inputValue.completed === true)
    );
  };
  return (
    <div>
    <div className="space">
      <div className="background">
        <div className="todo-header">
          <span>TODO</span>

          <button id="modeBtn" type="click" onClick={changeMode}>
          {localStorage.getItem("mode")==="light" ? 
            <span>
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M15.3717 0.215831C10.5931 1.19962 7 5.4302 7 10.5C7 16.299 11.701 21 17.5 21C20.4958 21 23.1986 19.7454 25.1116 17.7328C23.2191 22.5722 18.5098 26 13 26C5.8203 26 0 20.1797 0 13C0 5.8203 5.8203 0 13 0C13.81 0 14.6027 0.0740788 15.3717 0.215831Z" fill="white"/>
              </svg>
            </span>
          :
            <span>
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1C12 0.447715 12.4477 0 13 0C13.5523 0 14 0.447715 14 1V4C14 4.55228 13.5523 5 13 5C12.4477 5 12 4.55228 12 4V1ZM18 13C18 15.7614 15.7614 18 13 18C10.2386 18 8 15.7614 8 13C8 10.2386 10.2386 8 13 8C15.7614 8 18 10.2386 18 13ZM13 21C12.4477 21 12 21.4477 12 22V25C12 25.5523 12.4477 26 13 26C13.5523 26 14 25.5523 14 25V22C14 21.4477 13.5523 21 13 21ZM25 12C25.5523 12 26 12.4477 26 13C26 13.5523 25.5523 14 25 14H22C21.4477 14 21 13.5523 21 13C21 12.4477 21.4477 12 22 12H25ZM5 13C5 12.4477 4.55228 12 4 12H1C0.447715 12 0 12.4477 0 13C0 13.5523 0.447715 14 1 14H4C4.55228 14 5 13.5523 5 13ZM20.7782 3.80761C21.1687 3.41709 21.8019 3.41709 22.1924 3.80761C22.5829 4.19814 22.5829 4.8313 22.1924 5.22183L20.0711 7.34315C19.6805 7.73367 19.0474 7.73367 18.6569 7.34315C18.2663 6.95262 18.2663 6.31946 18.6569 5.92893L20.7782 3.80761ZM7.34315 18.6569C6.95262 18.2663 6.31946 18.2663 5.92893 18.6569L3.80761 20.7782C3.41709 21.1687 3.41709 21.8019 3.80761 22.1924C4.19814 22.5829 4.8313 22.5829 5.22183 22.1924L7.34315 20.0711C7.73367 19.6805 7.73367 19.0474 7.34315 18.6569ZM22.1924 20.7782C22.5829 21.1687 22.5829 21.8019 22.1924 22.1924C21.8019 22.5829 21.1687 22.5829 20.7782 22.1924L18.6569 20.0711C18.2663 19.6805 18.2663 19.0474 18.6569 18.6569C19.0474 18.2663 19.6805 18.2663 20.0711 18.6569L22.1924 20.7782ZM7.34315 7.34315C7.73367 6.95262 7.73367 6.31946 7.34315 5.92893L5.22183 3.80761C4.8313 3.41709 4.19814 3.41709 3.80761 3.80761C3.41709 4.19814 3.41709 4.8313 3.80761 5.22183L5.92893 7.34315C6.31946 7.73367 6.95262 7.73367 7.34315 7.34315Z" fill="white"/>
              </svg>
            </span>
          }
          </button>
          
        </div>
      </div>
      <div className="todo-box">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="task"
            className="task-input"
            value={inputValue.task}
            placeholder="Create a new todo..."
            onChange={handleInputChange}
          />
          {/* <button type="submit" className="sub-btn">+</button> */}
        </form>
        {items.map((inputValue, id) => (
          <Todo
            inputValue={inputValue}
            handleCheckboxClick={handleCheckboxClick}
            handleDelete={handleDelete}
            key={id}
          />
        ))}
        <li className="app-li">
        <span>{items.length} items left</span>
        <div className="bottom-btns">
        <div className="bottom-btns1">
        <button onClick={() => handleAll(inputValue.completed)}>All</button>
        <button onClick={() => handleActive(inputValue.completed)}>
          Active
        </button>
        <button onClick={() => handleCompleted(inputValue.completed)}>
          Completed
        </button>
        </div>
        <button onClick={() => handleDeletecompleted(inputValue.completed)}>
          Clear Completed
        </button>
        </div>
        </li>
      </div>
      </div>
    </div>
  );
};

export default App;

//? App.css-de en sonda responsivlik hissede left:0 verdiyim halda todo-box yerin deyismir ve .background ve .space-e 100% width,100vh height verende mobilde de hemin ölçünü almali deyil?