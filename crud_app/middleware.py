import datetime
import re
from .models import RequestLog
from django.utils.timezone import now
from django.db import IntegrityError
from django.http import JsonResponse

class RequestLoggingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        # Log the request after the response is generated
        self.log_request(request, response)

        return response

    def log_request(self, request, response):
        """
        Log the request to the RequestLog model.
        """
        excluded_paths = [
            r'^/admin/',
            r'^/admin/jsi18n/',
            r'^/request-logs/',
            r'^/get-logs/',
            r'^/favicon.ico'
        ]

        for pattern in excluded_paths:
            if re.match(pattern, request.path):
                return

        log_entry = RequestLog()
        log_entry.path = request.path
        log_entry.method = request.method
        log_entry.status_code = response.status_code

        if request.user.is_authenticated:
            log_entry.user = request.user.username
        else:
            log_entry.user = "Anonymous User"

        # Get the current date and time
        log_entry.timestamp = now()

        # Set the remote_addr field
        log_entry.remote_addr = request.META.get('REMOTE_ADDR', '')
        log_entry.save()
        

