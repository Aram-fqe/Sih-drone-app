import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { AlertTriangle, Shield, ArrowLeft, Settings } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AuthFlowProps {
  onAuthComplete: () => void;
  isDarkMode?: boolean;
}

export function AuthFlow({ onAuthComplete, isDarkMode = false }: AuthFlowProps) {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'login' | 'signup' | 'reset'>('welcome');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState<'pilot' | 'supplier' | 'admin'>('pilot');
  const [showSOSPanel, setShowSOSPanel] = useState(false);

  const handleLogin = () => {
    // Mock authentication
    onAuthComplete();
  };

  const handleSignup = () => {
    // Mock registration
    onAuthComplete();
  };

  const handleResetPassword = () => {
    // Mock password reset
    setCurrentScreen('login');
  };

  // SOS Panel Component
  const SOSPanel = () => (
    <div className={`fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 ${
      showSOSPanel ? '' : 'hidden'
    }`}>
      <div className={`w-full max-w-sm rounded-2xl p-6 ${
        isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'
      } shadow-2xl`}>
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <h3 className={`text-xl font-semibold mb-2 ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>Emergency Quick Access</h3>
          <p className={`text-sm ${
            isDarkMode ? 'text-[#E0E0E0]' : 'text-slate-600'
          }`}>
            In critical situations, DroneOps provides immediate support. Access essential features swiftly to ensure rapid response and assistance.
          </p>
        </div>
        
        <div className="space-y-3">
          <Button className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl h-12">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Call for Drone Support
          </Button>
          <Button 
            variant="outline" 
            className="w-full rounded-xl h-12"
            onClick={() => setShowSOSPanel(false)}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );

  // Welcome Back Screen
  if (currentScreen === 'welcome') {
    return (
      <div className={`min-h-screen ${
        isDarkMode ? 'bg-[#121212]' : 'bg-gradient-to-br from-slate-50 to-blue-50'
      } relative`}>
        {/* SOS Button */}
        <div className="absolute top-6 right-6 z-10">
          <Button
            onClick={() => setShowSOSPanel(true)}
            className="bg-red-600 hover:bg-red-700 text-white rounded-full w-12 h-12 p-0 shadow-lg"
          >
            <AlertTriangle className="w-5 h-5" />
          </Button>
        </div>

        {/* Settings Button */}
        <div className="absolute top-6 left-6 z-10">
          <Button
            variant="ghost"
            className={`rounded-full w-12 h-12 p-0 ${
              isDarkMode ? 'text-[#E0E0E0] hover:bg-[#2C2C2C]' : 'text-slate-600 hover:bg-white/50'
            }`}
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
          <Card className={`w-full max-w-sm ${
            isDarkMode ? 'bg-[#1E1E1E] border-[#3A3A3A]' : 'bg-white/80 backdrop-blur-sm border-white/20'
          } shadow-2xl`}>
            <CardContent className="p-8">
              {/* Logo */}
              <div className="text-center mb-8">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  isDarkMode ? 'bg-[#BB86FC]/20' : 'bg-blue-50'
                }`}>
                  <Shield className={`w-8 h-8 ${
                    isDarkMode ? 'text-[#BB86FC]' : 'text-blue-600'
                  }`} />
                </div>
                <h1 className={`text-2xl font-semibold ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>DroneOps</h1>
                <p className={`text-sm mt-2 ${
                  isDarkMode ? 'text-[#E0E0E0]' : 'text-slate-600'
                }`}>
                  Log in to continue your DroneAssist mission.
                </p>
              </div>

              {/* Login Form */}
              <div className="space-y-4 mb-6">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`h-12 rounded-xl ${
                    isDarkMode ? 'bg-[#2C2C2C] border-[#3A3A3A] text-white' : 'bg-gray-50'
                  }`}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`h-12 rounded-xl ${
                    isDarkMode ? 'bg-[#2C2C2C] border-[#3A3A3A] text-white' : 'bg-gray-50'
                  }`}
                />
              </div>

              {/* Sign In Button */}
              <Button
                onClick={handleLogin}
                className={`w-full h-12 rounded-xl font-medium mb-4 ${
                  isDarkMode 
                    ? 'bg-[#BB86FC] hover:bg-[#BB86FC]/90 text-black' 
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                Sign In
              </Button>

              {/* Google Sign In */}
              <Button
                variant="outline"
                className={`w-full h-12 rounded-xl font-medium mb-6 ${
                  isDarkMode ? 'border-[#3A3A3A] text-[#E0E0E0] hover:bg-[#2C2C2C]' : ''
                }`}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign in with Google
              </Button>

              {/* Links */}
              <div className="text-center space-y-2">
                <button
                  onClick={() => setCurrentScreen('reset')}
                  className={`text-sm underline ${
                    isDarkMode ? 'text-[#BB86FC]' : 'text-blue-600'
                  }`}
                >
                  Forgot Password?
                </button>
                <div className={`text-sm ${
                  isDarkMode ? 'text-[#E0E0E0]' : 'text-slate-600'
                }`}>
                  New here?{' '}
                  <button
                    onClick={() => setCurrentScreen('signup')}
                    className={`underline ${
                      isDarkMode ? 'text-[#BB86FC]' : 'text-blue-600'
                    }`}
                  >
                    Create an Account
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <SOSPanel />
      </div>
    );
  }

  // Create Account Screen
  if (currentScreen === 'signup') {
    return (
      <div className={`min-h-screen ${
        isDarkMode ? 'bg-[#121212]' : 'bg-gradient-to-br from-slate-50 to-blue-50'
      } relative`}>
        {/* SOS Button */}
        <div className="absolute top-6 right-6 z-10">
          <Button
            onClick={() => setShowSOSPanel(true)}
            className="bg-red-600 hover:bg-red-700 text-white rounded-full w-12 h-12 p-0 shadow-lg"
          >
            <AlertTriangle className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
          <Card className={`w-full max-w-sm ${
            isDarkMode ? 'bg-[#1E1E1E] border-[#3A3A3A]' : 'bg-white/80 backdrop-blur-sm border-white/20'
          } shadow-2xl`}>
            <CardContent className="p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                  isDarkMode ? 'bg-[#03DAC6]/20' : 'bg-green-50'
                }`}>
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcm9uZSUyMHBhY2thZ2UlMjBkZWxpdmVyeXxlbnwxfHx8fDE3NTc3NzE5Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Drone"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <h1 className={`text-2xl font-semibold ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>Create Your Account</h1>
                <p className={`text-sm mt-2 ${
                  isDarkMode ? 'text-[#E0E0E0]' : 'text-slate-600'
                }`}>
                  Join DroneAssist and help deliver hope.
                </p>
              </div>

              {/* Signup Form */}
              <div className="space-y-4 mb-6">
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`h-12 rounded-xl ${
                    isDarkMode ? 'bg-[#2C2C2C] border-[#3A3A3A] text-white' : 'bg-gray-50'
                  }`}
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`h-12 rounded-xl ${
                    isDarkMode ? 'bg-[#2C2C2C] border-[#3A3A3A] text-white' : 'bg-gray-50'
                  }`}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`h-12 rounded-xl ${
                    isDarkMode ? 'bg-[#2C2C2C] border-[#3A3A3A] text-white' : 'bg-gray-50'
                  }`}
                />
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`h-12 rounded-xl ${
                    isDarkMode ? 'bg-[#2C2C2C] border-[#3A3A3A] text-white' : 'bg-gray-50'
                  }`}
                />


              </div>

              {/* Sign Up Button */}
              <Button
                onClick={handleSignup}
                className={`w-full h-12 rounded-xl font-medium mb-4 ${
                  isDarkMode 
                    ? 'bg-[#BB86FC] hover:bg-[#BB86FC]/90 text-black' 
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                Sign Up
              </Button>

              {/* Back to Login */}
              <div className="text-center">
                <span className={`text-sm ${
                  isDarkMode ? 'text-[#E0E0E0]' : 'text-slate-600'
                }`}>
                  Already have an account?{' '}
                  <button
                    onClick={() => setCurrentScreen('welcome')}
                    className={`underline ${
                      isDarkMode ? 'text-[#BB86FC]' : 'text-blue-600'
                    }`}
                  >
                    Log In
                  </button>
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <SOSPanel />
      </div>
    );
  }

  // Reset Password Screen
  if (currentScreen === 'reset') {
    return (
      <div className={`min-h-screen ${
        isDarkMode ? 'bg-[#121212]' : 'bg-gradient-to-br from-slate-50 to-blue-50'
      } relative`}>
        {/* SOS Button */}
        <div className="absolute top-6 right-6 z-10">
          <Button
            onClick={() => setShowSOSPanel(true)}
            className="bg-red-600 hover:bg-red-700 text-white rounded-full w-12 h-12 p-0 shadow-lg"
          >
            <AlertTriangle className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
          <Card className={`w-full max-w-sm ${
            isDarkMode ? 'bg-[#1E1E1E] border-[#3A3A3A]' : 'bg-white/80 backdrop-blur-sm border-white/20'
          } shadow-2xl`}>
            <CardContent className="p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className={`text-2xl font-semibold ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>Reset Password</h1>
                <p className={`text-sm mt-2 ${
                  isDarkMode ? 'text-[#E0E0E0]' : 'text-slate-600'
                }`}>
                  We'll send you a reset link to your email.
                </p>
              </div>

              {/* Reset Form */}
              <div className="space-y-4 mb-6">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`h-12 rounded-xl ${
                    isDarkMode ? 'bg-[#2C2C2C] border-[#3A3A3A] text-white' : 'bg-gray-50'
                  }`}
                />
              </div>

              {/* Send Reset Link Button */}
              <Button
                onClick={handleResetPassword}
                className={`w-full h-12 rounded-xl font-medium mb-4 ${
                  isDarkMode 
                    ? 'bg-[#BB86FC] hover:bg-[#BB86FC]/90 text-black' 
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                Send Reset Link
              </Button>

              {/* Back to Login */}
              <div className="text-center">
                <span className={`text-sm ${
                  isDarkMode ? 'text-[#E0E0E0]' : 'text-slate-600'
                }`}>
                  Remember password?{' '}
                  <button
                    onClick={() => setCurrentScreen('welcome')}
                    className={`underline ${
                      isDarkMode ? 'text-[#BB86FC]' : 'text-blue-600'
                    }`}
                  >
                    Log In
                  </button>
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <SOSPanel />
      </div>
    );
  }

  return null;
}