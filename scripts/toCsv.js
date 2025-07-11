const database = require('../src/config/database.js');
const Domain = require('../src/models/Domain.js');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

async function main() {

    database.connectDB();

    const domains = await Domain.find({});

    try {
        const csvData = jsonToCsv(domains);
        fs.writeFileSync('server-clean.csv', csvData);
        console.log('Manual CSV file saved successfully!');
    } catch (err) {
        console.error('Error converting JSON to CSV manually:', err);
    }

    database.disconnectDB();

}

function jsonToCsv(data) {
    if (!data || data.length === 0) {
        return '';
    }

    const headers = Object.keys(data[0]['_doc']);
    let csv = headers.join(',') + '\n';

    data.forEach(row => {
        const values = headers.map(header => {
            let value = row[header];
            // Handle potential commas or newlines within values by quoting them
            if (typeof value === 'string' && (value.includes(',') || value.includes('\n'))) {
                value = `"${value.replace(/"/g, '""')}"`; // Escape double quotes within the string
            }
            return value;
        });
        csv += values.join(',') + '\n';
    });
    return csv;
}

main()