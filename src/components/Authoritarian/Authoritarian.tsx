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


    
    // validate: {  
    //     password: (val) => {
    //         if (val.length <= 6) {
    //           return 'Password should include at least 6 characters';
    //         }
    //         else if (!/[A-Z]/.test(val)) {
    //           return 'Password should include at least one uppercase letter';
    //         }
    //         else if (!/[a-z]/.test(val)) {
    //           return 'Password should include at least one lowercase letter';
    //         }
    //         else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(val)) {
    //           return 'Password should include at least one special character';
    //         }
    //         return null;
    //       },

    // },
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
        navigate('/root');
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