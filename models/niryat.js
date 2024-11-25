import axios from 'axios';

const CORS_PROXY = 'http://localhost:4000/';

export async function getNiryatData(startDate, endDate, countryId, regionId, commodityGroupId) {
    try {
        const url = `https://niryat.gov.in/group_data?start_date=${startDate}&end_date=${endDate}&sort_table=export_achieved-sort-desc&country_id=${countryId}&region_id=${regionId}&commodity_group_id=${commodityGroupId}`;
        const proxiedUrl = `${CORS_PROXY}${url}`;
        const response = await axios.get(proxiedUrl);
        if (response && response.data) {
            return response.data;
        }
        return {};
    } catch (error) {
        console.error('Error fetching Niryat data:', error);
        throw error;
    }
}