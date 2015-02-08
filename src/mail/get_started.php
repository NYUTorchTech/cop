<?php
// Check for empty fields
if( empty($_POST['name'])           ||
    empty($_POST['description'])    ||
    empty($_POST['goal'])           ||
    empty($_POST['members'])        ||
    empty($_POST['process'])        ||
    empty($_POST['mtginperson'])    ||
    empty($_POST['mtgremote'])      ||
    empty($_POST['mtgfrequency'])   ||
    empty($_POST['contact1-name'])  ||
    empty($_POST['contact1-email']) ||
    empty($_POST['contact1-phone']) ||
    empty($_POST['contact2-name'])  ||
    empty($_POST['contact2-email']) ||
    empty($_POST['contact2-phone']) ||

    !filter_var($_POST['contact1-email'],FILTER_VALIDATE_EMAIL) ||
    !filter_var($_POST['contact2-email'],FILTER_VALIDATE_EMAIL)) {
        echo "No arguments Provided!";
        return false;
    }

$name           = $_POST['name'];
$desc           = $_POST['description'];
$goal           = $_POST['goal'];
$members        = $_POST['members'];
$process        = $_POST['process'];
$mtginperson    = $_POST['mtginperson'];
$mtgremote      = $_POST['mtgremote'];
$mtgfrequency   = $_POST['mtgfrequency'];

$contact1name   = $_POST['contact1-name'];
$contact1email  = $_POST['contact1-email'];
$contact1phone  = $_POST['contact1-phone'];

$contact2name   = $_POST['contact2-name'];
$contact2email  = $_POST['contact2-email'];
$contact2phone  = $_POST['contact2-phone'];


// Create the email and send the message
$to = 'jerome.lachaud@gmail.com'; // Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
$email_subject = "Website Contact Form:  $name";
$email_body = "You have received a new message from your website contact form.\n\n"."Here are the details:\n\nName: $name\n\nEmail: $email_address\n\nPhone: $phone\n\nMessage:\n$message";
$headers = "From: noreply@yourdomain.com\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
$headers .= "Reply-To: $email_address";
mail($to,$email_subject,$email_body,$headers);
return true;
?>