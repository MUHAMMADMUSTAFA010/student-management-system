-- Sample Data for Student Management System
-- Version 1.0 - Initial Seed Data

-- Insert sample school
INSERT INTO schools (id, name, code, address, phone, email, website) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'Greenwood International School', 'GIS001', '123 Education Street, Learning City', '+1-555-0123', 'admin@greenwood.edu', 'https://greenwood.edu');

-- Insert academic year
INSERT INTO academic_years (id, school_id, name, start_date, end_date, is_current) VALUES 
('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', '2024-2025', '2024-09-01', '2025-06-30', true);

-- Insert sample users (Admin, Teachers, Students, Parents)
INSERT INTO users (id, school_id, email, password_hash, role, first_name, last_name, phone, date_of_birth, address) VALUES 
-- Admin
('550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440000', 'admin@greenwood.edu', '$2b$10$hash', 'admin', 'Sarah', 'Johnson', '+1-555-0101', '1980-05-15', '456 Admin Ave'),

-- Teachers
('550e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440000', 'john.smith@greenwood.edu', '$2b$10$hash', 'teacher', 'John', 'Smith', '+1-555-0201', '1985-08-22', '789 Teacher St'),
('550e8400-e29b-41d4-a716-446655440021', '550e8400-e29b-41d4-a716-446655440000', 'mary.davis@greenwood.edu', '$2b$10$hash', 'teacher', 'Mary', 'Davis', '+1-555-0202', '1982-12-10', '321 Educator Blvd'),

-- Students
('550e8400-e29b-41d4-a716-446655440030', '550e8400-e29b-41d4-a716-446655440000', 'alex.wilson@student.greenwood.edu', '$2b$10$hash', 'student', 'Alex', 'Wilson', '+1-555-0301', '2010-03-15', '654 Student Lane'),
('550e8400-e29b-41d4-a716-446655440031', '550e8400-e29b-41d4-a716-446655440000', 'emma.brown@student.greenwood.edu', '$2b$10$hash', 'student', 'Emma', 'Brown', '+1-555-0302', '2009-07-20', '987 Learning Way'),

-- Parents
('550e8400-e29b-41d4-a716-446655440040', '550e8400-e29b-41d4-a716-446655440000', 'robert.wilson@parent.greenwood.edu', '$2b$10$hash', 'parent', 'Robert', 'Wilson', '+1-555-0401', '1975-11-08', '654 Student Lane'),
('550e8400-e29b-41d4-a716-446655440041', '550e8400-e29b-41d4-a716-446655440000', 'lisa.brown@parent.greenwood.edu', '$2b$10$hash', 'parent', 'Lisa', 'Brown', '+1-555-0402', '1978-04-12', '987 Learning Way');

-- Insert subjects
INSERT INTO subjects (id, school_id, name, code, grade_levels) VALUES 
('550e8400-e29b-41d4-a716-446655440050', '550e8400-e29b-41d4-a716-446655440000', 'Mathematics', 'MATH', ARRAY[6,7,8,9,10,11,12]),
('550e8400-e29b-41d4-a716-446655440051', '550e8400-e29b-41d4-a716-446655440000', 'English Literature', 'ENG', ARRAY[6,7,8,9,10,11,12]),
('550e8400-e29b-41d4-a716-446655440052', '550e8400-e29b-41d4-a716-446655440000', 'Science', 'SCI', ARRAY[6,7,8,9,10]),
('550e8400-e29b-41d4-a716-446655440053', '550e8400-e29b-41d4-a716-446655440000', 'History', 'HIST', ARRAY[6,7,8,9,10,11,12]);

