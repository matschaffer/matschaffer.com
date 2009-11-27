---
layout: post
title: Migrating from Perforce to Subversion
---

So my new favorite hack of the week was created while trying to find a good way to import code from our partner's [Perforce](http://www.perforce.com/ "Perforce Software - The Fast Software Configuration Management System") repository to our [Subversion](http://subversion.tigris.org/ "subversion.tigris.org") repository.

I wanted to do this while retaining history but the [p4svn script](http://p42svn.tigris.org/ "p42svn.tigris.org") that I found depended on the deprecated [Perforce Perl API](http://www.perforce.com/perforce/loadsupp.html#api "Perforce-Related Software: Conversions, Sample Depot, APIs, Python, Perl, etc.") which made me nervous about trying to get it working.

So instead I decided to use [Git](http://git-scm.com/ "Git - Fast Version Control System") as an intermediary. My initial attempts to do this by way of a git merge or rebase didn't work out. The best I could get was the full source as one commit in subversion. But since git has really solid patch file support, I decided to try using `git format-patch` and `git am` to get the changes from one repository to the other.

The end result was about as good as I could have hoped for. Including `--add-author-from` even put the original Perforce information into the subversion commit logs which was awesome. The only downside I've seen so far today is that folders that should be deleted aren't always deleted in the final import. I'm guessing this has to do with how git ignores empty directories but svn doesn't. But cleaning them up wasn't too bad for me since the projects had a consistent structure. If the project had some sort of major reorganization happen, you might want to dig into that and try to figure out a better solution.

So here's the script, also checked into my [randomscripts](http://github.com/matschaffer/randomscripts) repository. Feel free to ask any questions or school me on a better way to do this!

{% highlight bash %}
#!/bin/sh

# Set these before you start
# export P4PORT=myperforceserver:1666
# export P4USER=myusername
# export P4PASSWD=mypassword

# Source Perforce depot path (without @all)
P4PATH="$1"

# Destination SVN url (without trunk, we create that)
SVNPATH="$2"

PROJECT=`basename "${SVNPATH}"`

# git p4 clone "${P4PATH}@all" "${PROJECT}.gitp4"

mkdir "${PROJECT}.patches"
cd "${PROJECT}.gitp4"
git format-patch --root HEAD -o "../${PROJECT}.patches"
cd ..

svn mkdir --parents "${SVNPATH}/"{trunk,branches,tags} \
          -m "Initial repository layout."
git svn clone "${SVNPATH}/trunk" "${PROJECT}.gitsvn"

cd "${PROJECT}.gitsvn"
git am "../${PROJECT}.patches/"*
git svn dcommit --add-author-from
cd ..
{% endhighlight %}