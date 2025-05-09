package com.eduforge.model;

public class BatchAttendanceSummary {
    private Integer studentId;
    private String name;
    private String subject;
    private int attended;
    private int total;
    private double percent;
    private String status;

    public BatchAttendanceSummary() {}

    public BatchAttendanceSummary(Integer studentId, String name, String subject, int attended, int total, double percent, String status) {
        this.studentId = studentId;
        this.name      = name;
        this.subject   = subject;
        this.attended  = attended;
        this.total     = total;
        this.percent   = percent;
        this.status    = status;
    }

    public Integer getStudentId() { return studentId; }
    public void setStudentId(Integer studentId) { this.studentId = studentId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public int getAttended() { return attended; }
    public void setAttended(int attended) { this.attended = attended; }

    public int getTotal() { return total; }
    public void setTotal(int total) { this.total = total; }

    public double getPercent() { return percent; }
    public void setPercent(double percent) { this.percent = percent; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
