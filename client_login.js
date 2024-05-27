function authenticateUser(username, passwd) {
  // Simulated authentication logic - Replace with actual authentication logic
  // For demonstration purposes, assume username and password are correct
  const isAuthenticated = true;

  if (isAuthenticated) {
    window.location.href = 'detail.html'; // Redirect to detail.html upon successful authentication
  } else {
    console.error('Authentication failed');
  }
}

function submitFormData() {
  // Check if the current HTML page is the login page
  if (window.location.pathname.includes('log')) {
    // Get form data
    const username = document.querySelector('input[name="username"]').value;
    const passwd = document.querySelector('input[name="passwd"]').value;

    // Validate username and password
    if (username.trim() === '' || passwd.trim() === '') {
      console.error('Username and password are required.');
      return; // Exit function if username or password is empty
    }

    // Authenticate user
    authenticateUser(username, passwd);
  } else {
    console.error('This functionality is only available on the login page.');
  }
}

// Wait for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add event listener to the submit button
  const submitButton = document.getElementById('submitButton');
  submitButton.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default form submission
    submitFormData(); // Call function to submit form data
  });
});
