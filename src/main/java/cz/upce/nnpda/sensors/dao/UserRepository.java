package cz.upce.nnpda.sensors.dao;

import cz.upce.nnpda.sensors.model.database.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    User findByUsername(String name);

}