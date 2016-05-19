---
layout: post
title: It's war out there. Get yourself a sub.
abstract: I recently joined the Stellar Development Foundation and decided to learn from my Netflix mistakes. On day one I set up a shiny new helper command that I've been using daily ever since.
---

When I started at Netflix almost two years ago, one of the first things that occured to me was "We could really use a general helper command." Other developers even agreed that it could be handy. I recalled Nick Quaranto's handy [sub](https://github.com/basecamp/sub) repository but with Netflix being a Java shop, I wasn't sure about introducing something that required a bash environment.

A few months passed while I tinkered with doing something in Groovy. Then during one of our [hack days](https://techblog.netflix.com/2014/02/netflix-hack-day.html) I gave in and decided to use sub to make an `nf` command. With only a few commands in place, it quickly became part of my daily workflow. When I started at the [Stellar Development Foundation](https://stellar.org) I decided to start a `sub` command on day one. Even with just two commands I already use it daily.

> So what's this "sub" thing about?

[Sub](https://github.com/basecamp/sub) is a project from [Nick Quaranto](http://quaran.to/) that lets you build collections of scripts and access them via git-like subcommands. If you use [rbenv](https://github.com/sstephenson/rbenv) you're actually already using sub. The really cool part is that you can also make your own.

Need a helper to start up an ssh tunnel? It'd look like this:

{% highlight bash %}
#!/usr/bin/env bash
# Usage: mysub tunnel
# Summary: Sets up an ssh tunnel
# Help: Requires ssh and access to jumpbox, etc, etc...

set -e

ssh -NL 8888:somehost:80 me@jumpbox
{% endhighlight %}

You drop this script in `mysub/libexec/mysub-tunnel` and sub provides access to it via `mysub tunnel`.

Just providing access to the script via your custom command is handy. But sub takes it a step further with tab completion (for both bash and zsh), command listing, and documentation access for free. Sub parses everything it needs from the comments at the top of your script.

While I could go into more detail about all of sub's capabilities, the [readme](https://github.com/basecamp/sub/blob/master/README.md) is pretty solid so go check it out. If you have any sort of repetitive commands you use, give it a try. Commit it to your company repo and your coworkers will thank you for it.

As a final note, don't let the age of the last commit cause hesitation. I'd of course love to see more activity on the project, but it's a simple enough concept and I haven't run into any problems using it as a daily tool.
