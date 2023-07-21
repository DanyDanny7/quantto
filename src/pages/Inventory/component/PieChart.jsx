/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import { useTheme } from "@mui/material/styles";
import { get } from "lodash";
import Chart from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels';

const PieChart = ({ values, loading }) => {
    const theme = useTheme();
    const chartRef = useRef(null);

    const data = {
        labels: [],
        datasets: [
            {
                label: '',
                data: values,
                backgroundColor: [theme.palette.color.skyblue[500], theme.palette.color.purplelight[300],],
                borderColor: [theme.palette.background.paper],
                borderWidth: 2,
            },
        ],

    };

    const options = {
        plugins: {
            datalabels: {
                formatter: function (value, context) {
                    const total = get(context, "dataset.data[0]") + get(context, "dataset.data[1]")
                    return `${Math.round(value / total * 100)}%`;
                },
                labels: {
                    value: {
                        color: 'white',
                    }
                }
            }
        }
    };
    useEffect(() => {
        const myChart = new Chart(chartRef.current, {
            type: 'pie',
            data: data,
            plugins: [ChartDataLabels],
            options: options
        })
        return () => {
            myChart.destroy()
        }
    }, [loading])



    return (
        <canvas ref={chartRef} />
    )
}

export default PieChart