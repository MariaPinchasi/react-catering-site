import { useState } from "react";
import useForm from "../hooks/useForm";
import { addDish } from "../api/api";
import Form from "../components/Form";

const AddDish = () => {
  const { handleChange, handleSubmit, formData } = useForm(addDish)

  return (
    <div className="edit-dish-container">
      <h2>Add Dish</h2>
      <Form handleChange={handleChange} handleSubmit={handleSubmit} btnText='Add' formData={formData} />
    </div>
  )
}

export default AddDish