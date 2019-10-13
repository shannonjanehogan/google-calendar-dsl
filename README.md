# google-calendar-dsl
User friendly language to create google calendar events

To run, type the following into the command line:

`yarn install && yarn run build && yarn run calendar`

This will output an ics file in outputs/events.ics

Drag and drop outputs/events.ics into a calendar to see your newly created events!

```
EBNF Syntax:
PROGRAM	    ::=	“Start” CALTYPES+ “End”
CALTYPES	  ::=	[EVENTS|GUESTS|REMINDERS|LOCATIONS] “Done”
EVENTS	    ::=	“Events:” [EVENT]+
EVENT		    ::=	“STRING [“every” DAYOFWEEK (“and” DAYOFWEEK)*|“on” DATE]
              [“all day”|”from” TIME to TIME] (“at” STRING)?
              (“with” STRING (“and” STRING)*)?
DATE		    ::=	MM DD, YYYY
TIME		    ::= hh:mm
DAYOFWEEK 	::=	[“Sunday”|“Monday”|“Tuesday”|“Wednesday”|“Thursday”|
                “Friday”|“Saturday”]
REMINDERS	  ::=	“Reminders:” REMINDER+
REMINDER	  ::=	STRING: STRING “on" DATE, (“description:” STRING)?
GUESTS	    ::=	“Guests:” [GUEST]+
GUEST		    ::=	STRING is STRING with EMAIL
EMAIL 	    ::= STRING\@STRING.STRING
LOCATIONS	  ::=	“Locations:” [LOCATION]+
LOCATION	  ::= STRING: STRING
```
