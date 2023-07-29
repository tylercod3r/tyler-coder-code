function logFunctionCall(functionName)
{
    console.log("METHOD: ", functionName);
}

function getMonthText(monthIndex)
{
    switch(monthIndex)
    {
        case 0:
            return "Jan";
        case 1:
            return "Feb";
        case 2:
            return "Mar";
        case 3:
            return "Apr";
        case 4:
            return "May";
        case 5:
            return "Jun";
        case 6:
            return "Jul";
        case 7:
            return "Aug";
        case 8:
            return "Sep";
        case 9:
            return "Oct";
        case 10:
            return "Nov";
        case 11:
            return "Dec";
    }
}

function roundTo2SigFigs(value)
{
    return Math.round(value * 100) / 100;
}

function getCurrencyString(number)
{
    var decimalplaces = 2;
    var decimalcharacter = ".";
    var thousandseparater = ",";
    var currSymbolPrefix = "$";

    number = parseFloat(number);
    var sign = number < 0 ? "-" : "";
    var formatted = new String(number.toFixed(decimalplaces));
    if(decimalcharacter.length && decimalcharacter != ".")
    {
       formatted = formatted.replace(/\./,decimalcharacter);
    }
    var integer = "";
    var fraction = "";
    var strnumber = new String(formatted);
    var dotpos = decimalcharacter.length ? strnumber.indexOf(decimalcharacter) : -1;
    if(dotpos > -1)
    {
      if(dotpos)
      {
          integer = strnumber.substr(0,dotpos);
      }
      fraction = strnumber.substr(dotpos+1);
    }
    else
    {
       integer = strnumber;
    }

    if(integer)
    {
       integer = String(Math.abs(integer));
    }

    while(fraction.length < decimalplaces)
    {
       fraction += "0";
    }

    temparray = new Array();
    while(integer.length > 3)
    {
      temparray.unshift(integer.substr(-3));
      integer = integer.substr(0,integer.length-3);
    }
    
    temparray.unshift(integer);
    integer = temparray.join(thousandseparater);
   
    var returnString = currSymbolPrefix + sign + integer;
    
    // show decimals
    // returnString += decimalcharacter + fraction;
    
    return returnString;
}

function getDateStringYear(dateStr)
{
    var dateFormat = d3.time.format("%Y");
        
    return dateFormat(new Date(dateStr));
}

function getDateStringMonth(dateStr)
{
    var dateFormat = d3.time.format("%m");
        
    return dateFormat(new Date(dateStr));
}