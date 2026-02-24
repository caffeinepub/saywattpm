import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';

export default function Terms() {
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
          Terms of Service
        </h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <p className="text-muted-foreground mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <p className="text-foreground mb-4">
              Welcome to SayWattPM. By accessing or using our voice-first project management platform, you agree to be bound by these Terms of Service. Please read them carefully.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Acceptance of Terms</h2>
            <p className="text-foreground mb-4">
              By creating an account and using SayWattPM, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Use of Service</h2>
            <p className="text-foreground mb-4">
              SayWattPM provides project management tools specifically designed for electrical contractors. You agree to use the service only for lawful purposes and in accordance with these terms.
            </p>
            <p className="text-foreground mb-4">
              You are responsible for:
            </p>
            <ul className="list-disc pl-6 text-foreground space-y-2 mb-4">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Ensuring the accuracy of information you provide</li>
              <li>Complying with all applicable laws and regulations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Voice Data and Content</h2>
            <p className="text-foreground mb-4">
              When you use voice-activated features, you grant us permission to process your voice recordings to provide the service. Voice data is processed and converted to text and structured data for project management purposes.
            </p>
            <p className="text-foreground mb-4">
              You retain ownership of all content you create, including project data, photos, and annotations. By using our service, you grant us a license to store, process, and display this content as necessary to provide the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Prohibited Activities</h2>
            <p className="text-foreground mb-4">
              You agree not to:
            </p>
            <ul className="list-disc pl-6 text-foreground space-y-2 mb-4">
              <li>Use the service for any illegal or unauthorized purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the service or servers</li>
              <li>Upload malicious code or harmful content</li>
              <li>Impersonate another person or entity</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Service Availability</h2>
            <p className="text-foreground mb-4">
              We strive to provide reliable service, but we do not guarantee that the service will be uninterrupted or error-free. We reserve the right to modify, suspend, or discontinue any part of the service at any time with or without notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Limitation of Liability</h2>
            <p className="text-foreground mb-4">
              SayWattPM is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the service, including but not limited to direct, indirect, incidental, or consequential damages.
            </p>
            <p className="text-foreground mb-4">
              You acknowledge that SayWattPM is a project management tool and does not replace professional judgment, safety protocols, or compliance requirements in electrical contracting work.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Termination</h2>
            <p className="text-foreground mb-4">
              We reserve the right to terminate or suspend your account at any time for violations of these Terms of Service. You may also terminate your account at any time by contacting us through our Support page.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Changes to Terms</h2>
            <p className="text-foreground mb-4">
              We may update these Terms of Service from time to time. We will notify you of any material changes by posting the new terms on this page and updating the "Last updated" date. Your continued use of the service after such changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
            <p className="text-foreground mb-4">
              If you have any questions about these Terms of Service, please contact us through our{' '}
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
