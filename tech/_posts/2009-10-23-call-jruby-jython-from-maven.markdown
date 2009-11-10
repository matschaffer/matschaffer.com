--- 
layout: post
title: Call JRuby, Jython or other JVM scripting language from Maven
---
Ever been frustrated trying to <a href="http://matschaffer.com/2008/09/more-work-on-corundum/">extend maven</a>? Yeah me too. So here's a trick I finally pounded out a couple weeks ago that I thought I'd share here.

It's pretty common place to use the <a href="http://maven.apache.org/plugins/maven-antrun-plugin/">maven antrun plugin</a> to perform some extra build work that you couldn't otherwise do without writing a full-blown maven plugin. You might even already use it to call scripts that move files around, compress CSS, or whatever. But wouldn't it be nice if maven could download the script's runtime for you? It can. Just throw these chunks into the appropriate sections of your pom.xml file.

{% highlight xml %}
  <dependency>
    <groupId>org.jruby</groupId>
    <artifactId>jruby-complete</artifactId>
    <version>1.3.1</version>
    <scope>provided</scope>
  </dependency>

  <properties>
    <jruby>${settings.localRepository}/org/jruby/jruby-complete/1.3.1/jruby-complete-1.3.1.jar</jruby>
  </properties>

  <artifactId>maven-antrun-plugin</artifactId>
  <executions>
    <execution>
      <id>my_script</id>
      <phase>compile</phase>
      <configuration>
        <tasks>
          <java jar="${jruby}" fork="true" failonerror="yes">
            <arg value="${basedir}/src/main/ruby/myscript.rb" />
          </java>
        </tasks>
      </configuration>
    </execution>
  </executions>
{% endhighlight %}

And of course the same technique should work for any language that you can run as an argument to a jar file (jython, rhino, clojure).

Now some of you might be asking "why not use the maven jruby plugin?". Well because as best I can tell it still runs against JRuby 0.9.9. A bit too far behind the curve if you ask me. I expect you'll find the same with Jython. So there.

Hope that helps some folks. I know it made wrangling my builds a world easier.
