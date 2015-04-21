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
            // COP information Column:
            var copname = $('input#cop-name').val();
            var copsubtext = $('input#cop-subtext').val();
            var copdescription = $('textarea#cop-description').val();
            var copgoal = $('textarea#cop-goal').val();
            var copimageurl = $('input#cop-imageurl').val();

            // Engagement/Membership Section
            var copmembers = $('select#cop-members').val();
            var copprocess = $('textarea#cop-process').val();
            // meeting style checkboxes
            var copmtginperson = $('input#cop-mtginperson').val();
            var copmtgremote = $('input#cop-mtgremote').val();
            // Under the checkboxes
            var copmtgfrequency = $('select#cop-mtgfrequency').val();
            var copinfocontact = $('input#cop-infocontact').val();
            var copgroupalias = $('input#cop-groupalias').val();

            //Contact Info Section:
            var copcontact1name = $('input#cop-contact1-name').val();
            var copcontact1email = $('input#cop-contact1-email').val();
            var copcontact1okname = $('input#cop-contact1-okname').val();
            var copcontact1okemail = $('input#cop-contact1-okemail').val();
            var copcontact2name = $('input#cop-contact2-name').val();
            var copcontact2email = $('input#cop-contact2-email').val();
            var copcontact2okname = $('input#cop-contact2-okname').val();
            var copcontact2okemail = $('input#cop-contact2-okemail').val();

            $.ajax({
                url: 'mail/get_started.php',
                type: 'POST',
                data: {
                    title: copname,
                    subtext: copsubtext,
                    description: copdescription,
                    goal: copgoal,
                    imageurl: copimageurl,
                    members: copmembers,
                    process: copprocess,
                    mtginperson: copmtginperson,
                    mtgremote: copmtgremote,
                    mtgfrequency: copmtgfrequency,
                    infocontact: copinfocontact,
                    groupalias: copgroupalias,
                    contact1name: copcontact1name,
                    contact1email: copcontact1email,
                    contact1okname: copcontact1okname,
                    contact1okemail: copcontact1okemail,
                    contact2name: copcontact2name,
                    contact2email: copcontact2email,
                    contact2okname: copcontact2okname,
                    contact2okemail: copcontact2okemail
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
