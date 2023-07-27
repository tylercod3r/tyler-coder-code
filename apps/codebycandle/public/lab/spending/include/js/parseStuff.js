function parseCSV(csvFilePath, callback)
{
    logFunctionCall("parse_csv"); 

    Papa.parse(csvFilePath, 
        {
            download: true,
            complete: function(results)
            {
                if(typeof callback == "function")
                {
                    callback(results.data);
                }
            }
        }); 
}

function parseTransDataByMonth(data, year, monthIndex, callback)
{
    logFunctionCall("parse_spending_by_month");

    // init local vars
    var expenseDict = {};
    var payeeDict = {};
    var incomeDict = {};

    // ... transaction data
    var totalAmountMade = 0;
    var totalAmountPaid = 0;
    var totalAmountUnknown = 0;
    // ... loop vars (ignore header row)
    var count = data.length;
    var startIndex = 1;

    for(var i = startIndex; i < count; i++)
    {
        var rowData = data[i];

        // ensure only "current" records are parsed
        var transDate = rowData[0];
        var transDateFields = transDate.split("/");
        var transYear = transDateFields[2];

        // if same year...
        if(transYear == year)
        {
            var transMonthIndex = transDateFields[0] - 1;
         
            // if same month...
            if(transMonthIndex == monthIndex)
            {
                // update table data
                var val = rowData[1];
                var payeeType = billerDict.hasOwnProperty(val) ? billerDict[val] : TO_BE_NAMED_BILLER_TYPE; 
                rowData.push(payeeType);

                // parse data!
                // TODO - remove literal val below, and confirm "transType" logic holds for all transaction types
                var desc = rowData[1];
                var transAmount = parseFloat(rowData[3]);
                var transType = rowData[4];
                if(transType != TRANSACTION_TYPE_CREDIT 
                    && transType != TRANSACTION_TYPE_INCOME)
                {
                    expenseDict[desc] = expenseDict[desc] ? (expenseDict[desc] += transAmount) : transAmount;
                
                    // add to total
                    totalAmountPaid += transAmount;
                }
                else
                {
                    totalAmountMade += transAmount;
                }

                // update pie chart data
                if(payeeType != TRANSACTION_TYPE_INCOME)
                {
                    payeeDict[payeeType] = payeeDict[payeeType] ? (payeeDict[payeeType] += transAmount) : transAmount;
                    
                    if(payeeType == TO_BE_NAMED_BILLER_TYPE)
                    {
                        totalAmountUnknown += transAmount;
                    }
                }   
                else
                {
                    incomeDict[payeeType] = incomeDict[payeeType] ? (incomeDict[payeeType] += transAmount) : transAmount;
                }
            }
        }
    }
        
    // round! (2 sig-figs) 
    totalAmountMade = Math.round(roundTo2SigFigs(totalAmountMade));
    totalAmountPaid = Math.round(roundTo2SigFigs(totalAmountPaid));
    totalAmountUnknown = Math.round(roundTo2SigFigs(totalAmountUnknown));

    // trigger callback
    if(typeof callback == "function")
    {
        callback(totalAmountMade, totalAmountPaid, totalAmountUnknown, 
            incomeDict, expenseDict, payeeDict, monthIndex);
    }
}