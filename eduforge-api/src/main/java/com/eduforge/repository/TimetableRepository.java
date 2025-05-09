// src/main/java/com/eduforge/repository/TimetableRepository.java
package com.eduforge.repository;

import com.eduforge.model.TimetableEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TimetableRepository extends JpaRepository<TimetableEntry, Integer> {
    /**
     * Fetch all entries for a faculty member, sorted by day & slot.
     */
    List<TimetableEntry> findByCreatedBy_IdOrderByDayOfWeekAscSlotAsc(Integer facultyId);
    List<TimetableEntry> findByCreatedBy_Id(Integer facultyId);

}
