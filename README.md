# trickle - Reverse Engineering Services you know

After having succeeded all exams this semester, we wanted to start a small OpenSource project with the smart programming language Clojure.


## Usage

### REPL

Clone the repo, start the REPL!

	$ lein repl


### Automatic tests

(Midje)[https://github.com/marick/Midje] is a great testing utility we are using here. Just define some facts and start the autotest functionality:

	$ lein midje :autotest

and each time you save your code, Midje runs through all facts, which are affected, and executes them.


## License

Copyright © 2014 Alexander Schneider and Christian Meter

Distributed under the Eclipse Public License either version 1.0 or (at
your option) any later version.
