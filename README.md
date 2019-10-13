# google-calendar-dsl
User friendly language to create google calendar events

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