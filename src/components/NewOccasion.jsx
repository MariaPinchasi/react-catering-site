import { useState } from "react";
import { approveOccasion } from "../api/userApi";

const NewOccasion = ({ id, type, guests, date, dishes, notes, isApproved, userEmail, isAdmin }) => {
    const [isDisabled, setIsDisabled] = useState(false);

    const handleApprove = (id, userEmail, e) => {
        e.currentTarget.disabled = true;
        setIsDisabled(true);
        approveOccasion(id, userEmail);
        approveOccasion(id, "admin@gmail.com");
    }

    return (
        <article className='occasion-container' >
            {isAdmin && <h2>{`User: ${userEmail}`}</h2>}
            <h3>{`Occasion Type: ${type}`}</h3>
            <h3>{`Guests: ${guests}`}</h3>
            <h3>{`Date: ${date}`}</h3>
            <h3>Ordered Dishes:</h3>
            {dishes.map((dish, i) => {
                const { id, name } = dish;
                return (
                    <h4 key={id}>{`${i + 1}) ${name}`}</h4>
                )
            })}
            <h3>{`Notes: ${notes}`}</h3>
            {!isAdmin && !isApproved && <h3>Status: Waiting for approval </h3>}
            {!isAdmin && isApproved && <h3>Status: Approved </h3>}

            {isAdmin && !isApproved && <button className='btn small-btn' onClick={(e) => handleApprove(id, userEmail, e)}>Approve</button>}
            {isAdmin && (isApproved || isDisabled) && <div className='btn small-btn approved-btn'>Approved!</div>}
        </article>)
}

export default NewOccasion