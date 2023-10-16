$(document).ready(function () {
    $("#put-button").click(function () {
        $('#response-section').html('');
        $("#delete-input").hide();
        $("#get-input").hide();
        $("#post-form").hide();
        $("#put-form").show();
    });

    // Include the CSRF token in the AJAX request headers
    var csrftoken = $("[name=csrfmiddlewaretoken]").val();
    $.ajaxSetup({
        headers: { "X-CSRFToken": csrftoken }
    });

    // When the PUT form is submitted, handle the AJAX PUT request
    $("#update-user-form").submit(function (event) {
        event.preventDefault();

        var userId = $("#put-user-id").val();
        var dobInput = $("#put_date_of_birth").val();

        // Check if the date input is empty
        if (!dobInput) {
            $("#response-section").html("Invalid date format. Please enter a valid date.");
            return;
        }

        // Format the date in YYYY-MM-DD format
        var dob = new Date(dobInput);
        var formattedDate = dob.toISOString().split('T')[0];

        var updatedData = {
            put_user_id: userId,
            put_first_name: $("#put_first_name").val(),
            put_last_name: $("#put_last_name").val(),
            put_email: $("#put_email").val(),
            put_phone_number: $("#put_phone_number").val(),
            put_date_of_birth: formattedDate
        };

        // Perform an AJAX PUT request to update user details
        $.ajax({
            type: "PUT",
            url: "/update_user/" + userId + "/",
            data: JSON.stringify(updatedData),
            contentType: "application/json",
            success: function (data) {
                if ("error" in data) {
                    $("#response-section").html("User not found or an error occurred.");
                } else {
                    // Update the table row with the updated data
                    var userRow = '<tr data-user-id="' + userId + '">' +
                        '<td>' + data.first_name + ' ' + data.last_name + '</td>' +
                        '<td>' + data.email + '</td>' +
                        '<td>' + data.phone_number + '</td>' +
                        '<td>' + data.date_of_birth + '</td>' +
                        '</tr>';

                    var table = $("#user-list table tbody");
                    var existingRow = table.find('tr[data-user-id="' + userId + '"]');
                    existingRow.html(userRow);

                    var responseSection = $("#response-section");
                    responseSection.html("User updated successfully!");

                    // Display the updated user data in the response section
                    var updatedUserData = "First Name: " + data.first_name + "<br><br>" +
                        "Last Name: " + data.last_name + "<br><br>" +
                        "Email: " + data.email + "<br><br>" +
                        "Phone Number: " + data.phone_number + "<br><br>" +
                        "Date of Birth: " + data.date_of_birth;

                    responseSection.append("<br><br>Updated User Data:<br><br>" + updatedUserData);

                }
            },
            error: function () {
                $("#response-section").html("User not found or an error occurred.");
            }
        });
    });
});
