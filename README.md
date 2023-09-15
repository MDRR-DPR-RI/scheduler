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

CREATE TABLE IF NOT EXISTS `ruus` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `judul` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `ruus` (`judul`) VALUES
  ('Sample Ruu 1'),
  ('Sample Ruu 2'),
  ('Sample Ruu 3');

```

- Destination Database Setup:

```
CREATE DATABASE IF NOT EXISTS dataset;

USE dataset;

CREATE TABLE IF NOT EXISTS `ruus` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `judul` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);

```

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

so if data in table ruu in big_database changes or if you add another value in table ruu in big_database, it will automaticly transfer the data/value into another database (dataset).
