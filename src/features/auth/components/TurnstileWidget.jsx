export default function TurnstileWidget() {
  return (
    <div
      className="cf-turnstile col-span-2"
      data-sitekey={import.meta.env.VITE_SITE_KEY || "1x00000000000000000000AA"}
    ></div>
  );
}