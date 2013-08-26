My Cloud9 IDE
========================

This is a Chrome app which you can use to run your own installed or hosted version of Cloud9 from your local system or remote server.

It now has initial stages of hosted c9.io support as well for those that can log in with a username and password on c9.io:80 if you are signed up with a github or bitbucket login just hit the forgot password using your email and you will get a new password to login in with on C9.io along with still being able to hit the single sign on button in the browser version.

When you start the app up enter any information needed to reach your cloud9 installation. The minimum required is the hostname to your cloud9 server. Everything else will default to the placeholder values you see in the input fields.

Make sure to put your username and password in before you hit connect as the current state of the app does not handle invalid credentials for your server nor does it handle returning to the login screen, you will need to restart the app.

There are many more issues to be fixed with this implementation, but it is a good working alpha after just one nights coding. Please feel free to contribute and/or file bugs. 


> Written with [StackEdit](http://benweet.github.io/stackedit/).
