(function() {
  d3_queue.queue()
      .defer(d3.json, "data/n5ik-nmm3.json")  /* https://data.sfgov.org/resource/6jnk-ty34.json?$limit=2000 */
      // .defer(d3.json, "foo.json")
      .await(doSomething)


  function doSomething (error,data) {
    if (error) console.log('There was an error downloading data')
    console.log(data.length)

    var projByNhood = d3.nest()
      .key(function(d) { return d.planning_neighborhood })
      .rollup(function(v) { return {
        projects: v.length,
        units: d3.sum(v, function(d) { return +d.units }),
        netSqFt: d3.sum(v, function(d) { return +d.total_gsf_commercial })
      }; })
      .entries(data)

    function d3nestToDatatables (nestData) {
      var columns = [
        { title: "Neighborhood" },
        { title: "Projects" },
        { title: "Net Units" },
        { title: "Net Comm'l Sq Ft" }
      ]
      var dataSet = nestData.map(function (row) {
        var result = []
        result.push(row.key)
        for (v in row.values){
          result.push(row.values[v])
        }
        return result
      } )
      return { columns: columns, data: dataSet}
    }

    var dtData = d3nestToDatatables(projByNhood)

    dtData.paging = false
    dtData.info = false
    
    $(document).ready(function() {
      $('#table2').DataTable( dtData )
    })



  }
}());