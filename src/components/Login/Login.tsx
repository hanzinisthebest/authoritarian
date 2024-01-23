import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from '@mantine/core';
import { Navigate, useNavigate } from 'react-router-dom';

export function Login(props: PaperProps) {
  const [type, toggle] = useToggle(['login', 'register']);
  const form = useForm({
    initialValues: {
      username:'',
      name: '',
      password: '',
      terms: true,
    },

    validate: {  
      password: (value)=>(value.length<=6 ? 'Password should include at least 6 characters' : 
      !/[A-Z]/.test(value)?'Password should include at least one uppercase letter':
      !/[a-z]/.test(value)?'Password should include at least one lowercase letter':
      !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value)?'Password should include at least one special character':null)

    },
  });
  const navigate = useNavigate();
  

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <Paper radius="md" p="xl" withBorder {...props}>

      <Text size="lg" fw={500}>
        Welcome to Hatal, {type} with
      </Text>

      <form onSubmit={form.onSubmit(() => {
        console.log(form.values);

        if (type === 'register') {
          // Save the user's data in localStorage when registering
          const users = JSON.parse(localStorage.getItem('users') as string) || [];
          users.push(form.values.username);
          localStorage.setItem('users', JSON.stringify(users));
        } else {
          // Check the user's data against localStorage when logging in
          const users = JSON.parse(localStorage.getItem('users') as string) || [];
          const user = users.includes(form.values.username);
          if (user) {
            navigate('/root');
          } else {
            alert('Invalid username or password');
          }
        }
      })}>
        <Stack>
          {type === 'register' && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              {...form.getInputProps('name')}
              radius="md"
            />
          )}

          <TextInput
            required
            label="Username"
            placeholder="username"
            value={form.values.username}
            {...form.getInputProps('username')}
            // error={form.errors.email && 'Invalid email'}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            {...form.getInputProps('password')}
            // error={form.errors.password && 'Password should include at least 6 characters'}
            radius="md"
          />

          {type === 'register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              {...form.getInputProps('terms')}
            />
          )}
        </Stack>

        <Group justify="space-between" mt="xl" >
          <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
    </div>
  );
}