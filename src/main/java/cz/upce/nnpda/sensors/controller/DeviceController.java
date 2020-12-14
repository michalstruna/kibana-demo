package cz.upce.nnpda.sensors.controller;

import cz.upce.nnpda.sensors.exception.ConflictException;
import cz.upce.nnpda.sensors.model.database.Device;
import cz.upce.nnpda.sensors.model.database.User;
import cz.upce.nnpda.sensors.model.dto.NewDevice;
import cz.upce.nnpda.sensors.service.AuthService;
import cz.upce.nnpda.sensors.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@RestController
@RequestMapping("/api/devices")
@CrossOrigin("*")
public class DeviceController {

    @Autowired
    DeviceService deviceService;

    @Autowired
    AuthService authService;

    @GetMapping("")
    public Page<Device> getAll(Pageable pageable) {
        int userId = authService.getCurrentUser().getId();
        return deviceService.getAllByUserId(pageable, userId);
    }

    @PostMapping("")
    public Device add(@RequestBody NewDevice device) {
        User user = authService.getCurrentUser();

        try {
            return deviceService.add(device, user);
        } catch (DataIntegrityViolationException ex) {
            throw new ConflictException("Invalid or already existing device.");
        }
    }

    @PutMapping("/{deviceId}")
    public Device update(@PathVariable("deviceId") int id, @RequestBody NewDevice newDevice) {
        authService.requireUser(deviceService.getById(id).getUser().getId());

        try {
            return deviceService.update(id, newDevice);
        } catch (DataIntegrityViolationException ex) {
            throw new ConflictException("Invalid or already existing device.");
        }
    }

    @DeleteMapping("/{deviceId}")
    public void remove(@PathVariable("deviceId") int id) {
        authService.requireUser(deviceService.getById(id).getUser().getId());
        deviceService.remove(id);
    }

}
