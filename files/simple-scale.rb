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