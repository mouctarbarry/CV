<?php

require 'vendor/autoload.php'; // Chargement des dépendances

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

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

    if ($array["isSuccess"]) {
        $mail = new PHPMailer(true);

        try {
            // Configuration SMTP
            $mail->SMTPDebug = SMTP::DEBUG_SERVER;
            $mail->isSMTP();
            $mail->Host       = 'smtp.gmail.com';
            $mail->SMTPAuth   = true;
            $mail->Username   = 'barrymouctaar@gmail.com';
            $mail->Password   = 'PUPp@ssword1996';
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
            $mail->Port       = 465;

            // Destinataires et contenu
            $mail->setFrom('barrymouctaar@gmail.com', 'Mailer');
            $mail->addAddress($emailTo);
            $mail->Subject = 'Un message de votre site';
            $mail->Body    = $emailText;

            $mail->send();
            echo json_encode($array);
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
    } else {
        echo json_encode($array);
    }
}

function isEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

function isPhone($phone): bool|int
{
    return preg_match("/^[0-9 ]*$/",$phone);
}

function test_input($data): string
{
    $data = trim($data);
    $data = stripslashes($data);
    return htmlspecialchars($data);
}
