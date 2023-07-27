function handleBillerDataParseComplete(data)
{
    logFunctionCall("handle_transaction_data_parse_complete");
    
    // construct dict
    billerDict = {};

    // ... ignore header row
    var startIndex = 1; 
    var count = data.length;      
    for(var i = startIndex; i < count; i++)
    {
        var rowData = data[i];

        billerDict[rowData[1]] = rowData[0];
    }
}

function handleTransactionDataParseComplete(data)
{
    logFunctionCall("handle_biller_data_parse_complete");

    // save data
    transactionData = data;

    // show "latest"
    showLatestTransactionData();
}

function handleParseSpendingByMonthComplete(
    totalAmountMade, totalAmountPaid, totalAmountUnknown, 
    incomeDict, expenseDict, payeeDict, monthIndex)
{
    logFunctionCall("handle_parse_spending_by_month_complete");

    drawPage(totalAmountMade, totalAmountPaid, 
        incomeDict, expenseDict, payeeDict, monthIndex);

    updateText(monthIndex, totalAmountMade, totalAmountPaid, totalAmountUnknown);  
}

function handleDateSubmit()
{
    logFunctionCall("handle_date_submit");

    removeCharts();

    var year = getYearFormFieldValue();
    var monthNum = getMonthFormFieldValue();
    if(monthNum > 0)
    {
        parseTransDataByMonth(transactionData, year, monthNum - 1, 
            handleParseSpendingByMonthComplete);  
    }
}

function handleFAQClick()
{
   document.getElementById('faqDiv').style.display = showFAQ ? "block" : "none";

   showFAQ = !showFAQ;
}