// prettier-ignore

async function drawLineChart() {
  // grab the data
  const data = await d3.csv("./bob_ross_paintings.csv")
  // let's look at one element of the array
  const paintings = data.map(painting => painting.colors.split(','))
  console.log(paintings)
  console.table(data[200])

  // My x-axis will be the empty property
  // My y-axis will be the number of colors

  // create the accessor functions
  const yAccessor = (d) => d.colors.split(",").length
  
  // create the dimensions of your chart
  let dims = {
    width: window.innerWidth * 0.9,
    height: 400,
    margin: {
      top: 15,
      right: 15,
      bottom: 40,
      left: 60,
    },
  }

  // create the bounds of the chart
  dims.boundedWidth = dims.width - dims.margin.left - dims.margin.right
  dims.boundedHeight = dims.height - dims.margin.top - dims.margin.bottom

  // append the svg to the DOM
  const wrapper = d3.select("#wrapper")
    .append("svg")
      .attr("width", dims.width)
      .attr("height", dims.height)

  // place a g within your svg
  const bounds = wrapper
    .append("g")
      .style("transform", `translate(${dims.margin.left}px, ${dims.margin.right}px)`)

  // create the scales
  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, yAccessor))
    .range([dims.boundedHeight, 0])

  const xScale = d3.scaleLinear()
    .domain([0, data.length])
    .range([0, dims.boundedWidth])

  // draw the path
  const lineGenerator = d3.line()
    .x((d, i) => xScale(i))
    .y((d) => yScale(yAccessor(d)))

  const line = bounds
    .append("path")
      .attr("d", lineGenerator(data))
      .attr("fill", "none")
      .attr("stroke", "grey")
      .attr("stroke-width", 2)

  // draw peripherals
  const yAxisGenerator = d3.axisLeft()
    .scale(yScale)

  const yAxis = bounds
    .append("g")
      .call(yAxisGenerator)

  const xAxisGenerator = d3.axisBottom()
    .scale(xScale)

  const xAxis = bounds
    .append("g")
      .call(xAxisGenerator)
      .style("transform", `translateY(${dims.boundedHeight}px)`)
}

drawLineChart()
