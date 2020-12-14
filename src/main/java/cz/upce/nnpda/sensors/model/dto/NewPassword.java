package cz.upce.nnpda.sensors.model.dto;

public class NewPassword {

    private String password;
    private String oldPassword;

    public NewPassword() {

    }

    public NewPassword(String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }
}
