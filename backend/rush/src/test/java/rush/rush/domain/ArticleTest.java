package rush.rush.domain;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.util.stream.Stream;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

class ArticleTest {

    @ParameterizedTest
    @MethodSource("constructorTestParameters")
    void constructor_IfIsEmpty_ExceptionThrown(String title, String content) {
        // given
        User user = User.builder()
            .id(1L)
            .email("test@test.com")
            .password("test password")
            .nickName("test")
            .provider(AuthProvider.local)
            .build();

        // when & then
        assertThatThrownBy(() -> Article.builder()
                .title(title)
                .content(content)
                .latitude(0.0)
                .longitude(0.0)
                .user(user)
                .privateMap(true)
                .publicMap(true)
                .build()
        ).isInstanceOf(IllegalArgumentException.class);
    }

    private static Stream<Arguments> constructorTestParameters() {
        return Stream.of(
            Arguments.of(null, null),
            Arguments.of("", null),
            Arguments.of(null, ""),
            Arguments.of("", ""),
            Arguments.of("      ", "     ")
        );
    }
}
