import React from 'react'

const Input = ({ label, type, dish, error, handleChange }) => {
    return (
        <div className="input-group">
            <label htmlFor={type}>{label}</label>
            <input type="text" name={type} value={dish} onChange={handleChange} />
            <div className="error-message">{error}</div>
        </div>
    )
}

export default Input