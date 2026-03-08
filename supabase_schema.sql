
create table public.documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  file_name text not null,
  storage_path text not null,
  category text,
  summary text,
  created_at timestamp with time zone default now()
);
alter table public.documents enable row level security;


CREATE POLICY "Users can insert their own documents"
ON public.documents FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own documents"
ON public.documents FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own documents"
ON public.documents FOR DELETE
TO authenticated
USING (auth.uid() = user_id);


CREATE POLICY "Allow users to upload their own documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'document' AND
  (storage.foldername(name))[1] = auth.uid()::text
);


CREATE POLICY "Allow users to view their own documents"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'document' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Allow users to delete their own documents"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'document' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
