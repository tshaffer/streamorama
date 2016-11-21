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

	encoder.timer = CreateObject("roTimer")
	encoder.timer.SetPort(encoder.msgPort)
	encoder.timer.SetElapsed(1, 0)
	encoder.timer.Start()

	encoder.ProcessEvent = encoder_ProcessEvent
	encoder.ProcessTimerEvent = encoder_ProcessTimerEvent
	encoder.StartStreaming = encoder_StartStreaming

	return encoder

End Function


Function encoder_ProcessEvent(event As Object) as Boolean

    print "encoder_ProcessEvent"

    retVal = false
    
	if type(event) = "roTimerEvent" then
		if type(m.timer) = "roTimer" and event.GetSourceIdentity() = m.timer.GetIdentity() then
		    m.ProcessTimerEvent()
			retval = true
		end if
	endif

    return retVal

end Function


Function encoder_ProcessTimerEvent()

    stop

    return false

End Function


Sub encoder_StartStreaming(streamUrl$ As String)

    print "StartStreaming"

End Sub


