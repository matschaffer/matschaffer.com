---
layout: post
title: Docs with Markdown, Jekyll and Prawn
---

If you've been reading my blog at all you've probably noticed that I am not a lawyer. Sadly when [starting your own business](http://mashion.net), there are legal documents involved.

Now I don't know about you, but doing find and replace on my agreements for every new client sounded tedious and not fun. So I'm working on a way to make it more programmer-ish. Basically I'm taking the [Jekyll](http://jekyllrb.com/) approach to legal documentation. Markdown with a YAML header goes in, custom-tailored and nicely formatted PDF comes out.

And with just under 130 lines of ruby, I was able to turn this:

{% assign consultant = '{{ consultant }}' %}
{% assign client     = '{{ client }}' %}
{% assign date       = '{{ date }}' %}
{% highlight yaml %}
---
consultant: Mashion, LLC
client:     Awesome Client
date:       September 23, 2010
---

CONSULTING AGREEMENT
====================

This Consulting Agreement (this “**Agreement**”) is made and entered into
as of {{ date }} (the “**Effective Date**”) by and between {{ client }}
(the “**Company**”), and {{ consultant }} (“**Consultant**”) (each herein
referred to individually as a “**Party**,” or collectively as the
“**Parties**”).

(legalese continues...)
{% endhighlight %}

Into this:

<img src="http://img.skitch.com/20100927-numqttjuxejbigwhjqscddjif9.jpg" />

Neat, right?

I'll definitely be releasing the code properly sometime soon. But in the mean time, here's a [gist](http://gist.github.com/598566) to whet your appetite. If you have any ideas, or if you're a lawyer who might want in on this hotness, feel free to [get in touch](mailto:mat@schaffer.me). Thanks!
