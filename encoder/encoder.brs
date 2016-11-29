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
	encoder.StartStreaming = encoder_StartStreaming

    deviceInfo = CreateObject("roDeviceInfo")
    encoder.serialNumber = deviceInfo.GetDeviceUniqueId()

	return encoder

End Function


Function encoder_ProcessEvent(event As Object) as Boolean

    print "encoder_ProcessEvent"

    retVal = false

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


