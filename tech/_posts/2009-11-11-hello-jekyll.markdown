---
layout: post
title: Hello, Jekyll.
---

So I just ported my blog from WordPress to [Jekyll](http://jekyllrb.com "jekyll"). 

Why? Because once again while posting my latest [maven trick](/tech/2009/10/23/call-jruby-jython-from-maven/) I got frustrated trying to post `code` in my blog and also get the formatting to work the way I wanted it.

I think I just prefer [WYSIWYM](http://en.wikipedia.org/wiki/WYSIWYM "WYSIWYM - Wikipedia, the free encyclopedia") to [WYSIWYG](http://en.wikipedia.org/wiki/WYSIWYG "WYSIWYG - Wikipedia, the free encyclopedia"). But that's just me.

The transition wasn't bad, but was more manual than I had hoped, mostly because of all the garbage formatting in my WordPress posts. Some were good, but others were a mess due to my own indecision on how to get the article into WordPress (edit in browser, edit as HTML, write markdown then post HTML, etc...).

So we'll see how this goes. One thing that I really like already is how easy it is to fix broken/deprecated links when your whole blog is just sitting on your file system: Just a simple find and replace. I'm also considering writing a rake task that validates the whole generated site and possibly some sort of job queuing set up to move the widget stuff onto the server and reduce my javascript dependency.

Let me know what you think. There's still some styling to be done, but I think it's an improvement over the old site and [the lady](http://kaorippe.com) agrees.