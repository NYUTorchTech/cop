<?php
// CORS
header("Access-Control-Allow-Origin: https://nyutorchtech.github.io");

// for debugging
ini_set('display_errors', 1);

function clean($string) {
   $string = str_replace(' ', '-', $string); // Replaces all spaces with hyphens.
   $string = preg_replace('/[^A-Za-z0-9\-]/', '', $string); // Removes special chars.

   return preg_replace('/-+/', '-', $string); // Replaces multiple hyphens with single one.
}

// let's not have bots accessing this form willy-nilly
if( $_SERVER['REQUEST_METHOD'] === 'POST') {
    $ln = PHP_EOL;
    $ln2 = PHP_EOL.PHP_EOL;

    $body = 'You have received a new CoP submission.'.$ln2;

    foreach($_POST as $name => $value) {
        $cleanvals[$name] = htmlspecialchars($value);
        //$body .= $name .': '. $cleanvals[$name] .$ln;
    }

/*
    if($cleanvals['contact1email']) {
        $sender = $cleanvals['contact1email'];
    } else {
        $sender = 'jannae@nyu.edu';
    }
*/

    $sender = 'jannae@nyu.edu';

    $to = 'jannae@nyu.edu';
    $subj = 'New CoP Submitted for '.$cleanvals['title'];

    $headers = 'From: '. $sender.$ln;
    $headers .= 'Reply-To: '.$sender;

    date_default_timezone_set('America/New_York');
    $submitted = date('Y-m-d H:i:s');

    $md  = '**Begin Markdown for creating the community page**'.$ln2;
    $md .= '---'.$ln;
    $md .= 'title: '.$cleanvals['title'].$ln;
    $md .= 'subtitle: '.$cleanvals['subtext'].$ln;
    $md .= 'layout: post'.$ln;
    $md .= 'date: '.$submitted.$ln;
    $md .= 'infocontact: '.$cleanvals['infocontact'].$ln;
    $md .= 'groupalias: '.$cleanvals['groupalias'].$ln;
    $md .= 'organized-date: '.$ln;
    $md .= 'imageurl: '.$cleanvals['imageurl'].$ln;
    $md .= 'image:'.$ln;
    $md .= '  main:'.$ln;
    $md .= '  mainalt:'.$ln;
    $md .= '  thumb:'.$ln;
    $md .= 'organized-date: '.$ln;
    $md .= 'members: '.$cleanvals['members'].$ln;
    $md .= 'meeting-style:'.$ln;
    $md .= '  inperson: '.$cleanvals['mtginperson'].$ln;
    $md .= '  remote: '.$cleanvals['mtgremote'].$ln;
    $md .= '  frequency: '.$cleanvals['mtgfrequency'].$ln;
    $md .= 'organizers:'.$ln;
    $md .= '- name: '.$cleanvals['contact1name'].$ln;
    $md .= '  contact: '.$cleanvals['contact1email'].$ln;
    $md .= '  okname: '.$cleanvals['contact1okname'].$ln;
    $md .= '  okemail: '.$cleanvals['contact1okemail'].$ln;
    $md .= '  isPrimary: true'.$ln;
    $md .= '- name: '.$cleanvals['contact2name'].$ln;
    $md .= '  contact: '.$cleanvals['contact2email'].$ln;
    $md .= '  okname: '.$cleanvals['contact2okname'].$ln;
    $md .= '  okemail: '.$cleanvals['contact2okemail'].$ln;
    $md .= '  isPrimary: false'.$ln;
    $md .= 'category: '.$ln;
    $md .= 'tags: []'.$ln;
    $md .= '---'.$ln2;
    $md .= $cleanvals['description'].$ln2;
    $md .= '##Planned Goal/Outcome'.$ln;
    $md .= $cleanvals['goal'].$ln2;
    $md .= '##Processes and Practices'.$ln;
    $md .= $cleanvals['process'].$ln2;

    $body .= $ln.$md;

    $contents  = 'Submitted: ' . $submitted.$ln;
    $contents .= 'To: ' . $to.$ln;
    $contents .= 'Subject: ' . $subj.$ln;
    $contents .= 'Headers: ' . $headers.$ln2;
    $contents .= 'Body: ' . $body.$ln;

    mail($to,$subj,$body,$headers);

    // For debugging when I don't have mail() (local)
    // $defaultfile = 'subs/new.txt';

    // if(!empty($cleanvals['name'])) {
    //     $file = 'subs/' . clean($cleanvals['name']) . '.txt';
    // } else {
    //     $file = $defaultfile;
    // }
    // file_put_contents($file, $contents, FILE_APPEND | LOCK_EX);

    return true;
}
