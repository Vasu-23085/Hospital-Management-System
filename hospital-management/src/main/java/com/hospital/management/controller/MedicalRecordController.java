
package com.hospital.management.controller;

import com.hospital.management.entity.MedicalRecord;
import com.hospital.management.service.MedicalRecordService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medical-records")
@CrossOrigin(origins = "*")
public class MedicalRecordController {

    private final MedicalRecordService service;

    public MedicalRecordController(MedicalRecordService service) {
        this.service = service;
    }

    @GetMapping
    public List<MedicalRecord> getAllRecords() {
        return service.getAllRecords();
    }

    @PostMapping
    public MedicalRecord addRecord(@RequestBody MedicalRecord record) {
        return service.addRecord(record);
    }
}
