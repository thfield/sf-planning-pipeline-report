(function() {
  d3_queue.queue()
      .defer(d3.json, "data/n5ik-nmm3.json")  /* https://data.sfgov.org/resource/6jnk-ty34.json?$limit=2000 */
      // .defer(d3.json, "foo.json")
      .await(afterLoad)


  function afterLoad (error,data) {
    if (error) console.log('There was an error downloading data')

    function table1 () {
      var dataNest = d3.nest()
        .key(function(d) { return d.entitlementstatus })
        .key(function(d) { return d.beststat_group })
        .rollup(function(v) { return {
          projects: v.length,
          net_added_units: d3.sum(v, function(d) { return +d.net_added_units }),
          net_added_sf: d3.sum(v, function(d) { return +d.net_added_sf }),
          net_cult_inst_educ: d3.sum(v, function(d) { return +d.net_cult_inst_educ }),
          net_medical: d3.sum(v, function(d) { return +d.net_medical }),
          net_office: d3.sum(v, function(d) { return +d.net_office }),
          net_prod_dist_rep: d3.sum(v, function(d) { return +d.net_prod_dist_rep }),
          net_ret_ent: d3.sum(v, function(d) { return +d.net_ret_ent }),
          net_visitor: d3.sum(v, function(d) { return +d.net_visitor })
        }; })
        .entries(data)

      var t1aData = d3nestToDatatables(dataNest[0].values)
          t1aData.forEach(function(el){el.unshift('Under Planning Review')})
      var t1bData = d3nestToDatatables(dataNest[1].values)
          t1bData.forEach(function(el){el.unshift('Approved by Planning')})
      var tData = t1aData.concat(t1bData)

      var tHead = [
        { title: "Entitlement Status", targets: 0},
        { title: "Status", targets: 1},
        { title: "Total no of Projects", targets: 2},
        { title: "Net Housing Units", targets: 3},
        { title: "Net Comm'l Sqft", targets: 4},
        { title: "CIE", targets: 5},
        { title: "Medical", targets: 6},
        { title: "Office", targets: 7},
        { title: "PDR", targets: 8},
        { title: "Retail", targets: 9},
        { title: "Visitior", targets: 10}
      ]

      var tCols = [
        { data: "entitlementstatus" },
        { data: "status" },
        { data: "total num of proj" },
        { data: "net housing units" },
        { data: "net comm'l sqft" },
        { data: "CIE" },
        { data: "Medical" },
        { data: "Office" },
        { data: "PDR" },
        { data: "Retail" },
        { data: "Visitior" }
      ]

      return { data: tData, columns: tHead, searching: false, paging: false, info: false}
    }


    function table2 () {
      var dataNest = d3.nest()
        .key(function(d) { return d.planning_neighborhood })
        .rollup(function(v) { return {
          projects: v.length,
          units: d3.sum(v, function(d) { return +d.units }),
          netSqFt: d3.sum(v, function(d) { return +d.total_gsf_commercial })
        }; })
        .entries(data)

      percentages(dataNest, 'projects')
      percentages(dataNest, 'units')
      //rank(residental-net-units)
      //rank(commercial-sqft)

      var tHead = [
        { title: "Neighborhood" },
        { title: "Projects" },
        { title: "Percent" },
        { title: "Net Units" },
        { title: "Percent" },
        { title: "Net Comm'l Sq Ft" }
      ]
      tHead.forEach(function(el,i){ el.targets = i })

      var tCols = [
        { data: "key" },
        { data: "values.projects" },
        { data: "values.projects_percent" },
        { data: "values.units" },
        { data: "values.units_percent" },
        { data: "values.netSqFt" }
      ]

      return { data: dataNest, columns: tCols, columnDefs: tHead, searching: false, paging: false, info: false}
    }


    function table3 () {
      var dataNest = d3.nest()
        .key(function(d) { return d.zoning_generalized })
        .key(function(d) { return d.zoning_simplified })
        .rollup(function(v) { return {
          projects: v.length,
          net_added_units: d3.sum(v, function(d) { return +d.net_added_units }),
          net_added_sf: d3.sum(v, function(d) { return +d.net_added_sf }),
          net_cult_inst_educ: d3.sum(v, function(d) { return +d.net_cult_inst_educ }),
          net_medical: d3.sum(v, function(d) { return +d.net_medical }),
          net_office: d3.sum(v, function(d) { return +d.net_office }),
          net_prod_dist_rep: d3.sum(v, function(d) { return +d.net_prod_dist_rep }),
          net_ret_ent: d3.sum(v, function(d) { return +d.net_ret_ent }),
          net_visitor: d3.sum(v, function(d) { return +d.net_visitor })
        }; })
        .entries(data)

      var tHead = [
        { title: "District Type" },
        { title: "Simplified Zoning" },
        { title: "Projects" },
        { title: "Net Units" },
        { title: "Net Gross Sq Ft" },
        { title: "CIE" },
        { title: "Medical" },
        { title: "Office" },
        { title: "PDE" },
        { title: "Retail" },
        { title: "Visitor" }
      ]

      tHead.forEach(function(el,i){ el.targets = i })

      var tCols = [
        { data: "key" },
        { data: "values.projects" },
        { data: "values.units" },
        { data: "values.netSqFt" }
      ]

      var tData = dataNest.map(function(el){
        var flattened = d3nestToDatatables(el.values)
        flattened.forEach(function(d){d.unshift(el.key)})
        return flattened
      })
      tData = _.flatten(tData,true)

      return { data: tData, columns: tHead,  searching: false, paging: false, info: false}
    }

    // function table4 () {
    //
    //   return { data: tData, columns: tHead,  searching: false, paging: false, info: false}
    // }

    function table5 () {
      var lostPDR = data.filter(function(d){ return d.net_prod_dist_rep < 0 })
      var dataNest = d3.nest()
        .key(function(d) { return d.planning_neighborhood })
        .rollup(function(v) { return {
          projects: v.length,
          net_added_units: d3.sum(v, function(d) { return +d.net_added_units }),
          net_added_sf: d3.sum(v, function(d) { return +d.net_added_sf }),
          net_prod_dist_rep: d3.sum(v, function(d) { return +d.net_prod_dist_rep })
        }; })
        .entries(lostPDR)

      percentages(dataNest, 'projects')
      percentages(dataNest, 'net_added_units')
      percentages(dataNest, 'net_prod_dist_rep')

      var tHead = [
        { title: "Neighborhood" },
        { title: "Projects" },
        { title: "Percent" },
        { title: "Net Units" },
        { title: "Percent" },
        { title: "PDR Net" },
        { title: "Percent" }
      ]

      tHead.forEach(function(el,i){ el.targets = i })

      var tCols = [
        { data: "key"},
        { data: "values.projects"},
        { data: "values.projects_percent"},
        { data: "values.net_added_units"},
        { data: "values.net_added_units_percent"},
        { data: "values.net_prod_dist_rep"},
        { data: "values.net_prod_dist_rep_percent"}
      ]

      return { data: dataNest, columns: tCols, columnDefs: tHead, searching: false, paging: false, info: false}
    }

    function table6 () {
      var lostOffice = data.filter(function(d){ return d.net_office < 0 })
      var dataNest = d3.nest()
        .key(function(d) { return d.planning_neighborhood })
        .rollup(function(v) { return {
          projects: v.length,
          net_added_units: d3.sum(v, function(d) { return +d.net_added_units }),
          net_added_sf: d3.sum(v, function(d) { return +d.net_added_sf }),
          net_office: d3.sum(v, function(d) { return +d.net_office })
        }; })
        .entries(lostOffice)

      percentages(dataNest, 'projects')
      percentages(dataNest, 'net_added_units')
      percentages(dataNest, 'net_office')

      var tHead = [
        { title: "Neighborhood" },
        { title: "Projects" },
        { title: "Percent" },
        { title: "Net Units" },
        { title: "Percent" },
        { title: "Office Net" },
        { title: "Percent" }
      ]

      tHead.forEach(function(el,i){ el.targets = i })

      var tCols = [
        { data: "key"},
        { data: "values.projects"},
        { data: "values.projects_percent"},
        { data: "values.net_added_units"},
        { data: "values.net_added_units_percent"},
        { data: "values.net_office"},
        { data: "values.net_office_percent"}
      ]

      return { data: dataNest, columns: tCols, columnDefs: tHead, searching: false, paging: false, info: false}

    }

    $(document).ready(function() {
      // $('#table1').DataTable( table1() )
      // $('#table1').prepend('<caption>Table 1 - Residential and Commercial Pipeline, by Pipeline Status and Land Use Category</caption>')
      //
      $('#table2').DataTable( table2() )
      $('#table2').prepend('<caption>Table 2 - Residential and Commercial Pipeline, by Neighborhood</caption>')

      $('#table3').DataTable( table3() )
      $('#table3').prepend('<caption>Table 3 - Residential and Commercial Pipeline by Generalized Zoning Category</caption>')

      // $('#table4').DataTable( table4() )
      // $('#table4').prepend('<caption>Table 4 - Projects by Neighborhood and Building Size</caption>')

      $('#table5').DataTable( table5() )
      $('#table5').prepend('<caption>Table 5 - PDR Space Conversion to Residential Use, by Planning District</caption>')

      $('#table6').DataTable( table6() )
      $('#table6').prepend('<caption>Table 6 - Office Space Conversion to Residential Use, by Planning District</caption>')

    })
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

  function percentages(dataNest, varName){
    var totalVarName = dataNest.reduce(function(prev, curr) {
      return prev + curr.values[varName]
    },0)
    return dataNest.map(function(el){
      var percent = Math.round(el.values[varName]/totalVarName*100)
      el.values[varName +'_percent'] = percent + '%'
    })
  }

}());
