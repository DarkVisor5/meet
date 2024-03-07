# Event Search App

The Event Search App is a React-based application that allows users to explore, filter, and interact with event data from various cities. With a user-centric design, it focuses on providing a seamless and efficient event browsing experience, even under suboptimal network conditions.

## Table of Contents
1. [Features](#features)
2. [User Stories](#user-stories)
3. [Technical Requirements](#technical-requirements)
4. [Project Deliverables](#project-deliverables)

## Features

- **Filter Events by City**: Enables users to filter events based on the city of their choice.
- **Show/Hide Event Details**: Users can toggle the visibility of event details for a simplified or detailed view.
- **Specify Number of Events**: Users can specify the number of events they wish to view at a time.
- **Offline Usage**: The app retains the last viewed data for accessibility even in offline mode.
- **Add App Shortcut to Home Screen**: Users can add the app shortcut on their device home screen for quicker access.
- **Charts Visualizing Event Details**: Provides a visual representation of upcoming events across different cities.

### Scenarios

#### Feature 1: Filter Events By City
- Scenario 1: Initially, display upcoming events from all cities.
- Scenario 2: As users type in a city name, provide a list of suggestions.
- Scenario 3: Allow users to select a city from the suggested list to filter events.

#### Feature 2: Show/Hide Event Details
    As a user,
    I should be able to expand and collapse event details
    So that I can view more information about an event or reduce clutter when needed.
    -Scenario: Expanding an event to see details
        Given the user is on the events page
        When the user clicks on an event element
        Then the event element expands to show event details

    -Scenario: Collapsing an event to hide details
        Given the user has expanded an event to view details
        When the user clicks on the event element again
        Then the event element collapses to hide event details


#### Feature 3: Specify Number of Events
    As a user,
    I should be able to specify the number of events displayed
    So that I can control the amount of information shown on one page.
    -Scenario: Changing the number of events displayed
        Given the user is on the events page
        When the user selects a different number from the "number of events" dropdown
        Then the page refreshes to display the selected number of events


#### Feature 4: Use the App When Offline
    As a user,
    I should be able to use the app when offline
    So that I can access event information without an internet connection.
    -Scenario: Viewing cached data when offline
        Given the user has no internet connection
        When the user opens the app
        Then the app displays the last cached data of events

    -Scenario: Showing error when changing search settings offline
        Given the user has no internet connection
        When the user tries to change the search settings
        Then an error message is displayed


#### Feature 5: Add an App Shortcut to the Home Screen
    As a user,
    I should be able to add the app shortcut to my device’s home screen
    So that I can quickly access the app whenever I need to.
    -Scenario: Adding app shortcut to the home screen
        Given the user is on the app page
        When the user selects "Add to Home Screen" from the options menu
        Then a shortcut of the app is added to the user’s home screen


#### Feature 6: Display Charts Visualizing Event Details
    As a user,
    I should be able to view charts visualizing event details
    So that I can understand the distribution of events across different cities at a glance.
    -Scenario: Viewing a chart of upcoming events in each city
        Given the user is on the charts page
        When the user selects the "Events by City" chart
        Then a chart displaying the number of upcoming events in each city is shown


## Serverless Architecture

In the Event Search App, we utilize a serverless architecture for managing our authorization server, specifically leveraging AWS Lambda functions. This approach aligns with our objective of creating a highly scalable and cost-effective infrastructure capable of handling backend processes efficiently.

Here's a breakdown of how serverless functions are utilized in our app:

- **Efficiency and Scalability**: 
    - Serverless functions enable automatic scaling based on the number of users, ensuring a consistent and reliable user experience even during times of peak usage.

- **Cost-Effectiveness**: 
    - The serverless model ensures that we only pay for the compute time we consume, thereby keeping operational costs low while maintaining high availability and reliability.

- **Simplified Operations**: 
    - The serverless framework abstracts away much of the backend infrastructure management, allowing us to focus more on building and refining the core functionality of our app.

- **Rapid Development and Deployment**: 
    - The serverless framework accelerates the development, testing, and deployment processes of our app, ensuring rapid iterations based on user feedback and analytics.

- **Authorization Server**: 
    - We have implemented an authorization server using AWS Lambda functions to manage the OAuth2 authentication flow with the Google Calendar API. This serverless authorization server securely handles OAuth tokens and provides a secure way for users to authenticate and authorize interactions with the Google Calendar events via our app.

By adopting a serverless architecture, we've created a robust backend for the Event Search App, ensuring a smooth and responsive user experience while maintaining low operational overhead.

## Features Technical Requirements

-The app must be a React application.
- The app must be built using the TDD technique.
- The app must use the Google Calendar API and OAuth2 authentication flow.
- The app must use serverless functions (AWS lambda is preferred) for the authorization server
instead of using a traditional server.
- The app’s code must be hosted in a Git repository on GitHub.
- The app must work on the latest versions of Chrome, Firefox, Safari, Edge, and Opera, as well
as on IE11.
- The app must display well on all screen sizes (including mobile and tablet) widths of 1920px
        and 320px.
- The app must pass Lighthouse’s PWA checklist.
- The app must work offline or in slow network conditions with the help of a service worker.
- Users may be able to install the app on desktop and add the app to their home screen on
        mobile.
- The app must be deployed on GitHub Pages.
- The app must implement an alert system using an OOP approach to show information to the
        user.
- The app must make use of data visualization.
- The app must be covered by tests with a coverage rate >= 90%.
- The app must be monitored using an online performance monitoring tool.       

## Project Deliverables

Exercise 4.1: TDD & Test Scenarios
- Write user stories based on the app’s key features.
- Translate user stories for each feature into multiple test scenarios.
- Use create-react-app to create a React app and push it to GitHub.
- Deploy a React app to GitHub Pages.
Exercise 4.2: Intro to Serverless Functions & Authentication
- Evaluate the merit and usefulness of serverless development
- Connect a React app with a protected API
- Prepare an OAuth client for authorization and authentication
- Obtain AWS credentials for future use
Exercise 4.3: Writing & Testing AWS Lambda Functions
- Write Lambda functions to implement serverless technology in an app
- Test Lambda functions
- Create a serverless deployment package
Exercise 4.4: Unit Testing
- Analyze use cases for unit tests
- Write unit tests for an app
- Test components using mock data
- Develop implementation code in response to unit tests
Exercise 4.5: Integration Testing
- Analyze use cases for integration tests
- Write integration tests
- Develop implementation code in response to integration tests
- Integrate real data from an API into a web app
Exercise 4.6: User Acceptance Testing & End-to-End Testing
- Describe the purpose of end-to-end testing during development
- Write acceptance tests for an app to help non-developer stakeholders understand
implementation code
- Conduct automated end-to-end testing for an app
- Handle testing errors in the terminal
Exercise 4.7: Continuous Delivery
- Discuss how CI and CD practices can help developers and organizations deliver
high-quality products
- Integrate an APM tool into the development of a web app
Exercise 4.8: Object-Oriented Programming (OOP)
- Define core concepts related to the OOP paradigm.
- Differentiate between when to use functional programming (FP) and when to use
- OOP to solve architectural problems (and when to use both).
- Implement a feature in your web app using OOP and React class components.
Exercise 4.9: Progressive Web Apps
- Discuss what progressive web apps (PWAs) are and how they compare to regular web apps
and native apps.
- Explain the core functionality of PWAs.
- Implement progressive functionality into an existing app, so that the app can be used offline
and added to a user’s home screen.
Exercise 4.10: Data Visualization
- Transform API data into a visual format using a visualization library.
- Implement data visualization features into a web app’s UI.
- Conduct research into a library’s documentation to implement new features.
Optional: Advanced Deliverables
In addition to all of the above, you can add more advanced features to your app as you wish. Below
are some topics you could explore in your app:
- Use the Lambda inline editor to create the authorization server instead of using the
serverless toolkit.
- Style your app using React-Bootstrap.
- Write end-to-end tests for your app using Puppeteer.
- Conduct QA to test your app and fix any issues your testers may find

