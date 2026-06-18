export default function TermsPage() {
  return (
    <div className="min-h-screen bg-app-bg text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
        <div className="space-y-4 text-app-text-secondary">
          <p>Last updated: June 2026</p>
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
            <p>By accessing and using SkillHub MM, you agree to be bound by these Terms & Conditions.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">2. User Accounts</h2>
            <p>You are responsible for maintaining the confidentiality of your account credentials.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">3. Course Content</h2>
            <p>All course materials are protected by copyright and may not be redistributed.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
