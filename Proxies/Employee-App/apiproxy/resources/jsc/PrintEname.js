var payload = context.getVariable("Payload");
//Print the extracted payload from the response

context.setVariable("response.content",payload)
//Set the response