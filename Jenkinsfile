pipeline {
    agent any

    environment {
        SONAR_TOKEN = credentials('calculator-token')
        DATADOG_API_KEY = credentials('datadog')
    }

    tools {
        jdk 'jdk-17'
        nodejs 'nodejs-14'
    }

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                script {
                    bat 'npm install'
                    bat 'docker build -t myapp:latest .'
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    bat 'npm test'
                }
            }
        }
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    withEnv(["PATH+SONARQUBE=${tool 'sonarscanner'}/bin"]) {
                        bat 'sonar-scanner -Dsonar.projectKey=calculator-jenkins -Dsonar.sources=. -Dsonar.host.url=http://172.31.112.1:9000 -Dsonar.login=%SONAR_TOKEN%'
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    def containerName = 'myapp-container'
                    
                    // Check if the container is already running and stop it
                    def containerExists = bat(script: "docker ps -a -q -f name=${containerName}", returnStdout: true).trim()
                    if (containerExists) {
                        bat "docker stop ${containerName}"
                        bat "docker rm ${containerName}"
                    }

                    // Run the new container
                    bat "docker run -d --name ${containerName} -p 3000:3000 myapp:latest"
                }
            }
        }
        stage('Monitoring and Alerting') {
            steps {
                script {
                    def startTime = currentBuild.startTimeInMillis
                    def currentTime = System.currentTimeMillis()
                    def duration = (currentTime - startTime) / 1000
                    def user = currentBuild.getBuildCauses().find { it.userName }?.userName ?: "Automated Trigger"
                    echo "Build Duration: ${duration} seconds"
                    echo "Triggered by: ${user}"

                    withCredentials([string(credentialsId: 'datadog', variable: 'DATADOG_API_KEY')]) {
                        def response = httpRequest (
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
                        echo "Datadog event response: ${response.content}"
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
