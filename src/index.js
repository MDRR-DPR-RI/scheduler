// Import necessary libraries
const mysql = require('mysql2');

// Define database connection configurations for source and destination databases
const sourceDbConfig  = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'big_database',
});

const destinationDbConfig  = mysql.createConnection( {
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'dataset',
});

// Create a function to transfer data from the source to the destination database

// Function to transfer data
function transferData() {
  // Retrieve data from the source database
  sourceDbConfig.query('SELECT * FROM ruus', (err, results) => {
    if (err) throw err;

    // Insert data into the destination database
    results.forEach((row) => {
      destinationDbConfig.query('INSERT INTO ruus SET ? ON DUPLICATE KEY UPDATE ?', [row, row], (err) => {
        if (err) throw err;
      });
    });
  });
}

// Function to periodically run the data transfer
function runDataTransfer() {
  transferData();

  // Schedule the next data transfer in 15 seconds
  setTimeout(runDataTransfer, 15000); // 15 seconds
  console.log('Data transfer success');

}

// Start the data transfer
console.log('Data transfer started');
runDataTransfer();

