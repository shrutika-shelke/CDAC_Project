function viewData(event) {
    event.preventDefault(); // Prevent form submission

    var empID = document.getElementById("empID").value;

    // Redirect to ThingSpeak based on employee ID
    if (empID === "1") {
        window.location.href = "https://api.thingspeak.com/channels/2438231";
    } else if (empID === "2") {
        window.location.href = "https://api.thingspeak.com/channels/your_channel_id/feed";
    } 
    // Add more conditions for other employee IDs
    else {
        document.getElementById("message").innerHTML = "Invalid Employee ID";
    }
}
function empData(event) {
    event.preventDefault(); // Prevent form submission

   // var empID = document.getElementById("empID").value;

    // Fetch data from server
    fetch(`/display`)
      .then(response => response.json())
      .then(data => {
        // Clear existing table rows
        var table = document.getElementById("data-table");
        while (table.rows.length > 1) {
          table.deleteRow(1);
        }

        // Add new rows to table
        data.forEach(row => {
          var newRow = table.insertRow();
          newRow.insertCell().appendChild(document.createTextNode(row.gasLevel));
          newRow.insertCell().appendChild(document.createTextNode(row.temperature));
          newRow.insertCell().appendChild(document.createTextNode(row.humidity));
          newRow.insertCell().appendChild(document.createTextNode(row.pulseRate));
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        document.getElementById("message").innerHTML = "An error occurred while fetching data.";
      });
  }  