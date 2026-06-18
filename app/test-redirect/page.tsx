export default function TestRedirectPage() {
  return (
    <div className="min-h-screen bg-red-900 text-white p-8 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">🔴 REDIRECT TEST PAGE</h1>
        <p className="text-xl">You were redirected here. Check the console to see which component caused this redirect.</p>
      </div>
    </div>
  );
}
