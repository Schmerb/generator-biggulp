#<%= name.project %>
General Information
* Internal Project Name: <%= name.internal %>
* External Project Name: <%= name.external %>
* Confluence Page: [<%= name.internal %>](<%= name.internal %> "<%= name.internal %>")
* Project Contains Locally Stored Assets: **<%= local.assets %>**
* Remote/Cloud DBs: **<%= local.db %>**
* Project requires node V4.8.*
---------------------------------

# Frontend Information
## Themes & Frameworks & SDK
* Admin Theme

Personal boilerplate for creating static sites using compass, scss, bourbon, jquery, grunt and html5 goodness.
## Process Steps

To view site with live reload run the following commands:
1. only edit build/* files
2. `npm install grunt -g`
3. `npm install`
4. `grunt watch`
5. Follow prompts in terminal.

---------------------------------

# Backend Information
## Software
* Laravel Framework Version \*.\*.\*

## Run Site Process
1. `composer install`
2. `composer update`
3. `php artisan serve`
4. Follow prompts in terminal.

## Log Locations
* Apache Logs: `/var/logs/projectname`
* Error Log: `error.log`
* Access Log: `access.log`
* Application Logs: `./storage/logs`
* All Logs: `laravel.log`

---------------------------------

# Change Log

**Upgraded 5.2 to 5.3**
* [4df0b8be](https://www.google.com) - commit or branch with info after it.

**Upgraded 5.1 to 5.2**
* [6d24997f](https://www.google.com) - commit or branch with info after it.
