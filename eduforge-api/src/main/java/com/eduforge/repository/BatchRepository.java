// src/main/java/com/eduforge/repository/BatchRepository.java
package com.eduforge.repository;

import com.eduforge.model.Batch;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BatchRepository extends JpaRepository<Batch,Integer> {}
