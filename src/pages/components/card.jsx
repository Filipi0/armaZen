import React, { useState } from 'react';
import styles from '../../styles/card.module.css';

const Card = ({ titleCollapsed, count, items }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.card}>
      {isExpanded ? (
        <div className={styles.expandedCard}>
          <h2>{titleCollapsed}</h2>
          <h1>{count}</h1>
          <ul className={styles.list}>
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <button onClick={toggleExpand} className={styles.button}>
            Ver menos
          </button>
        </div>
      ) : (
        <div className={styles.collapsedCard}>
          <h2>{titleCollapsed}</h2>
          <h1>{count}</h1>
          <button onClick={toggleExpand} className={styles.button}>
            Ver detalhes
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
