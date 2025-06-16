import { terms } from '@data/terms';

export default function TermsPage() {
  return (
    <section className="bg-white rounded-2xl mx-auto p-4 sm:text-left">
      <h1 className="!text-3xl sm:!text-5xl mb-8 text-center">
        Пользовательское соглашение TaskFlow
      </h1>

      <p>Дата последнего обновления: 16 июня 2025 г.</p>

      {terms.map(({ id, title, description, items }) => (
        <div key={id} className="mb-3 sm:mb-6">
          <h2 className="text-[20px] font-bold mb-2">{title}</h2>

          {description && <p className="sm:pl-8">{description}</p>}

          {items && (
            <ul className="pl-8">
              {items.map((text, idx) => (
                <li key={idx}>{text}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </section>
  );
}
