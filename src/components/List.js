import React, { useState } from "react";
import raw from "raw.macro";
// import Pinned from "./Pinned";
import thumbTack from "../images/thumbtack.png"
import thumbTackW from "../images/thumbtack-w.png"
import "./List.css";

const List = () => {
  const content = raw(`../data/aliases3.txt`);
  const listArr = content.split("¨¨");

  const listObj = listArr.map((e) => {
    const lineArr = e.split("^^");
    const [id, alias, command, isPinned] = lineArr;
    return { id, alias, command, isPinned };
  });

  const [list, setList] = useState(listObj);

  const togglePin = (id) => {
    setList((prevState) => {
      const lineToToggle = prevState.find((e) => e.id === id);
      console.log(prevState.indexOf(lineToToggle));
      const toggledLine = {
        ...lineToToggle,
        isPinned: lineToToggle.isPinned === "unpinned" ? "pinned" : "unpinned",
      };
      return prevState.map((e) => (e.id === id ? toggledLine : e));
    });
  };

  return (
    <>
      {/* {pinned && (
      <Pinned lines={pinned}/>
    )} */}
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
