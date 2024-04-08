import React, { useState, useEffect } from 'react'
import List from './Components/List'
import './App.css'


const getData = () => {
  const data = localStorage.getItem('datas')
  if (data) {
    return JSON.parse(data);
  }
  else {
    return [];
  }
}

const App = () => {
  // datas array of object
  const [datas, setdatas] = useState(getData());
  const [isFormOpen, setIsFormOpen] = useState(false);
  // input field states
  const [title, setTitle] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  //const [toggleSubmit, setToggleSubmit] = useState(false);
  const [editData, setEditData] = useState(null);

  const [count, setCount] = useState(datas.length);

  const submitHandler = (e) => {
    e.preventDefault();
    if (title) {
      setdatas(
        datas.map((data) => {
          if (data.id === editData) {
            return { ...data, title: setTitle, password: setPassword, address: setAddress}
          }
          return data;
        })
      )
      // if(setIsFormOpen == true){
      //   setIsFormOpen(false)
      // }
      setTitle('')
      setPassword('')
      setAddress('')
      setEditData(null);
    }


    let val = {
      id: Math.random().toString(),
      title,
      password,
      address
    }
    setdatas([...datas, val,])
    setCount(count + 1);
    setTitle('');
    setPassword('');
    setAddress('');
    setIsFormOpen(false)
  }

  function handleDelete(id) {
    const filteredDatas = datas.filter((Element) => {
      return Element.id !== id;
    })
    setdatas(filteredDatas);
    setCount(count - 1);
  }

  const handleEdit = (id) => {
    const editDatas = datas.find((i) => i.id === id);
    //setToggleSubmit(true);
    setTitle(editDatas.title)
    setPassword(editDatas.password)
    setAddress(editDatas.address)
    setEditData(id);
    handleDelete(id);
    setIsFormOpen(true)
  }
  function closeHandler(e){
    setTitle('');
    setPassword('');
    setAddress('');
    setIsFormOpen(false)
  }

  useEffect(() => {
    localStorage.setItem('datas', JSON.stringify(datas));
  }, [datas])


  return (
    <div className='container'>
      <h1 className='title'>Student Manager</h1>
      <p className='title'> All Student count:-{count}</p>
      <button onClick={(e) => { setIsFormOpen(true) }}> Add Student</button>
      {isFormOpen && <div>
        <form className='container' onSubmit={submitHandler}>
          <label htmlFor="name">Name:-</label>
          <input type="text" id="name" onChange={(e) => setTitle(e.target.value)} value={title} />

          <label htmlFor="password">Mobile:-</label>
          <input type="number" id="password" onChange={(e) => setPassword(e.target.value)} value={password} />&ensp;

          <label htmlFor="address">Address:-</label>
          <input type="text" id="address" onChange={(e) => setAddress(e.target.value)} value={address} />&ensp;

          <button type="submit">Submit</button>&ensp;
          <button type="reset" onClick={closeHandler}>Close</button>
        </form>
      </div>
      }
      <br/>
      <List datas={datas} handleDelete={handleDelete} handleEdit={handleEdit} />
    </div>
  );
}

export default App;
