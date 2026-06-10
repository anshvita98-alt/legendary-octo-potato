export const metadata = { title: 'Contact' }

export default function ContactPage() {
    return (
        <main className="container mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-4">Contact</h1>
            <p className="mb-2">For support, email <a href="mailto:Contact-support@thehouseofjoshi.com" className="text-blue-600 underline">Contact-support@thehouseofjoshi.com</a>.</p>
            <p>If you prefer, include details about your issue and a best time to reach you.</p>
        </main>
    )
}
