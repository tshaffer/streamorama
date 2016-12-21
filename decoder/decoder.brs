Function decoder_Initialize(msgPort As Object, userVariables As Object, bsp as Object)
	print "****************************************************************************"
    print "Decoder Plugin - Start"
 	print "****************************************************************************"

    decoder = newDecoder(msgPort, userVariables, bsp)

    return decoder
End Function


Function newDecoder(mp as Object, userVariables As Object, bsp as Object)

print "newDecoder"

	decoder = {}

	decoder.version = "0.0.1"
	decoder.msgPort = mp
	decoder.userVariables = userVariables
	decoder.bsp = bsp

    decoder.isStreaming = false
    decoder.streamUrl = ""

	decoder.timer = CreateObject("roTimer")
	decoder.timer.SetPort(decoder.msgPort)
	decoder.timer.SetElapsed(2, 0)
	decoder.timer.Start()

	decoder.ProcessEvent = decoder_ProcessEvent
	decoder.ProcessTimerEvent = decoder_ProcessTimerEvent
	decoder.StartStreaming = decoder_StartStreaming

    deviceInfo = CreateObject("roDeviceInfo")
    decoder.serialNumber = deviceInfo.GetDeviceUniqueId()

	return decoder

End Function


Function decoder_ProcessEvent(event As Object) as Boolean

    print "decoder_ProcessEvent"

    retVal = false

	if type(event) = "roTimerEvent" then
		if type(m.timer) = "roTimer" and event.GetSourceIdentity() = m.timer.GetIdentity() then
		    m.ProcessTimerEvent()
		    m.timer.Start()
			retval = true
		end if
	endif

    return retVal

end Function


Function decoder_ProcessTimerEvent()

    url = CreateObject("roUrlTransfer")
    url.SetUrl("http://10.1.0.180:8080/getEncoderStream?serialNumber=" + m.serialNumber)
    streamUrl$ = url.GetToString()

    if not m.isStreaming or m.streamUrl <> streamUrl$ then
        ' TODO - could get a 204 - need to change code to account for that'
        m.StartStreaming(streamUrl$)
    endif

    return true

End Function


Sub decoder_StartStreaming(streamUrl$)

    videoPlayer = m.bsp.sign.zonesHSM[0].videoPlayer

    if m.isStreaming then
        videoPlayer.stop()
    endif

    m.rtspStream = CreateObject("roRtspStream", streamUrl$)

    aa = {}
    aa["Rtsp"] = m.rtspStream

    ok = videoPlayer.PlayFile(aa)

    if ok = 0 then
        print "Error playing rtsp file in STStreamPlayingEventHandler: url = " + streamUrl$
    else
        print "SUCCESS"
    endif

    m.isStreaming = true
    m.streamUrl = streamUrl$

End Sub


