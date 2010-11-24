---
layout: post
title: Driving Pure Data with Ruby
---

So I've been playing around with [Pure Data](http://puredata.info/) a lot lately. I'm finally getting to a point where I think I "get" it. But one thing Pure Data doesn't seem to do very well is sequencing, or building melodies and patterns to play back. Unable to find an open MIDI sequencer for OS X, I turned to Ruby... Full. Double. Rainbow.

First, a little background incase you haven't played with Pure Data. Pure Data is visual programming language for working with audio signals. A simple sine wave tone at 440Hz would look like this:

<img class="center" src="{{ site.url }}/images/simple.png" />

To connect that sine wave to a MIDI control you just add a couple boxes:

<img class="center" src="{{ site.url }}/images/simple-midi.png" />

Of course, you can get a lot more complex. Pure Data has tools for mixing signals, storing data into tables, filtering, manipulating lists of data, etc. There's also a library called [PdMtlAbstractions](http://wiki.dataflow.ws/PdMtlAbstractions) that has a lot of good tools for handling note off events and [ADSR](http://en.wikipedia.org/wiki/Synthesizer#ADSR_envelope) more like a real synth. But even with these tools I was unable to build a sequencer that I was excited to use. Enter Ruby.

Now I'll probably get this working on MRI soon, but my googling pointed out that there was a [MIDI system built into Java](http://download.oracle.com/javase/6/docs/api/javax/sound/midi/package-summary.html). So at the moment this is JRuby only. And turns out that the Java API to trigger notes wasn't complicated. Here's a simple scale:

{% highlight ruby %}
include Java

MidiSystem = javax.sound.midi.MidiSystem
ShortMessage = javax.sound.midi.ShortMessage

# Find the "Bus 1" receiving device
for info in MidiSystem.get_midi_device_info
  if info.get_name == "Bus 1"
    device = MidiSystem.get_midi_device(info)
    break if device.get_max_receivers != 0
  end
end
device.open
receiver = device.get_receiver

# Make a melody
notes = [60, 62, 64, 60] * 2 +
        [64, 65, 67, 67] * 2 + [0]

# Send the notes   
notes.each do |note|
  noteon = ShortMessage.new
  noteon.set_message(ShortMessage::NOTE_ON, 0, note, 127);
  receiver.send(noteon, 0)
  sleep 0.5
end
{% endhighlight %}

The first section of the code is just to find the right output device. In this case I have Pure Data configured to listen to "Bus 1" on my IAC Driver. On a Mac you set this up by opening Audio MIDI Setup and pulling up info on the IAC Driver and adding a port. The IAC Driver is basically a virtual MIDI bus that lets you route MIDI signals between software on your computer. For more info on setting that up, check out [this tutorial](http://www.youtube.com/watch?v=10SdP_gviHY). If you wanted to have this script control a hardware synth, you'd just have to change the name to match what you're looking for.

The second section just sends some notes. Astute readers may notice that I'm not sending any note off messages. On a proper instrument or synth you'll need those too, but this simple synth can only play one note, so I've left them off for now.

And if you're curious, [here's what is sounds like]({{ site.url }}/files/simple-scale.mp3).

For my next trick, I'm hoping to build a ruby gem that will help me build songs. I've found a few out there, but haven't been really excited about them yet. Here's the syntax I have so far.

{% highlight ruby %}
class Melody < Voice
  def step_down
    notes[0] -= 1
    notes[1] -= 1
  end

  def play_with(&block)
    instance_eval(&block)
    play(4)
  end

  def self.run
    Thread.new do
      v = new(:channel => 1, :notes => %w(G# B C#5 D5))
      3.times do
        v.play_with { step_down }
      end
      v.play_with { step_down; notes[2] -= 1 }
      2.times do
        v.play_with { notes[0] -= 1 }
      end
    end
  end
end
{% endhighlight %}

Which sounds [like this]({{ site.url }}/files/zelda.mp3). Maybe I'll make something closer to real music with this some day. But for now it's a lot of fun. Hope you think so too.
