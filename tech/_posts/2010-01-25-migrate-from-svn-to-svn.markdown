---
layout: post
title: Migrating from Subversion to ... Subversion?
---

As an update to [my previous post](/2009/11/migrate-from-perforce-to-svn/), one of my coworkers found that this technique was also applicable to migration between Subversion servers and that using git as intermediary was actually a bit more graceful than the traditional `svnadmin dump/load` approach. Git wins once again!

The one thing he noted is that this ends up with occasional 0-length patch files, I'm guessing from commits that only modified svn properties. These files will cause `git am` to abort, but can just be deleted for the re-import.

Here's the script he used:

{% highlight bash %}
#!/bin/sh

# Source URL
SRC_URL="$1"

# Destination URL
DST_URL="$2"

# Source and destination repo types (svn,p4)
SRC_TYPE=svn
DST_TYPE=${SRC_TYPE}

PROJECT=`basename "${SRC_URL}"`

# Clone SRC repo
git ${SRC_TYPE} clone ${SRC_URL} "${PROJECT}_src.git${SRC_TYPE}"

# Julienne SRC clone into patch files
mkdir "${PROJECT}.patches"
cd "${PROJECT}_src.git${SRC_TYPE}"
git format-patch --root HEAD -o "../${PROJECT}.patches"
cd ..

# Clone DST repo with empty target PROJECT dir
svn mkdir "${DST_URL}/${PROJECT}" -m "Initial repository layout."
git ${DST_TYPE} clone "${DST_URL}/${PROJECT}" "${PROJECT}_dst.git${DST_TYPE}"

# Merge SRC patches into DST clone
cd "${PROJECT}_dst.git${DST_TYPE}"
git am "../${PROJECT}.patches/"*

# Commit changes DST repo
git ${DST_TYPE} dcommit --add-author-from
cd ..
{% endhighlight %}