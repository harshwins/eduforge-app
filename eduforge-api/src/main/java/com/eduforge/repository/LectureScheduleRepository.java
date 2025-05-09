// eduforge-api/src/main/java/com/eduforge/repository/LectureScheduleRepository.java
package com.eduforge.repository;
import com.eduforge.model.LectureSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LectureScheduleRepository extends JpaRepository<LectureSchedule, Integer> {
  List<LectureSchedule> findByFaculty_Id(Integer facultyId);
  List<LectureSchedule> findByBatch_Id(Integer batchId);
}
