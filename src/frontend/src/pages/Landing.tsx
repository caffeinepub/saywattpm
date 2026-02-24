import LoginButton from '../components/auth/LoginButton';
import { Mic, Calendar, Shield, Zap, Clock, DollarSign } from 'lucide-react';
import { SiX, SiFacebook, SiLinkedin } from 'react-icons/si';

export default function Landing() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'saywattpm'
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: 'url(/assets/generated/landing-hero.dim_1920x1080.png)',
          }}
        />
        <div className="absolute inset-0 construction-gradient opacity-90" />
        
        <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
          <div className="flex flex-col items-center text-center">
            <img
              src="/assets/generated/saywattpm-logo.dim_256x256.png"
              alt="SayWattPM Logo"
              className="h-24 w-24 md:h-32 md:w-32 mb-8 drop-shadow-lg"
            />
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 text-high-contrast">
              SayWattPM
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-white/95 mb-4 max-w-3xl font-semibold text-high-contrast">
              Voice-First Project Management for Electrical Contractors
            </p>
            
            <p className="text-base md:text-lg text-white/85 mb-10 max-w-2xl">
              Manage projects, track materials, log safety incidents, and coordinate crews—all from the job site with voice commands.
            </p>
            
            <LoginButton />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Built for the Field
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Everything you need to manage electrical projects efficiently, designed for hands-free operation on the job site.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Voice Logging */}
            <div className="bg-background p-8 rounded-lg border-2 border-border hover:border-primary transition-colors">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <img
                  src="/assets/generated/voice-icon.dim_128x128.png"
                  alt="Voice Logging"
                  className="w-10 h-10"
                />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Voice-Activated Logging</h3>
              <p className="text-muted-foreground">
                Log materials, check-ins, and notes hands-free while working. No need to stop what you're doing.
              </p>
            </div>

            {/* Smart Scheduling */}
            <div className="bg-background p-8 rounded-lg border-2 border-border hover:border-primary transition-colors">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <Calendar className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Smart Crew Scheduling</h3>
              <p className="text-muted-foreground">
                Detect crew conflicts automatically and get weather alerts for outdoor tasks. Keep your team coordinated.
              </p>
            </div>

            {/* Safety Tracking */}
            <div className="bg-background p-8 rounded-lg border-2 border-border hover:border-destructive transition-colors">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-6">
                <img
                  src="/assets/generated/safety-icon.dim_128x128.png"
                  alt="Safety Tracking"
                  className="w-10 h-10"
                />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Safety Incident Tracking</h3>
              <p className="text-muted-foreground">
                Quick-log safety incidents with timestamps. Keep your sites safe and compliant with NEC codes.
              </p>
            </div>

            {/* Material Cost Tracking */}
            <div className="bg-background p-8 rounded-lg border-2 border-border hover:border-primary transition-colors">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <DollarSign className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Material Cost Tracking</h3>
              <p className="text-muted-foreground">
                Track purchases, monitor budget burn rates, and manage change orders in real-time.
              </p>
            </div>

            {/* Smart Reminders */}
            <div className="bg-background p-8 rounded-lg border-2 border-border hover:border-primary transition-colors">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <Clock className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Escalating Reminders</h3>
              <p className="text-muted-foreground">
                Never miss a permit renewal or inspection deadline with smart, escalating notifications.
              </p>
            </div>

            {/* Fast & Efficient */}
            <div className="bg-background p-8 rounded-lg border-2 border-border hover:border-primary transition-colors">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <Zap className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Built on the Internet Computer for instant updates and secure, decentralized data storage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 construction-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-high-contrast">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join electrical project managers who are saving time and staying organized with SayWattPM.
          </p>
          <LoginButton />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
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
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <SiX className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <SiFacebook className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <SiLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
