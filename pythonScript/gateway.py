import serial # Read data from serial ports.
import json
import sys
import urllib.request, urllib.parse

ser = serial.Serial('/dev/ttyACM0', 115200)
print(ser.name)
lastSerialData = ''
header = { 'Content-Type': 'application/json' }

while True:
  try:
    serialData = ser.readline().strip()
    serialData = serialData.decode('utf-8') # Decode data.
    if serialData != lastSerialData
      print(serialData)
      data = { 'data': serialData }
      data = bytes(urllib.parse.urlencode(data).encode())
      response = urllib.request.urlopen('https://kubra-didem-back.herokuapp.com', data)
    lastSerialData = serialData

  except KeyboardInterrupt:
    print('\nGoing out.')
    sys.exit(0)
