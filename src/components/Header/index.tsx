import { Button, Header } from '@mantine/core';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

import styles from './styles.module.scss';

export const MyHeader = () => {
  const { user, handleSignOut } = useContext(AuthContext);
  return (
    <Header height={10} className={styles.header}>
      <h1>Olá, {user?.name}</h1>
      <Button onClick={handleSignOut}>Sair</Button>
    </Header>
  );
};
