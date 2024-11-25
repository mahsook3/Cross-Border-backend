import axios from 'axios';

export async function getEUTradeStatistics(hsnCode, year) {
    try {
        let response;
        let currentHsnCode = hsnCode.toString(); // Ensure HSN code is a string

        while (currentHsnCode.length > 0) {
            response = await axios.get(`https://webgate.ec.europa.eu/flows/public/v1/stats?reporter=&partner=&product=${currentHsnCode}&years=${year}&includeUK=false&lang=EN`);
            if (response && response.data && response.data.rows && response.data.rows.length > 0) {
                return response.data;
            }
            currentHsnCode = currentHsnCode.slice(0, -1); // Reduce the HSN code by one digit from the end
        }

        return response ? response.data : {}; // Return the last response if no valid rows found, or an empty object if response is undefined
    } catch (error) {
        console.error('Error fetching EU trade statistics:', error);
        throw error;
    }
}