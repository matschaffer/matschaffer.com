--- 
layout: post
title: Harsh opinions on JavaScript testing
---
JavaScript testing has been a hot topic at CIM lately. Enough that I've managed to form some opinions on the matter that <a href="http://arpitonline.com">Arpit</a> thought I should share with the world. So here's a rundown of all the javascript testing tools I've looked at and my opinions on them.

**<a href="http://github.com/nkallen/screw-unit">Screw Unit</a>**: More than just a funny name, this is so far the most enjoyable javascript testing tool I've used yet. BDD looks great in JavaScript. The jQuery-bias also works for us since jQuery is our framework of choice around here. And to top it off, it's got a beautiful and functional runner which requires almost no boilerplate code allows focused testing with a single click. I wrote the test suite for <a href="http://github.com/matschaffer/isepta-train-view.wdgt">iSepta Train View</a> in Screw Unit and have been using it at work too.

The biggest downside to Screw Unit is the project momentum. The original authors don't seem to be doing much with it these days and it's difficult to find a source of truth. So in the mean time I look to <a href="http://github.com/trotter/screw-unit">Trotter Cashion's fork</a> for stability since I know he's used it for testing a number of production apps. His version also has a better Stubbing/Mocking toolkit than what Screw Unit originally comes with.

If you're interested in a command line runner Screw Unit on Rails, check out <a href="http://github.com/relevance/blue-ridge">Blue Ridge</a>. Or for off rails (and on Mac), try <a href="http://github.com/nakajima/screw-driver">Screw Driver</a>.

**<a href="http://github.com/pivotal/jasmine">Jasmine</a>**: I do have one gripe with Screw Unit that I blame Trotter for (I might not have noticed if he didn't mention it). It uses snake_casing rather than JavaScript's own camelCaseConvention. Jasmine gets that right. On top of that, it appears to stay framework and DOM independent. I'm a little concerned about the runner though since they don't show it off in the readme and the docs recommend find/replace as a method for running focused tests which is super lame.

**<a href="http://code.google.com/p/js-test-driver">JsTestDriver</a>**: Written by Java developers for Java developers. And as best I can tell offers no support for asynchronous tests. The browser capturing is cool, and I've seen some interesting advances in the <a href="http://googletesting.blogspot.com/2009/08/super-fast-js-testing.html">tooling</a> for this framework, but it doesn't seem worth the Java culture that comes along for the ride.

**<a href="http://jsunittest.com">JsUnitTest</a>**: This is a fork of prototype's test suite but with the prototype dependency removed. I was excited about this early on, but had a lot of trouble getting it to run correctly across all browsers. The runner pages also require a fair bit of boilerplate which is a big turn-off.

**<a href="http://www.jsunit.net">JsUnit</a>**: I'll mention this purely for historical reasons. Don't use it. It's old, crufty and I'm pretty sure they spent more time on their logo than they did on the test runner. We started using this on our project originally and quickly grew to hate and ignore it.

**<a href="http://visionmedia.github.com/jspec/">JSpec</a>**: I haven't spent much time with JSpec but it does look fairly well thought out so I might give it another chance. What caused me to write it off initially was the introduction of a ruby-like test grammar rather than just straight JavaScript. Helpers for anonymous functions are cool and all but not at the cost of having to learn a new grammar which apparently even has issues running some operations correctly. As much as I love ruby, the JSpec grammar is an unnecessary complication. JavaScript is capable language, use it.

**Conclusion**: So that's it. Hope this saves some other people the pain of wading through a number of different testing frameworks. The JavaScript culture is a funny one but I've seen a lot of promise and progress lately. If you have any tools you like that I haven't covered here, please comment!
