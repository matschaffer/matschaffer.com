---
layout: post
title: The Creep of Asynchronicity
---
I've been doing a fair bit of JavaScript at work lately and while I really enjoy the language there's something that's been nagging at me which I've come to call **The Creep of Asynchronicity**. I'll use some of the examples I've been working with to illustrate the idea.

Let's start with a function to get all the videos on a device that looks like this:

{% highlight javascript %}videos = device.getVideos();
doSomethingWith(videos);{% endhighlight %}

*Simple*. Pretty much what you would expect in a "device" API, right? But now let's assume that getVideos() requires a return trip to the web server to get the data. You have two options:

<ol>
  <li>Fly in the face of AJAX, make the call synchronously and lock up your UI.</li>
  <li>Change the API to look something like this:</li>
</ol>

{% highlight javascript %}device.getVideos(function(videos) {
  doSomethingWith(videos);
}{% endhighlight %}

Now that's not so bad, but consider the case where you also need an asynchronous call to get the device object. Now we have:

{% highlight javascript %}user.getDevice(function(device) {
  device.getVideos(function(videos) {
    doSomethingWith(videos);
  }
}{% endhighlight %}

*Ew...* getting kinda nasty there isn't it? Imagine if we also had to make an asynchronous call to get some details on the videos, and so on.

So the crux of my argument is that without some sort of **synchronization mechanism**, any introduction of an asynchronous call requires that the whole application become asynchronous to support it. Even just a **sleep** function would help, but JavaScript has nothing of the sort. The best I've come up with so far is recursion, which helps in the event that your asychronous calls are acting upon a list of items uniformly. I used this to load a series of JavaScript libraries like so:

{% highlight javascript %}function loadScripts(libraries, callback) {
  if (libraries.length > 0) {
    var lib = libraries.shift();
    jQuery.getScript(lib, function() {
      loadScripts(libraries, callback);
    });
  } else {
    callback();
  }
}

loadScripts(["/user.js", "/device.js"], function() {
  doStuffOnceScriptsHaveLoaded();
});{% endhighlight %}

This could conceivably be used to recurse down a list of asynchronous callbacks (which I did find on the web somewhere but seem to find it at the moment). But I think this might lead to an even nastier looking API.

I'm sure on some level, this just requires a shift in thinking. But there's a part of me that still longs for that two liner at the top of this post... *sigh*
