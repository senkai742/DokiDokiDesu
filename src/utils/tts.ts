// Text-to-Speech Service
// Requires: npx expo install expo-speech

let Speech: any;
try {
  Speech = require('expo-speech');
} catch {
  console.warn('expo-speech not installed. TTS will be disabled.');
}

class TTSService {
  private isSpeaking = false;
  private currentLanguage = 'ja-JP';
  private rate = 0.8; // Slower for learning

  async speak(text: string, language: 'ja-JP' | 'en-US' = 'ja-JP') {
    if (!Speech) {
      console.warn('TTS not available. Run: npx expo install expo-speech');
      return;
    }

    // Stop any current speech
    await this.stop();

    if (!text) return;

    try {
      this.isSpeaking = true;
      await Speech.speak(text, {
        language: language,
        rate: this.rate,
        pitch: 1.0,
        onDone: () => {
          this.isSpeaking = false;
        },
        onError: () => {
          this.isSpeaking = false;
        },
      });
    } catch (error) {
      console.error('TTS Error:', error);
      this.isSpeaking = false;
    }
  }

  async stop() {
    if (!Speech) return;
    try {
      await Speech.stop();
      this.isSpeaking = false;
    } catch (error) {
      console.error('TTS Stop Error:', error);
    }
  }

  async pause() {
    if (!Speech) return;
    try {
      await Speech.pause?.();
    } catch (error) {
      // Pause not supported on all platforms
    }
  }

  async resume() {
    if (!Speech) return;
    try {
      await Speech.resume?.();
    } catch (error) {
      // Resume not supported on all platforms
    }
  }

  isCurrentlySpeaking(): boolean {
    return this.isSpeaking;
  }

  setRate(rate: number) {
    this.rate = Math.max(0.1, Math.min(2.0, rate));
  }

  setLanguage(lang: 'ja-JP' | 'en-US') {
    this.currentLanguage = lang;
  }

  // Check if Japanese TTS is available
  async checkJapaneseAvailability(): Promise<boolean> {
    if (!Speech) return false;
    try {
      const voices = await Speech.getAvailableVoicesAsync?.() || [];
      return voices.some((v: { language: string }) => v.language.includes('ja') || v.language.includes('JP'));
    } catch {
      return true; // Assume available, will fail gracefully
    }
  }
}

export const tts = new TTSService();

// Hook for components
import { useState, useCallback } from 'react';

export function useTTS() {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = useCallback(async (text: string, language: 'ja-JP' | 'en-US' = 'ja-JP') => {
    setIsSpeaking(true);
    await tts.speak(text, language);
    setIsSpeaking(false);
  }, []);

  const stop = useCallback(async () => {
    await tts.stop();
    setIsSpeaking(false);
  }, []);

  return { speak, stop, isSpeaking };
}
