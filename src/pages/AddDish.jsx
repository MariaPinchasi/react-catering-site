import useForm from "../hooks/useForm";
import Form from "../components/Form";
import { useParams } from "react-router-dom";
import { useGlobalMenuContext } from "../hooks/useGlobalMenuContext";

const AddDish = () => {
  const { menuId } = useParams();
  const { handleAddDish } = useGlobalMenuContext();

  const { handleChange, handleSubmit, formData } = useForm(handleAddDish, menuId)

  return (
    <div className="edit-dish-container">
      <h2>Add Dish</h2>
      <Form handleChange={handleChange} handleSubmit={handleSubmit} btnText='Add' formData={formData} />
    </div>
  )
}

export default AddDish