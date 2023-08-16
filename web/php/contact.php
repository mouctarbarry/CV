<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);


$array = array("firstname" => "", "name" => "", "email" => "", "phone" => "", "message" => "", "firstnameError" => "", "nameError" => "", "emailError" => "", "phoneError" => "", "messageError" => "", "isSuccess" => false);
$emailTo = "bmouctar22@gmail.com";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $array["firstname"] = test_input($_POST["firstname"]);
    $array["name"] = test_input($_POST["name"]);
    $array["email"] = test_input($_POST["email"]);
    $array["phone"] = test_input($_POST["phone"]);
    $array["message"] = test_input($_POST["message"]);
    $array["isSuccess"] = true;
    $emailText = "";

    if (empty($array["firstname"])) {
        $array["firstnameError"] = "Je veux connaître votre prénom " . "&#128578;";
        $array["isSuccess"] = false;
    } else {
        $emailText .= "Firstname: {$array['firstname']}\n";
    }

    if (empty($array["name"])) {
        $array["nameError"] = "Et oui je veux tout savoir. Même votre nom ! " . "&#128521;";
        $array["isSuccess"] = false;
    } else {
        $emailText .= "Name: {$array['name']}\n";
    }

    if(!isEmail($array["email"])) {
        $array["emailError"] = "Veuillez saisir un e-mail valide";
        $array["isSuccess"] = false;
    } else {
        $emailText .= "Email: {$array['email']}\n";
    }

    if (!isPhone($array["phone"])) {
        $array["phoneError"] = "Que des chiffres et des espaces, svp...";
        $array["isSuccess"] = false;
    } else {
        $emailText .= "Phone: {$array['phone']}\n";
    }

    if (empty($array["message"])) {
        $array["messageError"] = "Dites-moi au moins quelques mots svp " . "&#128526;";
        $array["isSuccess"] = false;
    } else {
        $emailText .= "Message: {$array['message']}\n";
    }

    if($array["isSuccess"]) {
        $headers = "From: {$array['firstname']} {$array['name']} <{$array['email']}>\r\nReply-To: {$array['email']}";
        mail($emailTo, "Un message de votre site", $emailText, $headers);
    }

    echo json_encode($array);
}

function isEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}
function isPhone($phone) {
    return preg_match("/^[0-9 ]*$/",$phone);
}
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    return htmlspecialchars($data);
}