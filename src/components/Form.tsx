import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { Button } from './ui/button';

const formSchema = z.object({
  from_name: z.string().min(2, 'Name must be at least 2 characters.'),
  from_email: z.string().email('Please enter a valid email address.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

type FormFields = z.infer<typeof formSchema>;

function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormFields>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormFields) => {
    setIsSubmitting(true);
    const toastId = toast.loading('Sending message...');

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        data,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      toast.success('Message sent successfully!', { id: toastId });
      reset();
    } catch (error) {
      console.error('FAILED...', error);
      toast.error('Failed to send message.', { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center text-center" id="contact">
        <div className="max-w-xl mx-auto p-4 text-left">
          <p className="mb-6 text-center text-lg">
            Have a question or want to work together? Leave your details and I'll get back to you!
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="from_name" className="block text-sm font-medium text-primary mb-1">Your Name</label>
              <input type="text" {...register('from_name')} className="w-full p-3 bg-background/50 rounded-md border border-primary/30 focus:ring-2 focus:ring-primary focus:outline-none text-foreground" />
              {errors.from_name && <p className="text-red-500 text-sm mt-1">{errors.from_name.message}</p>}
            </div>
            <div>
              <label htmlFor="from_email" className="block text-sm font-medium text-primary mb-1">Your Email</label>
              <input type="email" {...register('from_email')} className="w-full p-3 bg-background/50 rounded-md border border-primary/30 focus:ring-2 focus:ring-primary focus:outline-none text-foreground" />
              {errors.from_email && <p className="text-red-500 text-sm mt-1">{errors.from_email.message}</p>}
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-primary mb-1">Message</label>
              <textarea {...register('message')} rows={5} className="w-full p-3 bg-background/50 rounded-md border border-primary/30 focus:ring-2 focus:ring-primary focus:outline-none text-foreground" />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
            </div>

            <div className='flex justify-center'>
              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className="flex py-8 px-16 justify-center items-center hover:bg-primary text-primary hover:text-background shadow-md border-0 bg-background hover:shadow-lg active:scale-90 transition-all duration-300 ease-in-out font-bold text-xl rounded-full mt-6 disabled:bg-primary/50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                {!isSubmitting && <FaPaperPlane />}
              </Button>
            </div>
          </form>
        </div>
      <Toaster position="bottom-center" toastOptions={{
        style: {
          background: '#333',
          color: '#fff',
        }
      }} />
    </div>
  );
}

export default Contact;