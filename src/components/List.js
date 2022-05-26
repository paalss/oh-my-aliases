import React, { useState } from "react";
import raw from "raw.macro";
import Pinned from "./Pinned";
import thumbTack from "../images/thumbtack.png";
import thumbTackW from "../images/thumbtack-w.png";
import "./List.css";

const List = () => {
  const content = raw(`../data/aliases3.txt`);
  const listArr = content.split("¨¨");

  const listOfObjs = listArr.map((e) => {
    const itemArr = e.split("^^");
    const [id, alias, command, isPinned] = itemArr;
    return { id, alias, command, isPinned };
  });

  const [list, setList] = useState(listOfObjs);

  // console.log(list);

  const togglePin = (id) => {
    setList((prevState) => {
      const itemToToggle = prevState.find((e) => e.id === id);
      const toggleditem = {
        ...itemToToggle,
        isPinned: itemToToggle.isPinned === "unpinned" ? "pinned" : "unpinned",
      };
      return prevState.map((e) => (e.id === id ? toggleditem : e));
    });
  };

  const pinnedItems = list.filter((e) => e.isPinned === "pinned");
  return (
    <>
      {pinnedItems.length > 0 && (
        <Pinned items={pinnedItems}/>
      )}
      <table>
        <thead>
          <tr>
            <td>Alias</td>
            <td>Command</td>
            <td>Pin</td>
          </tr>
        </thead>
        <tbody>
          {list.map((e) => {
            const { id, alias, command, isPinned } = e;
            return (
              <tr key={id} className={isPinned === "pinned" ? "pinned" : ""}>
                <td>{alias}</td>
                <td>{command}</td>
                <td className="hasButton">
                  <button onClick={() => togglePin(id)}>
                    {isPinned === "pinned" ? (
                      <img width="20px" src={thumbTackW} alt="thumbtack" />
                    ) : (
                      <img width="20px" src={thumbTack} alt="thumbtack" />
                    )}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default List;
