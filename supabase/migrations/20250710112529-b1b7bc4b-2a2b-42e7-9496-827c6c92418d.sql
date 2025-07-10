-- Create storage buckets for study materials
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('study-documents', 'study-documents', false),
  ('study-images', 'study-images', false),
  ('study-videos', 'study-videos', false);

-- Create storage policies for study documents
CREATE POLICY "Users can view their own study documents" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'study-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload their own study documents" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'study-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own study documents" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'study-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own study documents" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'study-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create storage policies for study images
CREATE POLICY "Users can view their own study images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'study-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload their own study images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'study-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own study images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'study-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own study images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'study-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create storage policies for study videos
CREATE POLICY "Users can view their own study videos" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'study-videos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload their own study videos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'study-videos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own study videos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'study-videos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own study videos" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'study-videos' AND auth.uid()::text = (storage.foldername(name))[1]);