import '/src/App.css'
import { useState, useEffect } from 'react';
import { QuestUniverseLoader } from '../components/journey/QuestUniverseLoader';
import { QuestUniverse } from '../components/journey/QuestUniverse';

const QuestsPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This timer simulates loading. The loader animation itself is 6 seconds.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 6500);

    return () => clearTimeout(timer);
  }, []);

  // Show the loader while isLoading is true, then show the universe.
  return (
    <>
      {isLoading ? <QuestUniverseLoader /> : <QuestUniverse />}
    </>
  );
};

export default QuestsPage;