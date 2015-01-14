---
layout: post
title: What to monitor
abstract: I've been hearing the question "what should we monitor?" a fair bit around the Stellar Development Foundation dev floor. So here's my answer in a place where everyone can benefit.
---

> What should I monitor?

It's an old question.
And can vary quite a bit from domain to domain.

But in the case of web operations
there are some definite patterns I've come across.
Most of these come from the last two years I spent working as a Reliability Engineer at Netflix.
Even though we had 400+ discrete applications there
when something broke you found yourself looking at the same set of metrics.

So without further adoo, here they are,
broken down in a somewhat categorized format.

# The basics

* Successful requests per second
* Failed requests per second

Successful requests in the HTTP world take the form of something in the 100s-300s. Failed HTTP requests would usually be anything 400 and above.
Most services have some way of designating "yes it worked" vs "no it didn't".
Count those.
Ideally count them just in front of what's calling the service.
You can also count at the service itself,
but you run the risk of missing unseen failures due to networking trouble.

You can then make a ratio out of these `(failures / successes) * 100`
and start tracking your availability against an [error budget](http://www.site-reliability-engineering.info/).

If possible, break these down on a per-resource basis (in the REST-resource sense).
Not all monitoring tools can provide this sort of tagging
but being able to say which resource is very valuable when trying to deduce what's wrong.
This will often take the form of the first part of the HTTP path
or the controller object that's servicing the request.

# Deeper errors

* Errors when calling backend services
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
Many systems have a set of internal error codes that can be useful when reporting metrics.

# Tracking performance

* Latency distributions

Now you may have a system which is always returning 200s,
but if it goes from 150ms response times to 4000ms response times
you have a problem.

Percentile distributions are common here.
You can start by looking at the 50th, 95th and 99.5th percentile
which many tools support.
Bucketing by time
(e.g., < 10ms, 100-500ms, > 500ms)
is also useful since bucketed counters can be averaged across many servers and still retain some accuracy.
Averaging the 95th percentile across a hundred machines is still useful,
but doesn't tell you your actual 95th percentile for the whole fleet.
Unfortunately this bucketed approach is a bit less common
and requires you have a sense of how your service will perform ahead of time.

Much like the success counters,
you'll want to break these down by resource if possible.
Knowing where the latency is coming from can point you in the right direction a lot faster.
If all resources are effected equally
investigate the system showing the latency.
If it's a single resource
investigate the systems used to build that resource's response data.

# OS & Runtime level metrics

* CPU
* Memory
* Disk
* Network

Of course, these are important to keep an eye on as well.
But how their used will vary quite a bit between services.

On the plus side there are many good tools and resources for monitoring these resources.

Rather that get into the details here,
I'll refer you to [the USE](http://www.brendangregg.com/usemethod.html) method from Brendan Gregg
which is a really solid place to start when examining OS level resources.

In some respects
the metrics discussed above
are Brendan's USE method re-applied to
distributed systems.

* Utilization - how many requests are coming in?
* Saturation - are the requests backing up and becoming latent?
* Errors - what errors were encountered servicing requests?

# Conclusion

As stated above,
metrics and monitoring can be a very application-specific thing
so consider each of these in the context of your application and infratructure.
But I hope that for those of you just getting started,
this will provide a good basis for growing your own distributed system.
If you have any comments or examples from your own system,
I'd love to hear them.
Feel free to leave a comment below
or come find me in [#stellar-dev on freenode](irc://irc.freenode.net/#stellar-dev).
