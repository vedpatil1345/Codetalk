import React, { useState } from 'react';
import { Mail, User, MessageSquare, Send } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import emailjs from '@emailjs/browser';


const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Replace these with your EmailJS credentials
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message
      };

      await emailjs.send(
        'service_cgm8gjb',
        'template_pupr2dy',
        templateParams,
        'k4AgOiH_khBqSvIJL'
      );

      setShowSuccess(true);
      setFormData({ name: '', email: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-h-[85vh] bg-transparent flex items-center justify-center mb-8">
      <Card className="max-w-2xl w-full bg-transparent border-none">
        <CardHeader className="text-center">
          <div className="flex justify-center">
            <Mail className="h-10 w-10 text-blue-500" />
          </div>
          <CardTitle className="text-3xl font-bold text-blue-500">
            Contact Us
          </CardTitle>
          <p className="mt-2 text-gray-800 dark:text-gray-300">
            Get in touch with our team
          </p>
        </CardHeader>

        <CardContent>
          <div className="dark:bg-gray-800/90 bg-slate-200/50 rounded-xl shadow-2xl p-8">
            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
                {error}
              </div>
            )}

            {showSuccess && (
              <Alert className="mb-4 bg-green-500/10 border-green-500/50">
                <AlertDescription className="text-green-500">
                  Message sent successfully! We'll get back to you soon.
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="dark:text-gray-300 text-sm font-medium block mb-2">
                  Name
                </label>
                <div className="relative">
                  <User className="h-5 w-5 text-gray-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="dark:bg-gray-700 dark:text-white pl-10 pr-4 py-2 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border border-gray-600"
                    placeholder="Your name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="dark:text-gray-300 text-sm font-medium block mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="h-5 w-5 text-gray-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="dark:bg-gray-700 dark:text-white pl-10 pr-4 py-2 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border border-gray-600"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="dark:text-gray-300 text-sm font-medium block mb-2">
                  Message
                </label>
                <div className="relative">
                  <MessageSquare className="h-5 w-5 text-gray-500 absolute left-3 top-3" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="dark:bg-gray-700 dark:text-white pl-10 pr-4 py-2 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border border-gray-600 min-h-32 resize-none"
                    placeholder="Your message"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || showSuccess}
                className="w-full bg-blue-500 dark:bg-gradient-to-r dark:from-blue-500 dark:to-green-500 text-white py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    Sending...
                  </span>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export {ContactPage};