import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
} from '@headlessui/react';

import { motion } from 'framer-motion';

import { FaArrowDown } from 'react-icons/fa';
import { faqs } from '@data/faqs';

export default function FAQ() {
  return (
    <section className="py-16 mx-auto">
      <h2 className="text-3xl mb-8">Часто задаваемые вопросы</h2>
      <div className="space-y-4">
        {faqs.map((item) => (
          <Disclosure key={item.id}>
            {({ open }) => (
              <motion.div
                initial={{ opacity: 0, transform: 'translateY(50px)' }}
                whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
                transition={{ delay: 0.1 * item.id }}
                viewport={{ once: true }}
              >
                <DisclosureButton className="w-full flex-col sm:flex-row text-center sm:text-center flex justify-between !px-2 items-center py-4 text-lg font-medium !border-b-black !rounded-none focus:outline-none hover:text-[#808080] !transition">
                  <p className="mb-3 sm:mb-0">{item.question}</p>
                  <FaArrowDown
                    className={`transition-transform ${
                      open ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                </DisclosureButton>

                <Transition
                  show={open}
                  enter="transition"
                  enterFrom="transform opacity-0"
                  enterTo="transform opacity-100"
                  leave="transition"
                  leaveFrom="transform opacity-100"
                  leaveTo="transform opacity-0"
                >
                  <DisclosurePanel className="p-4 text-gray-900 text-center sm:text-left">
                    {item.answer}
                  </DisclosurePanel>
                </Transition>
              </motion.div>
            )}
          </Disclosure>
        ))}
      </div>
    </section>
  );
}
