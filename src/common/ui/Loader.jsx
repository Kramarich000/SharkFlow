import { PulseLoader } from 'react-spinners';

const LoaderContainer = ({ children }) => (
  <div className="h-full">{children}</div>
);

export const Loader = ({ color = '#111111' }) => {
  return (
    <LoaderContainer>
      <PulseLoader
        className="!flex justify-center items-center h-full"
        speedMultiplier={0.7}
        size={50}
        color={color}
      />
    </LoaderContainer>
  );
};
