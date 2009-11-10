--- 
layout: post
title: Fork my bash profile
---
Some of you may remember my <a href="http://schapht.tumblr.com/post/27522735/if-your-profile-is-getting-too-long">tumblr post</a> about using a directory of configuration files in place of the standard single .profile script for setting up a Unix environment. I've since refined the idea even more and started working on generalizing it for use across multiple operating systems. And to make it even more fun I've started publishing it to github.

I have a number of tricks in there like tab-completion for both ssh hosts and rake tasks, and prompts that react to error conditions. If you're interested just clone my repository as ~/.profile.d and link it like you see in this gist:

{% highlight bash %}
mv ~/.profile ~/.profile.old
git clone git://github.com/matschaffer/profile.git ~/.profile.d
ln -s ~/.profile.d/init ~/.profile
{% endhighlight %}

Or if you have some of your own ideas, just fork my project and have fun! The url for the repository browser is: <a href="http://github.com/matschaffer/profile/tree/master">http://github.com/matschaffer/profile/tree/master</a>

Let me know what you think. I'd love to incorporate other tricks that people might have.
