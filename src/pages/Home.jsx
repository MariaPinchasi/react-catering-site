import { Link } from "react-router-dom"

import { optionsData } from "../data/data"
const Home = () => {
    return (
        <>
            <section className="container intro">
                <div className="intro-content">
                    <h1>FOOD . EXPERIENCE . PEOPLE</h1>
                    <h2>straight from the field </h2>
                </div>
            </section>

            <section className="options">
                {optionsData.map(option => {
                    const { id, name, className, description, btnClass, url, btnText } = option;
                    return (
                        <article key={id} className={className}>
                            <h1>{name}</h1>
                            <p>{description}</p>
                            <Link className={btnClass} to={url}>{btnText}</Link>
                        </article>
                    )
                })}
            </section>

        </>
    )
}

export default Home