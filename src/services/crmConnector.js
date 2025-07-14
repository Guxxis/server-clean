import axios from 'axios';

const LIMIT = 500;
const BASE_URL = 'https://api.sensedata.io/v2/customers';

async function getActiveCustomers() {

    let currentPage = 1;
    let customersArray = [];

    while (currentPage != null) {
        try {
            const res = await axios.get(`${BASE_URL}?page=${currentPage}&limit=${LIMIT}&status=Ativo`, {
                headers: {
                    'Authorization': `Bearer ${process.env.SENSEDATA_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                timeout: 10000
            });

            customersArray = customersArray.concat(res.data.customers);
            currentPage = res.data.next_page;
            
        } catch (err) {
            console.error(`❗ Erro ao buscar clientes na página ${currentPage}:`, err.message);
            break;
        }
    }

    return customersArray;
}

export default getActiveCustomers;