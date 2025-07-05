// src/components/shift-swap/ShiftSwapService.js
import api from '../../../services/api'; // Adjust the path if axiosConfig.js is in a different location

// Define base URLs for different API contexts
// Make sure your base URLs are relative to leverage Vite proxy,
// matching your vite.config.js proxy setup.
const SHIFT_SWAP_API_BASE_URL = '/api/v1/shift/swap';
const SHIFT_ASSIGNMENT_API_BASE_URL = '/api/v1/shift/assignment'; // Needed for employee's current assignment
const SHIFT_DETAILS_API_BASE_URL = '/api/v1/shift/details'; // Needed for all shift details

// Helper function to extract meaningful error messages from backend responses
const getErrorMessage = (error) => {
    if (error.response) {
        const { data, status } = error.response;
        // Prioritize errorDescription or message if they exist
        if (data && typeof data === 'object') {
            if (data.errorDescription) {
                return data.errorDescription;
            }
            if (data.message) {
                return data.message;
            }
            // Fallback for Spring @Valid errors where data might be an object of field-error pairs
            if (status === 400 && Object.keys(data).length > 0) {
                return Object.values(data).join('; ');
            }
        } else if (typeof data === 'string' && data.length > 0) {
            return data; // Raw string response
        }
        return `Server error: ${status} - ${error.response.statusText || 'Unknown error'}`;
    } else if (error.request) {
        return 'Network error: No response from server. Please check your connection.';
    } else {
        return `Request setup error: ${error.message}`;
    }
};

const ShiftSwapService = {
    /**
     * Submits a new shift swap request.
     * @param {object} swapRequestData - The data for the swap request (employeeId, originalShiftId, requestedShiftId, swapDate, reason).
     * @returns {Promise<object>} A promise that resolves with the created swap request object.
     * @throws {Error} Throws an error if the API call fails.
     */
    
    requestShiftSwap: async (swapRequestData) => {
        try {
            // Use api instead of axios
            const response = await api.post(`${SHIFT_SWAP_API_BASE_URL}/request`, swapRequestData);
            return response.data;
        } catch (error) {
            console.error('Raw error response for requestShiftSwap:', error.response);
            throw getErrorMessage(error);
        }
    },

    /**
     * Fetches all pending shift swap requests.
     * @returns {Promise<Array<object>>} A promise that resolves with an array of pending swap request objects.
     * @throws {Error} Throws an error if the API call fails.
     */
    getAllPendingSwapRequests: async () => {
        try {
            // Use api instead of axios
            const response = await api.get(`${SHIFT_SWAP_API_BASE_URL}/pending-requests`);
            return response.data;
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            console.error('Error fetching pending swap requests:', errorMessage, error.response);
            throw errorMessage;
        }
    },

    /**
     * Fetches all shift swap requests (pending, approved, rejected).
     * @returns {Promise<Array<object>>} A promise that resolves with an array of all swap request objects.
     * @throws {Error} Throws an error if the API call fails.
     */
    getAllSwapRequests: async () => {
        try {
            // Use api instead of axios
            const response = await api.get(`${SHIFT_SWAP_API_BASE_URL}/all-requests`);
            return response.data;
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            console.error('Error fetching all swap requests:', errorMessage, error.response);
            throw errorMessage;
        }
    },

    /**
     * Reviews a shift swap request (approves or rejects it).
     * @param {object} reviewData - Object containing swapId, status ('APPROVED' or 'REJECTED'), and optional comment.
     * @returns {Promise<string>} A promise that resolves with a success message.
     * @throws {Error} Throws an error if the API call fails.
     */
    reviewShiftSwap: async (reviewData) => {
        try {
            const response = await api.put(`${SHIFT_SWAP_API_BASE_URL}/review`, reviewData);
            return response.data;
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            console.error('Error reviewing swap request:', errorMessage, error.response);
            throw errorMessage;
        }
    },

    /**
     * Fetches shift swap requests for a specific employee.
     * @param {string} employeeId - The ID of the employee.
     * @returns {Promise<Array<object>>} A promise that resolves with an array of swap request objects for the employee.
     * @throws {Error} Throws an error if the API call fails.
     */
    getEmployeeSwaps: async (employeeId) => {
        try {
            // Use api instead of axios
            const response = await api.get(`${SHIFT_SWAP_API_BASE_URL}/viewRequestByEmployee/${employeeId}`);
            return response.data;
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            console.error(`Error fetching swap requests for employee ${employeeId}:`, errorMessage, error.response);
            throw errorMessage;
        }
    },

    /**
     * Fetches all available shift details (for dropdowns in assignment/swap forms).
     * This method is also used in ShiftSwapRequestForm to populate shift options.
     * @returns {Promise<Array>} A promise that resolves to a list of ShiftDetailsResponseDTOs.
     * @throws {Error} Throws an error if the API call fails.
     */
    getAllShiftDetails: async () => {
        try {
            // This call also goes through api
            const response = await api.get(`${SHIFT_DETAILS_API_BASE_URL}/viewAllShifts`);
            return response.data;
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            console.error('Error fetching all shift details:', errorMessage, error.response);
            throw errorMessage;
        }
    },

    /**
     * Fetches an employee's current shift assignment including shift count.
     * This uses a specific endpoint from ShiftAssignmentController.
     * @param {string} employeeId - The ID of the employee.
     * @returns {Promise<object>} A promise that resolves with the ShiftAssignment object including shift count.
     * @throws {Error} Throws an error if the API call fails.
     */
    getEmployeeCurrentAssignment: async (employeeId) => {
        try {
            // This call also goes through api
            const response = await api.get(`${SHIFT_ASSIGNMENT_API_BASE_URL}/viewByEmployeeWithCount/${employeeId}`);
            return response.data;
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            console.error(`Error fetching current assignment for employee ${employeeId}:`, errorMessage, error.response);
            throw errorMessage;
        }
    }
};

export default ShiftSwapService;