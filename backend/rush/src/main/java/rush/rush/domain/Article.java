package rush.rush.domain;

import com.sun.istack.NotNull;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Getter
@NoArgsConstructor
@Builder
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String title;

    @Lob
    @NotNull
    private String content;

    @NotNull
    private Double latitude;    // 위도

    @NotNull
    private Double longitude;   // 경도

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", nullable = false)
    private User user;

    @Column(nullable = false)
    private boolean publicMap;

    @Column(nullable = false)
    private boolean privateMap;

    @CreationTimestamp
    private Timestamp createDate;

    @OneToMany(mappedBy = "article", fetch = FetchType.LAZY)
    private List<ArticleGroup> articleGroups = new ArrayList<>();

    public Article(Long id, String title, String content, double latitude, double longitude, User user, boolean publicMap, boolean privateMap, Timestamp createDate, List<ArticleGroup> articleGroups) {
        validate(title, content, user);
        this.id = id;
        this.title = title;
        this.content = content;
        this.latitude = latitude;
        this.longitude = longitude;
        this.user = user;
        this.publicMap = publicMap;
        this.privateMap = privateMap;
        this.createDate = createDate;
        if (Objects.nonNull(articleGroups)) {
            this.articleGroups = articleGroups;
        }
    }

    private void validate(String title, String content, User user) {
        if (Objects.isNull(title) || title.trim().isEmpty()) {
            throw new IllegalArgumentException("제목이 비어있습니다.");
        }
        if (Objects.isNull(content) || content.trim().isEmpty()) {
            throw new IllegalArgumentException("내용이 비어있습니다.");
        }
        if (Objects.isNull(user) || Objects.isNull(user.getId())) {
            throw new IllegalArgumentException("작성자가 올바르게 지정되지 않았습니다.");
        }
    }
}
