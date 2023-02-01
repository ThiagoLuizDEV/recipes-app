import { useState } from 'react';

export default function useSearch() {
  const [search, setSearch] = useState('');
  const [radio, setRadio] = useState('ingredient');

  return { search, radio, setRadio, setSearch };
}
