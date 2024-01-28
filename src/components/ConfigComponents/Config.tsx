import { ActionIcon, Button, Card, Group, Modal, NumberInput, Paper, Text, TextInput, useMantineTheme } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';

interface Props {
  
}
export interface Camera {
  ip: string;
  port: string;
  notification: string;
}


const Config: React.FC<Props> = () => {
  const [opened, setOpened] = useState(false);
  const [updateIndex, setUpdateIndex] = useState<number | null>(null);
  const [cameras, setCameras] = useState<Camera[]>(JSON.parse(localStorage.getItem('cameras') || '[]'));
  const [formCameras, setFormCameras] = useState<Camera[]>([{ ip: '', port:'', notification: '' }]);
  const [errors, setErrors] = useState<{ ip: string | null; port: string | null; notification: string | null; }[]>([{ ip: null, port: null, notification: null }]);

  const validate = (index: number) => {
    const newErrors = [...errors];
    const camera = formCameras[index];
    newErrors[index] = {
      ip: !/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(camera.ip) ? 'not valid ip' : null,
      port: !/^(?:[1-9]\d*|0)$/.test(camera.port) ? 'Invalid port number' : Number(camera.port) < 0 ? 'Invalid port number' : Number(camera.port) > 65535 ? 'Invalid port number' : null,
      notification: !/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(camera.notification) ? 'Invalid IPv4 address' : null,
    };
    setErrors(newErrors);
  };

  const addCamera = (camera: Camera) => {
    setCameras((prevCameras) => {
      const newCameras = [...prevCameras, camera];
      localStorage.setItem('cameras', JSON.stringify(newCameras));
      return newCameras;
    });
  };

  const updateCamera = (index: number, camera: Camera) => {
    const newCameras = [...cameras];
    newCameras[index] = camera;
    setCameras(newCameras);
    localStorage.setItem('cameras', JSON.stringify(newCameras));
  };

  const deleteCamera = (index: number) => {
    const newCameras = cameras.filter((_, i) => i !== index);
    setCameras(newCameras);
    localStorage.setItem('cameras', JSON.stringify(newCameras));
  };

  return (
    <>
     <Button onClick={() => { setOpened(true); setUpdateIndex(null); }}>Add Camera</Button>
      <Modal opened={opened} onClose={() => {
         setFormCameras([{ ip: '', port: '', notification: '' }]);
         setErrors([{ ip: null, port: null, notification: null }]);
        setOpened(false);}
      } title={updateIndex !== null ? "Update camera" : "Add a new camera"}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            
            formCameras.forEach((camera, index) => {
              validate(index);
              if (!errors[index].ip && !errors[index].port && !errors[index].notification) {
                if (updateIndex !== null) {
                  updateCamera(updateIndex, camera);
                } else {
                  addCamera(camera);
                }
              }
            });
            setFormCameras([{ ip: '', port: '', notification: '' }]);
            setErrors([{ ip: null, port: null, notification: null }]);
            setOpened(false);
          }}
        >
          {formCameras.map((camera, index) => (
            <div key={index}>
              <h3>Camera:</h3>
              <TextInput
              required
                label="IP"
                placeholder="Enter IP"
                error={errors[index].ip}
                value={camera.ip}
                onChange={(event) => {
                  const newFormCameras = [...formCameras];
                  newFormCameras[index].ip = event.currentTarget.value;
                  setFormCameras(newFormCameras);
                  
                  validate(index);
                }}
              />
              <TextInput
              required
                label="Port"
                placeholder="Enter Port"
                error={errors[index].port}
                value={camera.port}
                onChange={(event) => {
                  const newFormCameras = [...formCameras];
                  newFormCameras[index].port = event.currentTarget.value;
                  setFormCameras(newFormCameras);
                  validate(index);
                }}
              />
              <TextInput
                required
                label="Notification IP"
                placeholder="Enter Notification IP"
                error={errors[index].notification}
                value={camera.notification}
                onChange={(event) => {
                  const newFormCameras = [...formCameras];
                  newFormCameras[index].notification = event.currentTarget.value;
                  setFormCameras(newFormCameras);
                  validate(index);
                }}
              />
            </div>
          ))}
          <Group justify='space-between'>
          {updateIndex === null ?<Button onClick={() => {
          setFormCameras([...formCameras, { ip: '', port: '', notification: '' }]);
          setErrors([...errors, { ip: null, port: null, notification: null }]); }}>
            Add another camera
          </Button>:''}
          <Button type='submit'>{updateIndex !== null ? "Update" : "Submit"}</Button>
          </Group>
        </form>
      </Modal>

      <Paper>
        {cameras.map((camera, index) => (
          <Card key={index} >
            <Paper>
              <Text>IP: {camera.ip}</Text>
              <Text>Port: {camera.port}</Text>
              <Text>Notification IP: {camera.notification}</Text>
              <Group justify='space-between'>
              <Button onClick={() => { setUpdateIndex(index); 
                  setOpened(true);
                  const cameraToUpdate = { ...cameras[index] }; // Create a deep copy
                  setFormCameras([cameraToUpdate]);  }}>Update</Button>
              <Button onClick={() => deleteCamera(index)}>Delete</Button>
              </Group>
            </Paper>
          </Card>
        ))}
      </Paper>
    </>
  );
};

export default Config;