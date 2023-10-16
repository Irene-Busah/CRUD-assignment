$(document).ready(function () {
    function fetchUsers(page) {
        $.ajax({
            url: '/get-all-users/',
            type: 'get',
            data: {
                'page': page,
            },
            dataType: 'json',
            success: function (data) {
                $('#user-list table tbody').empty();
                for (const user of data.users) {
                    $('#user-list table tbody').append(`
                    <tr>
                        <td>${user.first_name} ${user.last_name}</td>
                        <td>${user.email}</td>
                        <td>${user.phone_number}</td>
                        <td>${user.date_of_birth}</td>
                    </tr>
                `);
                }
                renderPaginationLinks(data);
            },
            error: function () {
                alert('Error fetching user data');
            }
        });
    }

    $('#pagination').on('click', 'a', function (event) {
        event.preventDefault();
        const page = $(this).attr('href').split('page=')[1];
        fetchUsers(page);
    });

    // Initial load (page 1)
    fetchUsers(1);

    function renderPaginationLinks(data) {
        const numPages = data.total_pages;
        const currentPage = data.current_page;
        const hasPrevious = data.has_previous;
        const hasNext = data.has_next;

        const paginationDiv = $('#pagination');
        const stepLinks = paginationDiv.find('.step-links');
        stepLinks.empty();

        if (hasPrevious) {
            stepLinks.append(`<a href="?page=1">&laquo; first</a>`);
            stepLinks.append(`<a href="?page=${currentPage - 1}"> Previous </a>`);
        }

        stepLinks.append(`<span class="current-page">Page ${currentPage} of ${numPages} </span>`);

        if (hasNext) {
            stepLinks.append(`<a href="?page=${currentPage + 1}"> Next </a>`);
            stepLinks.append(`<a href="?page=${numPages}">last &raquo;</a>`)
        }
    }
});
