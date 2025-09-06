// src/components/journey/Journey.tsx

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { UniverseEntryButton } from "./UniverseEntryButton";

function Journey() {
  const navigate = useNavigate();

  return (
    <div id="journey" className="py-20 flex items-center justify-center">
      {/* 
        This component now ONLY renders the entry button.
        When clicked, it uses the router to navigate to the new /quests page.
      */}
      <motion.div
        key="entry-button"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <UniverseEntryButton onClick={() => navigate("/quests")} />
      </motion.div>
    </div>
  );
}

export default Journey;