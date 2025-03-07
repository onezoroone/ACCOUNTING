package com.vacom.accounting_system.controller;

import com.vacom.accounting_system.dto.UserDTO;
import com.vacom.accounting_system.dto.response.StandardResponse;
import com.vacom.accounting_system.entity.User;
import com.vacom.accounting_system.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "Người dùng", description = "API quản lý người dùng")
public class UserController {

    private final UserService userService;

    @GetMapping
    @PreAuthorize("hasAuthority('VIEW_USER')")
    public ResponseEntity<StandardResponse<Page<User>>> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false, defaultValue = "id") String sortField,
            @RequestParam(required = false, defaultValue = "asc") String sortDirection
    ) {
        Sort sort = sortDirection.equalsIgnoreCase("asc") ?
                Sort.by(sortField).ascending() :
                Sort.by(sortField).descending();

        Pageable pageable = PageRequest.of(page, size, sort);
        Page<User> users = userService.getAllUsers(pageable);

        return ResponseEntity.ok(StandardResponse.success("Lấy danh sách người dùng thành công", users));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('VIEW_USER')")
    public ResponseEntity<StandardResponse<User>> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(StandardResponse.success("Lấy thông tin người dùng thành công", user));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('CREATE_USER')")
    public ResponseEntity<StandardResponse<User>> createUser(@Valid @RequestBody UserDTO userDTO) {
        User createdUser = userService.createUser(userDTO);
        return new ResponseEntity<>(
                StandardResponse.success("Tạo người dùng mới thành công", createdUser),
                HttpStatus.CREATED
        );
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('EDIT_USER')")
    public ResponseEntity<StandardResponse<User>> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UserDTO userDTO
    ) {
        User updatedUser = userService.updateUser(id, userDTO);
        return ResponseEntity.ok(StandardResponse.success("Cập nhật thông tin người dùng thành công", updatedUser));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('EDIT_USER')")
    public ResponseEntity<StandardResponse<Void>> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(StandardResponse.success("Xóa người dùng thành công", null));
    }
}