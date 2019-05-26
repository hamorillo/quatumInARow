# quantumInARow
Qiskit Hackaton Madrid

It is neccesary to install Flask in Python.
This is the command to do so:
********************
pip install Flask
********************

After having Flask installed, you need to set FLASK_APP to the Python (.py) file that have the code for responding to HTTP requests.
And finally, run Flask.

For Linux / Mac OS
*************************
set FLASK_APP=server.py

flask run
*************************

For Windows (PowerShell console)
*****************************
$env:FLASK_APP = "server.py"

flask run
*****************************

If everything is ok, you will see an output like this:
-----------------------------------------------------------------------------
 * Serving Flask app "server.py"
 * Environment: production
   WARNING: Do not use the development server in a production environment.
   Use a production WSGI server instead.
 * Debug mode: off
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
 -----------------------------------------------------------------------------
