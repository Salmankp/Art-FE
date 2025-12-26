const showSuccessErrorModel = (
  dispatch: Function,
  message: string,
  actionMessage: Function,
  actionModal: Function,
) => {
  dispatch(actionMessage(message));
  dispatch(actionModal(true));
};

export default showSuccessErrorModel;
