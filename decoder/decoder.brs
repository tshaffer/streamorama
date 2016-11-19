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

	decoder.networkConfig = CreateObject("roNetworkConfiguration", 0)

	decoder.ProcessEvent = decoder_ProcessEvent
	decoder.AddHttpHandlers = decoder_AddHttpHandlers
	decoder.StartPlayback = decoder_StartPlayback

	decoder.AddHttpHandlers()

	return decoder

End Function


Function decoder_ProcessEvent(event As Object) as Boolean
    return false
end Function


Sub decoder_AddHttpHandlers()

    startPlaybackAA = { HandleEvent: decoder_StartPlayback, mVar: m }
    m.bsp.sign.localServer.AddGetFromEvent({ url_path: "/StartPlayback", user_data: startPlaybackAA })

End Sub


Sub decoder_StartPlayback(userData as Object, e as Object)

	mVar = userData.mVar

    params = e.GetRequestParams()
    stop

End Sub


Sub StartStreaming(streamUrl$)

    m.rtspStream = CreateObject("roRtspStream", streamUrl$)

    aa = {}
    aa["Rtsp"] = m.rtspStream

    m.stateMachine.videoPlayer.SetLoopMode(1)
    ok = m.stateMachine.videoPlayer.PlayFile(aa)

    if ok = 0 then
        print "Error playing rtsp file in STStreamPlayingEventHandler: url = " + streamUrl$
    endif

End Sub


