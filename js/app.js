(function() {
  d3_queue.queue()
      .defer(d3.json, "data/6jnk-ty34.json")  /* https://data.sfgov.org/resource/6jnk-ty34.json?$limit=2000 */
      // .defer(d3.json, "foo.json")
      .await(doSomething)


  function doSomething(error,data) {
    if (error) console.log('There was an error downloading data')
    console.log(data.length)
  }


}());