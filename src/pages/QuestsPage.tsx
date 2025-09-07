import '/src/App.css'
import { useState, useEffect } from 'react';
import { QuestUniverseLoader } from '../components/journey/QuestUniverseLoader';
import { QuestUniverse } from '../components/journey/QuestUniverse';

const QuestsPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? <QuestUniverseLoader /> : <QuestUniverse />}
    </>
  );
};

export default QuestsPage;