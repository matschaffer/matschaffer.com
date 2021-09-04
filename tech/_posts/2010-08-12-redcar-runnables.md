---
layout: post
title: Using Runnables in the Redcar Editor
---

So it's been awhile since I've posted, and no I haven't decided to take up
[cooking]({{ site.url }}/2010/06/curried-chicken/). Although I do use 
[chef](http://wiki.opscode.com/display/chef/Home) a lot at work.

I've been spending a lot of time lately working on the [Redcar Text Editor](http://redcareditor.com).
It's become my favorite way to spend my personal hacking time. My most recent contribution
has been some work on "Runnables" which is the Redcar plugin that lets you run commands
from inside the editor. Even one of the collaborators on the project didn't really know how to use it
so I thought I'd write an explaination.

Overview
--------

Like I said Runnables lets you run commands inside Redcar. It let's you set up two types of commands:

* Commands: These become list items that you can click on to run. You can view by selecting Project -> Runnables from the menu.
  They look like this.
  
<img class="center" src="https://cl.ly/2599033874449b819500/content" />

* File Runners: These are commands that get run when you hit `Ctrl+R` if your current file matches a regex.

You define these runners in `.redcar/runnables/mycommands.json`. Runnables will read any `*.json` file in that directory.
The file also gets processed whenever you hit `Ctrl+R` so you can edit the file runners as much as you like. At the
moment, it looks like you have to re-open your project for Commands to get refreshed. I might fix that soon though.

Example
-------

So here's my `features.json` file which allows me to run a full test suite as well as use `Ctrl+R` to run
individual Cucumber and RSpec tests:

{% highlight javascript %}
{
  "commands":[
    {
      "name":        "Full suite",
      "command":     "jruby -S rake",
      "description": "Run the full test suite",
      "type":        "task/ruby/rake"
    }
  ],
  "file_runners":[
    {
      "regex":   ".*\\.feature",
      "name":    "Run as feature",
      "command": "jruby -J-XstartOnFirstThread bin/cucumber __PATH__",
      "type":    "test/ruby/feature"
    },
    {
      "regex":   ".*_spec\\.rb",
      "name":    "Run a spec",
      "command": "jruby -J-XstartOnFirstThread -S spec __PATH__",
      "type":    "test/ruby/spec"
    }
  ]
}
{% endhighlight %}

So as you can see, the command is just the command that gets run if the file's path matches `regex` and the file path gets
substituted for the `__PATH__` in the command. I still haven't really figured out what the type and description fields do
for you yet, but I expect I will soon.

Bonus
-----

If you use my [color-and-scrolling-runnables](http://github.com/matschaffer/redcar/tree/color-and-scrolling-runnables) branch
you'll also get support for ANSI color output and automatic scrolling (courtesy of [Delisa Mason](http://github.com/kattrali)).
Hopefully both of these features will be in [master](http://github.com/danlucraft/redcar) soon. Here are the commands
to force color if you want to give it a try:

{% highlight bash %}
# Force color in Cucumber
jruby -J-XstartOnFirstThread bin/cucumber --color __PATH__

# Force color in RSpec
AUTOTEST=true jruby -J-XstartOnFirstThread -S spec --color __PATH__
{% endhighlight %}

Future Enhancements
-------------------

I've been told that this plugin only works on Unix systems right now. So Windows users can't partake in the
awesomeness just yet. I'll see how I can help there.

I haven't found a way to make a general `*.rb` matcher without having my specs run twice. Seems like
the plugin needs support for a "last" flag to make sure that we don't keep moving down the list and running more
commands. Perhaps the type field has something to do with it.

I'd like to have a way to reuse the "Run File" tabs that get created so I can just keep re-running my specs without
having to clean up old output. I haven't decided the best workflow for that yet. Sometimes you want to be able to see
old output and so I don't want to just clobber that in all cases.

If you have any other ideas feel free to come chat about it in the [Redcar IRC channel](irc://irc.freenode.net/#redcar) or
on the [Redcar mailing list](http://groups.google.com/group/redcar-editor).
