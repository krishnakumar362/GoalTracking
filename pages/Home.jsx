import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="centered-element">
            <div className="student-container">
                <h1>Student Goal Tracking</h1>
                <br /><br />
                <img src="./images/dashboard-logo.png" width="400px" alt="dashboard-logo"
                />
                <br /><br />

                <Link className="back-link" to='/submit' aria-label="Submit a new student"
                >Submit Student </Link>

                <Link className="back-link" to='/get' aria-label="Get student details"
                >Get Student Details</Link>

                <Link className="back-link" to='/update' aria-label="Update student details"
                >
                    Update Student Details</Link>


                <Link className="back-link" to='/delete' aria-label="Delete student" > Delete Student  </Link>


            </div>
        </div>
    );
}

export default Home;
