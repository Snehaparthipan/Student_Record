import { useEffect, useState } from 'react'
import axios from "axios"

function App() {
  const [form, setForm] = useState({
    name: "",
    grade: "",
    subject: ""
  })
  const [data, setData] = useState([])

  const [refresh, setRefresh] = useState(false)

  const [editid, setId] = useState("")
  const [popup, setPopup] = useState(false)

  useEffect(() => {
    Getuser()
  }, [refresh])

  function handlechange(e) {
    setForm({
      ...form, [e.target.name]: e.target.value
    })
  }
  
  async function Postuser() {
    try {
      const res = await axios.post("http://localhost:5000/api/users", form)
      alert("user send")
      setForm({ name: "", grade: "", subject: ""})
      setRefresh(!refresh)
    }
    catch (error) {
      console.log(error)
    }

  }
  async function Getuser() {
    try {
      const res = await axios.get("http://localhost:5000/api/all",form)
      setData(res.data.data)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  async function Deleteuser(id) {
    try {
      const res = await axios.delete(`http://localhost:5000/api/del/${id}`)
      setRefresh(!refresh)
      alert("user deleted")
    } catch (error) {
      console.log(error)
    }
  }
  function handleedit(val) {
    setForm({
      name: val.name,
      grade: val.grade,
      subject: val.subject
    })
    setId(val._id)
    setPopup(true)
  }
  async function Edituser() {
    try {
      const res = await axios.put(`http://localhost:5000/api/new/${editid}`, form)
      setForm({ name: "", grade: "", subject: "" })
      setRefresh(!refresh)
      setPopup(false)
      
    } catch (error) {
      console.log(error)
    }

  }
  async function Canceluser(){
    try {
      setPopup(false)
      setForm({ name: "", grade: "", subject: ""  })
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
    <div className='div'>
      <h1>🎓 Student Management System</h1>
<p className="subtitle">Add, Edit & Manage Student Records</p>

      <input type="text" name='name' value={form.name} placeholder='Enter Student Name' onChange={handlechange} />
      <input type="text" name='grade' value={form.grade} placeholder='Enter Grade' onChange={handlechange} />
      <input type="text" name='subject' value={form.subject} placeholder='Enter Subject' onChange={handlechange} />
      <button onClick={() => Postuser()}>Save</button>

      <table  cellSpacing={0} cellPadding={20}>
        <th>Name</th>
        <th>grade</th>
        <th>subject</th>

        <th colSpan={2}>Actions</th>
        <th>time</th>
        <th>Date</th>

        {
          data.map((val) => {
            return <tr key={val._id} className='trow'>
              <td>{val.name}</td>
              <td>{val.grade}</td>
              <td>{val.subject}</td>
              <td><button onClick={() => handleedit(val)}>Edit</button></td>
              <td><button onClick={() => Deleteuser(val._id)}>Delete</button></td>
              <td>{new Date(val?.updatedAt).toLocaleTimeString()}</td>
              <td>{new Date(val?.updatedAt).toDateString()}</td>
            </tr>

          })
        }
      </table>

      {
        popup && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h3>Edit User</h3>

              <input type="text" name='name' value={form.name} placeholder='Enter Employee Name' onChange={handlechange} />
              <input type="text" name='grade' value={form.grade} placeholder='Enter Employee Email' onChange={handlechange} />
              <input type="text" name='subject' value={form.subject} placeholder='Enter Employee Name' onChange={handlechange} />
              

              <button onClick={() => Edituser()}>Edit</button>
              <button onClick={() => Canceluser()}>cancel</button></div>
          </div>
        )
      }
      </div>
    </>
  )
}

export default App;
