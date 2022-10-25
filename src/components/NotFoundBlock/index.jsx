import React from 'react';
import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <span className={styles.smile}>=/</span>
      <br />
      <h1>Tato stránka neexistuje</h1>

      <p className={styles.description}>Bohůžel tato stránka nebyla nalezena</p>
    </div>
  );
};

export default NotFoundBlock;
