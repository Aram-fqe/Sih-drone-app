import { useState } from 'react';
import { ArrowLeft, Globe, CheckCircle, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface LanguageSelectionScreenProps {
  onBack: () => void;
  isDarkMode?: boolean;
}

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  isSelected?: boolean;
}

const availableLanguages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' }
];

const sampleText = {
  en: 'Emergency response coordination through advanced drone technology',
  hi: 'उन्नत ड्रोन तकनीक के माध्यम से आपातकालीन प्रतिक्रिया समन्वय',
  ta: 'மேம்பட்ட ட்ரோன் தொழில்நுட்பத்தின் மூலம் அவசர காலப் பதில் ஒருங்கிணைப்பு',
  bn: 'উন্নত ড্রোন প্রযুক্তির মাধ্যমে জরুরি প্রতিক্রিয়া সমন্বয়',
  ar: 'تنسيق الاستجابة للطوارئ من خلال تقنية الطائرات بدون طيار المتقدمة',
  fr: 'Coordination de la réponse d\'urgence grâce à la technologie avancée des drones',
  es: 'Coordinación de respuesta de emergencia a través de tecnología avanzada de drones',
  de: 'Notfallkoordination durch fortschrittliche Drohnentechnologie',
  zh: '通过先进的无人机技术进行紧急响应协调',
  ja: '高度なドローン技術による緊急対応の調整',
  ko: '고급 드론 기술을 통한 응급 대응 조정',
  pt: 'Coordenação de resposta de emergência através de tecnologia avançada de drones'
};

export function LanguageSelectionScreen({ onBack, isDarkMode = false }: LanguageSelectionScreenProps) {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLanguages = availableLanguages.filter(lang =>
    lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
  };

  const handleApplyLanguage = () => {
    const selectedLang = availableLanguages.find(lang => lang.code === selectedLanguage);
    toast.success(`Language updated to ${selectedLang?.name} successfully!`, {
      duration: 3000,
    });
    
    // Save language preference to localStorage
    localStorage.setItem('droneops-language', selectedLanguage);
    
    // Navigate back after a short delay
    setTimeout(() => {
      onBack();
    }, 1500);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-slate-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className={`sticky top-0 z-10 backdrop-blur-sm border-b transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-slate-900/90 border-slate-800' 
          : 'bg-gray-50/90 border-gray-200'
      }`}>
        <div className="px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className={`p-2 ${
                isDarkMode 
                  ? 'text-slate-200 hover:bg-slate-800' 
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-blue-600 to-purple-600' 
                  : 'bg-gradient-to-br from-blue-500 to-purple-600'
              }`}>
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className={`text-xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>App Language</h1>
                <p className={`text-sm ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>Choose your preferred language</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
            isDarkMode ? 'text-slate-400' : 'text-slate-500'
          }`} />
          <Input
            placeholder="Search languages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`pl-10 ${
              isDarkMode 
                ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-400' 
                : 'bg-white border-gray-200 text-slate-900 placeholder:text-slate-500'
            }`}
          />
        </div>

        {/* Language List */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredLanguages.map((language, index) => (
              <motion.div
                key={language.code}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-200 border-2 ${
                    selectedLanguage === language.code
                      ? isDarkMode
                        ? 'border-gradient-to-r from-blue-500 to-purple-600 bg-gradient-to-r from-blue-900/20 to-purple-900/20 shadow-lg shadow-blue-500/20'
                        : 'border-gradient-to-r from-blue-500 to-purple-600 bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg shadow-blue-500/20'
                      : isDarkMode
                        ? 'border-slate-700 bg-slate-800 hover:bg-slate-700 hover:border-slate-600'
                        : 'border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300'
                  }`}
                  onClick={() => handleLanguageSelect(language.code)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{language.flag}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className={`font-semibold ${
                              isDarkMode ? 'text-white' : 'text-slate-900'
                            }`}>
                              {language.name}
                            </h3>
                            {language.code !== 'en' && (
                              <span className={`text-sm ${
                                isDarkMode ? 'text-slate-400' : 'text-slate-600'
                              }`}>
                                ({language.nativeName})
                              </span>
                            )}
                          </div>
                          <p className={`text-sm ${
                            isDarkMode ? 'text-slate-400' : 'text-slate-600'
                          }`}>
                            {language.nativeName}
                          </p>
                        </div>
                      </div>
                      
                      {selectedLanguage === language.code && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", damping: 15, stiffness: 300 }}
                        >
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        </motion.div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Preview Section */}
        <Card className={`${
          isDarkMode 
            ? 'bg-slate-800 border-slate-700' 
            : 'bg-white border-gray-200'
        }`}>
          <CardContent className="p-4">
            <h3 className={`font-semibold mb-3 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Preview
            </h3>
            <div className={`p-4 rounded-lg border-2 border-dashed transition-colors duration-200 ${
              isDarkMode 
                ? 'border-slate-600 bg-slate-900/50' 
                : 'border-gray-300 bg-gray-50'
            }`}>
              <p className={`text-sm leading-relaxed ${
                isDarkMode ? 'text-slate-300' : 'text-slate-700'
              }`}>
                {sampleText[selectedLanguage as keyof typeof sampleText] || sampleText.en}
              </p>
            </div>
            <p className={`text-xs mt-2 ${
              isDarkMode ? 'text-slate-500' : 'text-slate-500'
            }`}>
              Sample app text in selected language
            </p>
          </CardContent>
        </Card>

        {/* Apply Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={handleApplyLanguage}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-200"
          >
            Apply Language
          </Button>
        </motion.div>

        {/* Footer Note */}
        <div className={`text-center p-4 rounded-xl ${
          isDarkMode 
            ? 'bg-slate-800/50 border border-slate-700' 
            : 'bg-blue-50 border border-blue-200'
        }`}>
          <p className={`text-sm ${
            isDarkMode ? 'text-slate-400' : 'text-blue-700'
          }`}>
            Language changes will apply across the app immediately
          </p>
        </div>
      </div>
    </div>
  );
}