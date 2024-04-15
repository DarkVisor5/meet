Feature: Show/Hide Event Details

  As a user
  I want to be able to view more details about an event
  So that I can learn more about the events that interest me

  Scenario: An event element is collapsed by default
    Given the user has not interacted with any event
    When they view the list of events
    Then each event's details are hidden

  Scenario: User can expand an event to see its details
    Given the user views the list of events
    When the user clicks on "show details" for an event
    Then the event's details are displayed

  Scenario: User can collapse an event to hide its details
    Given an event's details are displayed
    When the user clicks on "hide details" for the event
    Then the event's details are hidden
