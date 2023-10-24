import { aboutZaafran, aboutChef } from "../data/data"
import aboutImg from "../assets/img3.jpg"
import chefImg from "../assets/img2.jpg"

const About = () => {
    const { name, p1, p2 } = aboutZaafran;
    const { header, chefName, desc1, desc2 } = aboutChef;
    return (
        <>
            <section className='about-us container'>
                <img src={aboutImg} alt='aboutImg' />
                <article className="about-us-info">
                    <h1>{name}</h1>
                    <p>{p1}</p>
                    <p>{p2}</p>
                </article>
            </section>
            <section className='about-chef container'>
                <article className="about-chef-info">
                    <h1>{header}</h1>
                    <h2>{chefName}</h2>
                    <p>{desc1}</p>
                    <p>{desc2}</p>
                </article>
                <img src={chefImg} alt='chefImg' />
            </section>
        </>
    )
}

export default About