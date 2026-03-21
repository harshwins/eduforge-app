package com.eduforge.repository;

import com.eduforge.model.StudentProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentProfileRepository extends JpaRepository<StudentProfile, Integer> {

    // Fetch all profiles belonging to a specific batch
    List<StudentProfile> findByBatchId(Integer batchId);

}
