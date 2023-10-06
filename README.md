# Data Transfer Scheduler

The script is designed to periodically fetch data from an external API and insert specific fields into a MySQL database. It uses the Axios library for making API requests and the mysql2 library for database connections.

## Prerequisites

Before using this script, make sure you have the following prerequisites installed:

- Node.js: [Download and install Node.js](https://nodejs.org/)
- MySQL: [Download and install MySQL](https://dev.mysql.com/downloads/installer/)

## Installation

1. Clone the project repository:

   ```sh
   git clone https://github.com/MDRR-DPR-RI/scheduler.git
   ```

2. Navigate to the project directory:

   ```sh
   cd scheduler
   ```

3. Install project dependencies:

   ```sh
   npm install
   ```

3. Execute the SQL scripts to set up your databases. First, create the databases, tables. Here are the SQL scripts you can use:

- Destination Database Setup:

```
CREATE DATABASE IF NOT EXISTS dataset;

USE dataset;

CREATE TABLE IF NOT EXISTS `cleans` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `judul` VARCHAR(255) NOT NULL,
  `keterangan` VARCHAR(255) UNIQUE NOT NULL,
  `jumlah` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

```
## Configuration

Before running the script, you need to configure your database connection

### Destination Database Configuration

1. Create a `.env` file in the project directory.

2. Add the following environment variables to the `.env` file:

   ```sh
   DB_HOST=your_destination_database_host
   DB_USER=your_destination_database_user
   DB_PASSWORD=your_destination_database_password
   DB_DATABASE=your_destination_database_name
   ```

   Replace the placeholders with your actual destination database credentials.

Once you've configured destination database details, you can run the script to start the data transfer process.

## Script Structure
The script is structured as follows:

1. Import necessary libraries, including Axios and mysql2.

2. Define the database connection configuration for the destination database (MySQL).

3. Create a function `fetchDataFromAPIAndInsertOrUpdate` that fetches data from the API using Axios, extracts the required fields, and inserts or updates them in the MySQL database.

4. Create a function `runDataTransfer` that periodically calls `fetchDataFromAPIAndInsertOrUpdate` and schedules the next data transfer every 15 minutes.

5. Start the data transfer by calling `runDataTransfer`.

## Usage

To run the script, use the following commands:

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
