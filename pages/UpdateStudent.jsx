import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { OutputContainer } from "../components/OutputContainer";
import { PatchCall } from "../api/ApiCalls";

function UpdateStudent() {
    const [output, setOutput] = useState({ nic: "", name: "", address: "", contact: "" });
    const [student, setStudent] = useState({ nic: "", name: "", address: "", contact: "" });
    const [errMessage, setErrMessage] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const nicRef = useRef(null);
    const nameRef = useRef(null);
    const addressRef = useRef(null);
    const contactRef = useRef(null);

    function handleChange(event) {
        const { name, value } = event.target;
        setResponseMessage("");
        setErrMessage("");
        setStudent(prevValue => ({
            ...prevValue,
            [name]: value
        }));
    }

    function validateFields() {
        if (!/^\d{9}[Vv]$/.test(student.nic)) {
            setErrMessage("Student NIC number is empty or invalid");
            nicRef.current.focus();
            return false;
        } else if (!/^[A-Za-z][A-Za-z ]+$/.test(student.name)) {
            setErrMessage("Student name is empty or invalid");
            nameRef.current.focus();
            return false;
        } else if (!/^[A-Za-z\d][A-Za-z\d-|/# ,.:;\\]+$/.test(student.address)) {
            setErrMessage("Student address is empty or invalid");
            addressRef.current.focus();
            return false;
        } else if (!/^\d{3}-\d{7}$/.test(student.contact)) {
            setErrMessage("Student contact is empty or invalid");
            contactRef.current.focus();
            return false;
        }
        return true;
    }

    function handleCheckOut() {
        setResponseMessage("");
        setErrMessage("");
        if (validateFields()) {
            setOutput({ ...student });
            setStudent({ nic: "", name: "", address: "", contact: "" });
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setErrMessage("");
        setResponseMessage("");

        if (!output.nic || !output.name || !output.address || !output.contact) {
            setErrMessage("Inputs didn't check out");
            return;
        }

        setIsLoading(true);
        try {
            await PatchCall(output.nic, output);
            setResponseMessage("Student successfully updated in the database");
        } catch (err) {
            if (err.response) {
                setResponseMessage(err.response.data.message);
            } else {
                setResponseMessage(`Error: ${err.message}`);
            }
        } finally {
            setIsLoading(false);
            setOutput({ nic: "", name: "", address: "", contact: "" });
        }
    }

    return (
        <div className="centered-element">

            <div className="student-container">
                <h1>Update Student Details</h1>
                <br />
                <form onSubmit={handleSubmit}>
                    <input ref={nicRef} onChange={handleChange} value={student.nic} id="nic" name="nic" placeholder="Enter NIC Number" />
                    <input ref={nameRef} onChange={handleChange} value={student.name} id="name" name="name" placeholder="Enter Name" />
                    <input ref={addressRef} onChange={handleChange} value={student.address} id="address" name="address" placeholder="Enter Address" />
                    <input ref={contactRef} onChange={handleChange} value={student.contact} id="contact" name="contact" placeholder="Enter Contact" />
                    <h5 aria-live="polite">{errMessage}&nbsp;</h5>
                    <br />
                    <button onClick={handleCheckOut} type="button">Check Out</button>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? "Updating..." : "Update Student Details"}
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

export default UpdateStudent;
