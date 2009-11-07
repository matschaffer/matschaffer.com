--- 
layout: post
title: Automatic iSync
---
I got this from [hohle](http://hohle.net/scrap_post.php?post=217), but the formatting on Jon's post is less-than-ideal. So here it is, reposted for easy copy/paste:

Download his applescript [here](http://hohle.net/downloads/AutoSync.scpt).

And here's the plist:

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?> 
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
 "http://www.apple.com/DTDs/PropertyList-1.0.dtd"> 
<plist version="1.0"> 
<dict> 
    <key>Disabled</key> 
    <false/> 
    <key>Label</key> 
    <string>local.isync.sync</string> 
    <key>LowPriorityIO</key> 
    <true/> 
    <key>Nice</key> 
    <integer>1</integer> 
    <key>ProgramArguments</key> 
    <array> 
        <string>osascript</string> 
        <string>
          /Users/schapht/Library/Scripts/AutoSync.scpt
        </string> 
    </array> 
    <key>StandardErrorPath</key> 
    <string>/dev/null</string> 
    <key>StandardOutPath</key> 
    <string>/dev/null</string> 
    <key>StartInterval</key> 
    <integer>1800</integer> 
</dict> 
</plist>
{% endhighlight %}

Just make sure to change your plist to point to wherever you keep AuthSync.scpt. Then save it to `~/Library/LaunchAgents/local.isync.sync.plist` and run the following from your Terminal:

{% highlight bash %}
launchctl load ~/Library/LaunchAgents/local.isync.sync.plist
launchctl start local.isync.sync
{% endhighlight %}
