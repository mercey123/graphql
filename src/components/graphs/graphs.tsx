import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';
import { GraphData } from '../main-container/main-container';
import './graphs.css';

interface AuditProps {
  data: GraphData[],
  title: string
}

export function LineChart({ data, title }: AuditProps) {
  if (data.length < 1) return null

  const ref = useRef(null)
  const tooltipElement = useRef(null)

  useEffect(() => {
    const width = 750
    const height = 300
    let minDate = data[0].timestamp
    let maxDate = data[data.length - 1].timestamp

    let { minAmount, maxAmount } = data.reduce(({ minAmount, maxAmount }, { amount }) => {
      if (amount < minAmount) minAmount = amount
      if (amount > maxAmount) maxAmount = amount
      return { minAmount, maxAmount }
    }, {
      minAmount: data[0].amount,
      maxAmount: data[0].amount
    })

    d3.select(ref.current).selectAll("*").remove()
    const svg = d3.select(ref.current)
      .attr('height', `100%`)
      .attr('width', '100%')
      .attr("viewBox", [-55, 0, width + 60, height + 20])
      .attr('preserveAspectRatio', 'none')

    var scaleX = d3.scaleTime()
      .domain([minDate, maxDate])
      .range([0, width])

    const scaleY = d3.scaleLinear()
      .domain([minAmount * 1.1, maxAmount * 1.1])
      .range([height, 24])

    let line = d3.line<{ amount: number, timestamp: number }>()
      .x((set) => scaleX(set.timestamp))
      .y((set) => scaleY(set.amount))

    let axesAndTextGroup = svg
      .append('g')
      .attr('class', 'graph__axes')
    axesAndTextGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(scaleX))
    axesAndTextGroup.append("g")
      .call(d3.axisLeft(scaleY))
    axesAndTextGroup.append("text")
      .attr('fill', 'currentColor')
      .attr("x", (width / 2))
      .attr("y", 16)
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .text(`${title}`)

    //tt-----------------------------------
    const tooltip = d3.select(tooltipElement.current)
      .append("div")
      .style("visibility", "hidden")
      .attr("class", "graph__tooltip")
      .style("right", 0)
      .style('top', 0)

    const showTooltip = (e: MouseEvent, d: GraphData) => {
      console.log(d)
      tooltip
        .transition()
        .duration(100)
        .style("visibility", "visible")

      let auditType = d.type ? `${d.type}${d.type === 'up' ? '▲' : '▼'}` : ``
      tooltip.text(`${new Date(d.timestamp).toLocaleDateString("en-GB")}\n${d.objectName}\n${d.amount}xp\n${auditType}`)
    }

    // tooltip hide event
    const hideTooltip = () => {
      tooltip
        .transition()
        .duration(100)
        .style("visibility", "hidden")
    }
    //tt-----------------------------------

    svg
      .append('path')
      .attr("fill", "none")
      .attr("stroke", 'currentColor')
      .attr("stroke-width", 1)
      .attr("d", line(data))
      .attr('class', 'graph__line')

    svg.selectAll("path")
      .append('g')
      .data(data)
      .join('circle')
      .attr('cx', (set) => scaleX(set.timestamp))
      .attr('cy', (set) => scaleY(set.amount))
      .attr('r', 3)
      .attr('fill', 'transparent')
      .attr('stroke', 'currentColor')
      .attr('class', 'graph__line')
      .on("mouseover", showTooltip)
      .on("mouseleave", hideTooltip)
  }, [data])

  return (
    <div className='graph' ref={tooltipElement}>
      <svg ref={ref} />
    </div>
  )
}
