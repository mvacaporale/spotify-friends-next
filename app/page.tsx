'use client';

import React, { useState } from "react";
import {
  Music,
  ArrowRight,
  LogIn,
  Users,
  Calendar,
  Lock,
  Sparkles,
  Sliders,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { createClient } from '@/lib/supabase/client';
import SpotifyButton from '@/components/auth/SpotifyButton';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

    // useEffect(() => {
    //   const supabase = createClient();

    //   const checkSession = async () => {
    //     const { data: { session } } = await supabase.auth.getSession();
    //     if (session) {
    //       router.push('/dashboard');
    //     }
    //   };

    //   checkSession();
    // }, [router]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  const faqs = [
    {
      question: "What is the 'My Top Tracks' playlist?",
      answer:
        "This playlist will update weekly with your recent top songs, appended to the top. You follow this playlist on your friends' accounts to follow their music.",
    },
    {
      question: "What is the 'Friend Favorites' playlist?",
      answer:
        "This playlist updates weekly with your friends top songs, three from each. You can keep it private or add it to your profile if you want people to make suggestions directly.",
    },
    {
      question: "How do I follow new people?",
      answer:
        "You invite them to join through this site and then follow their top tracks playlist. Soon, their will be a link on your sign in page which you can share to do this in one step.",
    },
    {
      question: "How many people can I follow?",
      answer:
        "This platform helps people find more of the music they love. Part of this is to encourage users to be intentional in who they follow, superficially the friends who's taste speaks to theirs. For now, it's capped at 10 per user, which gives the same number of songs as Spotify's Discover Weekly.",
    },
    {
      question: "How do I recommend particular songs?",
      answer:
        "You can optionally add up to three songs per week to your top tracks playlist by hand. These will then be shared to your followers' weekly mix with your other top tracks.",
    },
  ];
  return (
    <div className="w-full min-h-screen bg-neutral-900">
      <nav className="fixed top-0 left-0 right-0 bg-neutral-900/95 text-neutral-200 p-4 z-50 backdrop-blur-sm border-b border-neutral-800">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <button className="flex items-center gap-2 text-neutral-200 px-4 py-2 rounded-full">
            <Music size={16} className="text-emerald-500" />
            <span className="font-semibold">Spotify Friends</span>
          </button>
          <div className="hidden md:flex gap-6">
            <a
              href="#setup"
              className="hover:text-emerald-500 transition-colors"
            >
              Setup
            </a>
            <a
              href="#how-it-works"
              className="hover:text-emerald-500 transition-colors"
            >
              How it Works
            </a>
            <a
              href="#support"
              className="hover:text-emerald-500 transition-colors"
            >
              Support
            </a>
          </div>
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 hover:bg-neutral-800 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <div
          className={`
          md:hidden 
          absolute 
          left-0 
          right-0 
          bg-neutral-900 
          border-b 
          border-neutral-800
          transition-all 
          duration-300 
          ease-in-out
          ${isMenuOpen ? "top-full opacity-100" : "-top-[200%] opacity-0"}
        `}
        >
          <div className="flex flex-col p-4 space-y-4">
            <a
              href="#setup"
              className="hover:text-emerald-500 transition-colors px-4 py-2 hover:bg-neutral-800 rounded-lg"
              onClick={closeMenu}
            >
              Setup
            </a>
            <a
              href="#how-it-works"
              className="hover:text-emerald-500 transition-colors px-4 py-2 hover:bg-neutral-800 rounded-lg"
              onClick={closeMenu}
            >
              How it Works
            </a>
            <a
              href="#support"
              className="hover:text-emerald-500 transition-colors px-4 py-2 hover:bg-neutral-800 rounded-lg"
              onClick={closeMenu}
            >
              Support
            </a>
          </div>
        </div>
      </nav>
      <section
        id="setup"
        className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-neutral-200 pt-32 pb-20 px-4"
      >
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm tracking-widest mb-4 text-emerald-500">
            SPOTIFY FRIENDS
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Discover music through friends you trust
          </h1>
          <p className="text-xl mb-8 text-neutral-400">
            Get a weekly playlist featuring the best tracks from people you
            follow. It's like having your coolest friends make you a mixtape
            every week.
          </p>
          <a
            href="#how-it-works"
            className="bg-emerald-500 text-neutral-100 px-8 py-3 rounded-full font-medium hover:bg-emerald-600 transition-colors inline-flex items-center gap-2 mb-12"
          >
            Connect with Friends
            <ArrowRight size={18} />
          </a>
          {/* <SpotifyButton /> */}
          <div>
            <p className="mb-4 text-emerald-500">
              Join over 20,000 music lovers
            </p>
            <img
              src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
              alt="Spotify Logo"
              className="h-8 mx-auto opacity-90"
            />
          </div>
        </div>
      </section>
      <section
        id="how-it-works"
        className="bg-neutral-800 px-4 py-16 border-t border-neutral-700"
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-neutral-100">
            How does Spotify Friends work?
          </h2>
          <p className="mb-12 text-neutral-400 text-lg">
            Connect your Spotify account, follow your friends, and get a
            personalized playlist every Monday based on what they're listening
            to most.
          </p>
          <div className="space-y-6 mb-16">
            {[
              {
                icon: LogIn,
                step: "1",
                title: "Connect Your Account",
                content: "Quick one-click setup with your Spotify login",
              },
              {
                icon: Users,
                step: "2",
                title: "Follow Friends",
                content:
                  "Find and follow friends to include their music in your mix",
              },
              {
                icon: Calendar,
                step: "3",
                title: "Weekly Updates",
                content: "New playlist every Friday in your Spotify library",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-6 relative">
                <div className="flex-shrink-0 w-12 h-12 bg-neutral-700 rounded-full flex items-center justify-center border border-neutral-600">
                  <item.icon className="w-6 h-6 text-emerald-500" />
                </div>
                {i < 2 && (
                  <div className="absolute left-6 top-12 w-[1px] h-10 bg-neutral-700" />
                )}
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-emerald-500 font-mono text-sm">
                      STEP {item.step}
                    </span>
                    <h3 className="text-lg font-semibold text-neutral-200">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-neutral-400">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-8">
            {[
              {
                icon: Sparkles,
                title: "Always Free",
                content: "No subscription needed, just connect and enjoy",
              },
              {
                icon: Sliders,
                title: "Fully Customizable",
                content: "Select which friends influence your weekly mix",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-neutral-900/50 rounded-xl p-6 hover:bg-neutral-900 transition-colors border border-neutral-700"
              >
                <div className="flex items-center gap-3 mb-3">
                  <item.icon className="w-5 h-5 text-emerald-500" />
                  <h3 className="text-lg font-semibold text-neutral-200">
                    {item.title}
                  </h3>
                </div>
                <p className="text-neutral-400">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-neutral-900 px-4 py-16 border-t border-neutral-800">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-neutral-100 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-neutral-800 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex justify-between items-center hover:bg-neutral-800/50 transition-colors"
                >
                  <span className="text-left text-lg font-medium text-neutral-200">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-emerald-500 transition-transform ${openFaq === index ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${openFaq === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                  `}
                >
                  <p className="px-6 py-4 text-neutral-400 border-t border-neutral-800">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        id="support"
        className="bg-neutral-900 px-4 py-16 border-t border-neutral-800"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 text-neutral-100">
            Need help with Spotify Friends?
          </h2>
          <p className="text-neutral-400">
            Message @mcaporale on Twitter and I'll help you get connected with
            your friends.
          </p>
        </div>
      </section>
      <footer className="bg-neutral-900 border-t border-neutral-800 px-4 py-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-neutral-400 text-sm">
            Made with ♥️ by Michaelangelo Caporale
          </p>
          <p className="text-neutral-500 text-sm mt-2">
            © {new Date().getFullYear()} Spotify Friends
          </p>
        </div>
      </footer>
    </div>
  );
}