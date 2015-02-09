<?php
// for debugging
ini_set('display_errors', 1);

function clean($string) {
   $string = str_replace(' ', '-', $string); // Replaces all spaces with hyphens.
   $string = preg_replace('/[^A-Za-z0-9\-]/', '', $string); // Removes special chars.

   return preg_replace('/-+/', '-', $string); // Replaces multiple hyphens with single one.
}

// let's not have bots accessing this form willy-nilly
if( $_SERVER['REQUEST_METHOD'] == 'POST') {
    $defaultfile = 'subs/new.txt';
    $body = 'You have received a new CoP submission.'.PHP_EOL.PHP_EOL;

    foreach($_POST as $name => $value) {
        $cleanvals[$name] = htmlspecialchars($value);
        $body .= $name .': '. $cleanvals[$name] .PHP_EOL;
    }
    if(!empty($cleanvals['name'])) {
        $file = 'subs/' . clean($cleanvals['name']) . '.txt';
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
    $headers = 'From:'. $sender .'\n';
    $headers .= "Reply-To: $sender";

    date_default_timezone_set('America/New_York');
    $submitted = date('Y-m-d H:i:s');

    $contents = 'Submitted: ' . $submitted.PHP_EOL . 'To: ' . $to.PHP_EOL . 'Subject: ' . $subj.PHP_EOL . 'Headers: ' . $headers.PHP_EOL.PHP_EOL.'Body: ' . $body.PHP_EOL.PHP_EOL;

    file_put_contents($file, $contents, FILE_APPEND | LOCK_EX);

    mail($to,$subj,$body,$headers);

    return true;
}
?>