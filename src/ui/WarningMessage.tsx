import { Alert } from '@heroui/react';
import React from 'react';

const WarningMessage = ({ message }: { message: string }) => {
    return <Alert color='warning' variant='faded' title='Oops!' description={message} />;
};

export default WarningMessage;
