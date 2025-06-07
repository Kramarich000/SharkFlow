import { PulseLoader } from 'react-spinners';

const LoaderContainer = ({ children }) => <div>{children}</div>;

const Loader = ({ color = '#111111' }) => {
  return (
    <LoaderContainer>
      <PulseLoader
        className="min-h-screen overflow-hidden"
        speedMultiplier={0.7}
        size={50}
        color={color}
      />
    </LoaderContainer>
  );
};

export default Loader;
