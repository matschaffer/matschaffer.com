--- 
layout: post
title: Groovy Unit Tests on Maven & Eclipse
---
During our last sprint at work I got a good chance to get <a href="http://groovy.codehaus.org/">Groovy</a> working for our unit tests. It took a bit of googling and trial and error, so hopefully this post will benefit others trying to do the same thing. Here's what I did:

Set up your pom with the following dependency:
{% highlight xml %}
<dependency>
  <groupId>org.codehaus.groovy</groupId>
  <artifactId>groovy-all</artifactId>
  <version>1.6-beta-2</version>
  <scope>test</scope>
</dependency>
{% endhighlight %}

And the gmaven plugin under the build section:
{% highlight xml %}
<plugin>
  <groupId>org.codehaus.groovy.maven</groupId>
  <artifactId>gmaven-plugin</artifactId>
  <version>1.0-rc-3</version>
  <extensions>true</extensions>
  <executions>
    <execution>
      <goals>
        <goal>testCompile</goal>
      </goals>
      <configuration>
        <sources>
          <fileset>
            <directory>${pom.basedir}/src/test/java</directory>
            <includes>
              <include>**/*.groovy</include>
            </includes>
          </fileset>
        </sources>
      </configuration>
    </execution>
  </executions>
</plugin>
{% endhighlight %}

Note that I keep my tests under <code>src/test/java</code>, this avoids needing extra configuration from inside eclipse. <code>src/test/groovy</code> also works, but you'll need to mark it as a source folder, and it seems to be a little flaky so I stopped that.

At this point you should be able to run your groovy tests with <code>mvn clean install</code>. Or use <code>-Dtest=MyGroovyTest</code> to run a single test.

For eclipse you'll need the <a href="http://groovy.codehaus.org/Eclipse+Plugin">GroovyFeature</a> installed. I currently have version 1.5.6 installed.

Close your eclipse project and rebuild the configuration with <code>mvn eclipse:clean eclipse:eclipse</code>. Open the project back up.  You may need to fix the JRE settings for the project in the java build properties. On my machine maven tries to hook the project to a JRE other than the default, compile errors occur, switching back to the default Mac OS JRE resolves that.

Right click on the project root, go to "Groovy -&gt; Add Groovy Nature".  If you use the eclipse maven plugin, don't turn it on for this project. Enabling maven dependency management doesn't seem to jive with the eclipse groovy plugin. If I turn it on, I get lots of class not found type errors and have to do <code>eclipse:clean eclipse:eclipse</code> and start over again.

Right click your .groovy test (a class that inherits from groovy.util.GroovyTestCase) and you should have Run As -&gt; JUnit test available.  I have my setUp and test methods as <code>void</code>.  I used <code>def</code>s originally, but this caused the methods to be ignored.

If you don't see JUnit available, try cleaning the project. I've even turned off the automatic builds and manually ran "Build All" on occasion. Also watch out for compile errors in the groovy files.  Eclipse doesn't reliably warn about it and I've seen compilation just silently fail. When in doubt have maven try to run it. Eclipse doesn't always reliably build the groovy classes, and I often have to clean the compiled classes especially when adding new groovy methods or test functions. I'd say about 75% of the time it just runs.

Dan Schaffer on the groovy mailing list also mentioned noted that refactoring Java classes doesn't seem to apply to Groovy files. There is <a href="http://groovy.ifs.hsr.ch/trac/GroovyRefactoring/wiki">a plugin</a> for that, but I haven't tried it yet.

As usual, feel free to comment if you have any questions about my setup. Hope you find this useful.
