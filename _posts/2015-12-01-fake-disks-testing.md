---
layout: post
title: Fake Disks for Fun and EBS Testing
abstract: Local virtualization is fantastic. I'm sure we can all agree. But sometimes you find yourself automating an EBS task. How do you simulate and test that locally? Here are some options.
---

It's a good day. You're hacking away on some test driven infrastructure and have a repo that looks something like this.

(image and link to first commit in demo repo)

You run `kitchen converge` and Chef's audit mode gives you some nice warm fuzzies by letting you know your app is installed and, indeed, awesome.

(image of audit output)

But then you hit a problem. Your app is just too awesome to be contained by one root volume. It needs more space. Lots of it.

Easy fix, add an EBS volume, partition it, format it, mount it... and you've just broken your locally virtualized kitchen tests.

(image of failing kitchen run)

Thankfully there are a few options to work around this. Here are the ones I've used in the past ranging from simpler to more complex. Hopefully one of them should match your use case and provide a smooth path to more test-driven awesomeness.

## Flag it

Use an attribute to just skip the whole thing. You're losing confidence that your cookbook will always continue working, but sometimes this is the pragmatic option depending on your future plans for the cookbook and app.

## Use a ram disk

Linux gives you /dev/ram1..16 by default that can be used as memory-baked block stores.

They're small, but easy to use for simple cases.

If you need more space or need to test stuff like LVM setup you'll need to try another option.

## Attach a virtual disk

Kitchen makes it not too-totally-terrible to have vagrant attach a virtual disk. This is great because it gives you something that the OS can use as a real disk. LVM and RAID options just work and you can make the disks as large as you need.

Vagrant even takes care of ensuring they get removed when the VM is destroyed.

## One I haven't tried yet: run on EC2

kitchen-ec2 might also offer a way to "do it live" though you'll want to make sure everything gets cleaned up after the test run.

My experience with kitchen-ec2 so far as been limited and mostly unproductive, but there's some merit to running your cookbooks in the exact same environment they're running in, presuming you run on EC2.
