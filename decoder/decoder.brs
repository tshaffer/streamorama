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

    if not m.isStreaming then
        url = CreateObject("roUrlTransfer")
        url.SetUrl("http://10.1.0.180:8080/getDecoderTargetStatus?serialNumber=1")
        decoder$ = url.GetToString()
        decoder = ParseJson(decoder$)

        pipeline$ = decoder.pipeline
        m.StartStreaming(pipeline$)
    endif

    return true

End Function


Sub encoder_StartStreaming(pipeline$ As String)

    print "StartStreaming"

    m.streamer = CreateObject("roMediaStreamer")
    m.pipeline$ = pipeline$
    print "--- Starting streaming with pipeline: ";m.pipeline$
    m.streamer.SetPipeline(m.pipeline$)
    ok = m.streamer.Start()
    if ok then
        print "********************* SUCCESS ********************"
        m.isEncoding = true
    else
        print "********************* FAILURE ********************"
    endif

End Sub


Sub decoder_StartStreaming(streamUrl$)

    m.rtspStream = CreateObject("roRtspStream", streamUrl$)

    aa = {}
    aa["Rtsp"] = m.rtspStream

''    m.stateMachine.videoPlayer.SetLoopMode(1)
''   ok = m.stateMachine.videoPlayer.PlayFile(aa)

    if ok = 0 then
        print "Error playing rtsp file in STStreamPlayingEventHandler: url = " + streamUrl$
    endif

End Sub


