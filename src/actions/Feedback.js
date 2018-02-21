import * as FeedbackServices from '../services/Feedback';

export const sendFeedback = ({ email, text }) => () => {
  const params = {
    data: {
      attributes: { email, text },
    },
  };

  return FeedbackServices.sendFeedback(params);
};
