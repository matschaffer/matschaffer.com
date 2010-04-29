---
layout: post
title: How to mock out jQuery and Raphael
---

Most people are in agreement now that testing is a good thing. But most any JavaScript developer out there will tell you that testing browser-dependent code (jQuery, Raphael, etc.) can be a pain. You usually have to concede to running your tests in the browser, or spend lots time of pounding out [env.js](http://github.com/thatcher/env-js) bugs to get something headless running.

But here at Hoopla, [Trotter](http://www.trottercashion.com/2010/04/27/headless-raphael-testing.html "Headless Raphael Testing") and I have found a very happy middle ground. As outlined in his post, it's trivial to make a simple mock Raphael that satisfies your code and allows you to test what got called. But in practice, maintaining these mock classes gets repetitive quickly.

So I wrote [recorderMock.js](http://github.com/matschaffer/recorderMock.js "matschaffer's recorderMock.js at master - GitHub"), which makes it easy to create full-featured mock objects for things like jQuery, Raphael and any other library that doesn't run outside of the browser.

Say you wanted to test some code that used jQuery to resize a div:

{% highlight javascript %}
$("#display").width(someComputedWidth).height(someComputedHeight);
{% endhighlight %}

I think I just heard your inner tester say *"oh shit."* Worry no longer my friend. Building a mock for this with recorderMock is super simple. Just put this in your setup code.

{% highlight javascript %}
$ = recorderMock("width", "height");
{% endhighlight %}

You can even check that they got called with the right values:

{% highlight javascript %}
expect($.height.__calls[0].arguments).to(eql, [250]);
// or 
expect($.height.__lastCall.arguments).to(eql, [250]);  
{% endhighlight %}

And specifying return values is only slightly more complicated. Say you want to return mock html for different DOM elements:

{% highlight javascript %}
this.startDate = $("#start-date").html();
this.endDate   = $("#end-date").html();
{% endhighlight %}

Mock it out like this:

{% highlight javascript %}
$ = recorderMock("html");
$.html.__return = function() {
  var selector = $.__lastCall.arguments[0];
  return { "#start-date": "January 1st, 2010",
           "#end-date":   "January 31st, 2010" }[selector];
};
{% endhighlight %}

Need a basic mock of Raphael? Just use this:

{% highlight javascript %}
Raphael = recorderMock("path", "rect", "text", "attr", "init", "push", "set",
                       "hide", "show", "animate", "animateWith", "rotate",
                       "translate", "setSize");
{% endhighlight %}

So there you have it. You can indeed test browser-related code outside a browser. And it's pretty easy.

[recorderMock](http://github.com/matschaffer/recorderMock.js "matschaffer's recorderMock.js at master - GitHub") has a handful of other tricks, and I'll probably be adding more soon, so keep an eye on [the specs](http://github.com/matschaffer/recorderMock.js/blob/master/spec/unit/spec.recorderMock.js "spec/unit/spec.recorderMock.js at master from matschaffer's recorderMock.js - GitHub") for examples on how to use it more fully.