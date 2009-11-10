--- 
layout: post
title: What I learned about Cookies this week
---
A lot of people reading this are probably using <a href="http://www.rubyonrails.org">frameworks</a> that have decent session storage and don’t often need to worry about cookies. But over at <a href="http://www.comcast.net"><span class="caps">CIM</span></a> the thought of session state for many tens of millions of requests per day is daunting. As a result we use a lot of cookies. Probably too many, but that’s a story for another day.

Ever read the <a href="http://www.faqs.org/rfcs/rfc2965.html"><span class="caps">RFC</span> for cookies</a>? Neither had I. I probably wouldn’t have either until our company decided to standardize on <a href="http://tomcat.apache.org">Apache Tomcat</a> for our application containers. What we thought would be an easy conversion turned out to take a few days time because some of our important cookies apparently violate the <span class="caps">RFC</span>, but no browser or web server had complained yet. What rules did we break?

<ul>
	<li>The left hand side of a cookie definition can’t contain an ’@’ symbol (along with some others)</li>
	<li>The right hand side of a cookie can’t contain ’=’ symbols, so no unescaped key=value pairs</li>
</ul>

The <span class="caps">RFC</span> is a lot to wade through, but thanks to some information from <a href="https://issues.apache.org/jira/browse/WICKET-1834">Tomcat’s issue tracker</a> it was made pretty clear. Basically a cookie definition boils down to:

<pre><code>
   av-pairs    =     av-pair *(";" av-pair)
   av-pair     =     attr ["=" value]              ; optional value
   attr        =     token
   value       =     token | quoted-string
</code></pre>

Where the definition for token and quoted-string are provided in the <a href="http://www.faqs.org/rfcs/rfc2616.html"><span class="caps">HTTP</span>/1.1 spec.</a>

<pre><code>
    token          = 1*&lt;any CHAR except CTLs or separators&gt;
    separators     = "(" | ")" | "&lt;" | "&gt;" | "@"
                   | "," | ";" | ":" | "\" | &lt;"&gt;
                   | "/" | "[" | "]" | "?" | "="
                   | "{" | "}" | SP | HT

    quoted-string  = ( &lt;"&gt; *(qdtext | quoted-pair ) &lt;"&gt; )
    qdtext         = &lt;any TEXT except &lt;"&gt;&gt;
    quoted-pair    = "\" CHAR
</code></pre>

So there you have it. And most web servers and browsers don’t seem to complain. But if you ever find yourself looking at your server logs or a debugger wondering where you cookies went or why they’re truncated. Then it might be time to double check the <span class="caps">RFC</span>.

Oh, and the fix? Well ideally we’ll fix our cookies to comply with the <span class="caps">RFC</span>, but that will take some time since we don’t control the creation of all the cookies in question. So the plan for now is to patch Tomcat’s Cookie class to be a bit less strict when it’s parsing the request.
