package com.eduforge.repository;

import com.eduforge.model.Attendance;
import com.eduforge.dto.AttendanceSummaryDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.stream.Collectors;

public interface AttendanceRepository extends JpaRepository<Attendance, Integer> {

    @Query(value = """
        SELECT DISTINCT ON (l.subject, sem.name)
          l.subject, sem.name,
          COUNT(*) FILTER (WHERE a.status = 'Present') AS attended,
          COUNT(*)                                       AS total,
          ROUND(
            COUNT(*) FILTER (WHERE a.status = 'Present') * 100.0 /
            NULLIF(COUNT(*), 0)
          , 2)                                            AS percent,
          CASE
            WHEN COUNT(*) FILTER (WHERE a.status = 'Present') * 100.0 /
                 NULLIF(COUNT(*),0) >= MAX(sp.min_attendance_percent)
            THEN '✅ Satisfactory'
            ELSE '❌ Below Required'
          END                                             AS status
        FROM attendance a
        JOIN lecture_schedule l ON a.lecture_id = l.id
        JOIN semester sem         ON l.semester_id = sem.id
        JOIN semester_policy sp   ON sp.semester_id = sem.id
            AND a.date BETWEEN sp.effective_from
                         AND COALESCE(sp.effective_to, CURRENT_DATE)
        WHERE a.student_id = :studentId
        GROUP BY l.subject, sem.name
        """, nativeQuery = true)
    List<Object[]> getAttendanceSummaryByStudentRaw(Integer studentId);

    @Query(value = """
        SELECT u.id, u.name, l.subject,
               COUNT(*) FILTER (WHERE a.status = 'Present')   AS attended,
               COUNT(*)                                       AS total,
               ROUND(
                 COUNT(*) FILTER (WHERE a.status = 'Present') * 100.0 /
                 NULLIF(COUNT(*),0)
               ,2)                                            AS percent,
               CASE
                 WHEN COUNT(*) FILTER (WHERE a.status = 'Present') * 100.0 /
                      NULLIF(COUNT(*),0) >= MAX(sp.min_attendance_percent)
                 THEN '✅ Satisfactory'
                 ELSE '❌ Below Required'
               END                                             AS status
        FROM attendance a
        JOIN lecture_schedule l ON a.lecture_id = l.id
        JOIN users u            ON a.student_id = u.id
        JOIN semester sem       ON l.semester_id = sem.id
        JOIN semester_policy sp ON sp.semester_id = sem.id
            AND a.date BETWEEN sp.effective_from
                         AND COALESCE(sp.effective_to, CURRENT_DATE)
        WHERE l.batch_id = :batchId
        GROUP BY u.id, u.name, l.subject
        """, nativeQuery = true)
    List<Object[]> getBatchAttendanceSummaryRaw(Integer batchId);

    // Default helper to map raw rows into DTOs
    default List<AttendanceSummaryDto> getAttendanceSummaryByStudent(Integer studentId) {
        return getAttendanceSummaryByStudentRaw(studentId).stream()
            .map(row -> new AttendanceSummaryDto(
                (String) row[0],               // subject
                (String) row[1],               // semester
                ((Number) row[2]).longValue(), // attended
                ((Number) row[3]).longValue(), // total
                ((Number) row[4]).doubleValue(),// percent
                (String) row[5]                // status
            ))
            .collect(Collectors.toList());
    }

    default List<AttendanceSummaryDto> getBatchAttendanceSummaryDto(Integer batchId) {
        return getBatchAttendanceSummaryRaw(batchId).stream()
            .map(row -> new AttendanceSummaryDto(
                (String) row[2],               // subject (row[2] here)
                (String) row[1],               // semester (row[1] here)
                ((Number) row[3]).longValue(),
                ((Number) row[4]).longValue(),
                ((Number) row[5]).doubleValue(),
                (String) row[6]
            ))
            .collect(Collectors.toList());
    }
}
