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

    // Insert or update data into the destination database
    for (const item of items) {
      const { id, no_anggota, nama, dapil } = item;
      const query =
        'INSERT INTO anggotas (id, no_anggota, nama, dapil) ' +
        'VALUES (?, ?, ?, ?) ' +
        'ON DUPLICATE KEY UPDATE ' +
        'nama = VALUES(nama), dapil = VALUES(dapil)';

      try {
        await destinationDbConfig.promise().execute(query, [id, no_anggota, nama, dapil]);
        console.log('Inserted or updated data:', { id, no_anggota, nama, dapil });
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

  // Schedule the next data transfer in 15 seconds
  setTimeout(runDataTransfer, 15000); // 15 seconds
}

// Start the data transfer
console.log('Data transfer started');
runDataTransfer();
