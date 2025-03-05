package com.vacom.accounting_system.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "entity_groups")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EntityGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "entity_code", unique = true, nullable = false)
    private String entityCode;

    @Column(name = "entity_group_name", nullable = false)
    private String entityGroupName;

    @ManyToOne
    @JoinColumn(name = "parent_code", referencedColumnName = "entity_code")
    private EntityGroup parentGroup;
}
