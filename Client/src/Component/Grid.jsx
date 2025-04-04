import React, { useState } from 'react';
import axios from 'axios';
import { message } from 'antd';

// Load BASE_URL from environment variables
const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

const Grid = ({ photos }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const handleDelete = async (id) => {
    try {
      let res = await axios.delete(`${BASE_URL}/remove/${id}`);
      message.success(res.data.message);
      window.location.reload();
    } catch (error) {
      console.error("Delete error:", error);
      message.error("Failed to delete image.");
    }
  };

  const handleUpdate = async (id) => {
    if (!selectedFile) {
      message.error("Please select an image first.");
      return;
    }

    if (!id) {
      console.error("Error: Image ID is undefined.");
      message.error("Invalid image ID.");
      return;
    }

    console.log("Updating image with ID:", id);

    try {
      const formData = new FormData();
      formData.append("photo", selectedFile);

      let res = await axios.put(`${BASE_URL}/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      message.success(res.data.message);
      window.location.reload();
    } catch (error) {
      console.error("Update error:", error);
      message.error("Failed to update image.");
    }
  };

  return (
    <div className="container grid">
      <div className="head">
        <h1>Our Gallery</h1>
        <hr />
      </div>
      <div className="row">
        {photos.length > 0 ? (
          photos.map((e, i) => (
            <div className="col-10 col-sm-10 col-md-6 col-lg-4 col-xl-3 mx-auto my-5" key={i}>
              <div className="card">
                <img
                  src={`${BASE_URL}/uploads/${e.photo}`}
                  className="card-img-top"
                  height="300"
                  width="100%"
                  alt="Image"
                />
                <div className="card-body d-flex flex-column align-items-center">
                  <div className="d-flex justify-content-between w-100">
                    {/* DELETE BUTTON */}
                    <button className="btn btn-danger" onClick={() => handleDelete(e._id)}>
                      <i className="fa-solid fa-trash"></i> Delete
                    </button>

                    {/* FILE INPUT */}
                    <input
                      type="file"
                      onChange={(event) => {
                        setSelectedFile(event.target.files[0]);
                        setSelectedId(e._id);
                      }}
                      hidden
                      id={`file-input-${e._id}`}
                    />
                    
                    {/* SELECT IMAGE BUTTON */}
                    <label htmlFor={`file-input-${e._id}`} className="btn btn-secondary">
                      Select Image
                    </label>

                    {/* UPDATE BUTTON */}
                    <button
                      className="btn btn-primary"
                      onClick={() => handleUpdate(e._id)}
                      disabled={!selectedFile || selectedId !== e._id}
                    >
                      <i className="fa-solid fa-upload"></i> Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h4 className="text-center mt-5">Gallery is Empty</h4>
        )}
      </div>
    </div>
  );
};

export default Grid;


