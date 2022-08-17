Feature: Book a movie ticket for GoToCinema page
    Scenario: Book one movie ticket
        Given user is on "http://qamid.tmweb.ru/client/index.php" page
        When user is booking one ticket
        Then user sees a booking confirmation for one ticket

    Scenario: Book two movie tickets
        Given user is on "http://qamid.tmweb.ru/client/index.php" page
        When user is booking two tickets
        Then user sees a booking confirmation for two tickets

    Scenario: Should not book unavailable ticket
        Given user is on "http://qamid.tmweb.ru/client/index.php" page
        When user is trying to book unavailable ticket
        Then user can not click the button