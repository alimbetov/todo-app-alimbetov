import './App.css';
import Button from './components/Button.jsx';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Action from './components/Action.jsx';
import DelButton from './components/Delete.jsx';

function App() {

  const aTitle = ['Task To-Do', 'Task to Done', 'Task Archive'];
  const moveActionTitle = ['Mark as To-Do', 'Mark as Done', 'Mark as Archive'];
  const myButton1 = { id: 0, isActive: false, title: "To Do" };
  const myButton2 = { id: 1, isActive: false, title: "Done" };
  const myButton3 = { id: 2, isActive: false, title: "Archived" };

  const [position, setPosition] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalInputValue, setModalInputValue] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalError, setModalError] = useState('');
  const [buttonList, setButtonList] = useState([myButton1, myButton2, myButton3]);
  const [actions, setActions] = useState([]);

 

  useEffect(() => {
    setPosition(1);
    setActions([]);
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
    setModalTitle(aTitle[position]);
    setModalError('');
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalInputValue(''); // Reset input value
  };

  const saveModalData = () => {
    if (modalInputValue.length <= 2) {
      setModalError('Action text too small');
    } else {
      console.log(modalInputValue);
      const data = { id: actions.length + 1, position: position, jobTitle: modalInputValue };
      setActions(prevActions => [...prevActions, data]);
      closeModal();
    }
  };

  const handleClick = (e) => {
    setButtonList(prevButtonList => 
      prevButtonList.map(item => ({ ...item, isActive: item.id === e.id }))
    );
    setPosition(e.id);
  };



  const updateActionItem = (id, updatedData) => {
    return actions.map(action => 
      action.id === id ? { ...action, ...updatedData } : action
    );
  };

 const deleteActionItem = (id) => {
    const updatedActions = actions.filter(action => action.id !== id);
    setActions(updatedActions);
  };

  const actionHandleClickToBack = (action) => {
    const updatedActions = updateActionItem(action.id, { position: action.position - 1 });
    setActions(updatedActions);
  };

  const actionHandleClickToForward = (action) => {
    const updatedActions = updateActionItem(action.id, { position: action.position + 1 });
    setActions(updatedActions);
  };

  return (
    <div className="app-header">
      <h1>To Do Project</h1>
      <div  className="app-devider" > </div>
      <div className="flex-container">
        {buttonList.map((buttonData) => (
          <div key={buttonData.id}>
            <Button myButton={buttonData} onClick={() => handleClick(buttonData)} />
          </div>
        ))}
      </div>
      <div  className="app-devider" > </div>
      <div>
        <button onClick={openModal} class="myAddButton" >➕ {aTitle[position]}</button>

        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
          <div className="myTask">
            <h2>{modalTitle}</h2>
            <p>{modalError}</p>
            <input className="myInputTex"
              type="text"
              value={modalInputValue}
              onChange={(e) => setModalInputValue(e.target.value)}
            />
          
            <button onClick={saveModalData}>Save</button>
            <button onClick={closeModal}>Close</button>
          </div>
        </Modal>
      </div>
      <div  className="app-devider" > </div>
      <div className="flex-container">
        {actions
          .filter(action => action.position === position)
          .map((action) => (
            <div className="action-row" key={action.id}>
              {position !== 0 && (
                <Action
                  i={action}
                  title={moveActionTitle[position - 1]}
                  direction={false}
                  onClick={() => actionHandleClickToBack(action)}
                />
              )}
              <p className="myTask">{action.jobTitle}</p>
              {position !== 2 && (
                <Action
                  i={action}
                  title={moveActionTitle[position + 1]}
                  direction={true}
                  onClick={() => actionHandleClickToForward(action)}
                />
              )}
              <DelButton i={action} onClick={() =>  deleteActionItem(action.id)} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
