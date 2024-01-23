import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import React from 'react';
import { Flex } from '@mantine/core';

interface Props {
  
}

const Root: React.FC<Props> = () => {
  return (
 <>
  <Flex>
   <Navbar />
   <main>
    <Outlet/>
   </main>
   </Flex>
 </>
  );
};

export default Root;