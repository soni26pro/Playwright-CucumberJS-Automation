Feature: Searching and Sharing on haggadot.com
  As a user I want to be able to search and share my favorite haggadahs so I can spread the word around jewish rituals

  Scenario Outline: Searching for a Haggadah
    Given I am on the home page
    When I search for 'haggadahs' next to Our Favorite Haggadahs
    Then I should see a list of 'haggadahs' matching the keyword
    And I choose to share the first result
    Then I should be provided with a link to copy for sharing purposes
    And I should be able to share it as a post on '<socialMedia>'

    Examples:
      | socialMedia |
      | Facebook    |
      | Twitter     |
      | LinkedIn    |
