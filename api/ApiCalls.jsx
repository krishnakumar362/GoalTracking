import axios from "axios";

// Base URL for the API
const baseURL = "http://localhost:5000/api";

// Default headers (if needed, such as for authentication or content type)
const config = {
    headers: {
        'Content-Type': 'application/json',
        // Add any additional headers here if required
    }
};

// POST request to submit a student
export const PostCall = async (studentData) => {
    try {
        const response = await axios.post(`${baseURL}/submit-student`, studentData, config);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

// GET request to retrieve a student by NIC
export const GetCall = async (nic) => {
    try {
        const response = await axios.get(`${baseURL}/student's/${nic}`, config);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

// DELETE request to remove a student by NIC
export const DeleteCall = async (nic) => {
    try {
        const response = await axios.delete(`${baseURL}/student's/${nic}`);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

// PATCH request to update a student by NIC
export const PatchCall = async (nic, updatedData) => {
    try {
        const response = await axios.patch(`${baseURL}/student's/${nic}`, updatedData, config);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

// Error handling function
function handleError(error) {
    if (error.response) {
        console.error(`Error: ${error.response.data.message}`);
        return error.response.data;
    } else if (error.request) {
        console.error('Error: No response received from server.');
        return { message: "No response from server" };
    } else {
        console.error(`Error: ${error.message}`);
        return { message: error.message };
    }
}
