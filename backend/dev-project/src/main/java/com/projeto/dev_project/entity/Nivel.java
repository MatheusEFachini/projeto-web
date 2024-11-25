package com.projeto.dev_project.entity;

import com.projeto.dev_project.DTO.NivelDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.repository.Query;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name="nivel")
@NamedNativeQuery(
    name = "find_niveldto",
    query = "SELECT n.id, n.nivel, " +
            " (SELECT count(*) FROM desenvolvedor d WHERE d.nivel_id = n.id) as quantidade_devs " +
            " FROM nivel n ORDER BY n.nivel ASC",
    resultSetMapping = "nivel_to_niveldto"
)
@SqlResultSetMapping(
        name = "nivel_to_niveldto",
        classes = @ConstructorResult(
                targetClass = NivelDTO.class,
                columns = {
                        @ColumnResult(name = "id", type = Integer.class),
                        @ColumnResult(name = "nivel", type = String.class),
                        @ColumnResult(name = "quantidade_devs", type = Integer.class)
                }
        )
)
public class Nivel{

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "nivelId")
    @SequenceGenerator(name = "nivelId", sequenceName = "SEQ_NIVEL", allocationSize = 1)
    private Integer id;

    @NotNull
    private String nivel;
}
