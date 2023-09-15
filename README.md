# Data Transfer Scheduler

This Node.js script is designed to transfer data from one MySQL database to another at regular intervals. It retrieves data from a source database and inserts or updates it in a destination database, ensuring that the data is synchronized.

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

3. Execute the SQL scripts to set up your databases. First, create the databases, tables, and insert initial data. Here are the SQL scripts you can use:

- Source Database Setup:

```
CREATE DATABASE IF NOT EXISTS big_database;

USE big_database;

CREATE TABLE IF NOT EXISTS `ruu` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `judul` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `ruu` (`judul`) VALUES
  ('Sample Ruu 1'),
  ('Sample Ruu 2'),
  ('Sample Ruu 3');

```

- Destination Database Setup:

```
CREATE DATABASE IF NOT EXISTS dataset;

USE dataset;

CREATE TABLE IF NOT EXISTS `ruu` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `judul` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);

```
## Configuration

Before running the script, you need to configure the database connection details for both the source and destination databases. Follow the steps below to set up your configuration:

### Source Database Configuration

1. Open the `src/index.js` file.

2. Locate the following code block:

    ```javascript
    const sourceDbConfig = {
      host: 'source_database_host',
      user: 'source_database_user',
      password: 'source_database_password',
      database: 'source_database_name',
    };
    ```

3. Replace the placeholders with your actual source database credentials:

    - `source_database_host`: The hostname or IP address of your source database server.
    - `source_database_user`: The username to access your source database.
    - `source_database_password`: The password for the source database user.
    - `source_database_name`: The name of your source database.

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


## Usage

- using nodemon

```javascript
npm run dev
```

- not using nodemon

```javascript
npm start
```

With this data transfer scheduler, data in the source database can be seamlessly transferred or inserted into the destination database every 15 seconds. This ensures that both databases are kept synchronized, and any changes in the source database are reflected in the destination database in near real-time.

## So?

so if data in table ruu in big_database changes or if you add another value in table ruu in big_database, it will automaticly transfer the data/value into another database (dataset) every 15 seconds.
