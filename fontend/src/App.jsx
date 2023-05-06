import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import Modal from "./component/Modal";
function App() {
  const [students, setStudents] = useState([]);
  const [result, setResult] = useState(null);
  const [student, setStudent] = useState({
    id: null,
    name: "",
    age: null,
  });
  const [isOpen, setIsOpen] = useState("false");
  function handleChange(event) {
    const { name, value } = event.target;
    setStudent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  useEffect(() => {
    axios.get("http://localhost:5000/students").then((res) => {
      console.log(res.data.rows);
      setStudents(res.data.rows);
    });
  }, [result]);
  function handleSubmit() {
    if (student.name || student.age == null) {
      toast.error("name and age required");
      return;
    }
    toast
      .promise(axios.post("http://localhost:5000/student", student), {
        success: "Add Success",
        error: "error",
        loading: "Saving",
      })
      .then((res) => {
        setStudent({
          name: "",
          age: "",
        });
        setResult(res.data);
      });
    console.log("add");
  }
  function handleDelete(id) {
    toast
      .promise(axios.delete("http://localhost:5000/student/" + id), {
        success: "Delete Success",
        error: "error",
        loading: "deleting",
      })
      .then((res) => {
        setResult(res.data);
      });
  }

  function handleEdit(id) {
    students.filter((item) => {
      if (item.student_id == id) {
        console.log(item.student_name);
        setStudent({
          id: item.student_id,
          name: item.student_name,
          age: item.student_age,
        });
      }
    });
  }

  return (
    <>
      <h1>Students</h1>
      <div className="flex gap-5 justify-center m-3">
        <form action="">
          <input
            type="text"
            className="input input-sm input-bordered"
            placeholder="name"
            name="name"
            value={student.name}
            onChange={(e) => {
              handleChange(e);
            }}
            required
          />
          <input
            type="text"
            className="input input-sm input-bordered"
            placeholder="age"
            name="age"
            value={student.age}
            onChange={(e) => {
              handleChange(e);
            }}
            required
          />
        </form>
      </div>

      <button
        className="btn btn-sm btn-success "
        onClick={() => {
          handleSubmit();
        }}
      >
        {" "}
        add{" "}
      </button>
      <div className="overflow-x-auto m-3">
        <table className="table w-full">
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Age</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => {
              return (
                <tr key={student.student_id}>
                  <td>{student.student_id}</td>
                  <td>{student.student_name}</td>
                  <td>{student.student_age}</td>
                  <td className="text-right space-x-2">
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => {
                        const result = confirm("sure ?");
                        if (result) {
                          handleDelete(student.student_id);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Toaster />
      <Modal isOpen={isOpen} />
    </>
  );
}

export default App;
