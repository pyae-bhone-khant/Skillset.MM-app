export default function ContactPage() {
    return (
        <div className="pt-20 px-8 max-w-6xl mx-auto text-center mb-20">
            <h1 className="text-app-text-primary text-5xl font-bold mb-4">
                Get in <span className="bg-linear-to-r from-blue-600 to-white bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-app-text-secondary mb-12">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                {/* Contact Information */}
                <div className="bg-app-bg border border-gray-700 rounded-lg p-8">
                    <h2 className="text-app-text-primary text-2xl font-bold mb-6">Contact Information</h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-app-bg-dark rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-app-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-app-text-secondary text-sm">Phone</p>
                                <p className="text-app-text-primary font-medium">+95 9 123 456 789</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-app-bg-dark rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-app-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-app-text-secondary text-sm">Email</p>
                                <p className="text-app-text-primary font-medium">support@skillhubmm.com</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-app-bg-dark rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-app-text-primary" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </div>
                            <div>
                                <p className="text-app-text-secondary text-sm">Instagram</p>
                                <p className="text-app-text-primary font-medium">@skillhubmm</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-app-bg-dark rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-app-text-primary" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </div>
                            <div>
                                <p className="text-app-text-secondary text-sm">Facebook</p>
                                <p className="text-app-text-primary font-medium">SkillHub MM</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-app-bg-dark rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-app-text-primary" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                                </svg>
                            </div>
                            <div>
                                <p className="text-app-text-secondary text-sm">Telegram</p>
                                <p className="text-app-text-primary font-medium">@skillhubmm</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-app-bg-dark rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-app-text-primary" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                                </svg>
                            </div>
                            <div>
                                <p className="text-app-text-secondary text-sm">TikTok</p>
                                <p className="text-app-text-primary font-medium">@skillhubmm</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Office Hours */}
                <div className="bg-app-bg border border-gray-700 rounded-lg p-8">
                    <h2 className="text-app-text-primary text-2xl font-bold mb-6">Office Hours</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center pb-4 border-b border-gray-700">
                            <span className="text-app-text-primary font-medium">Monday - Friday</span>
                            <span className="text-app-text-secondary">9:00 AM - 6:00 PM</span>
                        </div>
                        <div className="flex justify-between items-center pb-4 border-b border-gray-700">
                            <span className="text-app-text-primary font-medium">Saturday</span>
                            <span className="text-app-text-secondary">Closed</span>
                        </div>
                        <div className="flex justify-between items-center pb-4 border-b border-gray-700">
                            <span className="text-app-text-primary font-medium">Sunday</span>
                            <span className="text-app-text-secondary">Closed</span>
                        </div>
                        <div className="mt-6 p-4 bg-app-bg-dark rounded-lg">
                            <p className="text-app-text-secondary text-sm">
                                <span className="text-app-accent-500 font-medium">Note:</span> Messages sent outside these hours are answered the next working day.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
