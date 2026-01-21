import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEnv } from "../Helpers/getEnv";

const Category = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get(`${getEnv("VITE_API_BASE_URL")}/auth/category`)
      .then((result) => {
        if (result.data.status) {
          setCategory(result.data.result);
        } else {
          alert(result.data.error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Cetegory List</h3>
      </div>
      <Link to="/dashboard/add_category" className="btn btn-info">
        Add Cetegory
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {category.map((c) => (
              <tr key={c._id}>
                <td>{c.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;
