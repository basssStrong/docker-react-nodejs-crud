import { useState } from "react";

export default function modalManager(props) {
  const { modalType } = props;

  function handleUpdate(id) {
    console.log(id);
    toast
      .promise(axios.put("http://localhost:5000/student/" + id, student), {
        success: "update success",
        loading: "updating",
        error: "error",
      })
      .then((res) => {
        setResult(res.data);
      });
  }

  return (
    <>
      <label
        htmlFor="my-modal-3"
        className={`btn btn-sm m-3 ${
          modalType === "add" ? "btn-success" : "btn-warning"
        }`}
        onClick={() => {
          // setModalType("ADD");
        }}
      >
        {modalType == "add"
          ? "Add Student"
          : modalType == "edit"
          ? "Edit "
          : ""}
      </label>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            X
          </label>
          <h3>
            {" "}
            {modalType == "add"
              ? "Add Student"
              : modalType == "edit"
              ? "Edit Student"
              : ""}
          </h3>
          <div className="form-control w-full ">
            <div>
              {Object.keys(student).map((key) =>
                key !== "id" ? (
                  <div key={key} className="form-control">
                    <label htmlFor="" className="label">
                      <span className="label-text">{key}</span>
                    </label>
                    <input
                      type="text"
                      name={key}
                      id=""
                      className="input input-bordered"
                      value={student[key]}
                      onChange={(event) => {
                        handleChange(event);
                      }}
                    />
                  </div>
                ) : (
                  ""
                )
              )}
            </div>
            {/* <>
              <input
                type="text"
                name="name"
                id=""
                className="input input-bordered"
                value={item.name}
                onChange={(event) => {
                  // handleChange(event);
                }}
              />
              <label htmlFor="" className="label">
                <span className="label-text">Age</span>
              </label>
              <input
                type="number"
                name="age"
                id=""
                className="input input-bordered"
                value={item.age}
                onChange={(event) => {
                  // handleChange(event);
                }}
              />
            </> */}
          </div>
          <button
            className="btn btn-sm btn-success mt-3"
            onClick={() => {
              // handleSubmit(student.id);
              modalType == "add" ? handleSubmit() : handleUpdate();
            }}
          >
            {modalType}
          </button>
        </div>
      </div>
    </>
  );
}
