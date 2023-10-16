$(document).ready(function () {
    $("#get-button").click(function () {
        $('#response-section').html(''); // Clear the response section
        $("#delete-input").hide();
        $("#post-form").hide();
        $("#put-form").hide();
        $("#get-input").show();
    });

    $("#get-user-details").click(function () {
        var userId = $("#get-user-id").val();

        $.ajax({
            type: "GET",
            url: "/get_user/" + userId + "/", // Update the URL
            success: function (data) {
                if ("error" in data) {
                    $("#response-section").html("User not found or an error occurred.");
                } else {
                    // Display the retrieved user data in the response section
                    var responseHtml = "User Details (JSON-like):<br>";
                    responseHtml += "<pre>" + JSON.stringify(data, null, 2) + "</pre>";
                    $("#response-section").html(responseHtml);
                }
            },
            error: function () {
                $("#response-section").html("User not found or an error occurred.");
            }
        });
    });
});
