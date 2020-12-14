package cz.upce.nnpda.sensors.model.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import cz.upce.nnpda.sensors.model.SensorType;
import cz.upce.nnpda.sensors.model.database.Device;

public class NewSensor {

    protected String name;

    @JsonIgnore
    private Device device;

    private String type;

    public NewSensor() {

    }

    public NewSensor(String name, String type) {
        this.name = name;
        this.type = type;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
