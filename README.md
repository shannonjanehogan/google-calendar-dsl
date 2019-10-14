# calendar-dsl
User friendly language to create calendar files!

To install and build, `yarn install && yarn build`

To run, `yarn calendar <optional path to input file, or inputs/valid_sample.cal by default>`

After, please upload your calendar to iCal or Outlook! Google Calendar does not respect event attendees in ICS files :(

```
EBNF Syntax:
PROGRAM	        ::=	“Start” CALTYPES+ “End” 
CALTYPES	::=	[EVENTS|GUESTS|REMINDERS|LOCATIONS] “Done”
EVENTS	        ::=	“Events:” [EVENT]+
EVENT		::=	“STRING [“every” DAYOFWEEK (“and” DAYOFWEEK)*|“on” DATE]
              [“all day”|”from” TIME to TIME] (“at” STRING)?
              (“with” STRING (“and” STRING)*)?
DATE		::=	MM DD, YYYY
TIME		::= hh:mm
DAYOFWEEK 	::=	[“Sunday”|“Monday”|“Tuesday”|“Wednesday”|“Thursday”|
                “Friday”|“Saturday”]
GUESTS	        ::=	“Guests:” [GUEST]+
GUEST		::=	STRING is STRING with EMAIL
EMAIL 	        ::= STRING\@STRING.STRING
LOCATIONS	::=	“Locations:” [LOCATION]+
LOCATION	::= STRING: STRING
```