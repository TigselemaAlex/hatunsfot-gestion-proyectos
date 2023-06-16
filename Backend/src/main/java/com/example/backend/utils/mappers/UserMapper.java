package com.example.backend.utils.mappers;

import com.example.backend.controllers.requests.RegisterRequest;
import com.example.backend.controllers.responses.UserInfoResponse;
import com.example.backend.controllers.responses.UserResponse;
import com.example.backend.entities.User;
import com.example.backend.security.model.UserPrincipal;
import com.example.backend.utils.enums.Role;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collections;
import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserPrincipal userPrincipalFromUser(User user);

    default List<SimpleGrantedAuthority> mapRolesToAuthorities(Role rol) {
        if (rol == null) {
            return Collections.emptyList();
        }
        return Collections.singletonList(new SimpleGrantedAuthority(rol.name()));
    }

    UserResponse userResponseFromUserPrincipal(UserPrincipal userPrincipal);


    User userFromRegisterRequest(RegisterRequest request);


    UserResponse userResponseFromUser(User user);

    UserInfoResponse userInfoFromUser(User user);
}
