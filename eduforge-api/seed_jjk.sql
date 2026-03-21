-- 1) Semesters
INSERT INTO semester (id, name, start_date, end_date)
VALUES
  (1, 'JJK Training 1', '2025-01-01', '2025-06-01'),
  (2, 'JJK Training 2', '2025-07-01', '2025-12-01');

-- 2) Batches (classes of sorcerers)
INSERT INTO batch (id, name, semester_id)
VALUES
  (1, 'Tokyo 1st-Year', 1),
  (2, 'Tokyo 2nd-Year', 2);

-- 3) Users
INSERT INTO users (id, username, password, role, profile_image_url, batch_id)
VALUES
  (1, 'itadori',  'sukuna', 'STUDENT', NULL, 1),
  (2, 'fushiguro','megumi', 'STUDENT', NULL, 1),
  (3, 'nobara',   'hammer', 'STUDENT', NULL, 1),
  (4, 'gojo',     'limitless','FACULTY', NULL, NULL);

-- 4) Profiles
INSERT INTO student_profile (id, user_id, first_name, last_name, email)
VALUES
  (1, 1, 'Yuji', 'Itadori',      'yuji@jjk.edu'),
  (2, 2, 'Megumi','Fushiguro',   'megumi@jjk.edu'),
  (3, 3, 'Nobara','Kugisaki',    'nobara@jjk.edu');

INSERT INTO faculty_profile (id, user_id, first_name, last_name, email)
VALUES
  (1, 4, 'Satoru','Gojo',        'gojo@jjk.edu');

-- 5) Slots (courses / techniques)
INSERT INTO slot (id, course_name, faculty_id, start_time)
VALUES
  (1, 'Black Flash Training',     4, '2025-01-05 08:00'),
  (2, 'Domain Expansion Basics',  4, '2025-01-05 10:00'),
  (3, 'Cursed Energy Control',    4, '2025-01-06 08:00');

-- 6) Lecture schedule
INSERT INTO lecture_schedule (id, subject, location, slot, day_of_week)
VALUES
  (1, 'Black Flash Training',    'Dojo A', 1, 'MONDAY'),
  (2, 'Domain Expansion Basics', 'Dojo B', 2, 'WEDNESDAY'),
  (3, 'Cursed Energy Control',   'Dojo A', 3, 'FRIDAY');

-- 7) Timetable entries (student schedules)
INSERT INTO timetable_entries (id, student_id, day_of_week, slot_id)
VALUES
  (1, 1, 'MONDAY',    1),  -- Yuji
  (2, 1, 'WEDNESDAY', 2),
  (3, 2, 'FRIDAY',    3),  -- Megumi
  (4, 3, 'MONDAY',    1);  -- Nobara

-- 8) Events (school events)
INSERT INTO events (id, title, description, location, start_time, end_time)
VALUES
  (1, 'Cursed Spirit Hunt', 'Field training exercise', 'Shibuya', '2025-02-01 09:00', '2025-02-01 17:00'),
  (2, 'Tea with Gojo',      'Casual Q&A',           'Faculty Lounge', '2025-02-03 15:00', '2025-02-03 16:00');

-- 9) Event registrations
INSERT INTO event_registrations (id, event_id, user_id, registered_at)
VALUES
  (1, 1, 1, NOW()),  -- Yuji signs up
  (2, 1, 2, NOW()),  -- Megumi signs up
  (3, 2, 3, NOW());  -- Nobara signs up

-- 10) Attendance
INSERT INTO attendance (id, student_id, lecture_schedule_id, status, timestamp)
VALUES
  (1, 1, 1, 'PRESENT',  '2025-01-05 08:02'),
  (2, 2, 3, 'PRESENT',  '2025-01-06 08:01'),
  (3, 3, 1, 'ABSENT',   '2025-01-05 08:00');

-- 11) Semester policy
INSERT INTO semester_policy (id, semester_id, policy_name)
VALUES
  (1, 1, 'Maintain 80% attendance to graduate');

