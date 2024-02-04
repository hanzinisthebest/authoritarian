import { ActionIcon, Center, Stack, Tooltip, UnstyledButton, rem, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import React, { useState } from 'react';
import {
    IconHome2,
    IconGauge,
    IconDeviceDesktopAnalytics,
    IconFingerprint,
    IconCalendarStats,
    IconUser,
    IconSettings,
    IconLogout,
    IconSwitchHorizontal,
    IconSun,
    IconMoon,
  } from '@tabler/icons-react';
  import classes from './Navbar.module.css';
import { useNavigate } from 'react-router-dom';
import cx from 'clsx';
interface NavbarLinkProps {
    icon: typeof IconHome2;
    label: string;
    active?: boolean;
    onClick?(): void;
  }
  
  function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
    return (
      <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
        <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
          <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
        </UnstyledButton>
      </Tooltip>
    );
  }

interface Props {
  
}
const mockdata = [
    { icon: IconHome2, label: 'Home' ,path:'' },
    { icon: IconGauge, label: 'Authoritarian',path:'/poked' },
    { icon: IconDeviceDesktopAnalytics, label: 'Config',path:'/config' },
    // { icon: IconCalendarStats, label: 'Releases' },
    // { icon: IconUser, label: 'Account' },
    // { icon: IconFingerprint, label: 'Security' },
    // { icon: IconSettings, label: 'Settings' },
  ];

const Navbar: React.FC<Props> = () => {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
    const [active, setActive] = useState(0);
    const navigate = useNavigate();
    const links = mockdata.map((link, index) => (
      <NavbarLink
        {...link}
        key={link.label}
        active={index === active}
        onClick={() => {setActive(index)
            navigate('/root'+link.path)
        }}
      />
    ));
  
    return (
      <nav className={classes.navbar}>
        {/* <Center>
          <MantineLogo type="mark" size={30} />
        </Center> */}
  
        <div className={classes.navbarMain}>
          <Stack justify="center" gap={0}>
            {links}
          </Stack>
          <ActionIcon
        onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
        variant="default"
        size="xl"
        aria-label="Toggle color scheme"
      >
        <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
        <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
      </ActionIcon>
        </div>
  
        <Stack justify="center"  gap={0} >
          <NavbarLink icon={IconSwitchHorizontal} label="Change account" onClick={()=>navigate('/')} />
          <NavbarLink icon={IconLogout} label="Logout" onClick={()=>navigate('/')}/>
        </Stack>
      </nav>
    );
};

export default Navbar;