-- Insert classes
INSERT INTO classes (id, school_id, academic_year_id, name, grade_level, section, class_teacher_id, room_number) VALUES 
('550e8400-e29b-41d4-a716-446655440060', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001', 'Grade 9A', 9, 'A', '550e8400-e29b-41d4-a716-446655440020', 'Room 101'),
('550e8400-e29b-41d4-a716-446655440061', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001', 'Grade 10B', 10, 'B', '550e8400-e29b-41d4-a716-446655440021', 'Room 102');

-- Insert teacher profiles
INSERT INTO teachers (id, user_id, school_id, employee_id, department, qualification, experience_years, joining_date, subjects_taught) VALUES 
('550e8400-e29b-41d4-a716-446655440070', '550e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440000', 'T001', 'Mathematics', 'M.Sc Mathematics, B.Ed', 8, '2020-08-15', ARRAY['550e8400-e29b-41d4-a716-446655440050']),
('550e8400-e29b-41d4-a716-446655440071', '550e8400-e29b-41d4-a716-446655440021', '550e8400-e29b-41d4-a716-446655440000', 'T002', 'English', 'M.A English Literature, B.Ed', 12, '2018-07-01', ARRAY['550e8400-e29b-41d4-a716-446655440051']);

-- Insert student profiles
INSERT INTO students (id, user_id, school_id, student_id, class_id, admission_date, blood_group) VALUES 
('550e8400-e29b-41d4-a716-446655440080', '550e8400-e29b-41d4-a716-446655440030', '550e8400-e29b-41d4-a716-446655440000', 'S001', '550e8400-e29b-41d4-a716-446655440060', '2023-08-01', 'O+'),
('550e8400-e29b-41d4-a716-446655440081', '550e8400-e29b-41d4-a716-446655440031', '550e8400-e29b-41d4-a716-446655440000', 'S002', '550e8400-e29b-41d4-a716-446655440061', '2022-08-01', 'A+');

-- Insert parent-student relationships
INSERT INTO parent_student_relations (parent_id, student_id, relationship, is_primary) VALUES 
('550e8400-e29b-41d4-a716-446655440040', '550e8400-e29b-41d4-a716-446655440080', 'father', true),
('550e8400-e29b-41d4-a716-446655440041', '550e8400-e29b-41d4-a716-446655440081', 'mother', true);

-- Insert sample assignments
INSERT INTO assignments (id, class_id, subject_id, teacher_id, title, description, due_date, max_marks) VALUES 
('550e8400-e29b-41d4-a716-446655440090', '550e8400-e29b-41d4-a716-446655440060', '550e8400-e29b-41d4-a716-446655440050', '550e8400-e29b-41d4-a716-446655440070', 'Algebra Problem Set', 'Complete exercises 1-20 from Chapter 5', '2024-12-20 23:59:00', 100),
('550e8400-e29b-41d4-a716-446655440091', '550e8400-e29b-41d4-a716-446655440061', '550e8400-e29b-41d4-a716-446655440051', '550e8400-e29b-41d4-a716-446655440071', 'Essay on Shakespeare', 'Write a 500-word essay on Hamlet', '2024-12-25 23:59:00', 50);

-- Insert sample attendance records
INSERT INTO attendance (student_id, class_id, date, status, marked_by) VALUES 
('550e8400-e29b-41d4-a716-446655440080', '550e8400-e29b-41d4-a716-446655440060', '2024-12-01', 'present', '550e8400-e29b-41d4-a716-446655440020'),
('550e8400-e29b-41d4-a716-446655440080', '550e8400-e29b-41d4-a716-446655440060', '2024-12-02', 'present', '550e8400-e29b-41d4-a716-446655440020'),
('550e8400-e29b-41d4-a716-446655440081', '550e8400-e29b-41d4-a716-446655440061', '2024-12-01', 'absent', '550e8400-e29b-41d4-a716-446655440021'),
('550e8400-e29b-41d4-a716-446655440081', '550e8400-e29b-41d4-a716-446655440061', '2024-12-02', 'present', '550e8400-e29b-41d4-a716-446655440021');

-- Insert sample announcements
INSERT INTO announcements (id, school_id, title, content, author_id, target_audience, priority, is_published, published_at) VALUES 
('550e8400-e29b-41d4-a716-446655440100', '550e8400-e29b-41d4-a716-446655440000', 'Winter Break Notice', 'School will be closed from December 23rd to January 2nd for winter break.', '550e8400-e29b-41d4-a716-446655440010', 'all', 'high', true, CURRENT_TIMESTAMP),
('550e8400-e29b-41d4-a716-446655440101', '550e8400-e29b-41d4-a716-446655440000', 'Parent-Teacher Meeting', 'Monthly parent-teacher meetings scheduled for December 15th.', '550e8400-e29b-41d4-a716-446655440010', 'parents', 'normal', true, CURRENT_TIMESTAMP);
