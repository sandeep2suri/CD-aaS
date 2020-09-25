package com.incedo.app.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.incedo.app.domain.Employee;
import com.incedo.app.domain.Team;

/**
 * Spring Data  repository for the Employee entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    @Query("select employee from Employee employee where employee.manager.login = ?#{principal.username}")
    Page<Employee> findByManagerIsCurrentUser(Pageable pageable);
    
    List<Employee> findAllByTeamId(Long id);
    

}
