package cz.upce.nnpda.sensors.model.database;

import com.fasterxml.jackson.annotation.JsonIgnore;
import cz.upce.nnpda.sensors.model.SensorType;
import cz.upce.nnpda.sensors.model.dto.NewSensor;

import javax.persistence.*;

@Entity(name = "sensor")
public class Sensor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, length = 100)
    private String name;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="device_id", nullable=false)
    private Device device;

    @Column(nullable = false)
    private String type;

    public Sensor() {
    }

    public Sensor(String name) {
        this.name = name;
    }

    public Sensor(NewSensor newSensor, Device device) {
        this.name = newSensor.getName();
        this.type = newSensor.getType();
        this.device = device;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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
