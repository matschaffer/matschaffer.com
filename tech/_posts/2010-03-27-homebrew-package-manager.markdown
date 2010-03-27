--- 
layout: post
title: Managing Unix packages on OS X with Homebrew
---

This month I started a [new gig](http://hoopla.net) which landed me with a new MacBook
so I thought it seemed like a good time to try out the [Homebrew](http://github.com/mxcl/homebrew)
package manager. It's almost a month later and I am loving it. The beer-related jargon doesn't hurt
either.

Have you ever gotten annoyed at the time it takes for a package to get updated on MacPorts or Fink? Or
tried to install a MacPorts package only to have it reinstall your ssh client or other core system
component? I got fed up with this sort of thing over a year ago and have been [compiling packages by
hand](/2009/05/installing-imagemagick-on-os-x-leopard/) ever since. Then I found Homebrew.

Installation is straightforward. You'll need XCode of course, then you can just do this:

{% highlight bash %}
sudo chown -R $USER /usr/local
curl -Lsf http://github.com/mxcl/homebrew/tarball/master | tar xvz -C/usr/local --strip 1
{% endhighlight %}

Or they have more automated approaches in their README if you're into that sort of thing.

The real win of Homebrew is how packages are defined: in Ruby. Have a look at this hotness for 
describing how to install redis:

{% highlight ruby %}
require 'formula'

class Redis < Formula
  url 'http://redis.googlecode.com/files/redis-1.2.5.tar.gz'
  homepage 'http://code.google.com/p/redis/'
  sha1 'f28d840d8100586796cab02ccd8e91545a92179d'

  def install
    %w( run db/redis log ).each do |path|
      (var+path).mkpath
    end

    ENV.gcc_4_2
    system "make"
    bin.install %w( redis-benchmark redis-cli redis-server )
    
    # Fix up default conf file to match our paths
    inreplace "redis.conf" do |s|
      s.gsub! "/var/run/redis.pid", "#{var}/run/redis.pid"
      s.gsub! "dir ./", "dir #{var}/db/redis/"
    end
    
    etc.install "redis.conf"
  end

  def caveats
    "To start redis: $ redis-server #{etc}/redis.conf"
  end
end
{% endhighlight %}

Hot right? What's more is that if you run `brew update` it'll turn your `/usr/local` into a working git
repository where you can tweak these scripts, push to your own fork and contribute back. Compare that to
the MacPorts [Portfile](http://trac.macports.org/browser/trunk/dports/databases/redis/Portfile) for redis
which took me 5 minutes just to find, let alone tweak or contribute. Homebrew keeps all those files in
`/usr/local/Library/Formula`, so have at it!

For more info on Homebrew check out [their wiki](http://wiki.github.com/mxcl/homebrew/) or their
[collection of blog links](http://wiki.github.com/mxcl/homebrew/press) as I'm sure they're more accurate
than anything I'd produce.

So go grab a beer and toast your package management woes farewell. Hope you enjoy Homebrew as much as
I do!