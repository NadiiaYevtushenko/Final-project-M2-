type Props = {
  message: string;
  touched?: boolean;
  error?: string;
};

const ConfirmationMessage = ({ message, touched, error }: Props) => {
  if (!touched || error) return null;
  return <div className="success">{message}</div>;
};

export default ConfirmationMessage;
