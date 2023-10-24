import { useState } from "react";
import useForm from "../hooks/useForm";
import { addDish } from "../api/api";
import Form from "../components/Form";
import { v4 as uuid } from "uuid";

const AddDish = () => {
  const [dish, setDish] = useState({
    id: uuid().slice(0, 8),
    name: '',
    description: '',
    image: '',
  });
  const [errors, setErrors] = useState({
    name: null,
    description: null,
    image: null,
  });
  const { handleChange, handleSubmit } = useForm(dish, setDish, setErrors, addDish)

  return (
    <div className="edit-dish-container">
      <h2>Add Dish</h2>
      <Form handleChange={handleChange} handleSubmit={handleSubmit} dish={dish} errors={errors} btnText='Add' />
    </div>
  )
}

export default AddDish