-- Add DELETE policy for debates table
-- Only allow creators to delete their own debates
CREATE POLICY "Users can delete their own debates"
  ON debates FOR DELETE
  USING (auth.uid() = created_by);
