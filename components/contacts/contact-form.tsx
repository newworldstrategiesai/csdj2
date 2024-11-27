// Previous imports remain the same...

interface ContactFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  initialData?: Partial<Contact>;
  userId?: string;
}

export function ContactForm({
  open,
  onOpenChange,
  onSuccess,
  initialData,
  userId,
}: ContactFormProps) {
  // Previous state declarations remain the same...

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!userId) {
        throw new Error('User ID is required');
      }

      if (initialData?.id) {
        await contactQueries.update(initialData.id, {
          ...formData,
          updated_at: new Date().toISOString(),
        });
      } else {
        await contactQueries.create({
          ...formData,
          user_id: userId,
          created_at: new Date().toISOString(),
        });
      }

      toast({
        title: "Success",
        description: `Contact ${initialData?.id ? "updated" : "created"} successfully`,
      });
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving contact:", error);
      toast({
        title: "Error",
        description: `Failed to ${initialData?.id ? "update" : "create"} contact`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Rest of the component remains the same...
}