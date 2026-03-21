package com.eduforge.repository;

import com.eduforge.model.TimetableEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TimetableEntryRepository
        extends JpaRepository<TimetableEntry, Integer> {

    // ---------- FACULTY TIMETABLE ----------
    List<TimetableEntry> findByFaculty_Id(Integer facultyId);

    // ---------- STUDENT TIMETABLE ----------
    List<TimetableEntry> findByBatch_IdAndSemester_Id(
            Integer batchId,
            Integer semesterId
    );
}