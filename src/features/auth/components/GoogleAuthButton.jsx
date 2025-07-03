import { googleAuth } from '@features/auth/api/googleAuth';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@features/user';
import { useAuthStore } from '@features/auth/store';
import { showToast } from '@utils/toast';

import { useRef } from 'react';
import { Button } from '@common/ui/utilities/Button';

import { FcGoogle } from 'react-icons/fc';

export function GoogleAuthButton({
  type = 'button',
  btnText = '',
  isNavigated = true,
}) {
  const navigate = useNavigate();
  const { setUser } = useUserStore.getState();
  const { setAccessToken } = useAuthStore.getState();

  const googleRef = useRef(null);

  const handleSuccess = async (credentialResponse) => {
    const idToken = credentialResponse.credential;
    try {
      const result = await googleAuth(idToken);
      if (result.accessToken) {
        setAccessToken(result.accessToken);
        // setUser({
        //   login: result.login,
        //   role: result.role,
        //   avatarUrl: result.avatarUrl,
        //   email: result.email,
        // });
        if (isNavigated) {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleError = () => {
    showToast('Ошибка входа через Google');
  };

  const handleClick = () => {
    const btn = googleRef.current?.querySelector < HTMLButtonElement > 'button';
    if (btn) {
      btn.click();
    } else {
      showToast('Подождите, загружается сервис Google...', 'info');
    }
  };

  return (
    <div className="relative h-full w-full">
      <Button className="!bg-white !text-black" type={type} variant="primary">
        <FcGoogle size={23} />
        {btnText}
      </Button>

      <div className="absolute top-0 left-0 w-full h-full opacity-0 z-10">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          containerProps={{
            className: `
              w-[75.47%]        
              h-[75.47%]
              origin-top-left
              transform
              scale-[1.325]
            `,
          }}
        />
      </div>
    </div>
  );
}
