import { Button, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import './App.css';

function App() {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validationRules: {
      email: value => /^\S+@\S+$/.test(value),
    },
    errorMessages: {
      email: 'Email invalido!',
    },
  });

  return (
    <div className="container">
      <form
        className="form"
        onSubmit={form.onSubmit(values => {
          console.log(values);
        })}
      >
        <TextInput
          required
          label="Email"
          style={{ width: '100%' }}
          placeholder="your@email.com"
          {...form.getInputProps('email')}
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
}

export default App;
