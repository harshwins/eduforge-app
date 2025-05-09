// src/main/java/com/eduforge/repository/SemesterRepository.java
package com.eduforge.repository;

import com.eduforge.model.Semester;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface SemesterRepository extends JpaRepository<Semester, Integer> {
    /** find the semester(s) that cover a given date */
    List<Semester> findByStartDateLessThanEqualAndEndDateGreaterThanEqual(LocalDate onOrBefore, LocalDate onOrAfter);
}
