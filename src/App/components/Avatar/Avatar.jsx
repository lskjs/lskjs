import React from 'react';
import BaseAvatar from 'lsk-general/General/Avatar';

const sample = {
  avatar: '/assets/no-avatar.png',
  fullName: 'Счастливый Пользователь',
};

export default function Avatar(inputProps) {
  const props = inputProps;
  return (
    <BaseAvatar
      bgColor="#222d32"
      title={inputProps.title || inputProps.name || 'Счастливый пользователь'}
      {...props}
    />
  );
}
