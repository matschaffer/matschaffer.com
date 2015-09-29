---
layout: post
title: First look at Otto and Nomad
abstract: It was a whopper of a release day for the DevOps world yesterday. Coming out of HashiConf were two big releases from the company, so I took some time check them out and write down a few thoughts.
---

## The big one, Otto

[Otto](https://ottoproject.io/) is a tool that wraps up Vagrant, Packer, Terraform and Consul and provides clean layer of abstraction on top.

This provides a seamless way to transition from your local environment, into a dev VM on VirtualBox, then on to an instance on AWS. The same Appfile is used on both environments then fed through either Vagrant locally or Packer & Terraform on AWS.

In addition Hashicorp has built in *infrastructure* and *foundation* concepts that configure VPC and supporting services (right now just Consul) automatically as well.

Finally it comes with a nice app detection suite that's capable of building a default Appfile for a good range of application frameworks.

### A few surprises

The getting started guide was really straight forward but I did hit a few surprises that I'm sure will get worked out over time:

1. The VM that got selected in the tutorial was Ubuntu 12.04. It worked fine but I was pretty surprised to see such an old release used here.

2. Otto doesn't use `~/.aws/credentials` for AWS credentials. Instead it prompts you for credentials and a password to encrypt them. Not a deal breaker, but was a bit curious given how common the AWS credentials file is across tools these days.

3. Packer chooses a c3.large to build the AMI by default. The build should be less than an hour so it won't cost much but it won't qualify for the free tier if you're trying to keep your AWS bill at zero.

### The takeaway

Otto, quite frankly, looks **awesome**. I can't wait to see where it goes from here.

I've already got the code checked out and am exploring what it'd take to build some sort of monitoring foundation like Influx or Netflix's Atlas.

I'd also love to see some evolution in deployment strategies, specifically in the direction of rolling ASGs similar to how Netflix's Asgard tool does it.

To wrap it up I did a quick screencast of the high-level steps that the getting started guide goes through.

<div class="embed-responsive embed-responsive-16by9 text-center" style="margin: 20px;">
<iframe width="420" height="315" src="https://www.youtube.com/embed/WHt4xhX7XJc" frameborder="0" allowfullscreen></iframe>
</div>

## Also, Nomad

I also took a peek at [Nomad](https://www.nomadproject.io/) which was the other HashiCorp release yesterday.

This is a scheduler project that aims to make running containers across a fleet of docker hosts straight forward.

While Otto seemed to be a very new piece of software, Nomad felt similar to other container management tools such as Kubernetes or CoreOS Fleet.

The getting started guide again was fairly solid though I did run into a few cases where I had no contianers running and couldn't figure out why Nomad wasn't scheduling them.

Nomad appears to still be a bit more beta than Otto, but there are hints that Nomad will provide a platform for Otto in the future.

This would be a welcome addition since it should offer a way to deploy containzerized apps much more quickly than the current AMI-baking default.

Congrats to the folks at HashiCorp for a very big and well-executed release day!
