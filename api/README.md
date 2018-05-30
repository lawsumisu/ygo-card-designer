# Yugioh API

## Setup
The API uses Docker to manage containers for the api server and database.

### Docker Toolbox
1. Install Docker Toolbox
1. In a shell, run `docker-machine start <machine_name>` (Ex: `docker-machine start default`).
1. Run `docker-compose build`.
1. Run `docker-compose up django`.
1. Navigate to http://localhost:8000/admin/ to view the admin page.

### Database Setup
Data is stored in a PostgreSQL Database.
1. Download psql.
1. Run `psql -U ygo_i2_user -h <docker-machine ip>` postgres`.
1. Within the psql shell, run `CREATE DATABASE ygo_i2_db;`.
1. To run the database migrations, run `docker-compose run django python migrate.py migrate`.
1. (Optional) Create a superuser (which can be used to login to the admin page): Run `docker-compoe run django python manage.py createsuperuser`.
    1. Follow the prompts to create a user.