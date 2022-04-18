import React, {useEffect, useRef} from "react";
import {Box, Paper} from "@mui/material";
import * as d3 from "d3";
import dayjs from "dayjs";
import Transaction from "../model/Transaction";

class ChartVis extends React.Component<any> {


    componentDidMount() {
        this.drawChart();
    }

    drawChart() {
        const transactions = this.props.transactions as Transaction[];
        transactions.sort((a,b) => {
            if(a.date.isBefore(b.date)) {
                return -1;
            } else if (a.date.isAfter(b.date)) {
                return 1;
            } else {return 0;}
        });
        const transactionsNew = d3.groups(this.props.transactions, (d: Transaction) => d.date.startOf('month').toDate())

        const margins = 20;
        const parentBox = d3.select("#target1").node() as HTMLElement;
        const width = parentBox.getBoundingClientRect().width;
        const height = parentBox.getBoundingClientRect().height;

        const svg = d3.select("#target1")
            .append("svg")
            .attr("width", width)
            .attr("height", height - margins)
            .attr("viewBox", [0, 0, width, height])
            .attr("style", "width: auto; max-height: 100%;");

        svg.append("text")
            .attr("x", width/2)
            .attr("y", margins)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .text("2022-2023")

        const Y = d3.map(transactionsNew, d => d3.sum(d[1], t => parseInt(t.amount, 10)));

        const xDomain = [dayjs().startOf("year").toDate(), dayjs().startOf("year").add(11, "month").toDate()];
        const yDomain = [0, d3.max(Y) as number];
        const xRange = [margins, width - margins - margins];
        const yRange = [height - margins*2, margins]

        //console.log(yDomain);

        const xScale = d3.scaleTime(xDomain, xRange);
        const yScale = d3.scaleLinear(yDomain, yRange);
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale).ticks(height / 40);

        svg.append("g")
            .attr("transform", `translate(15,0)`)
            .call(yAxis)
            .call(g => g.selectAll('.domain').remove())
            .call(g => g.selectAll(".tick line").clone()
                .attr("x2", width - margins*2)
                .attr("stroke-opacity", 0.1))

        svg.append("g")
            .attr("fill", "steelblue")
            .selectAll("rect")
            .data(transactionsNew)
            .join("rect")
            .attr("x", (i) => {
                return xScale(i[0]);
            })
            .attr("y", (i) => {
                return yScale(d3.sum(i[1], a => parseInt(a.amount, 10)));
            })
            .attr("height", (i) => {
                return yScale(0) - yScale(d3.sum(i[1], a => parseInt(a.amount, 10)));
            })
            .attr("width", 20)
            .attr("transform", `translate(0,0)`);

        svg.append("g")
            .attr("transform", `translate(10,${height - (margins*2)})`)
            .call(xAxis);
    }

    render() {
        return (
            <Box sx={{height: '100%'}}>
                <Paper id="target1" sx={{width: '100%', height: '100%'}}>
                </Paper>
            </Box>
        )
    }
}

interface MonthlyTransactions {
    month?: Date,
    transactions?: Transaction[]
}

export default ChartVis