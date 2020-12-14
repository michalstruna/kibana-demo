package cz.upce.nnpda.sensors.model;

public enum SensorType {
    THERMOMETER("°C"), // Teploměr, unit °C
    ANEMOMETER("m/s"), // Větroměr, unit m/s
    BAROMETER("Pa"), // Tlakoměr, unit Pa
    HYGROMETER("%"); // Vlhkoměr, unit %

    private String unit;

    private SensorType(String unit) {
        this.unit = unit;
    }

    public String getUnit() {
        return unit;
    }

}