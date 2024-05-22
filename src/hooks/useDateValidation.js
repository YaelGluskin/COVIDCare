// useDateValidation.js

import { useState } from 'react';

export function useDateValidation() {
  const [date, setDate] = useState('');
  const today = new Date();
  const todayFormatted = today.toISOString().split('T')[0];
  const isValidDate = (inputDate) => {
    return inputDate <= todayFormatted;
  };

  const handleDateChange = (newDate) => {
    if (!isValidDate(newDate)) {
      alert("Please enter a valid date, up to the present.");
      return;
    }
    setDate(newDate);
  };

  return [date, handleDateChange];
}
