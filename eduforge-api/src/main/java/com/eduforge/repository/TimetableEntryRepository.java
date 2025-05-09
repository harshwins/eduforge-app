// src/main/java/com/eduforge/repository/TimetableEntryRepository.java
package com.eduforge.repository;

import com.eduforge.model.TimetableEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TimetableEntryRepository
    extends JpaRepository<TimetableEntry,Integer> {

    // find all timetable entries created by this faculty member
    List<TimetableEntry> findByCreatedBy_Id(Integer facultyId);
}
