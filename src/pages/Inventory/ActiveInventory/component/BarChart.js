/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import { useTheme } from "@mui/material/styles";
import { get } from "lodash";
import Chart from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Box } from '@mui/material';

const PieChart = ({ values, ...restProps }) => {
    const theme = useTheme();
    const chartRef = useRef(null);

    const data = {
        labels: ['Electrodomesticos', 'Calzado'],
        datasets: [
            {
                data: [100, 100],
                backgroundColor: theme.palette.color.greenlight[400],
            },
            {
                data: [60, 60],
                backgroundColor: theme.palette.color.orange[400],
            },
            {
                data: [10, 10],
                backgroundColor: theme.palette.color.pink[300],
            }
        ]

    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            datalabels: {
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
            type: 'bar',
            data: data,
            plugins: [ChartDataLabels],
            options: options
        })
        return () => {
            myChart.destroy()
        }
    }, [])



    return (
        <Box class="chart-container" {...restProps}>
            <canvas ref={chartRef} />
        </Box>
    )
}

export default PieChart