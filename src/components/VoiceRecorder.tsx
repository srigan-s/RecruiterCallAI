import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Square } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface VoiceRecorderProps {
  onTranscriptionComplete: (transcription: string) => void;
  isRecording: boolean;
  setIsRecording: (recording: boolean) => void;
}

const VoiceRecorder = ({ onTranscriptionComplete, isRecording, setIsRecording }: VoiceRecorderProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await transcribeAudio(audioBlob);
        
        // Stop all tracks to release microphone
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      
      toast({
        title: "Recording started",
        description: "Speak your response clearly",
      });
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: "Microphone access denied",
        description: "Please allow microphone access to use voice recording",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsProcessing(true);
    }
  };

  const transcribeAudio = async (audioBlob: Blob) => {
    try {
      // Convert blob to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Audio = reader.result?.toString().split(',')[1];
        
        if (base64Audio) {
          const { data, error } = await supabase.functions.invoke('transcribe-audio', {
            body: { audio: base64Audio },
          });

          if (error) throw error;

          onTranscriptionComplete(data.text);
          toast({
            title: "Transcription complete",
            description: "Your voice has been converted to text",
          });
        }
      };
      reader.readAsDataURL(audioBlob);
    } catch (error: any) {
      console.error('Error transcribing audio:', error);
      toast({
        title: "Transcription failed",
        description: error.message || "Could not transcribe audio",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRecordingToggle = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <Button
      variant={isRecording ? "destructive" : "outline"}
      onClick={handleRecordingToggle}
      disabled={isProcessing}
      className="min-w-32"
    >
      {isProcessing ? (
        <>
          <Square className="w-4 h-4 mr-2 animate-pulse" />
          Processing...
        </>
      ) : isRecording ? (
        <>
          <MicOff className="w-4 h-4 mr-2" />
          Stop Recording
        </>
      ) : (
        <>
          <Mic className="w-4 h-4 mr-2" />
          Start Recording
        </>
      )}
    </Button>
  );
};

export default VoiceRecorder;