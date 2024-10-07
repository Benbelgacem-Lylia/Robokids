// AnimatedText.js
import React, { useEffect, useState } from 'react';
import Typewriter from 'typewriter-effect';
import { useTranslation } from 'react-i18next';

function AnimatedText() {
  const { t, i18n } = useTranslation();
  const [strings, setStrings] = useState([
    t('text1'),
    t('text2')
  ]);

  useEffect(() => {
    setStrings([t('text1'), t('text2')]);
  }, [i18n.language, t]);

  return (
    <div
      style={{
        fontSize: '48px',
        color: 'orange',
        fontWeight: 'bold',
        textAlign: 'center',
        height: '150px',
      }}
    >
      <Typewriter
        options={{
          strings: strings,
          autoStart: true,
          loop: true,
          deleteSpeed: 50,
          delay: 75,
        }}
      />
    </div>
  );
}

export default AnimatedText;
