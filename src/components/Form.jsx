import Input from "./Input"

const dishFormData = [
    {
        label: 'Name',
        type: 'name',


    }
]
const Form = ({ handleSubmit, handleChange, dish, errors, btnText }) => {
    return (
        <form onSubmit={handleSubmit}>
            <Input label='Name' type='name' dish={dish.name} error={errors.name} handleChange={handleChange} />
            <Input label='Description' type='description' dish={dish.description} error={errors.description} handleChange={handleChange} />
            <Input label='Image' type='image' dish={dish.image} error={errors.image} handleChange={handleChange} />
            <button className="btn update-btn" type="submit">{btnText}</button>
        </form>
    )
}

export default Form