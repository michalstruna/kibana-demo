package cz.upce.nnpda.sensors.controller;

import cz.upce.nnpda.sensors.exception.ConflictException;
import cz.upce.nnpda.sensors.exception.ForbiddenException;
import cz.upce.nnpda.sensors.exception.NotFoundException;
import cz.upce.nnpda.sensors.model.UserRole;
import cz.upce.nnpda.sensors.model.database.Device;
import cz.upce.nnpda.sensors.model.database.MeasuredValue;
import cz.upce.nnpda.sensors.model.database.Sensor;
import cz.upce.nnpda.sensors.model.dto.NewSensor;
import cz.upce.nnpda.sensors.model.dto.UpdatedSensor;
import cz.upce.nnpda.sensors.service.AuthService;
import cz.upce.nnpda.sensors.service.DeviceService;
import cz.upce.nnpda.sensors.service.SensorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class SensorController {

    @Autowired
    SensorService sensorService;

    @Autowired
    private DeviceService deviceService;

    @Autowired
    private AuthService authService;

    @GetMapping("/devices/{deviceId}/sensors")
    public Page<Sensor> getAllByDevice(Pageable pageable, @PathVariable("deviceId") int deviceId) {
        Device device = requireAndGetDevice(deviceId);
        authService.requireUser(device.getUser().getId());
        return sensorService.getAllByDeviceId(pageable, deviceId);
    }

    @PostMapping("/devices/{deviceId}/sensors")
    public Sensor add(@PathVariable("deviceId") int deviceId, @RequestBody NewSensor sensor) {
        Device device = requireAndGetDevice(deviceId);
        authService.requireUser(device.getUser().getId());

        try {
            return sensorService.add(sensor, device);
        } catch (DataIntegrityViolationException ex) {
            ex.printStackTrace();
            throw new ConflictException("Invalid or already existing sensor.");
        }
    }

    @PutMapping("/sensors/{sensorId}")
    public Sensor update(@PathVariable("sensorId") int id, @RequestBody UpdatedSensor newSensor) {
        requireUser(id);
        Device device = requireAndGetDevice(newSensor.getDeviceId());
        newSensor.setDevice(device);

        try {
            return sensorService.update(id, newSensor);
        } catch (DataIntegrityViolationException ex) {
            throw new ConflictException("Invalid or already existing sensor.");
        }

    }

    @DeleteMapping("sensors/{sensorId}")
    public void remove(@PathVariable("sensorId") int id) {
        requireUser(id);
        sensorService.remove(id);
    }

    @PostMapping("/sensors/data")
    public void measureAll(@RequestParam int count) {
        if (authService.getCurrentUser().getRole() != UserRole.ADMIN.getValue()) {
            throw new ForbiddenException("Only admin can generate data.");
        }

        sensorService.measureAll(count);
    }

    @GetMapping("/sensors/{sensorId}/data")
    public Page<MeasuredValue> getMeasuredData(Pageable pageable, @PathVariable("sensorId") int sensorId) {
        requireUser(sensorId);
        authService.requireRole(UserRole.ADMIN);
        return sensorService.getMeasuredValues(pageable, sensorId);
    }

    private void requireUser(int sensorId) {
        Sensor sensor = sensorService.getById(sensorId);

        if (sensor == null) {
            throw new NotFoundException("Sensor with id " + sensorId + " was not found.");
        }

        Device device = deviceService.getById(sensor.getDevice().getId());
        authService.requireUser(device.getUser().getId());
    }

    private Device requireAndGetDevice(int deviceId) {
        Device device = deviceService.getById(deviceId);

        if (device == null) {
            throw new NotFoundException("Device with id " + deviceId + " was not found.");
        }

        return device;
    }

}
