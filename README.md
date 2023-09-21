# Data Transfer Scheduler

The script is designed to periodically fetch data from an external API and insert specific fields into a MySQL database. It uses the Axios library for making API requests and the mysql2 library for database connections.

## Prerequisites

Before using this script, make sure you have the following prerequisites installed:

- Node.js: [Download and install Node.js](https://nodejs.org/)
- MySQL: [Download and install MySQL](https://dev.mysql.com/downloads/installer/)

## Installation

1. Clone or download this repository to your local machine.

2. Install the required Node.js packages using npm:

   ```bash
   npm install
   ```

3. Execute the SQL scripts to set up your databases. First, create the databases, tables. Here are the SQL scripts you can use:

- Destination Database Setup:

```
CREATE DATABASE IF NOT EXISTS dataset;

USE dataset;

CREATE TABLE IF NOT EXISTS `ruus` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `judul` VARCHAR(255) NOT NULL,
  `pengusul` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`)
);

```
## Configuration

Before running the script, you need to configure the API URL and your database connection details for destination databases. Follow the steps below to set up your configuration:

### API URL configuration

1. Replace `'YOUR_API_URL'` with the actual URL of the API from which you want to fetch data.

 ```javascript
    const response = await axios.get('YOUR_API_URL'); // API URL
 ```

### Destination Database Configuration

1. Similarly, in the `src/index.js` file, find the following code block:

    ```javascript
    const destinationDbConfig = {
      host: 'destination_database_host',
      user: 'destination_database_user',
      password: 'destination_database_password',
      database: 'destination_database_name',
    };
    ```

2. Replace the placeholders with your actual destination database credentials:

    - `destination_database_host`: The hostname or IP address of your destination database server.
    - `destination_database_user`: The username to access your destination database.
    - `destination_database_password`: The password for the destination database user.
    - `destination_database_name`: The name of your destination database.

Once you've configured both the source and destination database details, you can run the script to start the data transfer process.

## Script Structure

The script is structured as follows:

1. Import necessary libraries, including Axios and mysql2.

2. Define the database connection configuration for the destination database (MySQL).

3. Create a function `fetchDataFromAPI` that fetches data from the API using Axios, extracts the required fields, and inserts them into the MySQL database.

4. Create a function `runDataTransfer` that periodically calls `fetchDataFromAPI` and schedules the next data transfer every 15 seconds.

5. Start the data transfer by calling `runDataTransfer`.

## Running the Script

- using nodemon

```javascript
npm run dev
```

- not using nodemon

```javascript
npm start
```

## Conclusion

This script allows you to automate the process of fetching data from an API and storing it in a MySQL database at regular intervals. It can be customized to suit your specific use case.

