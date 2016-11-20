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

	encoder.networkConfig = CreateObject("roNetworkConfiguration", 0)

	encoder.timer = CreateObject("roTimer")
	encoder.timer.SetPort(encoder.msgPort)
	encoder.timer.SetElapsed(1, 0)
	encoder.timer.Start()

	encoder.ProcessEvent = encoder_ProcessEvent
	encocer.ProcessTimerEvent = encoder_ProcessTimerEvent
	encoder.StartStreaming = encoder_StartStreaming

	return encoder

End Function


Function encoder_ProcessEvent(event As Object) as Boolean

    retVal = false

	if type(event) = "roTimerEvent" then
		if type(m.timer) = "roTimer" and event.GetSourceIdentity() = m.timer.GetIdentity() then
		    m.ProcessTimerEvent()
			retval = true
		end if

    return retVal

end Function


Function encoder_ProcessTimerEvent()
End Function


Sub StartStreaming(streamUrl$)


End Sub


