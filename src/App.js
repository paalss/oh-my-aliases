import { useState } from 'react';
import './App.css';
import List from './components/List';
import PinnedList from './components/List';
import raw from "raw.macro";

function App() {
  const content = raw(`./data/aliases3.txt`);
  const listArr = content.split("¨¨");

  const listOfObjs = listArr.map((e) => {
    const itemArr = e.split("^^");
    const [id, alias, command, isPinned] = itemArr;
    return { id, alias, command, isPinned };
  });

  const [items, setItems] = useState(listOfObjs);

  const togglePinHandler = (id) => {
    setItems((prevState) => {
      const itemToToggle = prevState.find((e) => e.id === id);
      const toggleditem = {
        ...itemToToggle,
        isPinned: itemToToggle.isPinned === "unpinned" ? "pinned" : "unpinned",
      };
      return prevState.map((e) => (e.id === id ? toggleditem : e));
    });
  };

  const pinnedItems = items.filter((e) => e.isPinned === "pinned");

  return (
    <div className="App">
      <h1>Oh My Bash / Zsh Aliases</h1>
      <header className="App-header">
      {pinnedItems.length > 0 && (
        <PinnedList list={pinnedItems} onTogglePin={togglePinHandler}/>
      )}
        <List list={items} onTogglePin={togglePinHandler}/>
      </header>
    </div>
  );
}

export default App;
