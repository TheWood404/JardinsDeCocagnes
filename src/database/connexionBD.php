<?php
    $servername = "163.5.142.26";
    $port = 3306;
    $username = "sae5JUV";
    $password = "JulesUgoVictor*";
    $dbname = "sae5juv";

    // Créer une connexion
    $conn = new mysqli($servername, $username, $password, $dbname, $port);

    // Vérifier la connexion
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    echo "Connected successfully";
?>