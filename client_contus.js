function submitFormData() {
  // Get form data
  const formData = {
    username: document.querySelector('input[name="username"]').value,
    email: document.querySelector('input[name="email"]').value,
    message: document.querySelector('textarea[name="message"]').value
  };

  // Send form data to server as JSON
  fetch('/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
    // Check if the response is not ok
    if (!response.ok) {
      throw new Error('Error saving contact information.');
    }
    return response.json(); // Parse response as JSON
  })
  .then(data => {
    console.log('Contact information saved successfully:', data);
    // Optionally, handle success response here
  })
  .catch(error => {
    console.error('Error:', error);
    // Optionally, handle error response here
  });
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