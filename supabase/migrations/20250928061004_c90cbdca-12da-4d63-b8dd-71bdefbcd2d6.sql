-- Core school management database schema

-- Schools table
CREATE TABLE public.schools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL,
    address TEXT,
    phone TEXT,
    email TEXT,
    logo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- User roles enum
CREATE TYPE public.user_role AS ENUM ('school_admin', 'teacher', 'student', 'parent', 'staff');

-- User profiles
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
    role user_role NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    address TEXT,
    date_of_birth DATE,
    gender TEXT CHECK (gender IN ('male', 'female', 'other')),
    profile_picture_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Classes/Grades
CREATE TABLE public.classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    section TEXT,
    academic_year TEXT NOT NULL,
    class_teacher_id UUID REFERENCES public.profiles(id),
    capacity INTEGER DEFAULT 40,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Subjects
CREATE TABLE public.subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    code TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Students table (extends profiles)
CREATE TABLE public.students (
    id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    student_id TEXT UNIQUE NOT NULL,
    class_id UUID REFERENCES public.classes(id),
    admission_date DATE DEFAULT CURRENT_DATE,
    roll_number TEXT,
    parent_id UUID REFERENCES public.profiles(id),
    blood_group TEXT,
    emergency_contact TEXT,
    medical_conditions TEXT
);

-- Teachers table (extends profiles)
CREATE TABLE public.teachers (
    id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    employee_id TEXT UNIQUE NOT NULL,
    department TEXT,
    qualification TEXT,
    experience_years INTEGER DEFAULT 0,
    joining_date DATE DEFAULT CURRENT_DATE,
    salary DECIMAL(10,2)
);

-- Attendance
CREATE TABLE public.attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    status TEXT CHECK (status IN ('present', 'absent', 'late', 'excused')),
    marked_by UUID REFERENCES public.profiles(id),
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(student_id, date)
);

-- Fee categories
CREATE TABLE public.fee_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    amount DECIMAL(10,2) NOT NULL,
    frequency TEXT CHECK (frequency IN ('monthly', 'quarterly', 'yearly', 'one_time')),
    is_mandatory BOOLEAN DEFAULT true
);

-- Fee records
CREATE TABLE public.fee_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    fee_category_id UUID REFERENCES public.fee_categories(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    due_date DATE NOT NULL,
    paid_date DATE,
    status TEXT CHECK (status IN ('pending', 'paid', 'overdue', 'partial')) DEFAULT 'pending',
    payment_method TEXT,
    transaction_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Exams
CREATE TABLE public.exams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT CHECK (type IN ('monthly', 'quarterly', 'half_yearly', 'annual')),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    academic_year TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Exam results
CREATE TABLE public.exam_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exam_id UUID REFERENCES public.exams(id) ON DELETE CASCADE,
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES public.subjects(id) ON DELETE CASCADE,
    marks_obtained DECIMAL(5,2),
    total_marks DECIMAL(5,2),
    grade TEXT,
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(exam_id, student_id, subject_id)
);

-- Timetable
CREATE TABLE public.timetable (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES public.subjects(id) ON DELETE CASCADE,
    teacher_id UUID REFERENCES public.teachers(id) ON DELETE CASCADE,
    day_of_week INTEGER CHECK (day_of_week BETWEEN 1 AND 7),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    room_number TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enquiries
CREATE TABLE public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
    student_name TEXT NOT NULL,
    parent_name TEXT NOT NULL,
    parent_phone TEXT NOT NULL,
    parent_email TEXT,
    class_interested TEXT NOT NULL,
    enquiry_date DATE DEFAULT CURRENT_DATE,
    status TEXT CHECK (status IN ('new', 'contacted', 'visited', 'admitted', 'rejected')) DEFAULT 'new',
    remarks TEXT,
    follow_up_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fee_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fee_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timetable ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- RLS Policies for school-based access
CREATE POLICY "Users can access their school data" ON public.schools
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.school_id = schools.id
        )
    );

CREATE POLICY "Users can access their school profiles" ON public.profiles
    FOR ALL USING (
        auth.uid() = id OR 
        EXISTS (
            SELECT 1 FROM public.profiles p 
            WHERE p.id = auth.uid() 
            AND p.school_id = profiles.school_id
        )
    );

-- Similar policies for other tables
CREATE POLICY "School users can access classes" ON public.classes
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.school_id = classes.school_id
        )
    );

CREATE POLICY "School users can access subjects" ON public.subjects
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.school_id = subjects.school_id
        )
    );

CREATE POLICY "School users can access students" ON public.students
    FOR ALL USING (
        auth.uid() = id OR
        EXISTS (
            SELECT 1 FROM public.profiles p
            JOIN public.classes c ON p.school_id = c.school_id
            WHERE p.id = auth.uid() 
            AND students.class_id = c.id
        )
    );

CREATE POLICY "School users can access teachers" ON public.teachers
    FOR ALL USING (
        auth.uid() = id OR
        EXISTS (
            SELECT 1 FROM public.profiles p1
            JOIN public.profiles p2 ON p1.school_id = p2.school_id
            WHERE p1.id = auth.uid() 
            AND p2.id = teachers.id
        )
    );

CREATE POLICY "School users can access attendance" ON public.attendance
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.students s
            JOIN public.classes c ON s.class_id = c.id
            JOIN public.profiles p ON p.school_id = c.school_id
            WHERE p.id = auth.uid() 
            AND s.id = attendance.student_id
        )
    );

-- Trigger for updating timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_schools_updated_at
    BEFORE UPDATE ON public.schools
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default data
INSERT INTO public.schools (id, name, code, address, phone, email) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Demo High School', 'DHS001', '123 Education Street, City', '+1234567890', 'admin@demohighschool.edu');

INSERT INTO public.fee_categories (school_id, name, description, amount, frequency) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Tuition Fee', 'Monthly tuition fee', 5000.00, 'monthly'),
('550e8400-e29b-41d4-a716-446655440000', 'Library Fee', 'Annual library fee', 1000.00, 'yearly'),
('550e8400-e29b-41d4-a716-446655440000', 'Sports Fee', 'Annual sports fee', 500.00, 'yearly'),
('550e8400-e29b-41d4-a716-446655440000', 'Lab Fee', 'Science lab fee', 1500.00, 'yearly');

INSERT INTO public.subjects (school_id, name, code) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Mathematics', 'MATH'),
('550e8400-e29b-41d4-a716-446655440000', 'English', 'ENG'),
('550e8400-e29b-41d4-a716-446655440000', 'Science', 'SCI'),
('550e8400-e29b-41d4-a716-446655440000', 'Social Studies', 'SS'),
('550e8400-e29b-41d4-a716-446655440000', 'Computer Science', 'CS'),
('550e8400-e29b-41d4-a716-446655440000', 'Physical Education', 'PE');