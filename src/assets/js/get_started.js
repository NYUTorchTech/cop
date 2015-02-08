$(function() {

    $("input,textarea,select").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var cop-name = $("input#cop-name").val();
            var cop-description = $("textarea#cop-description").val();
            var cop-goal = $("textarea#cop-goal").val();
            var cop-members = $("select#cop-members").val();
            var cop-process = $("textarea#cop-process").val();
            // meeting style checkboxes
            var cop-mtginperson = $("input#cop-mtginperson").val();
            var cop-mtgremote = $("input#cop-mtgremote").val();

            var cop-mtgfrequency = $("select#cop-mtgfrequency").val();
            //Contact Info:
            var cop-contact1-name = $("input#cop-contact1-name").val();
            var cop-contact1-email = $("input#cop-contact1-email").val();
            var cop-contact1-phone = $("input#cop-contact1-phone").val();
            var cop-contact2-name = $("input#cop-contact2-name").val();
            var cop-contact2-email = $("input#cop-contact2-email").val();
            var cop-contact2-phone = $("input#cop-contact2-phone").val();

            // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            var firstName = name;
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "././mail/get_started.php",
                type: "POST",
                data: {
                    name: cop-name,
                    description: cop-description,
                    goal: cop-goal,
                    members: cop-members,
                    process: cop-process,
                    mtginperson: cop-mtginperson,
                    mtgremote: cop-mtgremote,
                    mtgfrequency: cop-mtgfrequency,
                    contact1-name: cop-contact1-name,
                    contact1-email: cop-contact1-email,
                    contact1-phone: cop-contact1-phone,
                    contact2-name: cop-contact2-name,
                    contact2-email: cop-contact2-email,
                    contact2-phone: cop-contact2-phone
                },
                cache: false,
                success: function() {
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function() {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
