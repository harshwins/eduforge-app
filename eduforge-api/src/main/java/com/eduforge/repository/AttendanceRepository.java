package com.eduforge.repository;

import com.eduforge.dto.AttendanceSummaryDto;
import com.eduforge.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.stream.Collectors;

public interface AttendanceRepository extends JpaRepository<Attendance, Integer> {

    // ============================================================
    // 🔹 STUDENT SUMMARY (Subject-wise)
    // ============================================================

    @Query(value = """
        SELECT
            te.subject,
            sem.name,
            COUNT(*) FILTER (WHERE a.status = 'Present') AS attended,
            COUNT(*)                                     AS total,
            ROUND(
                COUNT(*) FILTER (WHERE a.status = 'Present') * 100.0 /
                NULLIF(COUNT(*), 0), 2
            )                                            AS percent,
            CASE
                WHEN COUNT(*) FILTER (WHERE a.status = 'Present') * 100.0 /
                     NULLIF(COUNT(*), 0) >= MAX(sp.min_attendance_percent)
                THEN '✅ Satisfactory'
                ELSE '❌ Below Required'
            END AS status
        FROM attendance a
        JOIN timetable_entries te ON a.timetable_entry_id = te.id
        JOIN semester sem         ON te.semester_id = sem.id
        JOIN semester_policy sp   ON sp.semester_id = sem.id
            AND a.date BETWEEN sp.effective_from
                          AND COALESCE(sp.effective_to, CURRENT_DATE)
        WHERE a.student_id = :studentId
        GROUP BY te.subject, sem.name
        """, nativeQuery = true)
    List<Object[]> getAttendanceSummaryByStudentRaw(Integer studentId);


    // ============================================================
    // 🔹 BATCH SUMMARY (Admin / Faculty dashboard)
    // ============================================================

    @Query(value = """
        SELECT
            u.id,
            u.name,
            te.subject,
            COUNT(*) FILTER (WHERE a.status = 'Present') AS attended,
            COUNT(*)                                     AS total,
            ROUND(
                COUNT(*) FILTER (WHERE a.status = 'Present') * 100.0 /
                NULLIF(COUNT(*), 0), 2
            )                                            AS percent,
            CASE
                WHEN COUNT(*) FILTER (WHERE a.status = 'Present') * 100.0 /
                     NULLIF(COUNT(*), 0) >= MAX(sp.min_attendance_percent)
                THEN '✅ Satisfactory'
                ELSE '❌ Below Required'
            END AS status
        FROM attendance a
        JOIN timetable_entries te ON a.timetable_entry_id = te.id
        JOIN users u              ON a.student_id = u.id
        JOIN semester sem         ON te.semester_id = sem.id
        JOIN semester_policy sp   ON sp.semester_id = sem.id
            AND a.date BETWEEN sp.effective_from
                          AND COALESCE(sp.effective_to, CURRENT_DATE)
        WHERE te.batch_id = :batchId
        GROUP BY u.id, u.name, te.subject
        """, nativeQuery = true)
    List<Object[]> getBatchAttendanceSummaryRaw(Integer batchId);


    // ============================================================
    // 🔹 CONVERT RAW → DTO (Student)
    // ============================================================

    default List<AttendanceSummaryDto> getAttendanceSummaryByStudent(Integer studentId) {
        return getAttendanceSummaryByStudentRaw(studentId).stream()
            .map(row -> new AttendanceSummaryDto(
                (String) row[0],                 // subject
                (String) row[1],                 // semester
                ((Number) row[2]).longValue(),   // attended
                ((Number) row[3]).longValue(),   // total
                ((Number) row[4]).doubleValue(), // percent
                (String) row[5]                  // status
            ))
            .collect(Collectors.toList());
    }


    // ============================================================
    // 🔹 CONVERT RAW → DTO (Batch)
    // ============================================================

    default List<AttendanceSummaryDto> getBatchAttendanceSummaryDto(Integer batchId) {
        return getBatchAttendanceSummaryRaw(batchId).stream()
            .map(row -> new AttendanceSummaryDto(
                (String) row[2],                 // subject
                (String) row[1],                 // semester / name
                ((Number) row[3]).longValue(),   // attended
                ((Number) row[4]).longValue(),   // total
                ((Number) row[5]).doubleValue(), // percent
                (String) row[6]                  // status
            ))
            .collect(Collectors.toList());
    }
}