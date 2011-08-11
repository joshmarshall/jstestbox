Javascript Test Box
===================

The purpose of this is just to create a basic Vagrant box that compiles
Node.js + NPM and installs NodeUnit + JSDOM for unit / integration
testing of Javascript code.

Theoretically, this should be able to test standalone libraries and simple
DOM libraries. Eventually, I want to add jQuery-Mockjax so that mock
AJAX calls can be easily created, and I want to abstract a simple
jsdom / jQuery TestCase so that the boilerplate in tests.js isn't
necessary.

Running
-------

You will need Vagrant and VirtualBox first.

All you should have to do to spin this up is:

    vagrant up

Then, to actually run the tests:

    vagrant ssh
    cd /vagrant
    node runner.js [optional path(s)]

The paths you pass to runner.js will be parsed looking for nodeunit tests.
If not path is provided, it will search the current directory recursively
for tests.

There are almost certainly better ways to do this -- please let me know
all of the gross abominations you notice, assuming you have a fix. :)
