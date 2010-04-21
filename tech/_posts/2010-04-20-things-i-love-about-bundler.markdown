---
layout: post
title: Things I Love About Bundler
---

So I've been working with working with [Rails 3](http://guides.rails.info/3_0_release_notes.html "Ruby on Rails Guides: Ruby on Rails 3.0 Release Notes") and [bundler](http://github.com/carlhuda/bundler "carlhudas's bundler at master - GitHub") full time for a month and a half now and it's going swimmingly.

Here are some things that bundler does that I think are awesome.

Gems from git repositories
--------------------------

We use custom forks of [arel](http://github.com/rails/arel "rails's arel at master - GitHub") and [savon](http://github.com/rubiii/savon "rubiii's savon at master - GitHub") in our project. Before bundler, managing this would have been a mix of submodules/braid/piston and custom gem files that could easily become a mess. With bundler we just throw this in our `Gemfile` and we're done.

{% highlight ruby %}
gem 'savon', :git => 'git://github.com/hoopla/savon.git'
gem 'arel',  :git => 'git@github.com:hoopla/arel.git'
{% endhighlight %}

Gems from the local file system
-------------------------------

Much like loading from git, bundler also handles loading gems from a local path. This is great if you want to try out some ideas on a gem, but you're not yet sure if gem is worth forking.

{% highlight ruby %}
gem 'mygem', :path => '/path/to/my/gem'
{% endhighlight %}

What's especially awesome is that bundler wires things up so that source modifications get picked up without any sort of repackaging or reinstalling. This beats the pants off of the *change source > repackage gem > reinstall gem > test* cycle that was so easy to fall into before bundler.

It actually works
-----------------

I don't know about you, but I don't think I've ever had a real Rails 2 project on which `rake gems:install` really worked. There were always a couple of gems (rspec) that you needed to install separately. `bundle install` on the other hand works pretty much every time.

Now of course it's not all rainbows and unicorns. Bundler seems to take up some extra startup time beyond what I was used to on Rails 2. And I often wish there were a way to make it check git repositories for updates a little less aggressively. But for 0.9.22, I'm impressed. Hats off to [carlhuda](http://github.com/carlhuda "carlhuda's Profile - GitHub"), [indirect](http://github.com/indirect "indirect's Profile - GitHub") and any others that appear beyond page 3 of the commit log for all their hard work on it.
