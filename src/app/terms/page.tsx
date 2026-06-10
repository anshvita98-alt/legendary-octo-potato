export const metadata = { title: 'Terms of Service' }

export default function TermsPage() {
    return (
        <main className="container mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
            <p className="mb-4">These Terms of Service govern your use of the services provided by The House of Joshi. Please read them carefully.</p>
            <h2 className="text-xl font-semibold mt-6">1. Acceptance</h2>
            <p className="mb-4">By using our site you agree to these terms.</p>
            <h2 className="text-xl font-semibold mt-6">2. Use</h2>
            <p className="mb-4">You agree not to misuse the services.</p>
            <p className="mt-6">For questions about these terms, contact <a href="mailto:Contact-support@thehouseofjoshi.com" className="text-blue-600 underline">Contact-support@thehouseofjoshi.com</a>.</p>
        </main>
    )
}
