import { Button, Paper, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  
}

const Authoritarian: React.FC<Props> = () => {
  // const [type, toggle] = useToggle(['login', 'register']);
  const form = useForm({
    initialValues: {
      ip:'',
      port: '',
      notification: '',
    },


    
    validate: {  
      ip: (value: string) => (
         !/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value)?'not valid ip':null),
      port: (value: string) => (
         !/^(?:[1-9]\d*|0)$/.test(value)?'Invalid port number':Number(value) < 0? 'Invalid port number':Number(value) > 65535? 'Invalid port number':null 
      ),
      notification: (value: string) => (
        !/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value)?'Invalid IPv4 address':null)
      
    },
  });
  const navigate = useNavigate();
  

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', marginLeft:'700px'}}>
    <Paper radius="md" p="xl" withBorder >

      <Text size="lg" fw={500}>
        Poked
      </Text>

      <form onSubmit={form.onSubmit(() => {
        console.log(form.values);
        navigate('/root/config');
      })}>
        <Stack>

          <TextInput
            required
            label="Ip"
            placeholder="ip"
            value={form.values.ip}
           {...form.getInputProps('ip')}
            // error={form.errors.email && 'Invalid email'}
            radius="md"
          />
          <TextInput
            required
            label="Port"
            placeholder="port"
            value={form.values.port}
            {...form.getInputProps('port')}
            // error={form.errors.email && 'Invalid email'}
            radius="md"
          />
          <TextInput
            required
            label="notification"
            placeholder="notification"
            value={form.values.notification}
            {...form.getInputProps('notification')}
            // error={form.errors.email && 'Invalid email'}
            radius="md"
          />
        </Stack>

  
          <Button type="submit" radius="xl" mt={30}>
            Submit
          </Button>
      </form>
    </Paper>
    </div>
  );
};

export default Authoritarian;