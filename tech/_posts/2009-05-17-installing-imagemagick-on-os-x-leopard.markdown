--- 
layout: post
title: Installing ImageMagick on OS X Leopard
---
So last night I tried to install <a href="http://www.imagemagick.org/">ImageMagick</a> on Leopard but couldn’t find the requisite blog article that detailed the installation. So I thought I’d write one. I managed to dig up <a href="http://www.imagemagick.org/discourse-server/viewtopic.php?f=1&amp;t=9823">some forum posts</a>, so here’s the whole deal.

ImageMagick itself compiles fairly easily on <span class="caps">OS X</span>, but it’ll end up missing <span class="caps">JPEG</span> support, which was kind of a bummer. Here’s how to fix it without using <a href="http://www.macports.org/">MacPorts</a> (which I avoid these days since it tends to get updated too slowly for a lot of projects).

First get a copy of <a href="http://www.ijg.org/">libjpeg</a> and build it as a shared library:

{% highlight bash %}
curl -O http://www.ijg.org/files/jpegsrc.v7.tar.gz
tar -zxf jpegsrc.v7.tar.gz
cd jpeg-7/
ln -s `which glibtool` ./libtool
./configure --enable-shared --prefix=/usr/local
make
sudo make install
{% endhighlight %}

Now get a copy of ImageMagick:

{% highlight bash %}
curl -O ftp://ftp.imagemagick.org/pub/ImageMagick/ImageMagick.tar.gz
tar -zxf ImageMagick.tar.gz
cd ImageMagick-*/
./configure --prefix=/usr/local
make
sudo make install
{% endhighlight %}

Now you should have convert, mogrify, montage or whatever other ImageMagick tools you were interested in. <a href="http://rmagick.rubyforge.org/">RMagick</a> seems to install just fine after you do this, though I couldn’t get <a href="http://nubyonrails.com/pages/gruff">gruff</a> working because of what looks like a dependency on <a href="http://www.ghostscript.com/">GhostScript</a>. I’ll update this post once I get that worked out.

**Update (8/26)**: Tweaked some of the commands here to account for new versions of libjpeg and ImageMagick. Thanks for the heads up, Amed!
