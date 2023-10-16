# User Management and Request Logging Web Application

This is a Django-based web application that allows user management and request logging. Users can be created, updated, viewed and deleted, and the application log requests made to the homepage are displayed logs in a paginated list.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)


## Features

- **User Management:**
  - Create new users with details like name, email, phone number, and date of birth.
  - View, update and delete user information.

- **Request Logging:**
  - Logs requests made on the homepage.
  - Displays logs in a paginated list.
  - Excludes logging of specific requests (e.g., admin-related URLs).

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- Python 3.x
- Django 3.x

### Installation

1. Clone the project repository:

   ```bash
   git clone git@github.com:Irene-Busah/CRUD-assignment.git
   cd CRUD-assignment
2. Create a virtual environment and activate it (For Windows)
    ```bash
    python -m venv venv
    source venv/Script/activate
3. Generate and add a secret key in the settings.py using the link below
    https://djecrety.ir/

4. Install project dependencies
    ```bash
    pip install -r requirements.txt
5. Apply database migrations
    ```bash
    python manage.py makemigrations
    python manage.py migrate
6. Start the development server
    ```bash
    python manage.py runserver
## Usage
### User Management
1. Access the user management section by navigating to http://127.0.0.1:8000/

2. Create, view, update and delete user information using the buttons provided.

### Request Logging
1. Requests made on the homepage are logged automatically.

2. View the request logs by navigating to the page using the button provided.

3. Paginated logs are displayed, and you can navigate through them.
