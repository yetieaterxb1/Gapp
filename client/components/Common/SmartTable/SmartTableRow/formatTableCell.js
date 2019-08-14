import React from 'react';
import Button from '@material-ui/core/Button'

export default (cell, format) => {
  switch (format && format.type) {
    case 'link':
      return (
        <a href={ format.url } >
          { cell }
        </a>
      );
    case 'button':
      return (
        <Button
          primary
          label={ `${format.text}` }
        />
      );
    case 'date':
      return new Date().toISOString();
    default:
      return cell;
  }
};
