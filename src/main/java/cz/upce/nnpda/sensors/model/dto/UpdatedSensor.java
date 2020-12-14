package cz.upce.nnpda.sensors.model.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import cz.upce.nnpda.sensors.model.database.Device;

public class UpdatedSensor {

    protected String name;
    private int deviceId;

    @JsonIgnore
    private Device device;

    public UpdatedSensor() {

    }

    public UpdatedSensor(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Device getDevice() {
        return device;
    }

    public void setDevice(Device device) {
        this.device = device;
    }

    public int getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(int deviceId) {
        this.deviceId = deviceId;
    }
}
