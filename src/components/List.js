import React from "react";
import raw from "raw.macro";

const List = () => {
  const content = raw(`../data/aliases3.txt`);
  const listArr = content.split("¨¨");
  return (
    <>
      <table>
        <thead>
          <tr>
            <td>Alias</td>
            <td>Command</td>
          </tr>
        </thead>
        <tbody>
          {listArr.map((e) => {
            const lineArr = e.split("^^");
            return (
              <tr key={lineArr[0]}>
                <td>{lineArr[0]}</td>
                <td>{lineArr[1]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default List;
