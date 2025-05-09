package com.eduforge.repository;

import com.eduforge.model.LectureSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LectureScheduleRepository extends JpaRepository<LectureSchedule, Integer> {
    // this lets Spring Data JPA auto-implement findByFaculty_Id(...)
    List<LectureSchedule> findByFaculty_Id(Integer facultyId);

    // likewise for batch
    List<LectureSchedule> findByBatch_Id(Integer batchId);
}
