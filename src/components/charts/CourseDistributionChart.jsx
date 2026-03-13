import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#4f46e5', '#22c55e', '#f97316', '#06b6d4', '#e11d48', '#6366f1'];

const CourseDistributionChart = ({ data }) => {
  const topCourses = React.useMemo(
    () =>
      data
        .slice()
        .sort((a, b) => b.total - a.total)
        .slice(0, 8),
    [data]
  );

  const chartData = React.useMemo(() => {
    if (data.length <= 8) return data;

    const shownIds = new Set(topCourses.map((c) => c.course));
    const othersTotal = data
      .filter((c) => !shownIds.has(c.course))
      .reduce((sum, c) => sum + c.total, 0);

    return [...topCourses, { course: 'Others', total: othersTotal }];
  }, [data, topCourses]);

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="total"
            nameKey="course"
            cx="40%"
            cy="50%"
            innerRadius={50}
            outerRadius={110}
            paddingAngle={2}
          >
            {chartData.map((entry, index) => (
              <Cell key={entry.course} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout="vertical" align="right" verticalAlign="middle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CourseDistributionChart;

