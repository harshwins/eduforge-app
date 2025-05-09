// src/main/java/com/eduforge/repository/EventRepository.java
package com.eduforge.repository;

import com.eduforge.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Integer> {
    // if you ever need custom queries, add them here
    // e.g. List<Event> findByCreatedBy_Id(Integer facultyId);
}
