// src/components/shift-assignment/ShiftAssignmentService.js
// Change this line:
// import axios from 'axios';
// To this:
import api from '../../../services/api'; // Adjust the path if axiosConfig.js is in a different location

// Make sure your base URLs are relative to leverage Vite proxy,
// matching your vite.config.js proxy setup.
const SHIFT_ASSIGNMENT_API_BASE_URL = '/api/v1/shift/assignment';
const SHIFT_DETAILS_API_BASE_URL = '/api/v1/shift/details'; // Used for getAllShiftDetails

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

const shiftAssignmentService = {
    /**
     * Assigns a shift to one or more employees for a specified period.
     * @param {Array<number>} employeeIds - Array of employee IDs to assign the shift to.
     * @param {number} shiftId - The ID of the shift to assign.
     * @param {string} assignedFromDate - Start date of the assignment (YYYY-MM-DD).
     * @param {string} assignedToDate - End date of the assignment (YYYY-MM-DD).
     * @returns {Promise<Array<object>>} A promise that resolves with the created assignment objects.
     * @throws {Error} Throws an error if the API call fails.
     */
    assignShift: async (employeeIds, shiftId, assignedFromDate, assignedToDate) => {
        const assignmentData = { selectedEmployeeIds: employeeIds, shiftId, assignedFromDate, assignedToDate };
        try {
            // Use api instead of axios
            const response = await api.post(`${SHIFT_ASSIGNMENT_API_BASE_URL}/assign-by-manager`, assignmentData);
            return response.data;
        } catch (error) {
            throw getErrorMessage(error);
        }
    },

    /**
     * Fetches all assigned shifts for a specific employee.
     * @param {string} employeeId - The ID of the employee.
     * @returns {Promise<Array<object>>} A promise that resolves with an array of shift assignment objects.
     * @throws {Error} Throws an error if the API call fails.
     */
    getAssignmentsByEmployee: async (employeeId) => {
        try {
            // Use api instead of axios
            const response = await api.get(`${SHIFT_ASSIGNMENT_API_BASE_URL}/viewByEmployee/${employeeId}`);
            return response; // Note: original code returned 'response.data'. Confirm if 'response' or 'response.data' is needed here.
        } catch (error) {
            throw getErrorMessage(error);
        }
    },

    /**
     * Fetches all shift assignments with pagination and optional filtering.
     * @param {number} page - The current page number (0-indexed for backend).
     * @param {number} size - The number of items per page.
     * @param {string} searchTerm - Optional search term for shift name or ID.
     * @returns {Promise<object>} A promise that resolves to an object containing content[], totalElements, totalPages.
     * @throws {Error} Throws an error if the API call fails.
     */
    getAllAssignments: async (page, size, searchTerm = '') => {
        try {
          // Use api instead of axios
          const url = `${SHIFT_ASSIGNMENT_API_BASE_URL}/viewAllEmployees?page=${page}&size=${size}`;
          const response = await api.get(url, { params: { searchTerm } }); // Pass search term as query param
          return response.data;
        } catch (error) {
          throw getErrorMessage(error); // Use the helper
        }
      },

    /**
     * Fetches all available shift details (for dropdowns in assignment/swap forms), including shift count.
     * @returns {Promise<Array>} A promise that resolves to a list of ShiftDetailsResponseDTOs.
     * @throws {Error} Throws an error if the API call fails.
     */
    getAllShiftDetails: async () => {
        try {
            // This call goes to the shift-details endpoint, also handled by api now
            const response = await api.get(`${SHIFT_DETAILS_API_BASE_URL}/viewAllShifts`);
            return response.data;
        } catch (error) {
            throw getErrorMessage(error);
        }
    },
};

export default shiftAssignmentService;