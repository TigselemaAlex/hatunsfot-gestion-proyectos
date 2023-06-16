package com.example.backend.services;

import com.example.backend.controllers.requests.RegisterRequest;
import com.example.backend.controllers.responses.MessageResponse;
import com.example.backend.entities.User;
import com.example.backend.repositories.UserRepository;
import com.example.backend.utils.enums.Role;
import com.example.backend.utils.mappers.UserMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    public AuthService(UserRepository userRepository, PasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.encoder = encoder;
    }

    public MessageResponse logup(RegisterRequest request){
        User user = UserMapper.INSTANCE.userFromRegisterRequest(request);
        user.setRole(Role.ADMIN);
        user.setPassword(encoder.encode(user.getPassword()));
        User userFromDB = userRepository.save(user);
        return new MessageResponse(MessageFormat.format("Usuario {0} registrado exitosamente: {1}", userFromDB.getName(), userFromDB.getId()));
    }

}
