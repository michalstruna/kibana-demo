package cz.upce.nnpda.sensors.service;

import cz.upce.nnpda.sensors.dao.DeviceRepository;
import cz.upce.nnpda.sensors.model.database.Device;
import cz.upce.nnpda.sensors.model.database.User;
import cz.upce.nnpda.sensors.model.dto.NewDevice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class DeviceService {

    @Autowired
    private DeviceRepository deviceRepository;

    public Device getById(int deviceId) {
        return deviceRepository.findById(deviceId).orElse(null);
    }

    public Page<Device> getAllByUserId(Pageable pageable, int userId) {
        return deviceRepository.findAllByUserId(pageable, userId);
    }

    public Device add(NewDevice newDevice, User user) {
        Device device = new Device(newDevice, user);
        return deviceRepository.save(device);
    }

    public void remove(int deviceId) {
        deviceRepository.deleteById(deviceId);
    }

    public Device update(int deviceId, NewDevice device) {
        Device newDevice = deviceRepository.findById(deviceId).orElseThrow(null);
        newDevice.setName(device.getName());
        deviceRepository.save(newDevice);
        return newDevice;
    }

}
