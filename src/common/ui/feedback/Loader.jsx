import { PulseLoader } from 'react-spinners';

const LoaderContainer = ({ children }) => (
  <div className="h-full">{children}</div>
);

export const Loader = ({ color = 'var(--main-primary)' }) => {
  return (
    <LoaderContainer>
      <PulseLoader
        className="flex justify-center items-center min-h-[100vh] content-center"
        speedMultiplier={0.7}
        size={50}
        color={color}
      />
    </LoaderContainer>
  );
};
