// src/main/java/com/eduforge/dto/CreateLectureRequest.java
package com.eduforge.dto;

import java.time.LocalTime;

public class CreateLectureRequest {
    private String   dayOfWeek;
    private Integer  slot;
    private LocalTime startTime;
    private LocalTime endTime;
    private String   subject;
    private String   location;
    private Integer  facultyId;
    private Integer  batchId;
    private Integer  semesterId;

    public CreateLectureRequest() {
    }

    public CreateLectureRequest(
        String dayOfWeek,
        Integer slot,
        LocalTime startTime,
        LocalTime endTime,
        String subject,
        String location,
        Integer facultyId,
        Integer batchId,
        Integer semesterId
    ) {
        this.dayOfWeek  = dayOfWeek;
        this.slot       = slot;
        this.startTime  = startTime;
        this.endTime    = endTime;
        this.subject    = subject;
        this.location   = location;
        this.facultyId  = facultyId;
        this.batchId    = batchId;
        this.semesterId = semesterId;
    }

    public String getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(String dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public Integer getSlot() {
        return slot;
    }

    public void setSlot(Integer slot) {
        this.slot = slot;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Integer getFacultyId() {
        return facultyId;
    }

    public void setFacultyId(Integer facultyId) {
        this.facultyId = facultyId;
    }

    public Integer getBatchId() {
        return batchId;
    }

    public void setBatchId(Integer batchId) {
        this.batchId = batchId;
    }

    public Integer getSemesterId() {
        return semesterId;
    }

    public void setSemesterId(Integer semesterId) {
        this.semesterId = semesterId;
    }
}
