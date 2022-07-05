# Cerebro

<br>

> It is actually a complex machine which I call [**Cerebro**](https://marvel.fandom.com/wiki/Cerebro_(Mutant_Detector)), from the Latin "cerebrum" meaning "the brain!"
Its sole purpose is to aid in detecting new mutant brain waves. To help locate other mutants... Both good and evil!!
>> Professor X

<br>

This project is a simple web application which allow us to calculate the Nth position of the [Fibonacci sequence](https://en.wikipedia.org/wiki/Fibonacci_number) in real time. Additionally the app stores every single request and sorts all of them in order to get a basic historical report which can be consumed publicly by every user who access the application.

## Structure

The project const of 3 modules (2 of them are grouped under the main Cerebro project):

- Cerebro UI: web app developed with Angular that consumes the API and displays the information with a friendly user interface
- Cerebro API REST: backend service which provides the logic controllers, models and some helper functions
- Cortex DB: SQL project where we can manage all the DB structure including Tables, Stored Procedures and Views

## Technologies

- Cerebro UI: Angular 13 (Typescript/JS, HTML and CSS)
  - Angular Material library (auxiliar components and styles)
- Cerebro API REST: .NET Core 6 (C#)
- Cortex DB: SQL Server 2019 (T-SQL)

## Cloud

All the project dependencies are hosted using Azure services, including App Service and DB server

## Demo

You can find a demo here: [Cerebro Demo](https://dev-cerebro.azurewebsites.net/)

<br>

<p align="center">
  <img src="https://user-images.githubusercontent.com/65900988/176465481-06c4571a-36de-4fdb-bb4d-c02a3b8ee320.png" height="260" width="200"/>
</p>
