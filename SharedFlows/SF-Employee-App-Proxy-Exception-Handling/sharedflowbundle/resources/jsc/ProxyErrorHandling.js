 const faultName = context.getVariable("fault.name");
 print(faultName);
 //Assign the fault name to a constant - faultName
  switch(faultName) {
    case "InvalidAccessToken" :
    case "invalid_access_token" :
        responseCode = "401";
        reasonPhrase = "Unauthorized";
        userMessage = "Invalid Access Token";
        break;
    case "access_token_expired" :
        responseCode = "401";
        reasonPhrase = "Unauthorized";
        userMessage = "Access Token Expired";
        break;
    case "QuotaViolation" :
        responseCode = "429";
        reasonPhrase = "Too Many Requests";
        userMessage = "Quota has been exceeded";
        break;
    case "ThreatDetected" :
        responseCode = "400";
        reasonPhrase = "Bad Request";
        userMessage = "Request received is incorrect";
        break;
    case "ExecutionFailed" :
        if(context.getVariable("ratelimit.SA.RateLimit.failed")){
            responseCode = "429";
            reasonPhrase = "Too Many Requests";
            userMessage = "Quota has been exceeded";
        }
        else if(context.getVariable("xmlattack.XMLThreatProtection.failed")){
            responseCode = "406";
            reasonPhrase = "Not Acceptable";
            userMessage = "Request XML received is not acceptable";
        }
        else if(context.getVariable('jsonattack.JSONThreatProtection.failed')){
            responseCode = "406";
            reasonPhrase = "Not Acceptable";
            userMessage = "Request JSON received is not acceptable";
        }
        else
            responseCode = "500";
            reasonPhrase = "Internal Error";
            userMessage = "Unknown server error";        
        break;
    default:
        responseCode = "500";
        reasonPhrase = "Internal Error";
        userMessage = "Unknown server error";
        break;
  }
context.setVariable("flow.errorStatusCode",responseCode);
context.setVariable("flow.errorReasonPhrase",reasonPhrase);
context.setVariable("flow.errorUserMessage",userMessage);