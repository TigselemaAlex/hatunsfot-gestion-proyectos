package com.example.backend.services;

import com.example.backend.controllers.requests.LoginRequest;
import com.example.backend.controllers.requests.RegisterRequest;
import com.example.backend.controllers.responses.JWTResponse;
import com.example.backend.controllers.responses.MessageResponse;
import com.example.backend.entities.User;
import com.example.backend.repositories.UserRepository;
import com.example.backend.security.jwt.JWTProvider;
import com.example.backend.security.model.UserPrincipal;
import com.example.backend.utils.enums.Role;
import com.example.backend.utils.mappers.UserMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final JWTProvider jwtProvider;

    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository, PasswordEncoder encoder, JWTProvider jwtProvider, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.jwtProvider = jwtProvider;
        this.authenticationManager = authenticationManager;
    }

    public MessageResponse logup(RegisterRequest request){
        User user = UserMapper.INSTANCE.userFromRegisterRequest(request);
        user.setRole(Role.ADMIN);
        user.setPassword(encoder.encode(user.getPassword()));
        User userFromDB = userRepository.save(user);
        return new MessageResponse(MessageFormat.format("Usuario {0} registrado exitosamente: {1}", userFromDB.getName(), userFromDB.getId()));
    }

    public JWTResponse login(LoginRequest request){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.username(), request.password()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtProvider.generateToken(authentication);
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        return new JWTResponse(jwt,UserMapper.INSTANCE.userResponseFromUserPrincipal(userPrincipal));
    }

}
