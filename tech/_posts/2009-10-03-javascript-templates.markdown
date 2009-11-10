--- 
layout: post
title: JavaScript templates, build-time lovin'
---
(Reposted from <a href="http://github.com/matschaffer/trimpath-templateRegistry">http://github.com/matschaffer/trimpath-templateRegistry</a>)

Ever wanted to render HTML templates from javascript? Yeah, so did we. And so do a lot of people apparently. There are <a href="http://beebole.com/pure/" title="PURE - JavaScript Template Engine">a</a> <a href="http://embeddedjs.com/" title="EJS - JavaScript Templates">lot</a> <a href="http://www.kuwata-lab.com/tenjin/" title="Tenjin - the fastest template engine in the world">of</a> <a href="http://code.google.com/p/jssmarty/" title="jssmarty - Project Hosting on Google Code">toolkits</a> <a href="http://code.google.com/p/trimpath/wiki/JavaScriptTemplates" title="JavaScriptTemplates - trimpath - Project Hosting on Google Code">around</a> for this.

We at CIM were evaluating some of them and had the realization that since we&#8217;re already processing JavaScript (compression) and CSS (from <a href="http://lesscss.org/" title="LESS - Leaner CSS">LESS</a> and compression) at build time, why not process the templates at build time as well?

So I give you <a href="http://github.com/matschaffer/trimpath-templateRegistry">TrimPath TemplateRegistry</a>. After evaluating all of the above mentioned template toolkits, we settled on <a href="http://code.google.com/p/trimpath/wiki/JavaScriptTemplates" title="JavaScriptTemplates - trimpath - Project Hosting on Google Code">TrimPath&#8217;s JST</a> because we all could agree that the syntax was reasonable (<a href="http://beebole.com/pure/" title="PURE - JavaScript Template Engine">Pure</a> was a little hit or miss) and it was able to produce fairly clean JavaScript after processing a template. And when I say clean in this case I mean the generated JavaScript also has no dependency on any library. Since we&#8217;ve already processed the templates, it&#8217;d be a shame if we still required the browser to parse the template toolkit at run time.

It seems to be working so far at least in theory. We haven&#8217;t applied this to production code yet, but hopefully we will soon. Check out client/demo.html for a rough sketch of the idea. The &#8220;client&#8221; folder is what&#8217;s intended for use at run-time. The &#8220;server&#8221; folder is what&#8217;s intended for use at build-time.

There&#8217;s still a lot of work to be done. My biggest outstanding question is how to handle the the template registration function name such that we can be pretty flexible about how/where the templates get loaded. And of course, we&#8217;ll need some specs now that I actually have some rough idea of what the heck I&#8217;m doing :)
