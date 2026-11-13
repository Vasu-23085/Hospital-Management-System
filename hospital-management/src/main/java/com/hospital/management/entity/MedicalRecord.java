
package com.hospital.management.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Medical_Records")
public class MedicalRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "record_id")
    private Integer recordId;

    @Column(name = "appointment_id", nullable = false, unique = true)
    private Integer appointmentId;

    @Column(name = "diagnosis", nullable = false)
    private String diagnosis;

    @Column(name = "treatment")
    private String treatment;

    @Column(name = "notes")
    private String notes;

    @Column(name = "record_date", insertable = false, updatable = false)
    private LocalDateTime recordDate;

    public MedicalRecord() {}

    public Integer getRecordId() { return recordId; }
    public void setRecordId(Integer recordId) { this.recordId = recordId; }

    public Integer getAppointmentId() { return appointmentId; }
    public void setAppointmentId(Integer appointmentId) { this.appointmentId = appointmentId; }

    public String getDiagnosis() { return diagnosis; }
    public void setDiagnosis(String diagnosis) { this.diagnosis = diagnosis; }

    public String getTreatment() { return treatment; }
    public void setTreatment(String treatment) { this.treatment = treatment; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public LocalDateTime getRecordDate() { return recordDate; }
}
