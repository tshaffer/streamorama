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
    
	decoder.timer = CreateObject("roTimer")
	decoder.timer.SetPort(decoder.msgPort)
	decoder.timer.SetElapsed(1, 0)
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
			retval = true
		end if
	endif

    return retVal

end Function


Function decoder_ProcessTimerEvent()

stop

    if not m.isStreaming then
        url = CreateObject("roUrlTransfer")
        url.SetUrl("http://10.1.0.180:8080/getDecoderTargetStatus?serialNumber=" + m.serialNumber)
        decoder$ = url.GetToString()

        if len(decoder$) > 0 then
            decoder = ParseJson(decoder$)
            streamUrl$ = decoder.assignedEncoder.stream
            m.StartStreaming(streamUrl$)
        endif

    endif

    return true

End Function


Sub decoder_StartStreaming(streamUrl$)

    m.rtspStream = CreateObject("roRtspStream", streamUrl$)

    aa = {}
    aa["Rtsp"] = m.rtspStream

    videoPlayer = m.bsp.sign.zonesHSM[0].videoPlayer
    ok = videoPlayer.PlayFile(aa)

    if ok = 0 then
        print "Error playing rtsp file in STStreamPlayingEventHandler: url = " + streamUrl$
    else
        print "SUCCESS"
    endif

End Sub


