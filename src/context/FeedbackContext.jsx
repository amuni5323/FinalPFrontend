import React, { createContext, useState } from 'react';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedbacks, setFeedbacks] = useState([]);

  const addFeedback = (feedback) => setFeedbacks([...feedbacks, feedback]);

  return (
    <FeedbackContext.Provider value={{ feedbacks, addFeedback }}>
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
