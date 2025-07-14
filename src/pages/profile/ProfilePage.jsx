import { useState, useEffect } from 'react';
import { UserProfileData } from '@features/user';
import { AccountSettings } from '@features/profile/components/AccountSettings';
import { SecuritySettings } from '@features/profile/components/SecuritySettings';
import { SiteSettings } from '@features/profile/components/SiteSettings';
import { IntegrationSettings } from '@features/profile/components/IntegrationSettings';
import { ProfileLoader } from '@features/profile/components/ProfileLoader';
import { useUserStore } from '@features/user';
import { GuestAccount } from '@features/profile/components/GuestAccount';
import { MdManageAccounts } from 'react-icons/md';
import { FaShieldAlt } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import { GrIntegration } from 'react-icons/gr';
import { Button } from '@common/ui/utilities/Button';
import { AnimatePresence, motion } from 'framer-motion';

const TABS = [
  {
    key: 'account',
    label: 'Аккаунт',
    icon: <MdManageAccounts size={18} />,
    component: <AccountSettings />,
  },
  {
    key: 'security',
    label: 'Безопасность',
    icon: <FaShieldAlt size={18} />,
    component: <SecuritySettings />,
  },
  {
    key: 'site',
    label: 'Настройки',
    icon: <IoMdSettings size={18} />,
    component: <SiteSettings />,
  },
  {
    key: 'integration',
    label: 'Интеграции',
    icon: <GrIntegration size={18} />,
    component: <IntegrationSettings />,
  },
];

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('account');

  const user = useUserStore((state) => state.user);
  const role = user?.role;

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  if (loading) return <ProfileLoader />;
  if (role === 'guest') return <GuestAccount />;

  return (
    <div className="h-full w-full mx-auto sm:p-4 flex flex-col xl:grid grid-cols-[200px_1fr] gap-6">
      <div className="flex flex-col">
        <nav className="grid grid-cols-2 items-center justify-center md:flex xl:flex-col gap-2">
          {TABS.map((tab) => (
            <Button
              key={tab.key}
              className={`!w-full
                    ${
                      activeTab === tab.key
                        ? '!bg-[var(--main-button-hover)]'
                        : 'hover:!bg-[var(--main-button-hover)] !bg-[var(--main-button-bg)]'
                    }
                  `}
              onClick={() => setActiveTab(tab.key)}
              type="button"
            >
              {tab.icon}
              <span>{tab.label}</span>
            </Button>
          ))}
        </nav>
      </div>
      <div className="h-full bg-[var(--main-card-bg)] border-2 rounded-4xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, transform: 'translateY(20px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            exit={{ opacity: 0, transform: 'translateY(-20px)' }}
            transition={{ ease: 'linear' }}
            className="h-full"
          >
            {TABS.find((tab) => tab.key === activeTab)?.component}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
