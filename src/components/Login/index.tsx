import { Button, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

import styles from './styles.module.scss';

export const Login = () => {
  const { handleSignIn } = useContext(AuthContext);
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      name: '',
    },

    validationRules: {
      email: value => /^\S+@\S+$/.test(value),
      name: value => value.trim().length > 0,
      password: value => value.trim().length > 0,
    },
    errorMessages: {
      email: 'Email invalido!',
      name: 'Insira um nome',
      password: 'Insira uma senha',
    },
  });
  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        onSubmit={form.onSubmit(values => {
          const { name, email } = values;
          handleSignIn(name, email);
        })}
      >
        <TextInput
          required
          label="Email"
          style={{ width: '100%' }}
          placeholder="your@email.com"
          {...form.getInputProps('email')}
        />
        <TextInput
          required
          label="Nome"
          style={{ width: '100%' }}
          placeholder="John Doe"
          {...form.getInputProps('name')}
        />
        <PasswordInput
          required
          label="Password"
          style={{ width: '100%' }}
          {...form.getInputProps('password')}
        />
        <Button type="submit">Entrar</Button>
      </form>
    </div>
  );
};
