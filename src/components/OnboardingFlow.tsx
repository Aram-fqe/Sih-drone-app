import { useState } from 'react';
import { Button } from './ui/button';
import { ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface OnboardingFlowProps {
  onComplete: () => void;
  isDarkMode?: boolean;
}

export function OnboardingFlow({ onComplete, isDarkMode = false }: OnboardingFlowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Welcome to DroneOps",
      subtitle: "Connecting remote communities with essential supplies and communication during emergencies.",
      image: "drone landscape",
      buttonText: "Next"
    },
    {
      title: "Rapid Response",
      subtitle: "Swift delivery of essential medical supplies and communication devices to remote areas affected by disasters.",
      image: "drone package delivery",
      buttonText: "Next"
    },
    {
      title: "Your Privacy is Our Priority",
      subtitle: "We are deeply committed to protecting your personal information. Our privacy policy details how we collect, use, and safeguard your data, ensuring your safety and safety.",
      image: "privacy security shield",
      buttonText: "Get Started"
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${
      isDarkMode ? 'bg-[#121212]' : 'bg-gradient-to-br from-slate-50 to-blue-50'
    }`}>
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Slide Content */}
        <div className="w-full max-w-sm text-center">
          {/* Image Section */}
          <div className="mb-8">
            <div className={`w-80 h-64 mx-auto rounded-2xl overflow-hidden ${
              isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'
            } shadow-xl relative`}>
              {currentSlide === 0 && (
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1626133506902-3e77480ceb81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcm9uZSUyMGxhbmRzY2FwZSUyMHNjZW5pY3xlbnwxfHx8fDE3NTc4MjU3NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Drone flying over landscape"
                  className="w-full h-full object-cover"
                />
              )}
              {currentSlide === 1 && (
                <div className={`w-full h-full flex items-center justify-center ${
                  isDarkMode ? 'bg-[#2C2C2C]' : 'bg-gradient-to-br from-blue-100 to-green-100'
                }`}>
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1597378994822-9f850841e676?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcm9uZSUyMHBhY2thZ2UlMjBkZWxpdmVyeSUyMGFlcmlhbHxlbnwxfHx8fDE3NTc4MjU3Njd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Drone carrying package"
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 ${
                    isDarkMode ? 'text-[#03DAC6]' : 'text-blue-600'
                  }`}>
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                    </svg>
                  </div>
                </div>
              )}
              {currentSlide === 2 && (
                <div className={`w-full h-full flex items-center justify-center ${
                  isDarkMode ? 'bg-[#2C2C2C]' : 'bg-gradient-to-br from-purple-100 to-blue-100'
                }`}>
                  <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center ${
                    isDarkMode ? 'border-[#BB86FC] bg-[#BB86FC]/10' : 'border-purple-600 bg-purple-50'
                  }`}>
                    <svg className={`w-12 h-12 ${
                      isDarkMode ? 'text-[#BB86FC]' : 'text-purple-600'
                    }`} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Text Content */}
          <div className="mb-8">
            <h1 className={`text-2xl font-semibold mb-4 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              {slides[currentSlide].title}
            </h1>
            <p className={`text-base leading-relaxed ${
              isDarkMode ? 'text-[#E0E0E0]' : 'text-slate-600'
            }`}>
              {slides[currentSlide].subtitle}
            </p>
            {currentSlide === 2 && (
              <button className={`mt-4 text-sm underline ${
                isDarkMode ? 'text-[#BB86FC]' : 'text-blue-600'
              }`}>
                Read our Privacy Policy
              </button>
            )}
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mb-8">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? isDarkMode ? 'bg-[#BB86FC]' : 'bg-blue-600'
                    : isDarkMode ? 'bg-[#3A3A3A]' : 'bg-slate-300'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <Button
            onClick={handleNext}
            className={`w-full h-12 rounded-xl font-medium text-base ${
              isDarkMode 
                ? 'bg-[#BB86FC] hover:bg-[#BB86FC]/90 text-black' 
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            {slides[currentSlide].buttonText}
            {currentSlide < slides.length - 1 && (
              <ChevronRight className="w-5 h-5 ml-2" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}