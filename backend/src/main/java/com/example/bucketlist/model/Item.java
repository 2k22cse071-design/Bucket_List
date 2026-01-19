package com.example.bucketlist.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    
    // VALUES: ACHIEVEMENT, MISSED, BUCKETLIST
    private String category;
}
