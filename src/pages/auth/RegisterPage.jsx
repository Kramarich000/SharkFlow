import { useEffect, useState, useCallback, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { RegisterFirstStep, useRegisterStore } from '@features/auth';
import { Loader } from '@common/ui';

const RegisterSecondStep = lazy(
  () =>
    import('@features/auth/components/RegisterPageSteps/RegisterSecondStep'),
);
const RegisterThirdStep = lazy(
  () => import('@features/auth/components/RegisterPageSteps/RegisterThirdStep'),
);

export default function RegisterPage() {
  const step = useRegisterStore((state) => state.step);
  const setStep = useRegisterStore((state) => state.setStep);
  const navigate = useNavigate();
  const [isThirdStepMounted, setThirdStepMounted] = useState(false);

  const handleThirdStepMount = useCallback(() => {
    setThirdStepMounted(true);
  }, []);

  useEffect(() => {
    let timer;

    if (step === 3 && isThirdStepMounted) {
      timer = setTimeout(() => {
        navigate('/login');
        setStep(1);
      }, 4000);
    }

    return () => clearTimeout(timer);
  }, [step, isThirdStepMounted, navigate, setStep]);

  return (
    <div className="h-full flex-col flex items-center justify-center">
      <AnimatePresence mode="wait">
        {step === 1 && <RegisterFirstStep />}
        {step === 2 && (
          <Suspense fallback={<Loader />}>
            <RegisterSecondStep />
          </Suspense>
        )}
        {step === 3 && (
          <Suspense fallback={<Loader />}>
            <RegisterThirdStep onMount={handleThirdStepMount} />
          </Suspense>
        )}
      </AnimatePresence>
    </div>
  );
}
