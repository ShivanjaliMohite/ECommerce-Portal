/*import React,{useEffect,useState} from "react"
import Base from "../core/Base"
import { Link } from "react-router-dom/cjs/react-router-dom";
import {
  getCategory,
  updateCategory
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";


const UpdateCategory = ({ match }) => {
    const { user, token } = isAuthenticated();
  
    const [values, setValues] = useState({
      name: "",
      loading: false,
      error: "",
      createdCategory: "",
      getaRedirect: false,
      formData: ""
    });
  
    const {
      name,
      loading,
      error,
      createdCategory,
      getaRedirect,
      formData
    } = values;
  
    const preload = categoryId => {
      getCategory(categoryId).then(data => {
        console.log(data);
        if (data.error != null) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: data.name,
            formData: new FormData()
          });
        }
      });
    };
  
    
    useEffect(() => {
      preload(match.params.categoryId);
    }, []);
  
    //TODO: work on it
    const onSubmit = event => {
      event.preventDefault();
      setValues({ ...values, error: "", loading: true });
  
      updateCategory(match.params.categoryId, user._id, token,{name}).then(
        data => {
          console.log(data)  
          if (data.error != null) {
            setValues({ ...values, error: data.error });
          } else {
            setValues({
              ...values,
              name: "",
              loading: false,
              createdProduct: data.name
            });
          }
        }
      );
    };
    ///TODO
    const handleChange = name => event => {
      const value= event.target.value;
      formData.set(name, value);
      setValues({ ...values, [name]: value });
    };
  
    const successMessage = () => (
      <div
        className="alert alert-success mt-3"
        style={{ display: createdCategory ? "" : "none" }}
      >
        <h4>{createdCategory} updated successfully</h4>
      </div>
    );
    const createCategoryForm = () => (
        <form>
        <div className="form-group">
          <p className="lead">Enter the category</p>
          <input
            type="text"
            className="form-control my-3"
            onChange={handleChange("name")}
            name="cate"
            value={name}
            autoFocus
            required
            placeholder="For Ex. Summer"
          />
          <button onClick={onSubmit} className="btn btn-outline-info">Update Category</button>
        </div>
      </form>
    )
    return (
      <Base
        title="Add a category here!"
        description="Welcome to category creation section"
        className="container bg-info p-4"
      >
        <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
          Admin Home
        </Link>
        <div className="row bg-dark text-white rounded">
          <div className="col-md-8 offset-md-2">
            {successMessage()}
            {createCategoryForm()}
          </div>
        </div>
      </Base>
    );
  };

export default  UpdateCategory; */ 
import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import {createCategory} from "./helper/adminapicall"
import { updateCategory } from "./helper/adminapicall";

const AddCategory = ({match}) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );


  const handleChange=event=>{
     setError("")
     setName(event.target.value)
    // setSuccess(false)
  }

  const successMessage=()=>{
    if(success){
        return <h4 className="text-success">Category updated successfully.</h4>

    }
  }

  const errorMessage=()=>{
    if(error){
        return <h4 className="text-success">Failed to create category.</h4>

    }
  }

  const onSubmit=event=>{
    event.preventDefault()
    setError("")
    setSuccess(false)
     //backend req fired
      updateCategory(match.params.categoryId,user._id ,token,{name}).then(data=>{
        if(data.error != null){
            setError(true)
        }
        else{
            setError("")
            setSuccess(true)
            setName("")
        }
     })
  }


  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the category</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange}
          value={name}
          autoFocus
          required
          placeholder="For Ex. Summer"
        />
        <button onClick={onSubmit} className="btn btn-outline-info">Update Category</button>
      </div>
    </form>
  );

  return (
    <Base
      title="Create a category here"
      description="Add a new category for new tshirts"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
          <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;

  