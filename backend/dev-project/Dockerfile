## BUILD
FROM maven:latest AS MVN_BUILD

WORKDIR /build

COPY pom.xml .

RUN mvn dependency:go-offline

COPY src ./src

RUN mvn package -Dmaven.test.skip=true

## PACKAGE
FROM openjdk:17-jdk-alpine

COPY --from=MVN_BUILD build/target/dev-project-0.0.1-SNAPSHOT.jar projeto.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","/projeto.jar"]