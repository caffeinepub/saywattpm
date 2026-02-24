import { Link } from '@tanstack/react-router';
import { ArrowLeft, Mail, Phone, MessageCircle, FileText, HelpCircle } from 'lucide-react';

export default function Support() {
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
        <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4 text-high-contrast">
          Support Center
        </h1>
        <p className="text-lg text-muted-foreground mb-12">
          We're here to help you get the most out of SayWattPM. Find answers to common questions or reach out to our support team.
        </p>

        {/* Contact Information */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card p-6 rounded-lg border-2 border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Email Support</h3>
              </div>
              <p className="text-muted-foreground mb-2">
                Get help via email. We typically respond within 24 hours.
              </p>
              <a
                href="mailto:support@saywattpm.com"
                className="text-primary hover:underline font-semibold"
              >
                support@saywattpm.com
              </a>
            </div>

            <div className="bg-card p-6 rounded-lg border-2 border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Phone Support</h3>
              </div>
              <p className="text-muted-foreground mb-2">
                Speak with our support team directly.
              </p>
              <a
                href="tel:+18005559876"
                className="text-primary hover:underline font-semibold"
              >
                1-800-555-9876
              </a>
              <p className="text-sm text-muted-foreground mt-2">
                Mon-Fri, 8am-6pm EST
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    How do I use voice commands?
                  </h3>
                  <p className="text-muted-foreground">
                    Click the microphone button on any page and speak naturally. For example, say "Log 50 feet of 12-gauge wire from ABC Supply" to add a material purchase, or "Check in to Project Alpha" to log your arrival at a job site.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    Can I access SayWattPM offline?
                  </h3>
                  <p className="text-muted-foreground">
                    SayWattPM requires an internet connection to sync data and process voice commands. However, you can view previously loaded project data while offline. Any changes made offline will sync when you reconnect.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    How do I add team members to a project?
                  </h3>
                  <p className="text-muted-foreground">
                    Navigate to the project detail page, click on the "Crew" tab, and use the "Add Crew Member" button. You can assign crew members to specific tasks and track their availability to avoid scheduling conflicts.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    Is my data secure?
                  </h3>
                  <p className="text-muted-foreground">
                    Yes. SayWattPM stores all data on the Internet Computer blockchain, providing decentralized, tamper-proof storage with enterprise-grade security. Your data is encrypted and only accessible to authorized users on your team.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    How do I report a safety incident?
                  </h3>
                  <p className="text-muted-foreground">
                    Go to the project detail page, select the "Safety" tab, and click "Report Incident." You can use voice commands to quickly log incidents while on site. All incidents are timestamped and stored for compliance purposes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Help Resources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Help Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-lg border border-border hover:border-primary transition-colors">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Documentation</h3>
              <p className="text-muted-foreground mb-4">
                Comprehensive guides and tutorials to help you master SayWattPM.
              </p>
              <a href="#" className="text-primary hover:underline font-semibold">
                View Docs →
              </a>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border hover:border-primary transition-colors">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Community Forum</h3>
              <p className="text-muted-foreground mb-4">
                Connect with other electrical contractors and share best practices.
              </p>
              <a href="#" className="text-primary hover:underline font-semibold">
                Join Forum →
              </a>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border hover:border-primary transition-colors">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <HelpCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Video Tutorials</h3>
              <p className="text-muted-foreground mb-4">
                Watch step-by-step video guides for common tasks and features.
              </p>
              <a href="#" className="text-primary hover:underline font-semibold">
                Watch Videos →
              </a>
            </div>
          </div>
        </section>

        {/* Additional Help */}
        <section className="bg-card p-8 rounded-lg border-2 border-primary">
          <h2 className="text-2xl font-bold text-foreground mb-4">Still Need Help?</h2>
          <p className="text-muted-foreground mb-6">
            Our support team is ready to assist you with any questions or issues you may have. Don't hesitate to reach out—we're here to ensure you have the best experience with SayWattPM.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:support@saywattpm.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              <Mail className="w-5 h-5" />
              Email Support
            </a>
            <a
              href="tel:+18005559876"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/90 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call Us
            </a>
          </div>
        </section>
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
