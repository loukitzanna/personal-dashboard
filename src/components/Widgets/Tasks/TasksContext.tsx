// StocksContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { useDashboardContext } from '~components/Dashboard/DashboardContext';

type Task = {
    id: string;
    title: string;
    completed: boolean;
};

const widgetId = 'tasks';

const defaultState = {
    tasks: [],
};

const savedState = JSON.parse(localStorage.getItem(widgetId) || '{}');

const TasksContext = createContext({ ...defaultState, ...savedState });

export const useTasksContext = () => useContext(TasksContext);

export const TasksProvider = ({ children }) => {
    const initialState = { ...defaultState, ...savedState };
    const { saveWidgetSettings } = useDashboardContext();
    const [tasks, setTasks] = useState<Task[]>(initialState.tasks);

    const addTask = (task: Task) => {
        setTasks([...tasks, task]);
        saveWidgetSettings(widgetId, { tasks: [...tasks, task] });
    };

    const updateTask = (taskId: string, task: Task) => {
        const updatedTasks = tasks.map((t) => (t.id === taskId ? task : t));
        setTasks(updatedTasks);
        saveWidgetSettings(widgetId, { tasks: updatedTasks });
    };

    const removeTask = (task: Task) => {
        const updatedTasks = tasks.filter((t) => t.id !== task.id);
        setTasks(updatedTasks);
        saveWidgetSettings(widgetId, { tasks: updatedTasks });
    };

    const value = {
        tasks,
        addTask,
        removeTask,
        updateTask,
    };
    return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
};
