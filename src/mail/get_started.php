<?php

ini_set('display_errors', 1);

// let's not have bots accessing this form willy-nilly
if( $_SERVER['REQUEST_METHOD'] == 'POST') {
    $defaultfile = 'subs/new.txt';
    $body = 'You have received a new CoP submission.'.PHP_EOL.PHP_EOL;

    foreach($_POST as $name => $value) {
        $cleanvals[$name] = htmlspecialchars($value);
        $body .= $name .': '. $cleanvals[$name] .PHP_EOL;
    }
    if(!empty($cleanvals['name'])) {
        $file = 'subs/' . $cleanvals['name'] . '.txt';
    } else {
        $file = $defaultfile;
    }
    if(!empty($cleanvals['contact1-email'])) {
        $sender = $cleanvals['contact1-email'];
    } else {
        $sender = 'noreply@nyu.edu';
    }

    $to = 'jannae@gmail.com';
    $subj = 'New CoP Submitted';
    $headers = 'From:'. $sender .'\n'; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
    $headers .= "Reply-To: $sender";

    $contents = '';

    // Open the file to get existing content
    if($file == $defaultfile) {
        $contents = file_get_contents($file);
    }
    $contents .= 'To: ' . $to.PHP_EOL . 'Subject: ' . $subj.PHP_EOL . 'Headers: ' . $headers.PHP_EOL.PHP_EOL.'Body: ' . $body.PHP_EOL.PHP_EOL;
    file_put_contents($file, $contents);

    // mail($to,$subj,$body,$headers);
    return true;
}
?>