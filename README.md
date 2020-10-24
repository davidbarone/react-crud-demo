# react-crud-demo

A simple task-list crud demo app featuring react + web api (.NET Core)

This is a simple demo application featuring:

- Pesistence layer (Microsoft SQL Server)
- Web API (.NET Core)
- UI (React)

It can serve as a quick demo application.

# Prerequisites

To build and run, you'll need the following tools:

## Microsoft SQL Server

I used the Express edition as its free.

## Microsoft SQL Server Management Studio (SSMS)

This was required to create the back-end database, as well as to view the data. I used version 18.

## .NET Core SDK

I've used v3.1.8.

## Node / NPM

The Node / NPM stack needs to be installed to develop the react front-end.

## VSCode

I've used VSCode as the editor. VSCode now supports workspaces meaning you can open the API project and the react project as if one solution.

# Design

The application is a simple to-do list and allows a user to manage a list of 'tasks'. It will allow a user to:

- View a list of tasks
- Add a task
- Edit a task
- Delete a task
- Mark a task as complete

Each task will have the following attributes:

- ID (integer) - this will be auto-generated by the database
- Description - A description of the task
- Priority - The task priority from 1 (highest) to 5 (lowest)
- DueDate - The date that the task is due
- IsComplete - A boolean flag which is set to true when the task is complete

## URLs

The API will implement the following endpoints:

| Method | Url                 | Action                      |
| ------ | ------------------- | --------------------------- |
| GET    | /tasks              | Gets a list of tasks        |
| GET    | /tasks/:id          | Gets a single task by `:id` |
| POST   | /tasks              | Creates a new task          |
| PUT    | /tasks/:id          | Updates a task by `:id`     |
| DELETE | /tasks/:id          | Deletes a task by `:id`     |
| PUT    | /tasks/complete/:id | Completes a task by `:id`   |

# Database

The database should be named `react-crud-demo`. I created this manually using SSMS. The `Task` table can then be created with the following script:

```sql
USE [react-crud-demo]
GO

/****** Object:  Table [dbo].[Task]    Script Date: 22/10/2020 12:08:43 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Task](
	[TaskId] [int] IDENTITY(1,1) NOT NULL,
	[TaskDescription] [varchar](1000) NOT NULL,
	[TaskPriority] [tinyint] NOT NULL,
	[TaskDue] [date] NOT NULL,
	[TaskComplete] [bit] NOT NULL,
PRIMARY KEY CLUSTERED
(
	[TaskId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
```

# API

The API project was bootstrapped using the following command:

`dotnet new webapi -n react-crud-demo-api`

The API project was added to a new workspace in VSCode (so we can open both the API and UI project later in the same VSCode environment).

Initial references added:

```
dotnet add package dapper
dotnet add package System.Data.SqlClient
```

## Connection Strings

The database connection string was added into appsettings.json, and injected into the code using the `IOptions` pattern. This involved:

- Adding the connection string into appsettings.json
- Creating a `ConnectionStringConfig` class to represent the configuration
- Registering the `ConnectionStringConfig` class as a service in the `StartUp.cs` file
- Adding an `IOptions<ConnectionStringConfig>` parameter on the controller constructor

https://docs.microsoft.com/en-us/aspnet/core/fundamentals/configuration/options?view=aspnetcore-3.1

## Adding Swagger / Swashbuckle

For improved testing / documentation of the API, it's a good idea to add in Swagger support. This can be done by installing the Swashbuckle package:

`dotnet add package Swashbuckle.AspNetCore`

and adding the Swashbuckle generator to the `services` collection in the `StartUp.ConfigureServices` method.

```cs
services.AddSwaggerGen();
```

and enabling middleware support for serving the generated JSON document and the Swagger UI by adding code to the `Configure` method.

```cs
app.UseSwagger();

...

app.UseSwaggerUI(c => {c.SwaggerEndPoint("/swagger/v1/swagger.json","react-crud-demo")});
```

## Launch Profiles

A Development profile was edited in the LaunchSettings.json file. http schema was defined here (port 5000).

## CORS

Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served. Typically, when running the API and UI, both will be running under different domains or ports (for example in development, the API is running under localhost:5000 whereas the UI is running under localhost:3000).

To implement a simple global policy to all all domains to be able to access the API, CORS must be enabled in the `startup.cs` file in the API:

``` cs
public void ConfigureServices(IServiceCollection services) {

	...

	// CORS
    services.AddCors();
}

public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {

	...

    // global cors policy
    // allow any origin
    app.UseCors(x => x
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowAnyOrigin()
        .SetIsOriginAllowed((host) => true));
}
```

(note that the `app.UseCors` line must be placed after the `app.UseRouting();` line)

## Building the API project

`dotnet build`

## Running the API project

To run the API using the Development profile, run:

`dotnet run --launch-profile Development`

Then open browser, and navigate to http://localhost:5000/swagger

If everything builds and runs correctly, you should see something like this on the swagger homepage:

![react-crud-demo-swagger](https://github.com/davidbarone/react-crud-demo/blob/main/images/swagger.png?raw=true)

https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-run
https://docs.microsoft.com/en-us/aspnet/core/fundamentals/environments?view=aspnetcore-3.1

# UI

The UI is built using React. The boilerplate code was created using:

`npx create-react-app react-crud-demo-ui`

## React Folder Structure

All the components, utils and other dynamic files go into the /src folder. This involved a small rearrangement of files. In particular the default `App` component was moved into a new /app folder within a new /components folder within /src. All the components are to go into separate folders in /components for a cleaner code structure.

In summary, static files go into the /public folder, and dynamic webpack files go into the /src folder.

## React Router

React-router-dom was installed via:

`npm i react-router-dom`.

The router was implemented as follows:
- Created `Home` and `About` components
- Added a `Router` component in the `App` component. This:
  - Displays a custom `NavBar` component
  - Added multiple `Route` components to redirect based on the route selected.

## .env File

The API base URL is configured in .env file. This file will not be stored in github by default.

You will need to manually create a .env file in the root of the UI project with the following contents:

```
REACT_APP_API_BASE=http://localhost:5000
```