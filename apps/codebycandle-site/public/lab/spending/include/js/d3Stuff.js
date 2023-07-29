function makePieChart(data, title, titleColor, monthIndex)
{
    logFunctionCall("make_pie_chart");
    
    pie = new d3pie("pieChart", 
    {
        "header": 
        {
            "title":
            {
                "text":         title,
                "fontSize":     22,
                "font":         "verdana",
                "color":        titleColor
            },
            "subtitle":
            {
                "text":         "expense % by biller type.",
                "color":        "#999999",
                "fontSize":     10,
                "font":         "verdana"
            },
           
            "titleSubtitlePadding":     12
        },
        "size": 
        {
            "canvasHeight":     400,
            "canvasWidth":      600,
            "pieOuterRadius":   "88%"
        },
        "data":
        {
            "content":          data
        },
        "labels":
        {
            "outer":
            {
                "pieDistance":  32
            },
            "inner":
            {
                "format":       "value"
            },
            "mainLabel":
            {
                "font":         "verdana",
                "color":        "#ffffff",
            },
            "percentage":
            {
                "color":            "#e1e1e1",
                "font":             "verdana",
                "decimalPlaces":    0
            },
            "value":
            {
                "color":            "#e1e1e1",
                "font":             "verdana"
            },
            "lines":
            {
                "enabled":          true,
                "color":            "#cccccc"
            },
            "truncation":
            {
                "enabled":          false
            }
        },
        "effects":
        {
            "pullOutSegmentOnClick": 
            {
                "effect":       "linear",
                "speed":        400,
                "size":         20
            }
        },
        "misc":
        {
            "gradient":
            {
                "enabled":      true,
                "percentage":   100
            },
            "pieCenterOffset":
            {
                "x":    10
            }
        }       
        /*
        "footer": {
            "text": "Source: me, my room, the last couple of months.",
            "color": "#999999",
            "fontSize": 11,
            "font": "open sans",
            "location": "bottom-center"
        },
        */        
    });
}

function makeChart(chartData)
{
    console.log("______________ MAKE CHART.");
    
    const TOTAL_W = 1600;
    const HEADER_PREFIX_TEXT = "Peeps Paid";

    var margin = {top: 20, right: 20, bottom: 30, left: 40};
    var width = TOTAL_W - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;

    // tool tip ////////////////////////////////////////
    var tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([-10, 0])
                .html(function(d)
                        {
                            return "<span style='color:red'><strong>Paid</strong></span> <span style='color:white'>" + d.total + " (" + (d.value * 100) + "%)" + "</span>";
                        });

    var svg = d3.select("body")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.call(tip);  
    ////////////////////////////////////////////////////

    // axes ////////////////////////////////////////////
    var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.1);
    var y = d3.scale.linear().range([height, 0]);
    var xAxis = d3.svg.axis().scale(x).orient("bottom");
    var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10, "%");

    x.domain(chartData.map(function(d)
                            {
                                return d.name; 
                            }));
    
    y.domain([0, d3.max(chartData, function(d)
                                    {
                                        return d.value;
                                    })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll(".tick text")
        .call(wrap, x.rangeBand());

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
    ////////////////////////////////////////////////////    

    // now draw!
    svg.selectAll(".bar")
        .data(chartData)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function(d)
                    {
                        return x(d.name); 
                    })
        .attr("width", x.rangeBand())
        .attr("y", function(d)
                    {
                        return y(d.value);
                    })
        .attr("height", function(d)
                        {
                            return height - y(d.value); 
                        })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

    // header //////////////////////////////////////////
    svg.append("text")
        .attr("class", "title")
        .attr("x", 50)
        .attr("y", 100)
        .text(HEADER_PREFIX_TEXT + " (" + chartData.length + ")");
    ////////////////////////////////////////////////////  
}

function makeTable(tableData)
{
    logFunctionCall("make_table");
    
    // get column definitions
    // (e.g. Date, Description, Original Description, Amount, Transaction Type, Category, Account Name, Labels, Notes)
    var columns = 
    [
        {head: 'Date', cl: 'center', html: function(row){return row[0];}},
        {head: 'Description', cl: 'title', html: function(row){return row[1];}},
        /*{ head: 'Original Description', cl: 'center', html: function(row) { return row[2]; }},*/
        {head: 'Amount', cl: function(row) {return (row[4] == 'credit') ? 'numPlus' : 'numMinus'; }, html: function(row){return row[3];}},
        /*{ head: 'Transaction', cl: 'center', html: function(row) { return row[4]; }},*/
        {head: 'Category', cl: 'center', html: function(row){return row[6];}},
        {head: 'Type (dirty)', cl: 'center', html: function(row){return row[5];}},
        /*{ head: 'Account Name', cl: 'center', html: function(row) { return row[7]; }},*/
        /*{ head: 'Labels', cl: 'center', html: function(row) { return row[8]; }},*/
        /*{ head: 'Notes', cl: 'center', html: function(row) { return row[9]; }}*/

        {head: 'Type (clean)', cl: 'center', html: function(row){return row[9]}}
    ];

    // create table
    var selection = d3.select('body');
    selection.selectAll('table').data([0]).enter().append('table');
    var table = d3.select('body').select('table');

    // create table header
    table.selectAll('thead').data(tableData).enter().append('thead');
    var thead = table.select('thead');

    // table.append('thead')
    thead.append('tr')
            .selectAll('th')
            .data(columns)
            .enter()
            .append('th')
            .attr('class', ƒ('cl'))
            .text(ƒ('head'));

    thead.append('tr')
            .selectAll('th')
            .data(columns).exit().remove();

    // create table body
    table.selectAll('tbody').data([0]).enter().append('tbody');
    var tbody = table.select('tbody');

    // table.append('tbody')
    tbody
            .selectAll('tr')
            .data(tableData)
            .enter()
            .append('tr')
            .selectAll('td')
            .data(function(row, i)
            {
                return columns.map(function(c)
                {
                    // compute cell values for this specific row
                    var cell = {};
                    d3.keys(c).forEach(function(k)
                    {
                        cell[k] = typeof c[k] == 'function' ? c[k](row,i) : c[k];
                    }
                );
                
                return cell;
            });
            })
            .enter()
            .append('td')
            .html(ƒ('html'))
            .attr('class', ƒ('cl'));
}

function removeCharts()
{
    d3.select("#pieChart").selectAll("svg").remove();
}

function wrap(text, width)
{
    console.log("______________ (WRAP).");
    
    text.each(function()
    {
        var text = d3.select(this),
                    words = text.text().split(/\s+/).reverse(),
                    word,
                    line = [],
                    lineNumber = 0,
                    lineHeight = 1.1, // ems
                    y = text.attr("y"),
                    dy = parseFloat(text.attr("dy")),
                    tspan = text.text(null)
                                .append("tspan")
                                .attr("x", 0)
                                .attr("y", y)
                                .attr("dy", dy + "em");
        
        while(word = words.pop())
        {
            line.push(word);
            tspan.text(line.join(" "));
            
            if(tspan.node().getComputedTextLength() > width)
            {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan")
                            .attr("x", 0)
                            .attr("y", y)
                            .attr("dy", ++lineNumber * lineHeight + dy + "em")
                            .text(word);
            }
        }
    });
}

function getYearFormFieldValue()
{
    return d3.select("#year").node().value;
}

function setYearFormFieldValue(num)
{
    return d3.select("#year").property('value', num);
}

function getMonthFormFieldValue()
{
    return d3.select("#month").node().value;
}

function setMonthFormFieldValue(num)
{
    return d3.select("#month").property('value', num);
}