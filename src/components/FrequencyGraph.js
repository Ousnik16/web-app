import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function FrequencyGraph({ userData }) {
  const [graphData, setGraphData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Tasks',
        data: [],
        borderColor: 'purple', // Color for both done and forgotten lines
        backgroundColor: 'purple',
        pointRadius: 5,
        fill: false,
        tension: 0, // Set tension to 0 for straight lines
      },
    ],
  });

  useEffect(() => {
    const updatedLabels = [];
    const combinedTasks = [];
    const currentTime = new Date();

    // Extract and sort tasks based on time
    const sortedTasks = userData.tasks
      .filter(task => task.time && task.completed !== undefined) // Filter valid tasks
      .map(task => {
        const [hours, minutes] = task.time.split(':').map(Number);
        return { ...task, timeValue: new Date().setHours(hours, minutes) }; // Create a time value for sorting
      })
      .sort((a, b) => a.timeValue - b.timeValue); // Sort by time value

    sortedTasks.forEach(task => {
      const taskTime = task.time.split(':');
      const formattedTime = `${taskTime[0]}:${taskTime[1]}`; // Format the time for the X-axis
      updatedLabels.push(formattedTime);

      // Check if task is done or forgotten
      if (task.completed) {
        combinedTasks.push({ x: formattedTime, y: 1 }); // Mark as done (y=1)
      } else {
        const taskDate = new Date();
        taskDate.setHours(taskTime[0], taskTime[1], 0, 0);

        if (currentTime > taskDate) {
          // Mark as forgotten
          combinedTasks.push({ x: formattedTime, y: 0 }); // Move forgotten tasks to y=0
        }
      }
    });

    // Update the graph data state
    setGraphData({
      labels: updatedLabels,
      datasets: [
        {
          label: 'Tasks',
          data: combinedTasks,
          borderColor: 'purple', // Color for both done and forgotten lines
          backgroundColor: 'purple',
          pointRadius: 5,
          fill: false,
          tension: 0, // Set tension to 0 for straight lines
        },
      ],
    });
  }, [userData.tasks]);  // Trigger whenever userData.tasks changes

  return (
    <div className="graph-container" style={{ width: '100%', height: '400px' }}>
      <h2>Task Completion Frequency</h2>
      <Line
        data={{
          labels: graphData.labels,
          datasets: graphData.datasets,
        }}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Task Completion vs Forgotten Tasks',
            },
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function(tooltipItem) {
                  return `Value: ${tooltipItem.raw.y}`; // Show y value in tooltip
                },
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Time',
              },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 10, // Adjust to limit the number of ticks shown
              },
            },
            y: {
              title: {
                display: true,
                text: 'Task Status',
              },
              min: -1, // Adjust the minimum value to fit the graph
              max: 2, // Adjust maximum value to accommodate "Done"
              ticks: {
                stepSize: 1,
                callback: function(value) {
                  // Return custom labels for specific values
                  if (value === 1) return 'Done'; // Label for completed tasks
                  if (value === 0) return 'Forgotten'; // Label for forgotten tasks
                  return ''; // Default case for other values
                },
              },
            },
          },
        }}
      />
    </div>
  );
}

export default FrequencyGraph;