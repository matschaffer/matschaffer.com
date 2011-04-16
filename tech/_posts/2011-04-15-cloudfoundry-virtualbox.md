---
layout: post
title: Running CloudFoundry with VirtualBox on OS X
---

So you might have seen the ["one click" installer](http://www.trottercashion.com/2011/04/14/automating-the-cloudfoundry-install.html) for CloudFoundry that my esteemed colleague Trotter Cashion posted yesterday. This is very cool. If you have an Ubuntu server handy you can run that script and you have a cloud. But I like to keep things local so I started working to get it installed on VirtualBox. And here's the solution, packaged as a script.

To use this script you'll need:
 - A Mac (Linux or Cygwin would need some tweaks, pull requests welcome!)
 - [VirtualBox](http://www.virtualbox.org/wiki/Downloads)

Then run this:

{% highlight bash %}
curl -L https://github.com/matschaffer/vcap/tarball/vbox-install | tar xf -
./matschaffer-vcap-*/setup/vbox_install
{% endhighlight %}

Accept the host key (should be 5f:f4:1f:14:4c:b8:5c:ad:11:b1:85:f3:f1:0d:a5:2c) and enter the password "ubuntu" once.

That's it! This script will import a minimal Ubuntu VM from our S3 bucket, set up bridged networking to your default interface, install your SSH key and kick off Trotter's install script.

It'll take an hour or so depending on your internet connection. When it's done, you'll get some instructions on updating your hosts file, registering with your new cloud and accessing the VirtualBox image. Follow those and enjoy your new personal cloud!
