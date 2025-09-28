-- Fix RLS policies for remaining tables

-- RLS Policies for fee_categories
CREATE POLICY "School users can access fee categories" ON public.fee_categories
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.school_id = fee_categories.school_id
        )
    );

-- RLS Policies for fee_records  
CREATE POLICY "School users can access fee records" ON public.fee_records
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.students s
            JOIN public.classes c ON s.class_id = c.id
            JOIN public.profiles p ON p.school_id = c.school_id
            WHERE p.id = auth.uid() 
            AND s.id = fee_records.student_id
        )
    );

-- RLS Policies for exams
CREATE POLICY "School users can access exams" ON public.exams
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.school_id = exams.school_id
        )
    );

-- RLS Policies for exam_results
CREATE POLICY "School users can access exam results" ON public.exam_results
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.students s
            JOIN public.classes c ON s.class_id = c.id
            JOIN public.profiles p ON p.school_id = c.school_id
            WHERE p.id = auth.uid() 
            AND s.id = exam_results.student_id
        )
    );

-- RLS Policies for timetable
CREATE POLICY "School users can access timetable" ON public.timetable
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.classes c
            JOIN public.profiles p ON p.school_id = c.school_id
            WHERE p.id = auth.uid() 
            AND c.id = timetable.class_id
        )
    );

-- RLS Policies for enquiries
CREATE POLICY "School users can access enquiries" ON public.enquiries
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.school_id = enquiries.school_id
        )
    );

-- Fix function search path issue
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql 
   SECURITY DEFINER 
   SET search_path = public;