TRUNCATE users RESTART IDENTITY;

INSERT INTO users (username, password, name, role) 
VALUES
('teacher1', 'teacher1pass', 'Teacher One', 'teacher'),
('student1', 'student1pass', 'Student One', 'student'),
('student2', 'student2pass', 'Student Two', 'student');

