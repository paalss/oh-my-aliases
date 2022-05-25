import React from 'react';

const List = () => {
  const showFile = (e)=>{
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = (e.target.result)
      console.log(text)
      alert(text)
    };
    reader.readAsText(e.target.files[0])
  }
  return (
    <div><input type="file" onChange={(e) => showFile(e)} /></div>
  )
}

export default List