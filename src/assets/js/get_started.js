'use strict';

/*jshint browser: true, strict: true, undef: true, jquery: true */
/*global define: false */

$(function() {

    $('input,textarea,select').jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var copname = $('input#cop-name').val();
            var copdescription = $('textarea#cop-description').val();
            var copgoal = $('textarea#cop-goal').val();
            var copmembers = $('select#cop-members').val();
            var copprocess = $('textarea#cop-process').val();
            // meeting style checkboxes
            var copmtginperson = $('input#cop-mtginperson').val();
            var copmtgremote = $('input#cop-mtgremote').val();

            var copmtgfrequency = $('select#cop-mtgfrequency').val();
            var copcontactinfo = $('input#cop-groupcontact').val();
            //Contact Info:
            var copcontact1name = $('input#cop-contact1-name').val();
            var copcontact1email = $('input#cop-contact1-email').val();
            var copcontact1phone = $('input#cop-contact1-phone').val();
            var copcontact2name = $('input#cop-contact2-name').val();
            var copcontact2email = $('input#cop-contact2-email').val();
            var copcontact2phone = $('input#cop-contact2-phone').val();

            $.ajax({
                url: 'http://cop.jann.ae/mail/get_started.php',
                type: 'POST',
                data: {
                    title: copname,
                    description: copdescription,
                    goal: copgoal,
                    members: copmembers,
                    process: copprocess,
                    mtginperson: copmtginperson,
                    mtgremote: copmtgremote,
                    mtgfrequency: copmtgfrequency,
                    groupcontact: copcontactinfo,
                    contact1name: copcontact1name,
                    contact1email: copcontact1email,
                    contact1phone: copcontact1phone,
                    contact2name: copcontact2name,
                    contact2email: copcontact2email,
                    contact2phone: copcontact2phone
                },
                cache: false,
                success: function() {
                    // Success message
                    $('#success').html('<div class="alert alert-success">');
                    $('#success > .alert-success').html('<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;')
                        .append('</button>');
                    $('#success > .alert-success')
                        .append('<strong>Your message has been sent. </strong>');
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contactForm').trigger('reset');
                },
                error: function() {
                    // Fail message
                    $('#success').html('<div class="alert alert-danger">');
                    $('#success > .alert-danger').html('<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;')
                        .append('</button>');
                    $('#success > .alert-danger').append('<strong>Sorry, it seems that my mail server is not responding. Please try again later!');
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger('reset');
                },
            });
        },
        filter: function() {
            return $(this).is(':visible');
        },
    });

    $('a[data-toggle=\'tab\']').click(function(e) {
        e.preventDefault();
        $(this).tab('show');
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
