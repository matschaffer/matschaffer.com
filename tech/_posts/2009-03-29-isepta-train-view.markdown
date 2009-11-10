--- 
layout: post
title: iSepta Train View, my time with Dashcode
---
<img class="left" title="iSepta Train View" src="http://matschaffer.com/files/iSeptaTrainView.png" />

**UPDATE:** New version 1.1! <a href="http://cloud.github.com/downloads/matschaffer/isepta-train-view.wdgt/iSepta_Train_View-1.1.zip">Download it here</a>.

**UPDATE 2:** Github now has issue tracking! So I'm dropping uservoice. If you have ideas, submit them <a href="http://github.com/matschaffer/isepta-train-view.wdgt/issues">here</a>.

So over the past month I've been working with <a href="http://developer.apple.com/tools/dashcode/">Dashcode</a> trying to come up with a nice representation of <a href="http://septa.org">Septa</a> train data. I've managed to come up with a simple widget that combines the data from <a href="http://isepta.org">iSepta</a> with the ontime/late data available from Septa's <a href="http://trainview.septa.org">Train View</a> page. So far it seems to be working well. I've submitted the widget to <a href="http://www.apple.com/downloads/dashboard/">Apple downloads</a> and <a href="http://www.dashboardwidgets.com/showcase/details.php?wid=2413">Dashboard Widgets</a> so hopefully you'll see it show up there soon too. So <a href="http://cloud.github.com/downloads/matschaffer/isepta-train-view.wdgt/iSepta_Train_View-1.1.zip">**download** your copy</a> and <a href="http://github.com/matschaffer/isepta-train-view.wdgt/issues">let me know what you think</a>!

As far as working with Dashcode goes, it's been an interesting experience. I'm still a little lukewarm on it, but it definitely helped with the visual work. I'm not much of a designer, so having Dashcode's gradient, rounded corner and "glass" effect helpers was perfect for me. It was also nice not having to hand-code the "i" button animation like I did with <a href="http://matschaffer.com/projects/#dwc">Digital World Clock</a>.

On the downside of things, I felt like the HTML and javascript generation over-complicated things in some cases. Dashcode provides "Parts" like labels, lists and indicators which are cool but the way you interact with them is a little odd. For example, to add items to a list part you'd do this:

{% highlight javascript %}var list = document.getElementById('list').object;
list.setDataArray(trainList);{% endhighlight %}

Which isn't terrible, but felt like more work than just manipulating a plain old "ul" with jQuery. Granted this specialized interface does also offer streaming-friendly setters, which could be useful for some folks. My bigger gripe is with the labels that get generated like this in the HTML:

{% highlight html %}<div apple-part="com.apple.Dashcode.part.text" class="apple-text apple-no-children" apple-default-image-visibility="hidden" apple-text-overflow="ellipsis" id="nextTrainLabel" apple-style="part-height-dependent: true;"></div>{% endhighlight %}

Note the lack of contents. They get wired at run time by javascript. My guess is that this makes localization more accessible, but I wonder how many widgets really get localized.

These sort of things made me hesitant to muck around with the HTML and CSS which felt a little limiting when building the widget. But the graphics helpers and quick access to functions like "deploy to dashboard" were definitely nice. And the javascript debugging support felt even more solid than firebug. So all-in-all I'm a happy camper.

One more thing to be careful about if you're working with Dashcode: when saving your project, Dashcode will regenerate most of the files and directories and blow away files that haven't been imported into the project. So be careful not to save things under the dcproj bundle or you might lose them. I would bet this applies to .svn folders as well, but all the cool kids are using <a href="http://git-scm.com">git</a> nowadays anyway, right?
