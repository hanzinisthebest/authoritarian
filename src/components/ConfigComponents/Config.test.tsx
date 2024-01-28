import React from 'react';
import { render, fireEvent } from '@test-utils';
import Config from './Config';


describe('ConfigComponent', () => {

  it('renders without crashing', () => {
    render(<Config/>);
  });

  it('opens the modal when "Add Camera" button is clicked', () => {
    const { getByText } = render(<Config />);
    fireEvent.click(getByText('Add Camera'));
    expect(getByText('Add a new camera')).toBeInTheDocument();
  });

  
      // User can add a camera with valid IP, port and notification IP
      it('should add a camera when all fields are valid', () => {
        // Arrange
        const { getByLabelText, getByText } = render(<Config />);
        fireEvent.click(getByText('Add Camera'));
        expect(getByText('Add a new camera')).toBeInTheDocument();
        const ipInput = getByLabelText('IP *');
        const portInput = getByLabelText('Port *');
        const notificationInput = getByLabelText('Notification IP *');
        const addButton = getByText('Add Camera');
  
        // Act
        fireEvent.change(ipInput, { target: { value: '192.168.0.1' } });
        fireEvent.change(portInput, { target: { value: '8080' } });
        fireEvent.change(notificationInput, { target: { value: '192.168.0.2' } });
        fireEvent.click(addButton);
  
        // Assert
        expect(localStorage.getItem('cameras')).toEqual(JSON.stringify([{ ip: '192.168.0.1', port: '8080', notification: '192.168.0.2' }]));
      });

  

  // Add more tests as needed...
});
