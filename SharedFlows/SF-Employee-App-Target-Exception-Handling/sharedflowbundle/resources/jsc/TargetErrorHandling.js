    const faultName = context.getVariable("fault.name");
    print(faultName);
    switch(faultName) {
        case "ErrorResponseCode" :
        responseCode = "404";
        reasonPhrase = "Not Found";
        userMessage = "Requested URL is unavailable";
        break;
    }
    context.setVariable("flow.errorStatusCode",responseCode);
    context.setVariable("flow.errorReasonPhrase",reasonPhrase);
    context.setVariable("flow.errorUserMessage",userMessage);