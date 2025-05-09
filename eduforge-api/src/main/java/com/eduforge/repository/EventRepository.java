// eduforge-api/src/main/java/com/eduforge/repository/EventRepository.java
package com.eduforge.repository;
import com.eduforge.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Integer> { }
