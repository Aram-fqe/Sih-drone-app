import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  ArrowLeft, 
  Star, 
  Send, 
  CheckCircle,
  Home
} from 'lucide-react';

interface RateFeedbackScreenProps {
  onBack: () => void;
  onHomeRedirect?: () => void;
  isDarkMode?: boolean;
}

const ratingOptions = [
  { value: '1', label: '⭐ Poor', stars: 1 },
  { value: '2', label: '⭐⭐ Fair', stars: 2 },
  { value: '3', label: '⭐⭐⭐ Good', stars: 3 },
  { value: '4', label: '⭐⭐⭐⭐ Very Good', stars: 4 },
  { value: '5', label: '⭐⭐⭐⭐⭐ Excellent', stars: 5 }
];

const quickFeedbackChips = [
  'Delivery Delay',
  'Drone Quality', 
  'Tracking Issues',
  'Great Service',
  'User Interface',
  'Communication',
  'Response Time',
  'Technical Support'
];

export function RateFeedbackScreen({ onBack, onHomeRedirect, isDarkMode = false }: RateFeedbackScreenProps) {
  const [selectedRating, setSelectedRating] = useState<string>('');
  const [feedbackText, setFeedbackText] = useState('');
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const maxCharacters = 250;
  const remainingChars = maxCharacters - feedbackText.length;

  const handleChipToggle = (chip: string) => {
    setSelectedChips(prev => 
      prev.includes(chip) 
        ? prev.filter(c => c !== chip)
        : [...prev, chip]
    );
  };

  const handleSubmit = async () => {
    if (!selectedRating) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const getSelectedRatingDisplay = () => {
    const rating = ratingOptions.find(r => r.value === selectedRating);
    return rating ? rating.label : 'Select Rating';
  };

  const renderStars = (count: number, filled: boolean = true) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${
          i < count 
            ? filled ? 'text-yellow-400 fill-yellow-400' : 'text-yellow-400'
            : 'text-gray-300'
        }`} 
      />
    ));
  };

  if (isSubmitted) {
    return (
      <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
        isDarkMode ? 'bg-[#121212]' : 'bg-gray-50'
      }`}>
        {/* Header */}
        <div className="px-4 py-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack} 
            className={`p-2 ${
              isDarkMode 
                ? 'text-[#E0E0E0] hover:bg-[#1E1E1E]' 
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>

        {/* Success Content */}
        <div className="flex-1 flex items-center justify-center px-4">
          <Card className={`w-full max-w-md shadow-xl border-0 ${
            isDarkMode 
              ? 'bg-gradient-to-br from-[#1E1E1E] to-[#232323]' 
              : 'bg-gradient-to-br from-white to-slate-50'
          }`}>
            <CardContent className="p-8 text-center">
              <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center shadow-lg ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-[#03DAC6] to-[#03DAC6]/80' 
                  : 'bg-gradient-to-br from-green-500 to-green-600'
              }`}>
                <CheckCircle className={`w-10 h-10 ${
                  isDarkMode ? 'text-black' : 'text-white'
                }`} />
              </div>
              
              <h2 className={`text-2xl font-semibold mb-3 ${
                isDarkMode ? 'text-white' : 'text-slate-800'
              }`}>Thank You!</h2>
              <p className={`mb-6 leading-relaxed ${
                isDarkMode ? 'text-[#E0E0E0]' : 'text-slate-600'
              }`}>
                Your feedback has been submitted successfully. Thank you for helping us improve our disaster response services!
              </p>

              <div className="space-y-3">
                <Button 
                  onClick={onHomeRedirect}
                  className={`w-full rounded-full shadow-lg ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-[#BB86FC] to-[#BB86FC]/80 hover:from-[#BB86FC]/90 hover:to-[#BB86FC]/70 text-black' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
                  }`}
                >
                  <Home className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={onBack}
                  className={`w-full rounded-full ${
                    isDarkMode 
                      ? 'border-[#3A3A3A] text-[#E0E0E0] hover:bg-[#2C2C2C]' 
                      : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-[#121212]' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className="px-4 py-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack} 
          className={`p-2 ${
            isDarkMode 
              ? 'text-[#E0E0E0] hover:bg-[#1E1E1E]' 
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="px-4 pb-6 space-y-6">
        {/* Top Section */}
        <Card className={`shadow-lg border-0 ${
          isDarkMode 
            ? 'bg-gradient-to-br from-[#1E1E1E] to-[#232323]' 
            : 'bg-gradient-to-br from-white to-slate-50'
        }`}>
          <CardContent className="p-6 text-center">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center shadow-lg ${
              isDarkMode 
                ? 'bg-gradient-to-br from-[#BB86FC] to-[#BB86FC]/80' 
                : 'bg-gradient-to-br from-yellow-400 to-orange-500'
            }`}>
              <Star className={`w-8 h-8 fill-current ${
                isDarkMode ? 'text-black' : 'text-white'
              }`} />
            </div>
            
            <h1 className={`text-2xl font-semibold mb-2 ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}>Rate Your Experience</h1>
            <p className={`leading-relaxed ${
              isDarkMode ? 'text-[#E0E0E0]' : 'text-slate-600'
            }`}>
              Your feedback helps us grow and serve better during disaster response operations.
            </p>
          </CardContent>
        </Card>

        {/* Rating Selection */}
        <Card className={`shadow-lg border-0 ${
          isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'
        }`}>
          <CardContent className="p-6">
            <label className={`block font-medium mb-3 ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}>Select Rating</label>
            <Select value={selectedRating} onValueChange={setSelectedRating}>
              <SelectTrigger className="w-full h-12 bg-slate-50 border-slate-300 rounded-xl">
                <SelectValue placeholder="Choose your rating">
                  {selectedRating && (
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {renderStars(parseInt(selectedRating))}
                      </div>
                      <span className="text-slate-700">
                        {ratingOptions.find(r => r.value === selectedRating)?.label.split(' ').slice(1).join(' ')}
                      </span>
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {ratingOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex">
                        {renderStars(option.stars)}
                      </div>
                      <span>{option.label.split(' ').slice(1).join(' ')}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Quick Feedback Chips */}
        <Card className={`shadow-lg border-0 ${
          isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'
        }`}>
          <CardContent className="p-6">
            <label className={`block font-medium mb-3 ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}>Quick Feedback (Optional)</label>
            <div className="flex flex-wrap gap-2">
              {quickFeedbackChips.map((chip) => (
                <Badge
                  key={chip}
                  variant={selectedChips.includes(chip) ? "default" : "secondary"}
                  className={`cursor-pointer transition-all duration-200 px-3 py-2 rounded-full ${
                    selectedChips.includes(chip)
                      ? isDarkMode 
                        ? 'bg-gradient-to-r from-[#BB86FC] to-[#BB86FC]/80 text-black shadow-md transform scale-105'
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md transform scale-105'
                      : isDarkMode 
                        ? 'bg-[#2C2C2C] text-[#E0E0E0] hover:bg-[#3A3A3A]'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  onClick={() => handleChipToggle(chip)}
                >
                  {chip}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Feedback Text Area */}
        <Card className={`shadow-lg border-0 ${
          isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'
        }`}>
          <CardContent className="p-6">
            <label className={`block font-medium mb-3 ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}>Share Your Feedback</label>
            <Textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value.slice(0, maxCharacters))}
              placeholder="Share your feedback or suggestions..."
              className={`min-h-32 rounded-xl resize-none ${
                isDarkMode 
                  ? 'bg-[#2C2C2C] border-[#3A3A3A] text-[#E0E0E0] placeholder:text-[#B0B0B0]' 
                  : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-500'
              }`}
              maxLength={maxCharacters}
            />
            <div className="flex justify-between items-center mt-3">
              <span className={`text-sm ${
                remainingChars < 20 
                  ? isDarkMode ? 'text-[#CF6679]' : 'text-red-500'
                  : isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-500'
              }`}>
                {feedbackText.length}/{maxCharacters} characters
              </span>
              {feedbackText.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFeedbackText('')}
                  className={isDarkMode 
                    ? 'text-[#B0B0B0] hover:text-[#E0E0E0]' 
                    : 'text-slate-500 hover:text-slate-700'
                  }
                >
                  Clear
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            onClick={handleSubmit}
            disabled={!selectedRating || isSubmitting}
            className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-slate-300 disabled:to-slate-400 text-white rounded-full shadow-lg transition-all duration-200"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Submitting...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                Submit Feedback
              </div>
            )}
          </Button>
        </div>

        {!selectedRating && (
          <div className="text-center">
            <p className="text-sm text-slate-500">Please select a rating to continue</p>
          </div>
        )}
      </div>
    </div>
  );
}