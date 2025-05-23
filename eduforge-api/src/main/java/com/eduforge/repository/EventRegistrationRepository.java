// eduforge-api/src/main/java/com/eduforge/repository/EventRegistrationRepository.java
package com.eduforge.repository;
import com.eduforge.model.EventRegistration;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EventRegistrationRepository extends JpaRepository<EventRegistration, Integer> {
  List<EventRegistration> findByEvent_Id(Integer eventId);
  List<EventRegistration> findByStudent_Id(Integer studentId);
  List<EventRegistration> findByAcceptedFalse();
}
