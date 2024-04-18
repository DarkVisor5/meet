import React, { useState, useEffect } from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, Legend } from 'recharts';

const EventGenresChart = ({ events }) => {
    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];
    // Define custom colors for each genre
    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

    const getData = () => {
        return genres.map((genre, index) => {
            const filteredEvents = events.filter(event => event.summary.includes(genre));
            return { name: genre, value: filteredEvents.length, color: colors[index] };
        });
    };

    const [data, setData] = useState([]);

    useEffect(() => {
        setData(getData());
    }, [events]);

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <ResponsiveContainer width="99%" height={400}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={130}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {
                        data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))
                    }
                </Pie>
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default EventGenresChart;
