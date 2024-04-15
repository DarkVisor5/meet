Feature: Specify Number of Events

  As a user
  I want to be able to specify the number of events I view
  So that I can control the amount of information displayed on the page

  Scenario: By default, 32 events are shown
    Given the user has not specified a number of events
    When the user views the list of events
    Then 32 events are shown on the page

  Scenario: User can change the number of events they want to see
    Given the list of events is displayed
    When the user specifies a number of events to view
    Then that specific number of events is displayed on the page

