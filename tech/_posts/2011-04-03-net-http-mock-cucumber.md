---
layout: post
title: Net::HTTP Mocking during Cucumber Tests
---

I just finished up an awesome week by speaking at [RubyNation](http://www.rubynation.org/). Hats off to the organizers and the sponsors for throwing a great conference! During [my twilio talk](http://www.slideshare.net/matschaffer/ruby-on-the-phone) I mentioned how we had problems running [Artifice](https://github.com/wycats/artifice) during our `@javascript` Cucumber features. Here's how that goes down.

If you're trying to use any sort of global Net::HTTP mocking tool during your Cucumber tests, you might encounter something like this:

{% highlight text %}
  Background:
    Given I am on the new user registration page
      Capybara::TimeoutError (Capybara::TimeoutError)
      ./features/step_definitions/web_steps.rb:20:in `/^(?:|I )am on (.+)$/'
      features/user_registration.feature:7:in `Given I am on ...'
    Then I should see "Email"
      Capybara::TimeoutError (Capybara::TimeoutError)
{% endhighlight %}

This happens because Selenium and Capybara use Net::HTTP to know when your Rails app is available. Sadly, you can't even put the mock activation in a Before block because Capybara won't start the separate Rails app until the first `@javascript` test. To get around this we set up our `env.rb` like so:

{% highlight ruby %}
require 'artifice'
require Rails.root.join('test', 'support', 'fake_twilio')
Artifice.activate_with(FakeTwilio)

require 'capybara/rails'
require 'capybara/cucumber'
require 'capybara/session'

module Selenium
  Net = ::Net.dup
  module Net
    HTTP = Artifice::NET_HTTP
  end
end

class Capybara::Server
  Net = ::Net.dup
  module Net
    HTTP = Artifice::NET_HTTP
  end
end
{% endhighlight %}

In the case of Artifice, it holds on to the original Net::HTTP as `Artifice::NET_HTTP`. This block of code puts the original Net::HTTP back but only in the namespaces where it's needed (Selenium and Capybara). Yet another lovely example of how powerful Ruby is. If you have a cleaner way to do this without resorting to two HTTP libraries, I'd love to hear it.
