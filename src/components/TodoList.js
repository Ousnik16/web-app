import React, { useState, useEffect } from 'react';

function TodoList({ userData, setUserData }) {
  const [task, setTask] = useState('');
  const [time, setTime] = useState('');
  const [alert, setAlert] = useState('');

  // Function to handle adding new tasks
  const handleAddTask = () => {
    if (!task || !time) {
      return;
    }
    
    const newTask = { task, time, completed: false, forgotten: false, timeStamp: new Date().toLocaleString() };
    setUserData({
      ...userData,
      tasks: [...userData.tasks, newTask],
      totalTasks: userData.totalTasks + 1,
    });
    setTask('');
    setTime('');
  };

  // Function to check tasks against the current time and update forgotten tasks
  const checkForgottenTasks = () => {
    const currentTime = new Date();

    const updatedTasks = userData.tasks.map((item) => {
      const taskTime = item.time.split(':');
      const hours = parseInt(taskTime[0]);
      const minutes = parseInt(taskTime[1]);
      const taskDate = new Date();
      taskDate.setHours(hours, minutes, 0, 0);

      // If the task is not completed and current time has passed the task time, mark it as forgotten
      if (!item.completed && currentTime > taskDate) {
        return { ...item, forgotten: true };
      }
      return item;
    });

    setUserData({
      ...userData,
      tasks: updatedTasks,
    });
  };

  // Effect to check forgotten tasks periodically (every 1 minute)
  useEffect(() => {
    const interval = setInterval(() => {
      checkForgottenTasks();
    }, 60000); // Check every minute
    
    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [userData.tasks]);

  useEffect(() => {
    const currentTime = new Date();
    userData.tasks.forEach((item) => {
      const taskTime = item.time.split(':');
      const hours = parseInt(taskTime[0]);
      const minutes = parseInt(taskTime[1]);
      const taskDate = new Date();
      taskDate.setHours(hours, minutes, 0, 0);

      if (!item.completed && currentTime >= taskDate) {
        setAlert(`You have not completed: "${item.task}" at ${item.time}`);
      }
    });
  }, [userData.tasks]);

  // Function to mark a task as completed
  const handleTaskCompletion = (index) => {
    const updatedTasks = [...userData.tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;

    // If the task is completed, we remove the "forgotten" status
    if (updatedTasks[index].completed) {
      updatedTasks[index].forgotten = false;
    }

    // Update frequency count
    const updatedForgottenTasks = updatedTasks.filter((task) => !task.completed).length;
    const updatedTotalTasks = updatedTasks.length;

    setUserData({
      ...userData,
      tasks: updatedTasks,
      forgottenTasks: updatedForgottenTasks,
      totalTasks: updatedTotalTasks,
      frequency: (updatedForgottenTasks / updatedTotalTasks) * 100,
    });
  };

  return (
    <div className="todo-list-container">
      {alert && <div className="alert">{alert}</div>}
      <div className="todo-input">
        <input
          type="text"
          placeholder="Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <div className="task-list">
        {userData.tasks.map((item, index) => (
          <div key={index} className="task-item">
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => handleTaskCompletion(index)}
            />
            <span>{item.task} at {item.time}</span>
            {item.forgotten && <span className="forgotten"> (Forgotten)</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList;
