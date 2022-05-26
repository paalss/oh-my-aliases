import React from "react";
import thumbTackW from "../images/thumbtack-w.png";

const Pinned = ({ items }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>Alias</td>
            <td>Command</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {items.map((e) => {
            const {id, alias, command, isPinned} = e
            return (
              <tr key={id}>
                <td>{alias}</td>
                <td>{command}</td>
                <td className="hasButton">
                  {/* <button onClick={() => togglePin(id)}> */}
                      <img width="20px" src={thumbTackW} alt="thumbtack" />
                  {/* </button> */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Pinned;
