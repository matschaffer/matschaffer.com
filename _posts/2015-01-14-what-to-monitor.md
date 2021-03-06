---
layout: post
title: What should I monitor?
abstract: I've been hearing the question "what should we monitor?" a fair bit around the Stellar Development Foundation dev floor. So here's my answer in a place where everyone can benefit.
---

It's an old question.
And one that can vary quite a bit from domain to domain.

But for Web Operations
there are some definite patterns I've come across.
Most of these come from the last two years I spent working as a Reliability Engineer at Netflix.
Even though we had hundreds of discrete applications
when something broke you often found yourself looking at similar sets of metrics.

So without further ado, here they are,
broken down per category and in a roughly-prioritized order.

# The basics

* Successful requests per second
* Failed requests per second

Successful requests in the HTTP world take the form of something in the 100s-300s. Failed HTTP requests would usually be anything 400 and above.
Most services have some way of designating "yes it worked" vs "no it didn't".
Count those.

Ideally count them from both the client and server side.
For middle-tier services the client-side counting can often go in a common client library,
edge services may be able to count at the load balancer.
If counting at the client isn't feasible
you can count at the server side only,
but in that case you run the risk of missing unseen failures
due to networking trouble.

You can then make a ratio out of these `(failures / successes) * 100`
and start tracking your availability against an [error budget](http://www.site-reliability-engineering.info/).

If possible, break these down on a per-resource basis (in the REST-resource sense).
Not all monitoring tools can provide this sort of tagging
but being able to say which resource is very valuable when trying to deduce what's wrong.
This will often take the form of the first part of the HTTP path
or the controller object that's servicing the request.

# Deeper errors

* Errors when calling back end services
* Unhandled exceptions
* Known application-specific error conditions (e.g., locked account)

Not all error conditions manifest as a failed request.
Typically a service has circuit breakers, fallbacks,
or other mechanisms to deal with internal failures
without causing a user-visible error.
But you'll want to count them even if the user doesn't see them.

Watching for changes in deeper error trends can tell you
when something is about to go wrong
or when something is going wrong in a way that you can't see from your basic metrics.

For example, you could have a failed remote call which causes key data to be omitted from the returned data.
This would still be a 200 but the client may not be able to use the response.

Count these on a per-second basis with some low-cardinality break down.
Many systems have a set of internal error codes
which will likely be reusable as a way to break down deeper error counts.
Or in the case of circuit breakers,
the name or class of the circuit is typically a good way to segment these errors.

# Tracking performance

* Latency distributions

Now you may have a system which is always returning 200s,
but if it goes from 150ms response times to 4000ms response times,
you have a problem.

In addition to a simple max, min and average per second,
percentile distributions are common here.
You can start by looking at the 50th, 95th and 99.5th percentile
which many tools (e.g., statsd) support.
Bucketing by time
(e.g., < 10ms, 100-500ms, > 500ms)
is also useful since bucketed counters can be averaged across many servers and still retain some accuracy.
Averaging the 95th percentile across a hundred machines is still useful,
but doesn't tell you your actual 95th percentile for the whole fleet.
Unfortunately this bucketed approach is a bit less common
probably since it requires you to have a sense of how your service will perform ahead of time.

Much like the success counters,
you'll want to break these down by resource if possible.
Knowing where the latency is coming from can point you in the right direction a lot faster.
If all resources are effected equally,
investigate the system showing the latency.
If it's a single resource,
investigate the systems used to build that resource's response data.

# OS & Runtime level metrics - the USE method

* CPU
* Memory & Garbage Collection
* Disk
* Network

Of course, these are important to keep an eye on as well.
But how their used will vary quite a bit between services.

On the plus side there are many good tools and resources for monitoring this stuff
since most any environment will be capable of providing metrics on it.

Rather that get into details here,
I'll refer you to [the USE](http://www.brendangregg.com/usemethod.html) method from Brendan Gregg
which is a really solid place to start when examining OS level resources.

In some respects
the metrics discussed above
are Brendan's USE method re-applied to
distributed systems.

* Utilization - how many requests are coming in?
* Saturation - are the requests backing up and becoming latent?
* Errors - what errors were encountered servicing requests?

So if you should find yourself in an unknown domain wondering what to monitor,
try the USE method there too.

# Next steps - tooling

There are a number of software packages that can help you track the sort of metrics covered here
so I won't try to cover them in detail.
But if you're really just getting started here are a few options I've had experience with:

## [Statsd](https://github.com/etsy/statsd/) -> [Graphite](https://graphite.wikidot.com/)

I did a [screencast](https://vimeo.com/ondemand/monitoringwithgraphite/84747550) on this approach almost a year ago.
It's a fully open-source approach that's quite common and has a large ecosystem.

## [Zabbix](https://www.zabbix.com/)

The Stellar setup is mainly using this right now.
It's also open source and has a rich feature set,
but the surrouding ecosystem a a bit limited.

## [MRTG](https://oss.oetiker.ch/mrtg)

I'm not as familiar with MRTG,
but it's been around a very long time
and is still cited as one of the easier monitoring setups to get started with.

## [Atlas from Netflix](https://github.com/Netflix/atlas)

The system I'm most familiar with.
I've seen it cover all of the above items while working at Netflix,
but the open source offering is still new and somewhat raw.
I look forward to more experimentation and blogging around Atlas in the near future.

# Conclusion

As stated above,
metrics and monitoring can be a very application-specific thing
so consider everything in the context of your application and infrastructure.
My hope is that for those of you still defining your operational metrics,
this will provide a good basis for growing your own distributed system.

If you have any comments or examples from your own system,
I'd love to hear them.
Feel free to leave a comment below
or come find [matschaffer in #stellar-dev on freenode](irc://irc.freenode.net/#stellar-dev).
