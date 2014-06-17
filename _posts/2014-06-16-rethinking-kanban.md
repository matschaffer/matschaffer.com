---
layout: post
title: Rethinking My Kanban Board
abstract: A few weeks ago my coworker challenged some my preconception about 3-column kanban boards. I recoiled at first, but the result is looking much better for everyone involved.
---

If you've ever used Trello, Jira, or other kanban board tools you may be used to seeing a board that looks like this:

<img src="/images/kanban3column.png" width="799" height="523" alt="A 3 column kanban board" class="img-thumbnail" />

*Note: The ticket names have been changed to protect the innocent.*

Here we have a typical 3-column layout; To Do, Doing, and Done. Our three available "dimensions" represent the following:

- Vertical: **Priority**
- Horizontal: **Status**
- Color: **Logical track of work**

The use of color may vary a bit depending on project, but there are number of systems that work this way and I've grown really used to it. Though it can have some problems, namely:

- There are only a few colors to work with, so you can run out on complex projects
- There's only one "top" of the list, so if you have many people working the list may thrash a bit
- If groups are fairly separate, people may need to skip down the list to find the next ticket they should work on

Of course these cases are somewhat rare and manageable so I happily kept working in this model. Jira also makes this easier since I can build filters to just see the parts of the board I was actively working on.

But when I showed up at the Trello board for a project I joined recently, I saw this:

<img src="/images/kanbanmulticolumn.png" width="969" height="322" alt="A multi-column kanban board" class="img-thumbnail" />

Oh, man.

How would I know what the status of a ticket was? How do I separate my backlog from my completed work?

Here the horizontal dimension typically used for status has been replaced with the track of work breakdown. My coworker said he laid it out this way because he's how he thought about the project. I considered "pivoting" it back to what I was used to, but the project already had more tracks of work than Trello had available colors.

Then it dawned on me: the only status I was really concerned about was "Doing". This was easily represented by a color. And with all those other colors available I decided to use two to represent my typical use of story points: 0 for trivial, 2 for easy, 4 for hard.

Now the board looked like this:

<img src="/images/kanbanmulticolumncolored.png" width="873" height="479" alt="A multi-column kanban board with colors" class="img-thumbnail" />

Now our dimensions look like this:

- Vertical: **Priority**
- Horizontal: **Logical track of work**
- Color: **Status & Difficulty**

Notice that we've added a little extra information and now have the option to introduce more than 6 tracks of work.

We also added an "Ideas" column on the left for higher level ideas that still needs to get split out into the different tracks of work. And a "Done" column far off to the right to get the completed tickets out of the way.

We're still iterating on this a bit, like ya do. But I'm pretty happy with how it turned out and really glad I didn't just try to force my preconceptions onto the existing board.
