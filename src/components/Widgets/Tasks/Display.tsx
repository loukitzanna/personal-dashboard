import React from 'react';
import { useTasksContext } from './TasksContext';
import { Button, Checkbox, Divider } from '@heroui/react';
import { TrashIcon } from '@heroicons/react/24/outline';

const DisplayView = () => {
    const { tasks, updateTask, removeTask } = useTasksContext();
    return (
        <div className='p-4 flex flex-col gap-2'>
            {tasks.map((task) => (
                <div key={task.id}>
                    <div className='flex items-center justify-between gap-2 py-2'>
                        <div className='flex items-center gap-2'>
                            <Checkbox
                                defaultSelected={task.completed}
                                onValueChange={(value) => {
                                    updateTask(task.id, { ...task, completed: value });
                                }}
                            />
                            {task.title}
                        </div>
                        <Button
                            size='sm'
                            isIconOnly
                            onPress={() => removeTask(task)}
                            className='hover:bg-red-500/20 hover:text-red-500'
                        >
                            <TrashIcon className='h-5 w-5' />
                        </Button>
                    </div>
                    <Divider />
                </div>
            ))}
        </div>
    );
};

export default DisplayView;
