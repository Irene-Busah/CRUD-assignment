$(document).ready(function () {

    function getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(";").shift();
    }
    $("#delete-button").click(function () {
        $('#response-section').html('');
        $("#put-form").hide();
        $("#get-input").hide();
        $("#post-form").hide();
        $("#delete-input").show();
    });

    $("#submit-delete-id").click(function (event) {
        event.preventDefault();

        var userIdToDelete = $("#delete-user-id").val();
        if (userIdToDelete) {
            // Fetch user details and display them in the response section
            $.ajax({
                type: "GET",
                url: "/get_user/" + userIdToDelete + '/',
                success: function (userData) {
                    $("#response-section").html("<pre>" + JSON.stringify(userData, null, 2) + "</pre");
                    $("#delete-modal").show();
                },
                error: function () {
                    $("#response-section").html("User not found or an error occurred.");
                }
            });
        }
    });

    $("#cancel-delete-button").click(function () {
        $("#delete-input").hide();
        $("#delete-modal").hide();
    });

    $("#confirm-delete-button").click(function (event) {
        event.preventDefault();

        var userIdToDelete = $("#delete-user-id").val();
        if (userIdToDelete) {

            $.ajax({
                type: "DELETE",
                url: "/delete_user/" + userIdToDelete + '/',
                headers: { "X-CSRFToken": getCookie("csrftoken") },
                success: function () {
                    event.preventDefault();
                    $("#response-section").html("User deleted successfully.");
                    var table = $("#user-list table tbody");
                    $('#user-list table').on('ajax:success', 'tr', function (e, data) {
                        e.preventDefault()
                        var userIdToDelete = data.user_id;
                        if (userIdToDelete) {
                            var table = $("#user-list table tbody");
                            table.find('tr[data-user-id="' + userIdToDelete + '"]').remove();
                        }
                    });

                    table.find('tr[data-user-id="' + userIdToDelete + '"]').remove();
                },
                error: function () {
                    $("#response-section").html("An error occurred while deleting the user.");
                }
            });

            $("#delete-input").hide();
            $("#delete-modal").hide();
            $("#delete-user-id").val("");
        }
    });


});
