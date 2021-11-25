import React, { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";

// get local storage data, so when you refresh page data don't remove

const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

function Todo() {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEdititem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  //   function to add items
  const addItem = () => {
    if (!inputData) {
      alert("Please write something.");
    } else if (inputData && toggleButton) {
      setItems(
        items.map((ele) => {
          if (ele.id === isEdititem) {
            return { ...ele, name: inputData };
          }
          return ele;
        })
      );
      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      const myInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, myInputData]);
      setInputData("");
    }
  };

  // to edit items

  const editItem = (index) => {
    const itemToEdit = items.find((ele) => {
      return ele.id === index;
    });
    setInputData(itemToEdit.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  // function to delete items

  const deleteItem = (index) => {
    const updatedItems = items.filter((ele) => {
      return ele.id !== index;
    });
    setItems(updatedItems);
  };

  // function to remove all items on one click

  const removeAll = () => {
    setItems([]);
  };

  // adding local storage

  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo-list.png" alt="to-do-list" />
            <figcaption>Add your tasks here</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="Add Item"
              className="form-control"
              value={inputData}
              onChange={(event) => setInputData(event.target.value)}
            />
            {toggleButton ? (
              <FaEdit className="far fa-edit add-btn" onClick={addItem} />
            ) : (
              <FaPlus className="fa fa-plus add-btn" onClick={addItem} />
            )}
          </div>
          {/* show items here */}
          <div className="showItems">
            {items.map((ele) => {
              return (
                <div className="eachItem" key={ele.id}>
                  <h3>{ele.name}</h3>
                  <div className="todo-btn">
                    <FaEdit
                      className="far add-btn fa-edit"
                      onClick={() => editItem(ele.id)}
                    />
                    <FaTrashAlt
                      className="far add-btn fa-trash-alt"
                      onClick={() => deleteItem(ele.id)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          {/* remove all button */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>Check List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;
