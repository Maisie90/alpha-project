TRUNCATE users RESTART IDENTITY;

INSERT INTO users (username, password, name, role) 
VALUES
('student1', '$2b$10$R8MscPVjfmAVAZCzt35.4.nBHt/Rh0FlE02CY69ig5PDIE6GQrvDW', 'Student One', 'student'),
('teacher1', '$2b$10$gon7MqMFRIfSmyconbXor.odum8L8fP8U7j8BbrF/KHQlvQj9HiCe', 'Teacher One', 'teacher');