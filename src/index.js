// Import necessary libraries
const mysql = require('mysql2');
const axios = require('axios'); // Import Axios for making API requests

// Define database connection configurations for source and destination databases
const destinationDbConfig = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'dataset',
});

// Create a function to fetch data from the API
async function fetchDataFromAPI() {
  try {
    const response = await axios.get('http://localhost:3000/database'); // API URL
    const data = response.data.data; // Extract the "data" array from the API response

    // Insert data into the destination database
    data.forEach((item) => {
      const { judul, pengusul } = item;
      const query = 'INSERT INTO ruus (judul, pengusul) VALUES (?, ?)';

      destinationDbConfig.query(query, [judul, pengusul], (err) => {
        if (err) {
          console.error('Error inserting data:', err);
        }
      });
    });

    console.log('Data transfer success');
  } catch (error) {
    console.error('Error fetching data from the API:', error);
  }
}

// Function to periodically run the data transfer
function runDataTransfer() {
  fetchDataFromAPI();

  // Schedule the next data transfer in 15 seconds
  setTimeout(runDataTransfer, 15000); // 15 seconds
}

// Start the data transfer
console.log('Data transfer started');
runDataTransfer();
