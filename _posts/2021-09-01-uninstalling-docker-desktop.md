---
layout: post
title: Uninstalling Docker Desktop for macOS
abstract: Today I saw that Docker Desktop will be requiring a subscription, so I ventured off in search of some new options.
---

This morning, like many developers, I woke up to an email telling me that [Docker Desktop](https://www.docker.com/blog/updating-product-subscriptions/) would now require a subscription for me to use at work.

While I'm sure my company could handle the expense, I wasn't happy to about the likely overhead and wanted to explore my options. 

So I took a deep breath and hit the uninstall button.

![Docker desktop preferences dialog showing the uninstall button](/images/docker-desktop-uninstall.png){:width="80%"}

This part was easy. But how should we get docker functionality back?

[Docker Machine](https://docs.docker.com/machine/) is an option I've used before Docker Desktop and it doesn't seem to be covered under the new licensing requirements. It's also available via homebrew, so it's an easy option to try out.

```bash
# Install it
brew install docker-machine

# Provision a default machine (my docker desktop was set to 12GB of memory, so adjust for your machine)
docker-machine create --virtualbox-cpu-count 4  --virtualbox-memory 12288 default

# Add this to my zshrc to export the env if docker-machine is present
command -v docker-machine > /dev/null 2>&1 && eval "$(docker-machine env default)"
```

Docker Machine doesn't come with a docker CLI client so brew that as well.

```bash
brew install docker
```

And seems like we're in business.

```
❯ docker ps

CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

Next I'll try a docker compose test tool I often use.

```
❯ docker compose -f create-certs.yml run --rm create_certs
unknown shorthand flag: 'f' in -f
```

Interesting. The brew installed docker CLI doesn't include the fancy new `compose` subcommand that docker desktop does.

Well, that's just a brew away:

```bash
brew install docker-compose
```

And my previous docker compose workflows seem to work just fine.

```
❯ docker-compose -f create-certs.yml run --rm create_certs
# Good stuff happening

❯ ELASTIC_VERSION=7.15.0-SNAPSHOT docker-compose up
# Mostly good stuff, but then this
node01        | ERROR: [1] bootstrap checks failed. You must address the points described in the following [1] lines before starting Elasticsearch.
node01        | bootstrap check failure [1] of [1]: max virtual memory areas vm.max_map_count [65530] is too low, increase to at least [262144]
```

The [elasticsearch docs](https://www.elastic.co/guide/en/elasticsearch/reference/current/vm-max-map-count.html) cover the sysctl setting I'll need to correct this. But how do I get that into docker machine?

Thankfully I came across [github.com/boot2docker/boot2docker#1216](https://github.com/boot2docker/boot2docker/issues/1216) which has the info I need. Amusingly for the same Elasticsearch memory requirement.

```
❯ docker-machine ssh default
...
docker@default:~$ sudo -i
# Set it for the current runtime
root@default:~# sysctl -w vm.max_map_count=262144
vm.max_map_count = 262144
# Put it in the profile for next boot too
root@default:~# echo 'sysctl -w vm.max_map_count=262144' >> /var/lib/boot2docker/profile
```

I restarted the `docker-compose` command and things are looking better.

Finally, let's load up the kibana inside the docker-compose stack I just started.

![Browser showing no site at localhost:5601](/images/localhost-kibana.png){:width="80%"}

No love. Since docker machine runs a VirtualBox VM, the network space isn't shared with my OS.

But docker machine can tell me the IP I need easily enough.

```
❯ docker-machine ls
NAME      ACTIVE   DRIVER       STATE     URL                         SWARM   DOCKER      ERRORS
default   *        virtualbox   Running   tcp://192.168.99.100:2376           v19.03.12
```

![Browser showing kibana running on 192.168.99.100:5601](/images/docker-machine-kibana.png){:width="80%"}

So it's not perfect. A few clear cons:

* I'm missing the fancy new `docker compose` subcommand.
* I have to keep VirtualBox installed functional. This can be a pain especially since last I checked it conflicts with the [Intel Power Gadget](https://software.intel.com/content/www/us/en/develop/articles/intel-power-gadget.html).
* I can't use `localhost` which may cause link confusion between me and co-workers.
* The docker-machine VM needed a tweak, and maybe more overtime.

But it should do the job.

I'll post updates as I find out more. Thanks for following along with me!

