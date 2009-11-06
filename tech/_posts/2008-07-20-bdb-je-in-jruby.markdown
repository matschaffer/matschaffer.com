---
layout: post
title: BerkelyDB Java Edition in JRuby
---
At work I've recently been tasked with figuring out how to backup and rename databases in the Berkeley DB store that's in one of our middleware components.  So I thought I'd try it out in <a href="http://jruby.codehaus.org/">JRuby</a>.  Getting the basics was surprisingly easy:

{% highlight ruby %}
module J
  require 'java'
  require 'je-3.2.44.jar'
  import 'com.sleepycat.je.Environment'
  import 'com.sleepycat.je.EnvironmentConfig'
end

conf = J::EnvironmentConfig.new
env = J::Environment.new(java.io.File.new('/opt/data/bdb'), conf)

if ARGV.length == 2
  env.get_database_names.each do |name|
    env.rename_database(nil, name, name.gsub(ARGV[0], ARGV[1]))
  end
end

puts env.get_database_names
env.close
{% endhighlight %}

There are a few gotchas to be aware of.  First keeping all your java includes in a module seems to be the best approach.  I got somewhat flakey behavior when trying to do those import statements in the global scope.  And second, don't try to include java.io.File.  It causes warnings about redefining File.  I'm guessing because it has the same name as the ruby File class.

Next I had to make a standalone jar file so that our operations team could run it without installing JRuby.  Sadly, this is not so easy. <a href="http://rubyforge.org/projects/rawr/">Rawr</a> will allow you to package your ruby script into a jar, but the resulting jar doesn't contain JRuby or any other jar dependencies.  There's also the <a href="http://mojo.codehaus.org/rubyscript-maven-plugin/introduction.html">rubyscript maven plugin</a>, but that only stores ruby scripts into your system as maven mojos.

Neither of these solutions really fit, so I decided to just code it in java for now.  For java projects, maven makes creating the standalone jar easy, as shown <a href="http://www.mail-archive.com/users@maven.apache.org/msg72607.html">here</a>.  I'm thinking that between some of Rawr's work and maven's assembly plugin there's a perfect solution.  But I'll have to do a bit more hacking to find it.
