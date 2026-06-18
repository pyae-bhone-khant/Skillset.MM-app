export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-app-bg text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <div className="space-y-4 text-app-text-secondary">
          <p>Last updated: June 2026</p>
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Data Collection</h2>
            <p>We collect information you provide directly, such as name, email, and course progress.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">2. Data Usage</h2>
            <p>Your data is used to provide and improve our educational services.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">3. Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
