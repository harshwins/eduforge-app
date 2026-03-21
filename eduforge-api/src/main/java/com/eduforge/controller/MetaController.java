package com.eduforge.controller;

import com.eduforge.model.Batch;
import com.eduforge.model.Semester;
import com.eduforge.repository.BatchRepository;
import com.eduforge.repository.SemesterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MetaController {

    @Autowired
    private BatchRepository batchRepository;

    @Autowired
    private SemesterRepository semesterRepository;

    @GetMapping("/batches")
    public List<Batch> getAllBatches() {
        return batchRepository.findAll();
    }

    @GetMapping("/semesters")
    public List<Semester> getAllSemesters() {
        return semesterRepository.findAll();
    }
}
