export default function ReviewCard({ avatar, name, joined, rating, comment }) {
  const renderStars = () =>
    Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        style={{
          color: i < rating ? 'var(--main-warning)' : 'var(--main-text-subtle)',
        }}
      >
        ★
      </span>
    ));

  return (
    <div className="h-full min-h-[375px] p-4 rounded-4xl bg-[var(--main-primary)] text-[var(--main-button-text)]">
      <div className="relative w-full h-full text-center">
        <img
          src={avatar}
          alt={name}
          loading="lazy"
          className="rounded-full mx-auto mb-2.5 object-cover transition-opacity duration-500 "
        />
      </div>
      <h4 className="font-semibold text-lg mt-2">{name}</h4>
      <p className="mb-2  text-[var(--main-button-text)]">
        Дата регистрации: {joined}
      </p>
      <div className="flex justify-center mb-2">{renderStars()}</div>
      <p className="text-[var(--main-button-text)]">{comment}</p>
    </div>
  );
}
