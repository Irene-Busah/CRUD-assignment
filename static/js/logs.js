$(document).ready(function () {

    function fetchLogs(page) {
        $.ajax({
            url: '/get-logs/',
            type: 'get',
            data: {
                'page': page,
            },
            dataType: 'json',
            success: function (data) {
                updateLogsTable(data);
            },
            error: function () {
                alert('Error fetching logs data');
            }
        });
    }

    function updateLogsTable(data) {
        const numPages = data.total_pages;
        const currentPage = data.current_page;
        const hasPrevious = data.has_previous;
        const hasNext = data.has_next;

        // Select the logs table's tbody
        const table = $('#logs-table table tbody');
        table.empty();

        for (const log of data.logs) {
            table.append(`
                <tr>
                    <td>${log.timestamp}</td>
                    <td>${log.path}</td>
                    <td>${log.method}</td>
                    <td>${log.user}</td>
                    
                </tr>
            `);
        }

        // Update the pagination links
        updatePaginationLinks(currentPage, numPages, hasPrevious, hasNext);
    }

    function updatePaginationLinks(currentPage, numPages, hasPrevious, hasNext) {
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

    // Initial load (page 1) of logs
    fetchLogs(1);

    $('#pagination').on('click', 'a', function (event) {
        event.preventDefault();
        const page = $(this).attr('href').split('page=')[1];
        fetchLogs(page);
    });
});
