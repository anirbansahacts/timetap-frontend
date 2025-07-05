// src/components/shiftDetails/shiftDetailsService.js
// Change this line:
// import axios from 'axios';
// To this:

import api from "../../../services/api";

// Make sure your base URL is relative to leverage Vite proxy
const SHIFT_DETAILS_API_BASE_URL = '/api/v1/shift/details'; // As corrected previously

// Helper function to extract meaningful error messages (keep as is)
const getErrorMessage = (error) => {
    if (error.response) {
        const { data, status } = error.response;
        if (status === 400 && data && typeof data === 'object' && Object.keys(data).length > 0) {
            return Object.values(data).join('; ');
        }
        if (data && typeof data === 'object') {
            if (data.message) {
                return data.message;
            }
            if (data.errorDescription) {
                return data.errorDescription;
            }
        } else if (typeof data === 'string' && data.length > 0) {
            return data;
        }
        return `Server error: ${status} - ${error.response.statusText || 'Unknown error'}`;
    } else if (error.request) {
        return 'Network error: No response from server. Please check your connection.';
    } else {
        return `Request setup error: ${error.message}`;
    }
};

const shiftDetailsService = {
  /**
   * Creates a new shift.
   * @param {object} shiftData - The data for the new shift (shiftName, shiftStartTime, shiftEndTime).
   * @returns {Promise<any>} A promise that resolves with the response data on success.
   * @throws {Error} Throws an error if the API call fails.
   */
  createShift: async (shiftData) => {
    try {
      // Use api instead of axios
      const response = await api.post(`${SHIFT_DETAILS_API_BASE_URL}/create`, shiftData);
      return response.data;
    } catch (error) {
      throw getErrorMessage(error);
    }
  },

  /**
   * Fetches all available shifts.
   * @returns {Promise<Array<object>>} A promise that resolves with an array of shift objects.
   * @throws {Error} Throws an error if the API call fails.
   */
  getAllShifts: async () => {
    try {
      // Use api instead of axios
      const response = await api.get(`${SHIFT_DETAILS_API_BASE_URL}/viewAllShifts`);
      return response.data;
    } catch (error) {
      throw getErrorMessage(error);
    }
  },

  /**
   * Updates an existing shift by its ID.
   * @param {string} shiftId - The ID of the shift to update.
   * @param {object} updatedData - The updated shift data.
   * @returns {Promise<any>} A promise that resolves with the response data on success.
   * @throws {Error} Throws an error if the API call fails.
   */
  updateShift: async (shiftId, updatedData) => {
    try {
      // Use api instead of axios
      const response = await api.put(`${SHIFT_DETAILS_API_BASE_URL}/updateShiftById/${shiftId}`, updatedData);
      return response.data;
    } catch (error) {
      throw getErrorMessage(error);
    }
  },

  /**
   * Deletes a shift by its ID.
   * @param {string} shiftId - The ID of the shift to delete.
   * @returns {Promise<any>} A promise that resolves with the response data on success (or an empty object/message on successful deletion).
   * @throws {Error} Throws an error if the API call fails.
   */
  deleteShift: async (shiftId) => {
    try {
      // Use api instead of axios
      const response = await api.delete(`${SHIFT_DETAILS_API_BASE_URL}/delete/${shiftId}`);
      return response.data;
    } catch (error) {
      throw getErrorMessage(error);
    }
  },
};

export default shiftDetailsService;