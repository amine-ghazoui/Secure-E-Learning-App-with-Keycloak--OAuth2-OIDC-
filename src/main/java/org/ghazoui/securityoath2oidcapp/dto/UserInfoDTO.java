package org.ghazoui.securityoath2oidcapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoDTO {
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private List roles;
}