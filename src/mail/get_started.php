<?php

// let's not have bots accessing this form willy-nilly
if( $_SERVER['REQUEST_METHOD'] == 'POST') {
    $body = 'You have received a new CoP submission.\n\n';

    foreach($_POST as $name => $value) {
        $cleanval = htmlspecialchars($value);
        $body .= $name .': '. $cleanval .'\n';
    }
    if(isset($_POST['contact1-email'])) {
        $sender = $_POST['contact1-email'];
    } else {
        $sender = 'noreply@nyu.edu';
    }

    $to = 'jannae@gmail.com';
    $subj = 'New CoP Submitted';
    $headers = 'From:'. $sender .'\n'; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
    $headers .= "Reply-To: $sender";
    mail($to,$subj,$body,$headers);
    return true;
}
?>