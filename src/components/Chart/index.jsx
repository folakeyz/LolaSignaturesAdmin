import React from 'react'
import ReactECharts from "echarts-for-react";

const Chart = ({ orders = 0, delivered = 0, pending = 0 }) => {
    const option = {
        tooltip: {
            trigger: "item",
        },

        legend: {
            top: "5%",
            left: "center",
        },
        series: [
            {
                name: "Analytics",
                type: "pie",
                radius: ["40%", "70%"],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: "#fff",
                    borderWidth: 2,

                },
                label: {
                    show: false,
                    position: "center",
                },
                emphasis: {

                    label: {
                        show: true,
                        fontSize: "20",
                        fontWeight: "bold",
                    },
                },
                labelLine: {
                    show: false,
                },
                data: [
                    { value: orders, name: "Orders" },
                    { value: pending, name: "Awaiting Delivery" },
                    { value: delivered, name: "Delivered" },

                ],
            },
        ],
    };
    return (
        <div>
            <ReactECharts option={option} style={{ height: '500px', width: '100%' }} />
        </div>
    )
}

export default Chart
