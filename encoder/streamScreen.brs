'Plugin creates Media Server that waits for clients to connect, and start stream

'rtsp server, port 8090
'Stream display output from client
'rtsp://serverIPAddress:8090/mem:/display/stream.ts

Function encoder_Initialize(msgPort As Object, userVariables As Object, bsp as Object)
	print "****************************************************************************"
    print "Encoder Plugin - Start"
 	print "****************************************************************************"

    encoder = newEncoder(msgPort, userVariables, bsp)

    return encoder
End Function


Function newEncoder(msgPort as Object, userVariables As Object, bsp as Object)

print "newEncoder"

	encoder = {}

    encoder.version = "0.0.1"
    encoder.msgPort = msgPort
    encoder.userVariables = userVariables
    encoder.bsp = bsp

    encoder.isEncoding = false

	encoder.timer = CreateObject("roTimer")
	encoder.timer.SetPort(encoder.msgPort)
	encoder.timer.SetElapsed(10, 0)
	encoder.timer.Start()

	encoder.ProcessEvent = encoder_ProcessEvent
	encoder.ProcessTimerEvent = encoder_ProcessTimerEvent
	' encoder.StartStreaming = encoder_StartStreaming

    deviceInfo = CreateObject("roDeviceInfo")
    encoder.serialNumber = deviceInfo.GetDeviceUniqueId()

	encoder.streamdisplayenabled = true	'stream display output automatically
	encoder.srvr = createobject("roMediaServer")
	encoder.srvr.start("rtsp:port=8090&threads=5&maxbitrate=6000")
	encoder.strmstarted = false

	return encoder

End Function


Function encoder_ProcessEvent(event As Object) as Boolean

    print "encoder_ProcessEvent"

    retVal = false

    if m.strmstarted = false then
        print "Start display output enabled"
        m.strmstarted = true

        pipleline$ ="display:mode=1&vformat=720p30&vbitrate=8000,encoder:,"
        address$ = "mem:/display"
        if type(m.strmr) <> "roMediaStreamer" then m.strmr = CreateObject("roMediaStreamer")
        if m.strmr <> invalid then
            m.strmr.reset()
            m.strmr.SetPipeline(pipleline$+address$)
            m.strmr.start()
        else
            print "Failed to create Display streamer..."
        endif
    endif

	if type(event) = "roTimerEvent" then
		if type(m.timer) = "roTimer" and event.GetSourceIdentity() = m.timer.GetIdentity() then
		    m.ProcessTimerEvent()
			retval = true
			m.timer.Start()
		end if
	endif

    return retVal

end Function


Function encoder_ProcessTimerEvent()

    if not m.isEncoding then
        url = CreateObject("roUrlTransfer")
        url.SetUrl("http://10.1.0.180:8080/getEncoderTargetStatus?serialNumber=" + m.serialNumber)
        encoder$ = url.GetToString()

        if len(encoder$) > 0 then
            encoder = ParseJson(encoder$)
            pipeline$ = encoder.pipeline
            m.StartStreaming(pipeline$)
        endif

    endif

    return true

End Function



'server options
'Maxbitrate - sets the maximum instantaneous bitrate of the RTP transfer initiated by RTSP. Has no effect for HTTP.
'The units are in Kbps; the parameter value 80000 (meaning 80Mbps) has been found to work well for streaming to Cheetahs.
'The default behaviour (also achieved by passing the value zero) is not to limit the bitrate at all. Example: "rtsp:port=554&trace&maxbitrate=80000"

'Threads - Each thread handles one client; default value is 5. Example: "http:port=8080&threads=10"

'Streaming display output
'display:mode=2&vformat=720p30&vbitrate=2000
'mode 2 scales well, but doesn't support output that has two videos playing
'mode 1 only scales horizontally, but supports 2 videos playing
