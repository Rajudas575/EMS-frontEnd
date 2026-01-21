import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEnv } from "../Helpers/getEnv";

const AddCategory = () => {
  const [category, setCategory] = useState();

  const navigate = useNavigate();

  const handaleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${getEnv("VITE_API_BASE_URL")}/auth/add_category`, { category })
      .then((result) => {
        if (result.data.status) {
          navigate("/dashboard/category");
        } else {
          alert(result.data.message);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex justify-content-center align-items-center h-75">
      <div className="p-3 rounded w-25 border">
        <h2>Add Category</h2>
        <form onSubmit={handaleSubmit}>
          <div className="mb-3">
            <label htmlFor="category">
              <strong>Category:</strong>
            </label>
            <input
              type="text"
              name="category"
              placeholder="Enter Category"
              className="form-control rounded-0"
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <button className="btn btn-info w-100 rounded-0 mb-2">
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
