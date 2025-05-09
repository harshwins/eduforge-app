// eduforge-api/src/main/java/com/eduforge/repository/SlotRepository.java
package com.eduforge.repository;
import com.eduforge.model.Slot;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SlotRepository extends JpaRepository<Slot, Long> {
  List<Slot> findByFacultyId(Long facultyId);
}
