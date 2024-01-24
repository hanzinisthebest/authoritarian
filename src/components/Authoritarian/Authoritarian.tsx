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
         !/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value)?'not valid ip':''),
      port: (value: string) => {
        const portRegex = /^(?:[1-9]\d*|0)$/;
        if (!portRegex.test(value) || Number(value) < 0 || Number(value) > 65535) {
          return 'Invalid port number';
        }
      },
      notification: (value: string) => {
        const ipv4Regex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        if (!ipv4Regex.test(value)) {
          return 'Invalid IPv4 address';
        }
      },
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
            onChange={(event) => form.setFieldValue('ip', event.currentTarget.value)}
            // error={form.errors.email && 'Invalid email'}
            radius="md"
          />
          <TextInput
            required
            label="Port"
            placeholder="port"
            value={form.values.port}
            onChange={(event) => form.setFieldValue('port', event.currentTarget.value)}
            // error={form.errors.email && 'Invalid email'}
            radius="md"
          />
          <TextInput
            required
            label="Ip"
            placeholder="ip"
            value={form.values.notification}
            onChange={(event) => form.setFieldValue('notification', event.currentTarget.value)}
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