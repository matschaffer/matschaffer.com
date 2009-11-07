--- 
layout: post
title: An experiment with Maven and JRuby
---
So in following with <a href="http://www.matschaffer.com/2008/07/bdb-je-in-jruby/">my last JRuby post</a>, this weekend I came up with the next piece to the puzzle; how to use maven to build a self-contained jar file that runs ruby scripts. It's still pretty raw and lacking an interesting name, but I threw my test code up on <a href="http://github.com/matschaffer/corundum/tree/master">github</a> for now to assist in its evolution. If you're interested in trying it out do the following:

{% highlight bash %}
git clone git://github.com/matschaffer/corundum.git
cd corundum/
mvn clean install
cd testapp/
mvn clean install
java -jar target/testapp-0.0.1-SNAPSHOT-jruby-complete.jar
{% endhighlight %}

With luck, I'll have this abstracted somehow so you don't have to really invade your project, but rather can just include an appropriate pom.xml and be on your way. Maybe some of the friendly folks in <a href="irc://irc.codehaus.org#maven">#maven</a> can help me out. And once it's more polished, expect a release on <a href="http://code.cimians.com">code.cimians.com</a>.

Consider this one more step in my plan to subvert the java-centric development world. And now I'll be accompanied by a small army of ruby scripts wearing jar-file disguises.
