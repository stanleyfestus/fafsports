# Use OpenJDK 17 as the base image
FROM openjdk:25-jdk-slim

# Install SQLite3 and Maven (if they're not already in the base image)
RUN apt-get update && apt-get install -y \
    sqlite3 \
    maven \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory to /app
WORKDIR /app

# Copy the Maven project files to the container
COPY backend/pom.xml .
COPY backend/src /app/src

# Build the app with Maven
RUN mvn clean package

# Expose the port your app will run on (adjust if necessary)
EXPOSE 8080

# Run the app (replace 'my-app.jar' with the name of your compiled JAR file)
CMD ["java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"]
