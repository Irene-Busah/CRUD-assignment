from django.shortcuts import render
from django.http import JsonResponse
from .models import User, RequestLog
from django.views.decorators.csrf import csrf_exempt
import json
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage



def index(request):
    # renders the homepage
    return render(request, 'index.html')


def request_logs(request):
    # renders the logs
    return render(request, 'logs.html')

def get_all_users(request):
    users = User.objects.order_by('id')
    items_per_page = 5
    pages = request.GET.get('page')
    paginator = Paginator(users, items_per_page)
    
    try:
        users = paginator.page(int(pages))
    except EmptyPage:
        users = paginator.page(paginator.num_pages)
    user_data = [
        {
            'id': user.id,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'phone_number': user.phone_number,
            'date_of_birth': user.date_of_birth,
        }
        for user in users
    ]
    # print(user_data)
    return JsonResponse({'users': user_data, 'current_page': users.number, 'total_pages': paginator.num_pages, 'has_previous': users.has_previous(), 'has_next': users.has_next()})


def add_user(request):
    if request.method == 'POST':
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        email = request.POST.get('email')
        phone_number = request.POST.get('phone_number')
        dob = request.POST.get('date_of_birth')
        print(first_name, last_name, email, phone_number, dob)

        user = User(first_name=first_name, last_name=last_name, email=email, phone_number=phone_number, date_of_birth=dob)
        user.save()
        
        user_data = {
            'first_name': first_name,
            'last_name': last_name,
            'email': email,
            'phone_number': phone_number,
            'date_of_birth': dob,
        }

        return JsonResponse(user_data)
    else:
        return JsonResponse({'message': 'Error adding user'}, status=400)

def get_user(request, id):
    try:
        user = User.objects.get(id=id)
        user_data = {
            'id': user.id,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'phone_number': user.phone_number,
            'date_of_birth': user.date_of_birth,
        }
        return JsonResponse(user_data)
    except User.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)



# @csrf_exempt  
def update_user(request, id):
    if request.method == 'PUT':
        try:
            user = User.objects.get(id=id)
            request_data = json.loads(request.body.decode('utf-8'))
            
            # Parse the JSON data from the request
            print(user)

            # Update the user model with the new data
            user.first_name = request_data.get('put_first_name')
            user.last_name = request_data.get('put_last_name')
            user.email = request_data.get('put_email')
            user.phone_number = request_data.get('put_phone_number')
            user.date_of_birth = request_data.get('put_date_of_birth')
            user.save()
            print(user)

            user_data = {
                'id': user.id,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
                'phone_number': user.phone_number,
                'date_of_birth': user.date_of_birth,
            }
            print(user_data)
            return JsonResponse(user_data)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)

def delete_user(request, id):
    if request.method == 'DELETE':
        try:
            user = User.objects.get(id=id)
            user.delete()
            return JsonResponse({'message': 'User deleted successfully'})
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)



# =============================== LOG ===============================

def get_logs(request):
    # Retrieve all request logs from the database
    logs = RequestLog.objects.all().order_by('-timestamp')

    # Configure the number of logs to display per page
    items_per_page = 10
    page = request.GET.get('page')
    paginator = Paginator(logs, items_per_page)

    try:
        logs = paginator.page(page)
    except PageNotAnInteger:
        logs = paginator.page(1)
    except EmptyPage:
        logs = paginator.page(paginator.num_pages)

    # Convert the logs to a list of dictionaries
    log_data = [
        {
            'timestamp': log.timestamp.strftime('%b. %d, %Y, %I:%M %p'),
            'path': log.path,
            'method': log.method,
            'user': request.user.username ,
        }
        for log in logs
    ]

    return JsonResponse({'logs': log_data, 'current_page': logs.number, 'total_pages': paginator.num_pages, 'has_previous': logs.has_previous(), 'has_next': logs.has_next()})

