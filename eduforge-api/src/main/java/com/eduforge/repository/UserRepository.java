// eduforge-api/src/main/java/com/eduforge/repository/UserRepository.java
package com.eduforge.repository;
import com.eduforge.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
  List<User> findByRole(String role);
  Optional<User> findByEmail(String email);
  List<User> findAllByBatch_Id(Integer batchId);
}
