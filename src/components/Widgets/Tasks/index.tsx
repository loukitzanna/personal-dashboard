import React, { useState } from 'react';
import { Button, Card, CardHeader, CardBody, Divider, CardFooter, Input, Form } from '@heroui/react';

import DisplayView from './Display';
import { TasksProvider, useTasksContext } from './TasksContext';
import { PlusIcon } from '@heroicons/react/24/outline';

const TasksWidget = () => {
    const { addTask } = useTasksContext();
    const [task, setTask] = useState('');
    return (
        <Card>
            <CardHeader>
                <div className='flex justify-between gap-5 w-full'>
                    <h1 className='text-xl font-bold mb-2'>Tasks</h1>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <DisplayView />
            </CardBody>
            <CardFooter>
                <Form
                    className='flex flex-row items-center justify-between gap-2 w-full'
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (task.trim()) {
                            addTask({ id: +Date.now(), title: task, completed: false });
                            setTask('');
                        }
                    }}
                >
                    <Input placeholder='Add Task' value={task} onChange={(e) => setTask(e.target.value)} />
                    <Button type='submit' isIconOnly>
                        <PlusIcon className='h-5 w-5' />
                    </Button>
                </Form>
            </CardFooter>
        </Card>
    );
};

export default () => (
    <TasksProvider>
        <TasksWidget />
    </TasksProvider>
);
