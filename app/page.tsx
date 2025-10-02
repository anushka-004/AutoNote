'use client';

import Link from 'next/link';
import { Video, FileText, BarChart3, Clock, Users, Shield, Sparkles, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-background to-dark">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-dark/80 backdrop-blur-md border-b border-primary/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Video className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                AutoNote
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="px-4 py-2 text-text hover:text-accent font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-accent transition-all shadow-lg hover:shadow-xl font-medium"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-primary/20 text-accent px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">AI-Powered Meeting Intelligence</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-text mb-6">
            Meet Smarter with
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {' '}AI-Generated Notes
            </span>
          </h1>
          <p className="text-xl text-text/80 mb-10 max-w-3xl mx-auto">
            Experience seamless video conferencing with intelligent meeting summaries, 
            automatic note-taking, and powerful analytics. Never miss important details again.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-lg hover:bg-accent transition-all shadow-lg hover:shadow-xl font-semibold text-lg group"
            >
              Start Free Meeting
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center px-8 py-4 bg-background text-primary rounded-lg hover:bg-dark transition-all shadow-lg hover:shadow-xl font-semibold text-lg border-2 border-primary"
            >
              View Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text mb-4">
              Everything You Need for Productive Meetings
            </h2>
            <p className="text-xl text-text/80">
              Powerful features designed to enhance your meeting experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-background p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-primary/20 hover:border-primary">
              <div className="bg-primary/20 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <FileText className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-text mb-3">AI Meeting Notes</h3>
              <p className="text-text/70">
                Automatically generate comprehensive meeting summaries with key points, 
                action items, and decisions at the click of a button.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-background p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-primary/20 hover:border-primary">
              <div className="bg-accent/20 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <Video className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-text mb-3">HD Video Conferencing</h3>
              <p className="text-text/70">
                Crystal-clear video and audio quality with screen sharing, 
                virtual backgrounds, and real-time collaboration tools.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-background p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-primary/20 hover:border-primary">
              <div className="bg-primary/20 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <BarChart3 className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-text mb-3">Meeting Analytics</h3>
              <p className="text-text/70">
                Track meeting duration, participant engagement, speaking time, 
                and other valuable insights to improve productivity.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-background p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-primary/20 hover:border-primary">
              <div className="bg-accent/20 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <Clock className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-text mb-3">Meeting Recorder</h3>
              <p className="text-text/70">
                Record meetings with automatic transcription and timestamp markers. 
                Access recordings anytime with searchable transcripts.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-background p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-primary/20 hover:border-primary">
              <div className="bg-primary/20 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-text mb-3">Meeting Agenda</h3>
              <p className="text-text/70">
                Organize meetings by date with structured agendas. 
                Keep all meeting notes and summaries in one searchable place.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-background p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-primary/20 hover:border-primary">
              <div className="bg-accent/20 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <Shield className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-text mb-3">Secure & Private</h3>
              <p className="text-text/70">
                End-to-end encryption ensures your meetings and data remain 
                private and secure. Enterprise-grade security standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary to-accent rounded-3xl shadow-2xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Meetings?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Join thousands of teams using AutoNote for smarter, more productive meetings
          </p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary rounded-lg hover:bg-text transition-all shadow-lg hover:shadow-xl font-semibold text-lg"
          >
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-text/70 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Video className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-text">AutoNote</span>
          </div>
          <p className="text-sm">
            © 2025 AutoNote. All rights reserved. Built with ❤️ for better meetings.
          </p>
        </div>
      </footer>
    </div>
  );
}
