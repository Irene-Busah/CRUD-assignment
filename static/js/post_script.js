$(document).ready(function () {
    $("#post-button").click(function () {
        $('#response-section').html('');
        $("#delete-input").hide();
        $("#put-form").hide();
        $("#get-input").hide();

        $("#post-form").show();
    });

    $("#add-user-form").submit(function (event) {
        event.preventDefault();
        var csrftoken = getCookie('csrftoken');
        var postData = {
            first_name: $("#first-name").val(),
            last_name: $("#last-name").val(),
            email: $("#email").val(),
            phone_number: $("#phone-number").val(),
            date_of_birth: $("#date-of-birth").val(),
            csrfmiddlewaretoken: csrftoken
        };

        // Perform an AJAX POST request to add a new user
        $.ajax({
            type: "POST",
            url: "/post-user/",
            data: postData,
            success: function (data) {

                var userData = data;

                var responseHtml = "User added successfully!<br>";
                responseHtml += "<pre>" + JSON.stringify(userData, null, 2) + "</pre>";

                $("#response-section").html(responseHtml);

                var userRow = '<tr>' +
                    '<td>' + userData.first_name + ' ' + userData.last_name + '</td>' +
                    '<td>' + userData.email + '</td>' +
                    '<td>' + userData.phone_number + '</td>' +
                    '<td>' + userData.date_of_birth + '</td>' +
                    '</tr>';

                $("#user-list table tbody").append(userRow);

                // Clear the form
                $("#first-name").val('');
                $("#last-name").val('');
                $("#email").val('');
                $("#phone-number").val('');
                $("#date-of-birth").val('');
            },
            error: function () {
                // Handle errors
                $("#response-section").html("An error occurred while adding the user.");
            }
        });
    });
});

// Function to get the CSRF token from cookies
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}
