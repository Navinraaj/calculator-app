pipeline {
    agent any

    environment {
        // Fetch the SonarQube token from Jenkins credentials
        SONAR_TOKEN = credentials('calculator-token')
        DATADOG_API_KEY = credentials('datadog') // Add your Datadog API key to Jenkins credentials
    }

    tools {
        jdk 'jdk-17'
        nodejs 'nodejs-14' // Assuming Node.js is installed in Jenkins and named 'nodejs-14'
    }

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }
        stage('Monitoring and Alerting') {
            steps {
                script {
                    // Capture the start time
                    def startTime = currentBuild.startTimeInMillis
                    def currentTime = System.currentTimeMillis()
                    def duration = (currentTime - startTime) / 1000 // Duration in seconds
                    def causes = currentBuild.getBuildCauses()
                    def user = causes.find { it.userName }?.userName ?: "Automated Trigger"
                    echo "Build Duration: ${duration} seconds"
                    echo "Triggered by: ${user}"
                    
                    withCredentials([string(credentialsId: 'datadog', variable: 'DATADOG_API_KEY')]) {
                        // Sending event to Datadog
                        def eventResponse = httpRequest (
                            url: "https://api.us5.datadoghq.com/api/v1/events",
                            httpMode: 'POST',
                            customHeaders: [[name: 'Content-Type', value: 'application/json'], [name: 'DD-API-KEY', value: "${DATADOG_API_KEY}"]],
                            requestBody: """{
                                "title": "Deployment Notification",
                                "text": "Deployment of myapp to production was successful.\\nBuild Duration: ${duration} seconds\\nTriggered by: ${user}",
                                "priority": "normal",
                                "tags": ["jenkins","deployment","myapp"]
                            }"""
                        )
                        echo "Datadog event response: ${eventResponse.content}"

                        // Sending custom metric to Datadog
                        def metricResponse = httpRequest (
                            url: "https://api.us5.datadoghq.com/api/v1/series",
                            httpMode: 'POST',
                            customHeaders: [[name: 'Content-Type', value: 'application/json'], [name: 'DD-API-KEY', value: "${DATADOG_API_KEY}"]],
                            requestBody: """{
                                "series" : [{
                                    "metric":"jenkins.build.duration",
                                    "points":[[${currentTime / 1000}, ${duration}]],
                                    "type":"gauge",
                                    "tags":["jenkins","build"],
                                    "host":"${env.NODE_NAME}"
                                }]
                            }"""
                        )
                        echo "Datadog metric response: ${metricResponse.content}"
                    }
                }
            }
        }
    }
    post {
        always {
            // Clean up workspace after build
            cleanWs()
        }
    }
}
