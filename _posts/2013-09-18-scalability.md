---
layout: post
title: Thoughts on Scalability
abstract: My new job at Netflix has me working at a whole new scale. Here are some of the revalations I've had over the past few months working there.
---

For the last couple years I spent a lot of time doing deployment automation work and helping startups with their Rails apps. This was a lot of fun but rarely put me in the path of high-scale customer traffic. Getting close to that onslaught of traffic was a big factor in my decision to move west and help run one of the largest installations on the internet.

Since I joined Netflix last April there are a number of interesting things I've discovered about how we operate at high scale. Most of these were things I knew about but always seemed out of reach when working on 3-tier startup-style applications.

### Backward-compatibility

In a start up, you can take often the site down for a few minutes overnight and no-one will notice or be upset. When you're working on a large in-demand site, the traffic never stops. So you have to rethink how you do your deployments. You will often have two (or more) versions of your application code running at any time. You will often have application code running against older clients or data schema. Most changes have to be done gradually. The Netflix blog has a [great post]() on how they moved from SimpleDB to Cassandra gradually.

I think rich-client applications may push the needle on this one a bit since you have a higher posibility of running mis-matched client and server code. It will be interesting to see how application frameworks progress on this point.

### Runtime controls

In an average Rails app if something's not right with a new feature, you redeploy. When you have a few hundred (or thousand) machines, a redploy process can take while. So instead you need a way to control your app at runtime. Usually this takes the form of feature toggles. At Netflix we use [archaius]() for this but there are many projects that can help in this space.

Without feature toggles, you will extend the impact of any outage until you can fix and roll out new code. With feature toggles, the act of rolling out code and rolling it back is a one-click process that effects the system in real time.

### App-level focus

When I ran servers in the past I would often obsess about the operating system, the filesystem structure, which HTTP server or daemon handler we used. Now that I work with a few hundred machines at a time, most of that has fallen away. I find myself mentally equating

### Auto-scale everything

