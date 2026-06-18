export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-app-bg flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-linear-to-br from-[#0f0f23] to-[#1a1a2e] border border-white/10 rounded-lg p-8">
        <h1 className="text-3xl font-bold text-white mb-2">Forgot Password</h1>
        <p className="text-gray-400 mb-6">Enter your email to reset your password</p>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              type="email"
              className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              placeholder="name@example.com"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
          >
            Send Reset Link
          </button>
        </form>
        <p className="text-center mt-6 text-gray-400">
          Remember your password?{" "}
          <a href="/login" className="text-blue-500 hover:text-blue-400">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
