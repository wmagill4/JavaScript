// from data.js
var tableData = data;

var rowsPerPage = 150

// renderTable function
function renderTable (tData,page)
// render the table rows and loop through the objects
{
    // clean existing table content
    d3.select("tbody").html("")
    // render new data
    tData.forEach( function(data,index){
        var row = d3.select("tbody").append("tr")
        row.append("td").text(index+1+(page-1)*rowsPerPage)
        row.append("td").text(data.datetime)
        row.append("td").text(data.city)
        row.append("td").text(data.state)
        row.append("td").text(data.country)
        row.append("td").text(data.shape)
        row.append("td").text(data.durationMinutes)
        row.append("td").text(data.comments)
    })
}

// render all table rows 
renderTable(tableData.slice(0,rowsPerPage),1);


// enable the filter button
var filteredData = tableData //defualt data if no filter
var filter = d3.select("#filter-btn");

filter.on("click", function() {
  // Prevent page refresh
  d3.event.preventDefault();

  // Select elements, get values, trim to lower case
  var datetime = d3.select("#datetime").property("value");
  datetime = datetime.trim().toLowerCase()
  var city = d3.select("#city").property("value");
  city = city.trim().toLowerCase()
  var state = d3.select("#state").property("value");
  state = state.trim().toLowerCase()
  var country = d3.select("#country").property("value");
  country = country.trim().toLowerCase()
  var shape = d3.select("#shape").property("value");
  shape = shape.trim().toLowerCase()

  //filter tableData with user inputs
  filteredData = tableData.filter( function(tableData){
      return( (tableData.datetime == datetime || datetime == "") 
      && (tableData.city.toLowerCase() == city || city == "")
      && (tableData.country.toLowerCase() == country || country == "")
      && (tableData.state.toLowerCase() == state || state == "")
      && (tableData.shape.toLowerCase() == shape || shape == "") )
  })
    
  // render the filtered table
  renderTable(filteredData.slice (0,rowsPerPage),1);

  // if nothing returned, print no result found
  if (filteredData.length===0){
    window.alert("No result found :(");
    }
});


// 3.  "next", "previous", "show all" buttons
var page = 1 //initialize page number

// 3.1 when click next, render the next 20 rows if avaiable
d3.select("#next").on("click",function(){
    var numberOfPages = Math.ceil(filteredData.length/rowsPerPage)

    if (page < numberOfPages){
        page+=1;
        data = filteredData.slice((page-1)*rowsPerPage,(page-1)*rowsPerPage+rowsPerPage)
        renderTable(data,page)
    }
})
