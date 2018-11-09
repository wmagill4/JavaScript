// from data.js
var tableData = data;

var rowsPerPage = 150

// *function to reder a given table of data
function renderTable (tData,page)
// reder table rows under "tbody" class
// loop through list of objects, each object is one row
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

// 1. redner the first 20 rows of data when first launch window
renderTable(tableData.slice(0,rowsPerPage),1);


// 2. filter data with form inputs after hit the "filter table" button
var filteredData = tableData //defualt data if no filter

// Select the submit button
var filter = d3.select("#filter-btn");

filter.on("click", function() {
  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input elements and get the values
    // cleaning - trim spaces and turn into lower case
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
    
  // render the first 20 result   
  renderTable(filteredData.slice (0,rowsPerPage),1);

  // if no result returned - give use an alter
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
// 3.2 when click previous, render the last 20 rows if avaiable
d3.select("#previous").on("click",function(){
    var numberOfPages = Math.ceil(filteredData.length/rowsPerPage)

    if (page > 1){
        page-=1
        data = filteredData.slice((page-1)*rowsPerPage,(page-1)*rowsPerPage+rowsPerPage)
        renderTable(data,page)
        }
})

// 3.3 when click reset, render the first 20 rows of orignal data
d3.select("#reset").on("click",function(){
    //  clean user iputs
    d3.selectAll(".form-control").property("value","")
    // render original data
    page = 1
    renderTable(tableData.slice(0,rowsPerPage),page);
    filteredData = tableData; //reset filtered data
})
