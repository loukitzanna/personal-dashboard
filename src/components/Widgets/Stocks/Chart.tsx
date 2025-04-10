import React, { useMemo } from 'react';
import { commonColors } from '@heroui/theme';
import { EChart } from '~ui/EChart';
import type { EChartsOption } from 'echarts';

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

    const options: EChartsOption = {
        grid: {
            show: false,
            top: 20,
            left: 40,
            height: '100%',
            containLabel: false,
        },
        xAxis: {
            type: 'category' as const,
            data: chartData.map((item) => item.date),
            boundaryGap: false,
            axisLabel: {
                show: false,
            },
        },
        yAxis: {
            type: 'value' as const,
            axisLabel: {
                show: false,
            },
            min: 'dataMin',
            max: 'dataMax',
        },
        series: [
            {
                name: 'Stock Price',
                type: 'line' as const,
                symbol: 'none',
                sampling: 'lttb',
                itemStyle: {
                    color: isPriceUp ? commonColors.green[600] : commonColors.red[700],
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
