const mysql = require('mysql');
const https = require('https');

// MySQL connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '$HRutika0106',
  database: 'test'
});

// Connect to MySQL database
connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Make a GET request to the Thingspeak API
https.get('https://api.thingspeak.com/channels/2438231/feeds.json', (response) => {
  let data = '';

  // A chunk of data has been received
  response.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received
  response.on('end', () => {
    const feed = JSON.parse(data);
    let completedInserts = 0;

    // Assuming the JSON response is an array of entries
    feed.feeds.forEach(entry => {
      // Handle null values
      const gasLevel = entry.field1 || null;
      const temperature = entry.field2 || null;
      const humidity = entry.field3 || null;
      const pulseRate = entry.field4 || null;

      // Insert data into the 'helment' table
      const insertQuery = 'INSERT INTO helment (gasLevel, temperature, humidity, pulseRate) VALUES (?, ?, ?, ?)';
      connection.query(insertQuery, [gasLevel, temperature, humidity, pulseRate], (err, result) => {
        if (err) {
          console.error('Error inserting into MySQL database:', err);
        } else {
          console.log('Data inserted successfully');
        }

        completedInserts++;
        if (completedInserts === feed.feeds.length) {
          // Close the MySQL connection after all inserts are done
          connection.end();
        }
      });
    });
  });
}).on("error", (err) => {
  console.error("Error making the request:", err);
});
