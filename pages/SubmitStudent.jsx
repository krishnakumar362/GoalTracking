import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { OutputContainer } from "../components/OutputContainer";
import { PostCall } from "../api/ApiCalls";
import { useNavigate } from 'react-router-dom';

function SubmitStudent() {
    const [output, setOutput] = useState({ nic: "", name: "", address: "", contact: "" });
    const [student, setStudent] = useState({ nic: "", name: "", address: "", contact: "" });
    const [errMessage, setErrMessage] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const nicRef = useRef(null);
    const nameRef = useRef(null);
    const addressRef = useRef(null);
    const contactRef = useRef(null);
    const navigate = useNavigate();

    function handleChange(event) {
        const { name, value } = event.target;
        setResponseMessage("");
        setErrMessage("");
        setStudent((prevValue) => ({
            ...prevValue,
            [name]: value
        }));
    }

    function validateFields() {
        if (!/^[A-Za-z0-9]+$/.test(student.nic)) {
            setErrMessage("Invalid NIC");
            nicRef.current.focus();
            return false;
        } else if (!/^[A-Za-z][A-Za-z ]+$/.test(student.name)) {
            setErrMessage("Invalid Name");
            nameRef.current.focus();
            return false;
        } else if (!/^[A-Za-z\d][A-Za-z\d-|/# ,.:;\\]+$/.test(student.address)) {
            setErrMessage("Invalid Address");
            addressRef.current.focus();
            return false;
        } else if (!/^\+?\d{1,3}-\d{9,12}$/.test(student.contact)) {
            setErrMessage("Invalid Contact");
            contactRef.current.focus();
            return false;
        }

        return true;
    }

    function handleCheckOut() {
        setErrMessage("");
        setResponseMessage("");
        if (validateFields()) {
            setOutput({
                nic: student.nic,
                name: student.name,
                address: student.address,
                contact: student.contact
            });
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setErrMessage("");
        setResponseMessage("");

        if (!output.nic || !output.name || !output.address || !output.contact) {
            setErrMessage("Please validate the form before submitting.");
            return;
        }

        setIsLoading(true);
        try {
            await PostCall(output);
            setResponseMessage("Student successfully submitted to the database.");

        } catch (err) {
            setResponseMessage(err.response ? err.response.data.message : `Error: ${err.message}`);
        } finally {
            setIsLoading(false);
            setOutput({ nic: "", name: "", address: "", contact: "" });
            setStudent({ nic: "", name: "", address: "", contact: "" }); // Clear form fields
        }

        navigate("/exam");

    }

    return (
        <div className="centered-element">
            <div className="student-container">
                <h1>Submit Student</h1>
                <br />
                <form onSubmit={handleSubmit}>
                    <input
                        ref={nicRef}
                        onChange={handleChange}
                        value={student.nic}
                        id="nic"
                        name="nic"
                        placeholder="Enter NIC Number"
                    />
                    <input
                        ref={nameRef}
                        onChange={handleChange}
                        value={student.name}
                        id="name"
                        name="name"
                        placeholder="Enter Name"
                    />
                    <input
                        ref={addressRef}
                        onChange={handleChange}
                        value={student.address}
                        id="address"
                        name="address"
                        placeholder="Enter Address"
                    />
                    <input
                        ref={contactRef}
                        onChange={handleChange}
                        value={student.contact}
                        id="contact"
                        name="contact"
                        placeholder="Enter Contact"
                    />
                    <h5 aria-live="polite">{errMessage}&nbsp;</h5>
                    <br />
                    <button onClick={handleCheckOut} type="button">Check Out</button>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? "Submitting..." : "Submit Student"}
                    </button>
                    <Link className="back-link" to="/home">Back</Link>
                </form>
                <br />
                <OutputContainer
                    nic={output.nic}
                    name={output.name}
                    address={output.address}
                    contact={output.contact}
                />
                <br />
                <h4 aria-live="polite">{responseMessage}</h4>
            </div>
        </div>
    );
}

export default SubmitStudent;
