FROM azul/zulu-openjdk:17 AS builder

WORKDIR /app
COPY gradle/wrapper ./gradle/wrapper
COPY gradlew /app/
COPY build.gradle gradlew settings.gradle ./
RUN pwd
RUN ls
RUN ./gradlew build || return 0
COPY . ./
RUN ./gradlew bootJar

FROM azul/zulu-openjdk-alpine:17-jre
WORKDIR /app
COPY --from=builder /app/build/libs ./
CMD java -jar instalite-0.0.1-SNAPSHOT.jar