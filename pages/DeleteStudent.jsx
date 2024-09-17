import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { DeleteCall } from "../api/ApiCalls";

const DeleteStudent = () => {
    const [nic, setNic] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const nicInputRef = useRef(null);

    function handleChange(event) {
        setResponseMessage("");
        setErrMessage("");
        setNic(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setErrMessage("");
        setResponseMessage("");

        if (!/^\d{9}[Vv]$/.test(nic)) {
            setErrMessage("Student NIC number is empty or invalid");
            nicInputRef.current.focus(); // Ref-based focusing
            return;
        }

        setIsLoading(true); // Set loading state during the API call
        try {
            await DeleteCall(nic);
            setResponseMessage("Student successfully deleted from the database");
        } catch (err) {
            if (err.response) {
                setResponseMessage(err.response.data.message);
            } else {
                setResponseMessage(`Error: ${err.message}`);
            }
        } finally {
            setIsLoading(false); // Reset loading state
            setNic("");
        }
    }

    return (
        <div className="centered-element">

            <div className="student-container">
                <h1>Delete Student</h1>
                <br />
                <form onSubmit={handleSubmit}>
                    <input
                        ref={nicInputRef}
                        onChange={handleChange}
                        value={nic}
                        id="nic"
                        name="nic"
                        placeholder="Enter NIC Number" />
                    <h5 aria-live="polite">{errMessage}&nbsp;</h5>
                    <br />
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? "Deleting..." : "Delete Student"}
                    </button>
                    <Link to='/home' className="back-link">Back</Link>
                </form>
                <h4>{responseMessage}</h4>
            </div>
        </div>
    );
}

export default DeleteStudent;
