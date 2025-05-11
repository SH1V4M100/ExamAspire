'use client'

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GraduationCap, CheckCircle, BookOpen, BarChart } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              ExamAspire
            </span>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center">
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Your Academic Success Starts Here
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  A modern examination platform designed for students at Jadavpur University. Track your progress, access study materials, and excel in your academic journey.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/signup">
                  <Button size="lg" className="px-8">Sign Up Now</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Why Choose ExamAspire?
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Built with modern technology and student needs in mind
                </p>
              </div>
              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Smart Assessment</h3>
                  <p className="text-sm text-muted-foreground">
                    Adaptive testing technology that matches your skill level
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <BarChart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Detailed Analytics</h3>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive insights into your performance and progress
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Study Resources</h3>
                  <p className="text-sm text-muted-foreground">
                    Access to past papers and comprehensive study materials
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Academic Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Direct access to faculty feedback and peer discussions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Join Your Fellow Students
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Experience the future of academic assessment at Jadavpur University
                </p>
              </div>
              <div className="mx-auto max-w-3xl space-y-4">
                <p className="text-muted-foreground">
                  ExamAspire is the official examination platform for Jadavpur University students, designed to provide a seamless and efficient examination experience. Join thousands of your peers who are already benefiting from our modern approach to academic assessment.
                </p>
                <Link href="/signup">
                  <Button size="lg">Get Started Today</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <p className="text-sm text-muted-foreground">
              © 2025 ExamAspire. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Made with ❤️ at Jadavpur University
            </p>
          </div>
          <nav className="flex items-center space-x-4 text-sm">
            <Link href="#" className="text-muted-foreground hover:text-foreground">Help Center</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">Support</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">Privacy</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}