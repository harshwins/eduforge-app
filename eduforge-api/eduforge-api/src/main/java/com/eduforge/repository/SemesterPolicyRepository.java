// src/main/java/com/eduforge/repository/SemesterPolicyRepository.java
package com.eduforge.repository;

import com.eduforge.model.SemesterPolicy;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface SemesterPolicyRepository extends JpaRepository<SemesterPolicy, Integer> {
    /** all policies for a semester */
    List<SemesterPolicy> findBySemester_Id(Integer semesterId);

    /** policies active at a given date */
    List<SemesterPolicy> findBySemester_IdAndEffectiveFromLessThanEqualAndEffectiveToGreaterThanEqual(
        Integer semesterId, LocalDate from, LocalDate to
    );
}
