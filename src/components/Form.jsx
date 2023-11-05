import Input from "./Input"


const Form = ({ handleSubmit, handleChange, btnText, formData }) => {
    return (
        <form onSubmit={handleSubmit}>
            {formData.map(data => {
                return <Input key={data.id} {...data} handleChange={handleChange} />
            })}
            <button className="btn update-btn" type="submit">{btnText}</button>
        </form>
    )
}

export default Form