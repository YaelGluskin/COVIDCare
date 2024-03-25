import { Link } from "react-router-dom";
const Welcom =() => {
    const date = new Date()
    const today = new Intl.DateTimeFormat('en-IL', {dateStyle: 'medium', timeStyle: 'long'}).format(date)
    const content = (
        <section className="welcome">
            <p>{today}</p>
            <h1>Welcome!</h1>
            <p>
                <Link to="/dash/users">View User Settings</Link>
            </p>
        </section>
    )
    return content;
}
export default Welcom;