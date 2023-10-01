// Import necessary libraries
const mysql = require('mysql2');
const axios = require('axios');

// Define database connection configurations for the destination database
const destinationDbConfig = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'dataset',
});

// Create a function to fetch data from the API and insert or update it
async function fetchDataFromAPIAndInsertOrUpdate() {
  try {
    const response = await axios.get('https://www.dpr.go.id/rest/?method=getSemuaAnggota&tipe=json');
    const items = response.data.anggota.item; // Access 'data' property and then 'anggota' and 'item'

    // Create a map to store the count of members per fraksi
    const fraksiCountMap = new Map();

    // Count members per fraksi
    for (const item of items) {
      const { fraksi } = item;
      if (fraksiCountMap.has(fraksi)) {
        fraksiCountMap.set(fraksi, fraksiCountMap.get(fraksi) + 1);
      } else {
        fraksiCountMap.set(fraksi, 1);
      }
    }

    // Insert or update data into the destination database
    for (const [fraksi, count] of fraksiCountMap.entries()) {
      const query = `INSERT INTO cleans (judul, keterangan, jumlah) VALUES ('Fraksi', ?, ?)
                     ON DUPLICATE KEY UPDATE jumlah = VALUES(jumlah)`;

      try {
        await destinationDbConfig.promise().execute(query, [fraksi, count]);
        console.log(`Inserted or updated data for Fraksi ${fraksi}: Count = ${count}`);
      } catch (err) {
        console.error('Error inserting or updating data:', err);
      }
    }

    console.log('Data transfer success');
  } catch (error) {
    console.error('Error fetching data from the API:', error);
  }
}

// Function to periodically run the data transfer
function runDataTransfer() {
  fetchDataFromAPIAndInsertOrUpdate();

  // Schedule the next data transfer in 15 minutes
  setTimeout(runDataTransfer, 15 * 60 * 1000); // 15 minutes in milliseconds
}

// Start the data transfer
console.log('Data transfer started');
runDataTransfer();
