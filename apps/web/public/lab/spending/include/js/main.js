const TRANSACTIONS_CSV_FILE_PATH        = "./_sensitive/transactions.csv";
const BILLERS_CSV_FILE_PATH             = "./_sensitive/billers.csv";

const TO_BE_NAMED_BILLER_TYPE           = "(?)";
const TRANSACTION_TYPE_INCOME           = "income";
const TRANSACTION_TYPE_CREDIT           = "credit";

const TRANSACTION_DATA_FIELD_INDEX_DATE = 0;

// ?
var pie;
var transactionData;
var billerDict;
var showFAQ = true;

$(document).ready(function()
{
    logFunctionCall("ready");  
    
    // $("#csv-file").change(handleFileSelect);

    parseCSV(BILLERS_CSV_FILE_PATH, handleBillerDataParseComplete);
    
    parseCSV(TRANSACTIONS_CSV_FILE_PATH, handleTransactionDataParseComplete);
});

function showLatestTransactionData()
{
    // get 1st non-header row
    var row =  transactionData[1];
    
    // read date field 
    var dateLastStr = row[TRANSACTION_DATA_FIELD_INDEX_DATE];

    // parse year
    var year = getDateStringYear(dateLastStr);
    setYearFormFieldValue(year);

    // parse month
    var month = getDateStringMonth(dateLastStr);
    setMonthFormFieldValue(month);

    // parse "latest" transaction data
    parseTransDataByMonth(transactionData, year, month - 1, 
        handleParseSpendingByMonthComplete);   
}

function drawPage(totalAmountMade, totalAmountPaid, 
    incomeDict, expenseDict, payeeDict, monthIndex)
{
    logFunctionCall("draw_page"); 

    var chartTitle = "";
    var chartData = null;
    var monthNum = getMonthFormFieldValue();

    // expenses
    chartTitle = "spent: " + getCurrencyString(totalAmountPaid);
    chartData = getExpenseChartData(expenseDict, totalAmountPaid);
    // ... 
    makePieChart(chartData, chartTitle, "#FF0000", monthIndex);

    // income
    /*
    chartTitle = "made: " + getCurrencyString(totalAmountMade);
    chartData = getIncomeChartData(incomeDict, totalAmountMade);
    // ...
    makePieChart(chartData, chartTitle, "#008800", monthIndex);
    */

    // TODO - return these to working state...
    // var payeeData = getPayeeChartData(payeeDict, totalAmountPaid);
    // makeTable(chartData);
    // makeChart(chartData);
}

function updateText(monthIndex, totalAmountMade, totalAmountPaid, 
    totalAmountUnknown)
{
    logFunctionCall("update_text"); 

    var text1 = getMonthText(monthIndex) + " ";
    var text2 = "(pending sort: " + getCurrencyString(totalAmountUnknown) + ")";
    if(monthIndex < 0)
    {
        text1 = "Enter a month.";
    }
    else
    {
        d3.select("#text2").html(text2);   
    }

    d3.select("#text1").html(text1);
}

// ???????????????????????????????????????????????????????????????
// TODO - refactor / consolidate below methods...
/////////////////////////////////////////////////////
function getIncomeChartData(incomeDict, totalAmountMade)
{
      var data = [];
      var randColorBaseNumber = (Math.random()*0x00FF00<<0);
      var baseColorString = '#'+(Math.random()*0x00FF00<<0).toString(16);
      for(var key in incomeDict)
      {
          // get %
          var amount = incomeDict[key];
          var percentage = amount / totalAmountMade;
          percentage = roundTo2SigFigs(percentage);

          // package obj
          randColorBaseNumber += 0x100000;
          var colorString = '#' + (randColorBaseNumber<<0).toString(16);          
          var obj =
          {
              "label": key,
              value: percentage,
              "color": colorString,
              total: Math.round(amount)             
          };
  
          // store
          data.push(obj);
      } 

      return data;
}

function getExpenseChartData(expenseDict, totalAmountPaid)
{
    var data = [];
    for(var key in expenseDict)
    {
        // get %
        var amount = expenseDict[key];
        var percentage = amount / totalAmountPaid;
        percentage = roundTo2SigFigs(percentage);

        // package obj
        var obj =
        {
            "label": key, 
            value: percentage, 
            total: Math.round(amount)
        };

        // store
        data.push(obj);
    }
    // ... sort
    data.sort(function(a,b)
    {
        return (a.total > b.total) ? -1 : ((b.total > a.total) ? 1 : 0);
    });

    return data;
}

function getPayeeChartData(payeeDict, totalAmountPaid)
{
    var data = [];
    
    var randColorBaseNumber = (Math.random()*0x0000FF<<0);
    var baseColorString = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    for(var key in payeeDict)
    {
        // get %
        var amount = payeeDict[key];
        var percentage = amount / totalAmountPaid;
        percentage = roundTo2SigFigs(percentage);

        // package obj
        randColorBaseNumber += 0x100000;
        var colorString = '#'+(randColorBaseNumber<<0).toString(16);
        var testObj = 
        {
            "label": key,
            "value": percentage,
            "color": colorString 
        };

        data.push(testObj);
    }

    return data;
}
/////////////////////////////////////////////////////

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/*
function handleFileSelect(evt)
{
    logFunctionCall("handle_file_select");

    var file = evt.target.files[0];

    Papa.parse(file, 
    {
        header: true,
        dynamicTyping: true, 
        complete: function(results)
        {
            data = results;

            console.log("complete!: " + results.data);
        }
    });
}
*/