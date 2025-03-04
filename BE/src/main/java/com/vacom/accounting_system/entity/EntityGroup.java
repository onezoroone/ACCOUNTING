package com.vacom.accounting_system.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "entity_groups")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EntityGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "entity_code", nullable = false, unique = true)
    String entityCode;

    @Column(name = "entity_group_name", nullable = false, unique = true)
    String entityGroupName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_code", referencedColumnName = "entity_code")
    EntityGroup parent;

    @Column(name = "parent_code", insertable = false, updatable = false)
    String parentCode;
}