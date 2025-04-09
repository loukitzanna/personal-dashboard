import { Alert } from '@heroui/react';
import React from 'react';

const ErrorMessage = ({ message }: { message: string }) => {
    return <Alert color='danger' variant='faded' title='We encountered an error' description={message} />;
};

export default ErrorMessage;
