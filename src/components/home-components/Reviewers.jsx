export default function ReviewCard({ avatar, name, joined, rating, comment }) {
  const renderStars = () =>
    Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < rating ? 'text-yellow-400' : 'text-gray-600'}
      >
        ★
      </span>
    ));

  return (
    <div className="h-full p-4 text-white">
      <div className="relative w-full h-full text-center">
        <img
          src={avatar}
          alt={name}
          loading="lazy"
          className="rounded-full mx-auto mb-2.5 object-cover transition-opacity duration-500 "
        />
      </div>
      <h4 className="font-semibold text-lg mt-2">{name}</h4>
      <p className="text-sm text-gray-400 mb-2">Дата регистрации: {joined}</p>
      <div className="flex justify-center mb-2">{renderStars()}</div>
      <p className="text-gray-300 text-[12px] xs:text-sm">{comment}</p>
    </div>
  );
}
