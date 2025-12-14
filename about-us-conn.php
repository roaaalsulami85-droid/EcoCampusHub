<?php 
require_once "abou-connect.php";  // Connect to the database 
 
// Check if the form was submitted using POST 
if ($_SERVER["REQUEST_METHOD"] === "POST") { 
 
    // 1) Get the form values 
    $name    = htmlspecialchars($_POST["name"]); 
    $email   = htmlspecialchars($_POST["email"]); 
    $message = htmlspecialchars($_POST["message"]); 
 
    // 2) Simple validation: check if any field is empty 
    if ($name === "" || $email === "" || $message === "") { 
        echo "<h2 style='color:red;'>Please fill in all fields.</h2>"; 
        echo "<p><a href='about-us.html'>Back to about Page</a></p>"; 
        exit; // Stop the script 
    } 
 
    // 3) SQL query to insert the data into the database 
    $sql = "INSERT INTO contact_messages (name, email, message) 
            VALUES ('$name', '$email', '$message')"; 
 
    // 4) Run the SQL query and show a success or error message 
    if ($conn->query($sql) === TRUE) { 
        echo "<h2>✅ Thank you! Your message has been sent.</h2>"; 
        echo "<p><strong>Name:</strong> $name</p>"; 
        echo "<p><strong>Email:</strong> $email</p>"; 
        echo "<p><strong>Message:</strong><br>$message</p>"; 
        echo "<p><a href='about-us.html'>Back to about Page</a></p>"; 
    } else { 
        echo "<h2 style='color:red;'>Error saving your message.</h2>"; 
        echo "<p>Details: " . $conn->error . "</p>"; 
        echo "<p><a href='about-us.html'>Back to about Page</a></p>"; 
    } 
 
    // Close the database connection 
    $conn->close(); 
 
} else { 
 
    // If someone opens this page directly without the form 
    echo "<h2>This page expects form data.</h2>"; 
    echo "<p><a href='about-us.html'>Go to about Page</a></p>"; 
} 
?>