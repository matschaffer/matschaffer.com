---
layout: post
title: Run CI locally on Jenkins
---

At [Mashion](http://mashion.net) our usual pairing setup means we have one laptop that's not doing much work. It's handy to have for email, or breaking off to google something but it's idle most of the time.

When looking for a CI solution on a recent project, it made sense to me to use that second machine rather than spend money on a VPS. So I set out to make a simple local Jenkins server. Here's what I came up with.

First install the jenkins.rb gem and start the server:

{% highlight bash %}
gem install jenkins jenkins-war
jenkins server --daemon
{% endhighlight %}

Once the server is up and running (check [localhost:3001](http://localhost:3001)) use the Java Jenkins CLI to install the git plugin or whatever plugins you need for your setup.

{% highlight bash %}
CLI=$HOME/.jenkins/server/war/WEB-INF/jenkins-cli.jar
java -jar $CLI -s http://localhost:3001 install-plugin git
java -jar $CLI -s http://localhost:3001 safe-restart
{% endhighlight %}

Once Jenkins restarts you'll probably want to set up outbound email. I did this using my gmail account and [these instructions](https://wiki.jenkins-ci.org/display/JENKINS/GMail) on the Jenkins wiki. Do this on the [Jenkins config page](http://localhost:3001/configure).

{% highlight bash %}
jenkins configure --host localhost --port 3001
jenkins create path/to/project --template none
{% endhighlight %}

Here I opted not to use a project template. The ones that come with jenkins.rb don't poll Git or email on failures. I also prefer keeping the build steps in `script/ci` in the project's git repo since it's easier to update and port across languages and frameworks.

So head to [your Jenkins server](http://localhost:3001) and configure your job to poll git every 5 minutes with this cron expression:

{% highlight bash %}
*/5 * * * *
{% endhighlight %}

Replace the `echo` build step with `script/ci`. And add an E-mail Notification to yourself or whoever should know about failures (space separated). Then save your job config.

You're all set. Commit some new code or click the "Build Now" link to run a test build. To stop the Jenkins server run:

{% highlight bash %}
jenkins server -k
{% endhighlight %}

Hope that helps some, feel free to leave a comment or [email me](mailto:mat@schaffer.me) if you have any questions.
