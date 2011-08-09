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
    node runner.js

Currently, you'll need to edit runner.js to include the files you want
to test. I'll work out runner.js to be a bit more flexible with arguments
passed to the commandline, directories, etc. eventually.

There are almost certainly better ways to do this -- please let me know
all of the gross abominations you notice, assuming you have a fix. :)
