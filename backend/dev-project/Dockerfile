FROM openjdk:17-jdk-alpine

ARG JAR_FILE=target/*.jar

COPY ./target/dev-project-0.0.1-SNAPSHOT.jar projeto.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","/projeto.jar"]