import React, { useMemo } from 'react';
import { semanticColors } from '@heroui/theme';
import { EChart } from '~ui/EChart';
import type { EChartsOption } from 'echarts';

let base = +new Date(1968, 9, 3);
let oneDay = 24 * 3600 * 1000;
let date = [];
let data = [Math.random() * 300];
for (let i = 1; i < 2000; i++) {
    var now = new Date((base += oneDay));
    // @ts-ignore
    date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
    data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
}

const Chart = ({ stockData, timeRange, isPriceUp }) => {
    // Format chart data
    const chartData = useMemo(
        () =>
            stockData.historical.map((item) => ({
                date: new Date(item.timestamp).toLocaleDateString(),
                price: item.price,
            })),
        [stockData]
    );

    console.log(data);

    const options: EChartsOption = {
        grid: {
            top: 20,
            right: 20,
            bottom: 20,
            left: 40,
            containLabel: true,
        },
        xAxis: {
            type: 'category' as const,
            data: chartData.map((item) => item.date),
            axisLabel: {
                show: false,
            },
        },
        yAxis: {
            type: 'value' as const,
            axisLabel: {
                formatter: (value: number) => `$${value.toFixed(2)}`,
            },
        },
        series: [
            {
                name: 'Stock Price',
                type: 'line' as const,
                symbol: 'none',
                sampling: 'lttb',
                itemStyle: {
                    color: isPriceUp ? '#7CDB4C' : '#FF54A1', // Using direct color values instead of semanticColors
                },
                data: chartData.map((item) => item.price),
                areaStyle: {
                    opacity: 0.1,
                },
            },
        ],
        tooltip: {
            trigger: 'axis' as const,
            formatter: (params: any) => {
                const [param] = params;
                return `Date: ${param.name}<br/>Price: $${param.value.toFixed(2)}`;
            },
        },
    };

    return (
        <div className='w-full aspect-square'>
            <EChart option={options} />
        </div>
    );
};

export default Chart;
