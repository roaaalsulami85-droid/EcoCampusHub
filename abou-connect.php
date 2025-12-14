<?php 
// Database connection settings 
$servername = "localhost"; 
$username   = "root";      
$password   = "";          
$dbname     = "message"; 
// Default in XAMPP 
// Default is empty 
// Create connection 
$conn = new mysqli($servername, $username, $password, $dbname); 
// Check connection 
if ($conn->connect_error) { 
// die = Stop the page execution immediately and print the message. 
die("Connection failed: " . $conn->connect_error); 
} 
echo "DB connected"; // for try 
?> 