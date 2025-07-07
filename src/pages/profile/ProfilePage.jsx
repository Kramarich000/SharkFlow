import { useState, useEffect } from 'react';
import { UserProfileData } from '@features/user';
import { Accordion } from '@common/ui/utilities/Accordion';
import { AccountSettings } from '@features/profile/components/AccountSettings';
import { SecurityAndIntegrationsSettings } from '@features/profile/components/SecurityAndIntegrationsSettings';
import { SiteSettings } from '@features/profile/components/SiteSettings';
import { ProfileLoader } from '@features/profile/components/ProfileLoader';
import { useUserStore } from '@features/user';

export default function Profile() {
  const [loading, setLoading] = useState(true);

  const user = useUserStore((state) => state.user);
  const role = user?.role;
  const twoFactorEnabled = user?.twoFactorEnabled;

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  return (
    <div className="h-full">
      {/* <p>роль: {user.role}</p> */}
      {loading ? (
        <ProfileLoader />
      ) : role === 'guest' ? (
        <GuestAccount />
      ) : (
        <div className="w-full mx-auto sm:p-4 space-y-6">
          <UserProfileData />

          <Accordion
            type="multiple"
            className="w-full flex flex-col md:grid grid-cols-2 gap-x-20 gap-y-4 auto-rows-[300px] xl:grid-cols-3"
          >
            <AccountSettings />
            <SecurityAndIntegrationsSettings />
            <SiteSettings />
          </Accordion>
        </div>
      )}
    </div>
  );
}
