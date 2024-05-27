document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to the form submit button
    document.getElementById('signup').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default form submission
        validateForm(); // Call the function to validate the form
    });
});

function validateForm() {
    var username = document.querySelector('input[placeholder="Enter Your Username"]').value;
    var empID = document.querySelector('input[placeholder="Enter Your Employee ID"]').value;
    var mobNo = document.querySelector('input[placeholder="Enter Your Mobile Number"]').value;
    var email = document.querySelector('input[placeholder="Enter Your Email"]').value;
    var password = document.querySelector('input[name="password"]').value;
    var confirmPassword = document.querySelector('input[name="confirmPassword"]').value;

    // Check if any field is empty
    if (!username || !empID || !mobNo || !email || !password || !confirmPassword) {
        alert("All fields are required.");
        return false;
    }

    // Validate password match
    if (password !== confirmPassword) {
        alert("Password and confirm password do not match.");
        return false;
    }

    // Check password validation
    var passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z]).{8,}$/;
    if (!passwordPattern.test(password)) {
        alert("Password must contain at least one capital letter, one number, one special character, and have a minimum length of 8 characters.");
        return false;
    }

    // Form is valid, send data to server
    sendDataToServer(username, empID, mobNo, email, password,confirmPassword);
}

function sendDataToServer(username, empID, mobNo, email, password,confirmPassword) {
    var formData = {
        username: username,
        EmpID: empID,
        mobno: mobNo,
        emailID: email,
        passwd: password,
        confpasswd: confirmPassword
    };

    // Make a POST request to the server
    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to sign up');
        }
        return response.json();
    })
    .then(data => {
        alert('Sign up successful');
        // Redirect or perform other actions after successful sign up
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to sign up');
    });
}

function login() {
    var username = document.querySelector('input[name="username"]').value;
    var password = document.querySelector('input[name="password"]').value;

    // Make a POST request to the server
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'username': username,
            'password': password
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to login');
        }
        return response.json();
    })
    .then(data => {
        alert('Login successful');
        // Redirect or perform other actions after successful login
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to login');
    });
}