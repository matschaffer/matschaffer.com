---
layout: post
title: Monitoring my home internet with Elastic
abstract: My home internet (NTT) has been slow in the evenings and weekends for over a year now. I decided it was time to get scientific about it.
---

Since the start of COVID19, my home internet has gotten noticably slow between the hours of 8p and midnight (JST, local).

I suspect this is a widespread issue as more people are staying home and doing things that exercise both local and global internet connections.

My ISP seems to do a decent job keeping things like video streaming prioritized, but work can be a big pain. Operations like apt update/install on a local VMs, npm install, browsing company websites can get _very_ slow. It's even worse when I'm on a full-tunnel VPN as I suspect in this case my ISP can't make any sort of traffic priority decisions.

For the last year, I mostly ignored it. With so much of the world suffering and dieing, it's difficult to complain about slow internet.

But it's gone on so long now I decided to at least get scientific about it.

## The approach

I figured if I could have something like [Ookla Speedtest](https://www.speedtest.net/) running continually and storing data, I could demonstrate and quantify the issue.

But what to use?

### Internet Speed Logger

Having recently helped out [Elastic Uptime](https://www.elastic.co/uptime-monitoring) I first reached out there.

It was notably outside their intended scope, but the project's PM mentioned he'd done similar home network testing with [Brennen Smith's Internet Speed Logger](https://github.com/brennentsmith/internet-speed-logger)

This got me some quick results:

![screenshot of internet speed logger showing bumpy traffic graphs](/images/internet-speed-logger.png){:width="80%"}

But it left something to be desired. It was hard to see what time the dips were hapening and I didn't see any options to change aggregations or do other processing. I'd probably have to hack on the code directly to draw useful conclusions.

Additionally this was a mongodb+node setup on docker compose. Easy to do on my MacBook, but a little trickier to run from my Raspberry Pi 4 which was the handiest stable computer on my network.

### Using the Elastic Stack

I mentioned the idea in passing to one of my coworkers, [Toby Brain](https://github.com/tobio) who said he did something similar with the Ookla CLI shipping data to Elasticsearch.

This sounded great for the following reasons:

- I could host Elasticsearch & Kibana on [cloud.elastic.co](https://cloud.elastic.co/) and not worry about data storage availability
- Filebeat and the Ookla CLI should be light enough to run on my Raspberry Pi

#### Setting up the cluster

This was easy! Just go to [cloud.elastic.co](https://cloud.elastic.co/), sign up and make a cluster.

If you don't happen to work at Elastic, you'll get at 14 day free trial. If you want more, you could start a [paying plan](https://www.elastic.co/pricing/), or [consider getting a job at Elastic](https://www.elastic.co/about/careers/) ;) . Or of course you could also host your own elasticsearch and kibana on a spare machine with enough resources (but probably not a Raspberry Pi). The data set is quite small. Only about 600kb for 3 days so far.

#### Setting up the Ookla CLI

Installation here is easy. Just grab a copy from [the speedtest cli download page](https://www.speedtest.net/apps/cli) for your process (arm in my case) and untar it. Move the binary somewhere handy (like `/usr/local/bin`).

One small "gotcha" is that each user has to run it once with no args to accept the EULA which will write into `$HOME/.config/ookla`). No big deal for my setup, but if you have users without home directories or something, watch out for it.

To run the speed test and get json output, you'll need a server ID. You can get one like this:

```
$ speedtest -L
Closest servers:

    ID  Name                           Location             Country
==============================================================================
 45080  ド田舎ネットワーク！By mino7r86. Kawagoe              Japan
  6087  Allied Telesis Capital Corporation Fussa-shi            Japan
  6492  denpa893                       Tokyo                Japan
 41592  NEVERLOSS LLC.                 Tokyo                Japan
 42083  LiyingNetwork                  Tokyo                Japan
 42297  Netprotect                     Tokyo                Japan
 43063  k-kohei.jp                     Tokyo                Japan
 43744  SERVG.NET MG-Network           Tokyo                Japan
 45012  NEROCLOUD INC.                 Tokyo                Japan
 44988  Misaka Network, Inc.           Tokyo                Japan
```

I was also interested in non-local test server. This was trickier, but I found an [Ookla XML feed](https://c.speedtest.net/speedtest-servers-static.php) that returns different lists based on your location. So I checked that while on a US VPN to get a second server ID.

With two IDs handy, I set up a cron job and that was it:

```
$ cat /etc/cron.d/speedtest
10 * * * * root (/usr/local/bin/speedtest -s 42297 -f json; /usr/local/bin/speedtest -s 10979 -f json) >> /var/log/speedtests
```

#### Setting up filebeat

#### Graphing

## Results and Conclusion

![screenshot showing internet speeds with a clear downstream dip in the evenings](/images/kibana-speed-data.png){:width="80%"}
