'use client';

import Link from 'next/link';
import { Video, FileText, BarChart3, Clock, Users, Shield, Sparkles, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Video className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                MeetWise
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="px-4 py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl font-medium"
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
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">AI-Powered Meeting Intelligence</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Meet Smarter with
            <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              {' '}AI-Generated Notes
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Experience seamless video conferencing with intelligent meeting summaries, 
            automatic note-taking, and powerful analytics. Never miss important details again.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl font-semibold text-lg group"
            >
              Start Free Meeting
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 rounded-lg hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl font-semibold text-lg border-2 border-primary-600"
            >
              View Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Productive Meetings
            </h2>
            <p className="text-xl text-gray-600">
              Powerful features designed to enhance your meeting experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-primary-200">
              <div className="bg-primary-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <FileText className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Meeting Notes</h3>
              <p className="text-gray-600">
                Automatically generate comprehensive meeting summaries with key points, 
                action items, and decisions at the click of a button.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-primary-200">
              <div className="bg-purple-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <Video className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">HD Video Conferencing</h3>
              <p className="text-gray-600">
                Crystal-clear video and audio quality with screen sharing, 
                virtual backgrounds, and real-time collaboration tools.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-primary-200">
              <div className="bg-green-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <BarChart3 className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Meeting Analytics</h3>
              <p className="text-gray-600">
                Track meeting duration, participant engagement, speaking time, 
                and other valuable insights to improve productivity.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-primary-200">
              <div className="bg-orange-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <Clock className="h-7 w-7 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Meeting Recorder</h3>
              <p className="text-gray-600">
                Record meetings with automatic transcription and timestamp markers. 
                Access recordings anytime with searchable transcripts.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-primary-200">
              <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <Users className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Meeting Agenda</h3>
              <p className="text-gray-600">
                Organize meetings by date with structured agendas. 
                Keep all meeting notes and summaries in one searchable place.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-primary-200">
              <div className="bg-red-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <Shield className="h-7 w-7 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure & Private</h3>
              <p className="text-gray-600">
                End-to-end encryption ensures your meetings and data remain 
                private and secure. Enterprise-grade security standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary-600 to-purple-600 rounded-3xl shadow-2xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Meetings?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of teams using MeetWise for smarter, more productive meetings
          </p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 rounded-lg hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl font-semibold text-lg"
          >
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Video className="h-6 w-6 text-primary-400" />
            <span className="text-xl font-bold text-white">MeetWise</span>
          </div>
          <p className="text-sm">
            © 2025 MeetWise. All rights reserved. Built with ❤️ for better meetings.
          </p>
        </div>
      </footer>
    </div>
  );
}
