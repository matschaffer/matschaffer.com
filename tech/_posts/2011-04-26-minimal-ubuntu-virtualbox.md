---
layout: post
title: Creating a minimal Ubuntu VirtualBox image
---

In my last post, I showed you how to build a CloudFoundry mini-cloud on an Ubuntu VirtualBox. Building that base image took some work and sorting through old blog posts, so I thought I'd post the instructions I ended up using.

First, download a copy of the latest Ubuntu LTS (Long-Term-Support) image. This tutorial follows the 10.04 installation, later versions may vary.

At the boot screen, press F4 which will let you select the type of installation to perform. Select "Minimal Virtual Machine", then hit enter to start the Install.

Keyboard selection won't matter much, so I just chose USA/USA.

For the system clock, I recommend UTC. This models most of the cloud provider images you're likely to come across.

Have it use the whole disk and auto-partition.

Use 'ubuntu' for the username and password for now. Once the system is set up, you can install your ssh keys and remove the password with `sudo passwd -d ubuntu`.

Disk encryption and HTTP proxies is your choice, but I didn't need to use either.

When you get to select packages, do manual package selection and it will put you into the aptitude program. This is a little tricky to navigate, but these commands should be plenty to get the job done:

* use /, enter and n to search similar to less or vi
* `+` to install the selected package
* search and install as needed
* gg to install packages

You'll need these packages in order to get the VirtualBox guest tools setup. I recommend installing these since it will enable you to detect the IP of the VM and shut it down without having to SSH into it:

* build-essential
* linux-headers-virtual
* openssh-server

Once it reboots, select "Install Guest Additions" from the Devices menu to mount the VirtuaBox guest additions install image. Then log in and run these commands:

    sudo mount /dev/cdrom /mnt
    sudo sh /mnt/VBoxLinuxAdditions.run

The last important fix is to remove the MAC address cache that this version of Ubuntu has:

    sudo rm /etc/udev/rules.d/70-persistent-net.rules

Note that when you import the image using VBoxManage you should also reset it's MAC address. You can do this using VBoxManage like this:

    VBoxManage modifyvm MyVMName --macaddress1 auto

You may also want to be able to shutdown the machine without logging in, you'll also need to install ACPI support:

    sudo apt-get update
    sudo apt-get install acpi-support

This will allow you to use the VBoxManage command to shut down the machine cleanly without using SSH:

    VBoxManage controlvm MyVMName acpipowerbutton

If you want passwordless sudo access (also common on cloud images) run:

    sudo su -c "echo 'ubuntu ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers"

At this point, disconnect the guest additions and shut down the VM. You should now have a super-minimal Ubuntu image that's confiured similarly to the Ubuntu images you'll see on cloud services like EC2.
