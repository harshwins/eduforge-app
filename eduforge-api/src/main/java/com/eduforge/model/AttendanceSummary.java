package com.eduforge.model;

public class AttendanceSummary {
    private String subject;
    private String semester;
    private long attended;
    private long total;
    private double percent;
    private String status;

    public AttendanceSummary() {}

    public AttendanceSummary(String subject, String semester, long attended, long total, double percent, String status) {
        this.subject   = subject;
        this.semester  = semester;
        this.attended  = attended;
        this.total     = total;
        this.percent   = percent;
        this.status    = status;
    }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public String getSemester() { return semester; }
    public void setSemester(String semester) { this.semester = semester; }

    public long getAttended() { return attended; }
    public void setAttended(long attended) { this.attended = attended; }

    public long getTotal() { return total; }
    public void setTotal(long total) { this.total = total; }

    public double getPercent() { return percent; }
    public void setPercent(double percent) { this.percent = percent; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
