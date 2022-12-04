import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';
import { GraphData } from '../main-container/main-container';
import './graphs.css';

interface AuditProps {
  data: GraphData[],
  title: string
}

export function Graph({ data, title }: AuditProps) {
  if (data.length < 1) return null

  const ref = useRef(null)
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
    const svg = d3.select(ref.current).attr('height', `100%`).attr('width', '100%').attr("viewBox", [-55, 0, width + 60, height + 20]).attr('preserveAspectRatio', 'none')

    var scaleX = d3.scaleTime()
      .domain([minDate, maxDate])
      .range([0, width])

    const scaleY = d3.scaleLinear()
      .domain([minAmount * 1.1, maxAmount * 1.1])
      .range([height, 24])

    let line = d3.line<{ amount: number, timestamp: number }>()
      .x((set) => scaleX(set.timestamp))
      .y((set) => scaleY(set.amount))

    let axesAndTextGroup = svg.append('g').attr('class', 'graph__axes')

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

    svg
      .append("path")
      .attr("fill", "none")
      .attr("stroke", 'currentColor')
      .attr("stroke-width", 1)
      .attr("d", line(data))
      .attr('class', 'graph__line')
  }, [data])

  return (
    <div className='graphs_container'>
      <svg className='graph' ref={ref} />
    </div>
  )
}
