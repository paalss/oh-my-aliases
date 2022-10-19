import { useState } from "react";
import "./App.css";
import List from "./components/List";
import PinnedList from "./components/List";
import raw from "raw.macro";

function App() {
  const content = raw(`./data/aliases3.txt`);
  const listArr = content.split("¨¨");

  const listOfObjs = listArr.map((e) => {
    const itemArr = e.split("^^");
    const [id, alias, command, isPinned] = itemArr;
    let isPinnedCheckLocalStorage = isPinned;
    if (localStorage.getItem(id)) {
      isPinnedCheckLocalStorage = "pinned";
    }
    // console.log({ id, alias, command, isPinnedCheckLocalStorage });
    return { id, alias, command, isPinned: isPinnedCheckLocalStorage };
  });

  const [items, setItems] = useState(listOfObjs);

  const togglePinHandler = (id) => {
    const itemToToggle = items.find((e) => e.id === id);
    const newIsPinned =
      itemToToggle.isPinned === "unpinned" ? "pinned" : "unpinned";
    // save choice
    if (newIsPinned === "pinned") {
      localStorage.setItem(id, id);
    } else {
      localStorage.removeItem(id);
    }
    const newItem = {
      ...itemToToggle,
      isPinned: newIsPinned,
    };
    setItems((prevState) => prevState.map((e) => (e.id === id ? newItem : e)));
  };

  const pinnedItems = items.filter((e) => e.isPinned === "pinned");

  return (
    <div className="App">
      <h1>Oh My Bash / Zsh Aliases</h1>
      <main>
        {pinnedItems.length > 0 && (
          <>
            <h2>Pinned items</h2>
            <PinnedList list={pinnedItems} onTogglePin={togglePinHandler} />
          </>
        )}
        {pinnedItems.length > 0 && <h2>All items</h2>}
        <List list={items} onTogglePin={togglePinHandler} />
      </main>
    </div>
  );
}

export default App;
