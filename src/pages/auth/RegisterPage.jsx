import { useEffect, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { RegisterFirstStep, useRegisterStore } from '@features/auth';
import { Loader } from '@common/ui';

const RegisterSecondStep = lazy(
  () => import('@features/auth/components/RegisterSecondStep'),
);
const RegisterThirdStep = lazy(
  () => import('@features/auth/components/RegisterThirdStep'),
);

export default function RegisterPage() {
  const { step, setStep } = useRegisterStore();
  const navigate = useNavigate();

  useEffect(() => {
    let timer;

    if (step === 3) {
      timer = setTimeout(() => {
        navigate('/login');
        setStep(1);
      }, 4000);
    }

    return () => clearTimeout(timer);
  }, [step, navigate]);

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
            <RegisterThirdStep />
          </Suspense>
        )}
      </AnimatePresence>
    </div>
  );
}
