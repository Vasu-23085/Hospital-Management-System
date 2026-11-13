
package com.hospital.management.service;

import com.hospital.management.entity.MedicalRecord;
import com.hospital.management.repository.MedicalRecordRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicalRecordService {

    private final MedicalRecordRepository repository;

    public MedicalRecordService(MedicalRecordRepository repository) {
        this.repository = repository;
    }

    public List<MedicalRecord> getAllRecords() {
        return repository.findAll();
    }

    public MedicalRecord addRecord(MedicalRecord record) {
        return repository.save(record);
    }
}
