import { Button, LoadingOverlay, TextInput } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';

import styles from './styles.module.scss';

type Character = {
  name: string;
  level: number;
  account_status: string;
  vocation: string;
  world: string;
};

type CharacterResponse = {
  characters: {
    data: Character;
  };
};

export const Content = () => {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [character, setCharacter] = useState<Character>();
  const form = useForm({
    initialValues: {
      characterName: '',
    },

    validationRules: {
      characterName: value => value.trim().length > 0,
    },
  });

  useEffect(() => {
    if (character) setOverlayVisible(false);
  }, [character]);

  async function getCharacter(name: string) {
    const response = await api.get<CharacterResponse>(
      `characters/${name}.json`
    );
    setCharacter(response.data.characters.data);
  }

  console.log(character);

  return (
    <div className={styles.main}>
      <form
        className={styles.form}
        onSubmit={form.onSubmit(values => {
          setOverlayVisible(true);
          getCharacter(values.characterName);
          form.reset();
        })}
      >
        <TextInput
          label="Character name"
          style={{ width: '60%' }}
          {...form.getInputProps('characterName')}
        />
        <Button type="submit">Search</Button>
      </form>
      <main className={styles.characterInfo} style={{ position: 'relative' }}>
        <LoadingOverlay
          visible={overlayVisible}
          style={{ display: 'flex', justifyContent: 'center' }}
        />
        <div>
          <h3>Name:</h3>
          <span>{character?.name}</span>
        </div>
        <div>
          <h3>Level:</h3>
          <span>{character?.level}</span>
        </div>
        <div>
          <h3>World:</h3>
          <span>{character?.world}</span>
        </div>
        <div>
          <h3>Vocation:</h3>
          <span>{character?.vocation}</span>
        </div>
        <div>
          <h3>Account Status:</h3>
          <span
            className={
              character?.account_status === 'Premium Account' ? 'premium' : ''
            }
          >
            {character?.account_status}
          </span>
        </div>
      </main>
    </div>
  );
};
