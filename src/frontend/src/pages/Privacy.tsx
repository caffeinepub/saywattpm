import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';

export default function Privacy() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'saywattpm'
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-semibold">Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-black text-foreground mb-8 text-high-contrast">
          Privacy Policy
        </h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <p className="text-muted-foreground mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <p className="text-foreground mb-4">
              At SayWattPM, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your information when you use our voice-first project management platform for electrical contractors.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Information We Collect</h2>
            <p className="text-foreground mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 text-foreground space-y-2 mb-4">
              <li>Account information (name, email, phone number, role)</li>
              <li>Project data (project details, locations, client information)</li>
              <li>Material purchases and cost tracking data</li>
              <li>Safety incident reports</li>
              <li>Voice recordings for voice-activated features</li>
              <li>Photos and annotations uploaded to projects</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">How We Use Your Information</h2>
            <p className="text-foreground mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-foreground space-y-2 mb-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process voice commands and convert them to actionable data</li>
              <li>Send you notifications about project deadlines and reminders</li>
              <li>Analyze usage patterns to enhance user experience</li>
              <li>Ensure compliance with safety regulations and code requirements</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Data Storage and Security</h2>
            <p className="text-foreground mb-4">
              Your data is stored securely on the Internet Computer blockchain, providing decentralized and tamper-proof storage. We implement industry-standard security measures to protect your information from unauthorized access, disclosure, or destruction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Data Sharing</h2>
            <p className="text-foreground mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-foreground space-y-2 mb-4">
              <li>With your explicit consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and prevent fraud</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Your Rights</h2>
            <p className="text-foreground mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-foreground space-y-2 mb-4">
              <li>Access your personal data</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Export your data in a portable format</li>
              <li>Opt-out of certain data collection practices</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
            <p className="text-foreground mb-4">
              If you have any questions about this Privacy Policy, please contact us through our{' '}
              <Link to="/support" className="text-primary hover:underline font-semibold">
                Support page
              </Link>
              .
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              © {currentYear} SayWattPM. All rights reserved.
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Built with</span>
              <span className="text-destructive">❤️</span>
              <span>using</span>
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </div>

            <div className="flex items-center gap-4">
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms
              </Link>
              <Link to="/support" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
