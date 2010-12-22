---
layout: post
title: Making your own Ruby gem
---

It's easy to make your own Ruby gem. Even without a library to help you. If you have RubyGems installed you're already good to go.

First, make a directory for your project. In that directory make gemspec file named after the gem. For example, `my_awesome_gem.gemspec`. The gemspec file is just Ruby. Here's a basic example:

{% highlight ruby %}
Gem::Specification.new do |s|
  s.name    = 'my_awesome_gem'
  s.version = '0.0.1'
  s.summary = 'This bit will show up under your gem on rubygems.org'

  s.author   = 'Mat Schaffer'
  s.email    = 'mat@schaffer.me'
  s.homepage = 'https://github.com/matschaffer/my_awesome_gem'

  # These dependencies are only for people who work on this gem
  s.add_development_dependency 'rspec'
  s.add_development_dependency 'mocha'

  # Include everything in the lib folder
  s.files = Dir['lib/**/*']

  # Supress the warning about no rubyforge project
  s.rubyforge_project = 'nowarning'
end
{% endhighlight %}

Now just put your code in `lib/my_awesome_gem.rb`. RubyGems will automatically put your `lib` directory into the load path when the gem is installed. To test your gem before it's installed just run your test script using `ruby -Ilib my_test_file.rb`.

Now build your gem with `gem build my_awesome_gem.gemspec` and push it to [RubyGems.org](http://rubygems.org) by running `gem push my_awesome_gem-0.0.1.gem`. You'll need to make a RubyGems.org account if you don't have one. The gem push command will ask you for your account info the first time you push a gem.

As a bonus, if you want to use rake to build and push your gem, just make a `Rakefile` like this (run `rake -T` to see what this gives you):

{% highlight ruby %}
require 'rake/gempackagetask'

spec = Gem::Specification.load(Dir['*.gemspec'].first)
gem = Rake::GemPackageTask.new(spec)
gem.define

desc "Push gem to rubygems.org"
task :push => :gem do
  sh "gem push #{gem.package_dir}/#{gem.gem_file}"
end
{% endhighlight %}

And if you want to manage your development gems with bundler, just put this in your `Gemfile`:

{% highlight ruby %}
source :rubygems
gemspec
{% endhighlight %}
