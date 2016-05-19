---
layout: post
title: Thoughts on Scalability
abstract: My new job at Netflix has me working at a whole new scale. Here are some of the revelations I've had over the past few months working here.
---

I spent the last two years doing deployment automation work and helping startups build Rails applications at Mashion. It was great fun but rarely put me in the path of high-scale customer traffic. Getting close to that traffic was a big factor in my decision to move west and help run one of the largest installations on the internet.

Since I joined Netflix last April there have been a number of interesting things I've learned about how we operate at high scale. Some of these seem obvious but were never quite at the forefront when working on 3-tier startup applications.

### Backward compatibility on all fronts

In a start up, you can take usually the app off-line for a few minutes overnight. No-one will notice or be upset. When you're working on a full-scale product the traffic never stops so you have to rethink how you do your deployments.

You will usually have two (or more) versions of your application code running at any time. You will usually have application code running against older client code or database schema. Most changes have to be done gradually. It pains me to think how difficult this would be with a typical Rails application. The facility to run and test against multiple schemas just isn't there.

I hope rich-client applications push the needle on this one since you need to address the possibility of an unrefreshed browser session hanging out there. Granted, most of the rich client frameworks don't ship with an answer to this yet. But I suspect it's only a matter of time until they do.

### Runtime controls

In an average Rails app, if something isn't right with a new feature, you redeploy. When you have a few hundred or thousand machines a full redeploy can take awhile. So instead you need a way to control your app at runtime. Usually this takes the form of feature toggles.

At Netflix we use [archaius](https://github.com/Netflix/archaius) for this but there are many projects that can help provide this functionality. But it's critical that you have a quick way to turn off broken features or slowly roll out new features.

### App-level focus

When I ran servers in the past I would often obsess about the operating system, the file system structure, which HTTP server or daemon tool we used. Now that I work with a few hundred machines at a time, most of that has fallen away. I find myself mentally equating servers and processes.

There are a lot of processes running on each machine but the main one I care about is the one handling customer requests.

It has taken me some time to learn to relax and love my base image. But I'm happy that I have. It may not be exactly how I'd do it but at our scale that really doesn't matter.

### Auto-scale everything

I've been using AWS for a long time. But this usually meant creating one-off EC2 instances and provisioning them over SSH. Each one then stayed online as long as it could as I upgraded, re-deployed and otherwise tweaked the server.

This is data center mentality.

To really leverage the cloud you need to be in an auto-scaling group. This will ensure that servers are easily replaced as they come and go (and they will). It also forces you make your application resilient against failures. Failures can happen anywhere but only the cloud approach offers a way to fully recover from failure automatically.

These points are really just a sample of the things I've been learning recently. Hopefully they provide some food for thought. The [Netflix stack](https://netflix.github.io/) certainly has a number of components that can help with these items but there's plenty of room for improvement. Especially when it comes to bridging the gap between high scalability and rapid application development.
