---
layout: post
title: Notes From October Philly.rb
---

So usually [Trev](http://trevmex.com/ "trevmex's tumblings") does notes, but he was presenting, so I tried to take some instead. Here they are, essentially unabridged so excuse any typos. Feel free to comment if you have errata or questions. If you need a little context or want to rate the talk, check out the [SpeakerRate page](http://spkr8.com/e/626 "philly.rb 10/12/2010 | SpeakerRate").

---

Why VCR? Mocks are hard :)
So Trev wrote a big ruby lib with no tests, but didn't have mocks.

This had lots of HTTP calls. Led to very slow tests. Changing data sets caused lots of breakage.

Twitter example, took 4 secs to run one test. Also there are a lot of things that can break the test (deleted accounts, etc).

Getting started:

    gem install vcr
    gem install (fakeweb|webmock) # VCR wraps one or ther other

"Cassets" that record HTTP stuff

To use: 

make a `vcr_setup.rb`, that points to your vcr/cassets (or other folder) and sets your stubbing lib (fakeweb or webmock).

They are yml, but don't put them in fixtures in rails 3 or it'll try to load them like they're db data.

    VCR.use_cassette("mycassettename", :record => :new_episodes) do
     ... your test
    end

Run it once, and it's slow. Run it again and it's fast (case it'll replay the API responses).

Can pass in `:erb => { vars... }` to give a context for erb substitution in the file.

Can also use

    VCR.insert_cassete(...) # in before
    VCR.eject_cassette #in after

Then you don't even need the block in the test code. You can also use rspec's "around" to do use_cassette.

Which http stub lib to use?

FakeWeb is 3 times faster than WebMock, but it only mocks Net::HTTP. WebMock is slower but it works for libcurl's Patron. Curb coming soom. libwww-perl, etc...

Request Matching
By default it'll match requests on the method and the URI. But you can also match on body/headers if neccessary by using `:match_requests_on => [:headers, :uri]`, etc...

You can use different cassettes for the same call to handle edge cases.

Best Practices
Set `:record => :none` in your `vcr_setup.rb` so that get errors if you make accidental unrecorded HTTP calls.

For ETAGs, putting match => :headers in your config might be a good idea.

Q: what about only doing certain requests to certain services? can you put a per-host filter on it?
A: Not sure.

2.0 is gonna have automatic re-recording of cassettes based on date. `use_vcr_cassette` macro in rspec to do the around stuff for you.