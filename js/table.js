(function() {
  d3_queue.queue()
      .defer(d3.json, "data/n5ik-nmm3.json")  /* https://data.sfgov.org/resource/6jnk-ty34.json?$limit=2000 */
      // .defer(d3.json, "foo.json")
      .await(doSomething)


  function doSomething (error,data) {
    if (error) console.log('There was an error downloading data')
    console.log(data.length)

    var t2nest = d3.nest()
      .key(function(d) { return d.planning_neighborhood })
      .rollup(function(v) { return {
        projects: v.length,
        units: d3.sum(v, function(d) { return +d.units }),
        netSqFt: d3.sum(v, function(d) { return +d.total_gsf_commercial })
      }; })
      .entries(data)

    var t2Data = d3nestToDatatables(t2nest)
    var t2Cols = [
      { title: "Neighborhood" },
      { title: "Projects" },
      { title: "Net Units" },
      { title: "Net Comm'l Sq Ft" }
    ]

    // var t4nest = d3.nest()
    //   .key(function(d) { return d.planning_neighborhood })
    //   .rollup(function(v) { return {
    //     projects: v.length,
    //     singFam: d3.sum(v, function(d) { return +d.units }),
    //     netSqFt: d3.sum(v, function(d) { return +d.total_gsf_commercial })
    //   }; })
    //   .entries(data)
    //
    // var t4Data = d3nestToDatatables(t4nest)
    // var t4Cols = [
    //   { title: "Neighborhood" },
    //   { title: "single family" },
    //   { title: "2-9 units" },
    //   { title: "10-19 units" },
    //   { title: "20-49 units" },
    //   { title: "50-99 units" },
    //   { title: "100-249 units" },
    //   { title: "above 250" },
    //   { title: "grand total" }


    $(document).ready(function() {
      $('#table2').DataTable( { data: t2Data, columns: t2Cols, paging: false, info: false} )
      // $('#table4').DataTable( { data: t4Data, columns: t4Cols, paging: false, info: false} )
    })
    debugger;
  }

  function d3nestToDatatables (nestData) {
    var dataSet = nestData.map(function (row) {
      var result = []
      result.push(row.key)
      for (v in row.values){
        result.push(row.values[v])
      }
      return result
    } )
    return dataSet
  }

}());
