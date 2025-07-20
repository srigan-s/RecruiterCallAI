import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mic, MicOff, Send, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import VoiceRecorder from "@/components/VoiceRecorder";

interface Question {
  id: number;
  text: string;
  answered: boolean;
  response?: string;
  feedback?: string;
}

const Interview = () => {
  const [interviewType, setInterviewType] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponse, setUserResponse] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      }
    };
    checkAuth();
  }, [navigate]);

  const generateQuestions = async () => {
    if (!interviewType) {
      toast({
        title: "Please select interview type",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-questions', {
        body: {
          interviewType,
          jobDescription: jobDescription || "General software engineering position",
        },
      });

      if (error) throw error;

      const generatedQuestions = data.questions.map((q: string, index: number) => ({
        id: index + 1,
        text: q,
        answered: false,
      }));

      setQuestions(generatedQuestions);
      setInterviewStarted(true);
      setCurrentQuestionIndex(0);

      toast({
        title: "Interview questions generated!",
        description: `Generated ${generatedQuestions.length} questions for your interview.`,
      });
    } catch (error: any) {
      toast({
        title: "Error generating questions",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const submitResponse = async () => {
    if (!userResponse.trim()) {
      toast({
        title: "Please provide a response",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const currentQuestion = questions[currentQuestionIndex];
      
      // Get feedback for the response
      const { data, error } = await supabase.functions.invoke('analyze-response', {
        body: {
          question: currentQuestion.text,
          response: userResponse,
          interviewType,
        },
      });

      if (error) throw error;

      // Update the question with response and feedback
      const updatedQuestions = [...questions];
      updatedQuestions[currentQuestionIndex] = {
        ...currentQuestion,
        answered: true,
        response: userResponse,
        feedback: data.feedback,
      };
      setQuestions(updatedQuestions);
      setUserResponse("");

      // Move to next question or show completion
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Interview completed
        toast({
          title: "Interview completed!",
          description: "You've answered all questions. Review your responses below.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error analyzing response",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const onTranscriptionComplete = (transcription: string) => {
    setUserResponse(transcription);
    setIsRecording(false);
  };

  if (!interviewStarted) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-2xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">AI Interview Setup</CardTitle>
              <CardDescription>
                Configure your interview settings to get started with AI-powered practice
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="interview-type">Interview Type</Label>
                <Select value={interviewType} onValueChange={setInterviewType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select interview type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical Interview</SelectItem>
                    <SelectItem value="behavioral">Behavioral Interview</SelectItem>
                    <SelectItem value="system-design">System Design</SelectItem>
                    <SelectItem value="recruiter-screen">Recruiter Screen</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="job-description">Job Description (Optional)</Label>
                <Textarea
                  id="job-description"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here to get more targeted questions..."
                  rows={4}
                />
              </div>

              <Button 
                onClick={generateQuestions} 
                disabled={loading || !interviewType}
                className="w-full"
                size="lg"
              >
                {loading ? "Generating Questions..." : "Start AI Interview"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isInterviewComplete = currentQuestionIndex >= questions.length || 
    (currentQuestionIndex === questions.length - 1 && currentQuestion?.answered);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => setInterviewStarted(false)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Setup
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Question */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Question {currentQuestionIndex + 1} of {questions.length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!isInterviewComplete && currentQuestion && (
                <>
                  <p className="text-foreground mb-6 text-lg leading-relaxed">
                    {currentQuestion.text}
                  </p>

                  <div className="space-y-4">
                    <Textarea
                      value={userResponse}
                      onChange={(e) => setUserResponse(e.target.value)}
                      placeholder="Type your response here, or use voice recording..."
                      rows={4}
                    />

                    <div className="flex gap-2">
                      <VoiceRecorder
                        onTranscriptionComplete={onTranscriptionComplete}
                        isRecording={isRecording}
                        setIsRecording={setIsRecording}
                      />
                      
                      <Button
                        onClick={submitResponse}
                        disabled={loading || !userResponse.trim()}
                        className="flex-1"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        {loading ? "Analyzing..." : "Submit Response"}
                      </Button>
                    </div>
                  </div>
                </>
              )}

              {isInterviewComplete && (
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">Interview Complete!</h3>
                  <p className="text-muted-foreground">
                    Great job completing the interview. Review your responses and feedback below.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Responses & Feedback */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Responses & Feedback</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-96 overflow-y-auto">
              {questions.map((question, index) => (
                question.answered && (
                  <div key={question.id} className="border-b border-border pb-4">
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">
                      Q{index + 1}: {question.text}
                    </h4>
                    <p className="text-sm mb-2">{question.response}</p>
                    {question.feedback && (
                      <div className="bg-accent/20 p-3 rounded-md">
                        <p className="text-sm text-accent-foreground">
                          <strong>Feedback:</strong> {question.feedback}
                        </p>
                      </div>
                    )}
                  </div>
                )
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Interview;